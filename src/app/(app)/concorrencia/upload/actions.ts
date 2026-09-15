"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessao } from "@/lib/data/sessao";
import { getAnuncios } from "@/lib/data/concorrencia";
import { lerLinhas } from "@/lib/parsers/xlsx-io";
import { parseConcorrente, LayoutInesperadoError } from "@/lib/parsers/concorrente";
import { consolidarGtin } from "@/lib/domain/agregacao";

export type EstadoUpload =
  | { ok: true; processadas: number; rejeitadas: number; concorrente: string }
  | { ok: false; erro: string }
  | null;

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export async function subirConcorrente(_prev: EstadoUpload, formData: FormData): Promise<EstadoUpload> {
  const sessao = await getSessao();
  if (!sessao.organizationId) return { ok: false, erro: "Seu usuário não está ligado a uma organização." };
  if (sessao.papel !== "admin") return { ok: false, erro: "Só administrador pode subir dados." };

  const arquivo = formData.get("arquivo");
  const concorrente = String(formData.get("concorrente") ?? "").trim().toUpperCase();
  const dataRef = String(formData.get("data_referencia") ?? "").trim() || new Date().toISOString().slice(0, 10);

  if (!(arquivo instanceof File) || arquivo.size === 0) return { ok: false, erro: "Escolha um arquivo." };
  if (!concorrente) return { ok: false, erro: "Informe o nome do concorrente." };

  const buffer = Buffer.from(await arquivo.arrayBuffer());
  const hash = createHash("sha256").update(buffer).digest("hex");
  const supabase = await createClient();
  const orgId = sessao.organizationId;

  // Idempotência: mesmo arquivo, mesmo tipo, mesma org não importa de novo.
  const { data: jaExiste } = await supabase
    .from("uploads")
    .select("id")
    .eq("organization_id", orgId)
    .eq("tipo", "concorrente")
    .eq("hash_arquivo", hash)
    .maybeSingle();
  if (jaExiste) return { ok: false, erro: "Este arquivo já foi importado antes (mesmo conteúdo)." };

  // Parse.
  let itens, rejeitadas;
  try {
    const linhas = lerLinhas(buffer);
    const res = parseConcorrente(linhas, concorrente);
    itens = res.itens;
    rejeitadas = res.rejeitadas;
  } catch (e) {
    if (e instanceof LayoutInesperadoError) return { ok: false, erro: e.message };
    return { ok: false, erro: "Não consegui ler o arquivo. Confira se é um .xlsx válido." };
  }
  if (itens.length === 0) return { ok: false, erro: "Nenhuma linha válida no arquivo." };

  // Registro de auditoria do upload.
  const { data: upload, error: upErr } = await supabase
    .from("uploads")
    .insert({
      organization_id: orgId,
      tipo: "concorrente",
      nome_arquivo: arquivo.name,
      hash_arquivo: hash,
      usuario_id: sessao.userId,
      status: "processando",
    })
    .select("id")
    .single();
  if (upErr || !upload) return { ok: false, erro: "Falha ao registrar o upload." };

  // Concorrente (acha ou cria).
  let competitorId: string;
  const { data: comp } = await supabase
    .from("competitors")
    .select("id")
    .eq("organization_id", orgId)
    .eq("nome", concorrente)
    .maybeSingle();
  if (comp) {
    competitorId = comp.id;
  } else {
    const { data: novo, error } = await supabase
      .from("competitors")
      .insert({ organization_id: orgId, nome: concorrente })
      .select("id")
      .single();
    if (error || !novo) return { ok: false, erro: "Falha ao cadastrar o concorrente." };
    competitorId = novo.id;
  }

  // Insere os anúncios (em lotes).
  const rows = itens.map((a) => ({
    competitor_id: competitorId,
    upload_id: upload.id,
    titulo: a.titulo,
    marca: a.marca,
    categoria: a.categoria,
    subcategoria: a.subcategoria,
    vendas_reais: a.vendasReais,
    vendas_unidades: a.vendasUnidades,
    preco_medio: a.precoMedio,
    gtin_bruto: a.gtinBruto,
    gtin_limpo: a.gtinLimpo,
    sku: a.sku,
    condicao: a.condicao,
    fulfillment: a.fulfillment,
    frete_gratis: a.freteGratis,
    mercado_envios: a.mercadoEnvios,
    desconto: a.desconto,
    tamanho_detectado: a.tamanhoDetectado,
    data_referencia: dataRef,
  }));
  for (const lote of chunk(rows, 500)) {
    const { error } = await supabase.from("competitor_listings").insert(lote);
    if (error) {
      await supabase.from("uploads").update({ status: "erro" }).eq("id", upload.id);
      return { ok: false, erro: `Falha ao gravar anúncios: ${error.message}` };
    }
  }

  await supabase
    .from("uploads")
    .update({
      linhas_processadas: itens.length,
      linhas_rejeitadas: rejeitadas.length,
      detalhe_erros_json: rejeitadas.length ? JSON.parse(JSON.stringify(rejeitadas)) : null,
      status: "concluido",
    })
    .eq("id", upload.id);

  // Evento de rastreabilidade (o worker fará isso depois; por ora registramos aqui).
  await supabase.from("eventos").insert({
    tipo: "upload.concluido",
    origem: "app:upload_concorrente",
    payload_json: { upload_id: upload.id, concorrente, linhas: itens.length },
  });

  // Ingestão + Oportunidades (determinísticos): reconsolida GTIN da org.
  await recalcularGtin(orgId, dataRef);

  revalidatePath("/concorrencia", "layout");
  return { ok: true, processadas: itens.length, rejeitadas: rejeitadas.length, concorrente };
}

/** Reconsolida a tabela derivada gtin_groups a partir de todos os anúncios da org. */
async function recalcularGtin(orgId: string, dataRef: string): Promise<void> {
  const supabase = await createClient();
  const anuncios = await getAnuncios(orgId);
  const { grupos } = consolidarGtin(anuncios);

  const rows = grupos.map((g) => ({
    organization_id: orgId,
    gtin: g.gtin,
    marca: g.marca,
    categoria: g.categoria,
    tamanho_detectado: g.tamanhoDetectado,
    titulo_representativo: g.tituloRepresentativo,
    n_concorrentes: g.nConcorrentes,
    n_anuncios: g.nAnuncios,
    receita_total: g.receitaTotal,
    unidades_total: g.unidadesTotal,
    preco_medio_ponderado: g.unidadesTotal > 0 ? g.receitaTotal / g.unidadesTotal : null,
    data_referencia: dataRef,
  }));
  for (const lote of chunk(rows, 500)) {
    await supabase.from("gtin_groups").upsert(lote, { onConflict: "organization_id,gtin,data_referencia" });
  }

  await supabase.from("eventos").insert({
    tipo: "ingestao.concluida",
    origem: "app:recalcular_gtin",
    payload_json: { grupos: grupos.length },
  });
}
