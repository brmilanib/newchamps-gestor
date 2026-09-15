"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessao, type Sessao } from "@/lib/data/sessao";
import { lerLinhas } from "@/lib/parsers/xlsx-io";
import { parseEstoque, LayoutEstoqueError } from "@/lib/parsers/estoque";
import { parseVendasProdutos, LayoutVendasError } from "@/lib/parsers/vendas";

export type EstadoUp = { ok: true; msg: string } | { ok: false; erro: string } | null;

const chunk = <T,>(a: T[], n: number): T[][] => {
  const o: T[][] = [];
  for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n));
  return o;
};

type Ctx = { erro: string } | { s: Sessao; org: string };

async function contexto(): Promise<Ctx> {
  const s = await getSessao();
  if (!s.organizationId) return { erro: "Seu usuário não está ligado a uma organização." };
  if (s.papel !== "admin") return { erro: "Só administrador pode subir dados." };
  return { s, org: s.organizationId };
}

async function jaImportado(org: string, tipo: string, hash: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("uploads")
    .select("id")
    .eq("organization_id", org)
    .eq("tipo", tipo)
    .eq("hash_arquivo", hash)
    .maybeSingle();
  return !!data;
}

/** Mapa sku -> id dos produtos da org. */
async function mapaProdutos(org: string): Promise<Map<string, string>> {
  const supabase = await createClient();
  const m = new Map<string, string>();
  const pagina = 1000;
  for (let from = 0; ; from += pagina) {
    const { data } = await supabase
      .from("own_products")
      .select("id, sku")
      .eq("organization_id", org)
      .order("id", { ascending: true })
      .range(from, from + pagina - 1);
    if (!data || data.length === 0) break;
    for (const d of data) m.set(d.sku, d.id);
    if (data.length < pagina) break;
  }
  return m;
}

export async function subirEstoque(_prev: EstadoUp, formData: FormData): Promise<EstadoUp> {
  const ctx = await contexto();
  if ("erro" in ctx) return { ok: false, erro: ctx.erro };
  const { org, s } = ctx;

  const arquivo = formData.get("arquivo");
  const dataRef = String(formData.get("data_referencia") ?? "").trim() || new Date().toISOString().slice(0, 10);
  if (!(arquivo instanceof File) || arquivo.size === 0) return { ok: false, erro: "Escolha um arquivo." };

  const buffer = Buffer.from(await arquivo.arrayBuffer());
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (await jaImportado(org, "estoque", hash)) return { ok: false, erro: "Este arquivo de estoque já foi importado antes." };

  let itens;
  try {
    itens = parseEstoque(lerLinhas(buffer)).itens;
  } catch (e) {
    if (e instanceof LayoutEstoqueError) return { ok: false, erro: e.message };
    return { ok: false, erro: "Não consegui ler o arquivo de estoque." };
  }
  if (itens.length === 0) return { ok: false, erro: "Nenhuma linha válida." };

  // dedupe por sku (soma estoque de armazéns)
  const bySku = new Map<string, { titulo: string; custo: number | null; estoque: number; armazem: string | null; criado: string | null }>();
  for (const it of itens) {
    const p = bySku.get(it.sku) ?? { titulo: it.titulo, custo: it.custoMedio, estoque: 0, armazem: it.armazem, criado: it.criadoEm };
    p.estoque += it.estoqueAtual;
    if (p.custo == null) p.custo = it.custoMedio;
    bySku.set(it.sku, p);
  }

  const supabase = await createClient();
  const mapa = await mapaProdutos(org);
  const novos = [...bySku.entries()].filter(([sku]) => !mapa.has(sku));
  for (const lote of chunk(novos, 300)) {
    const { data, error } = await supabase
      .from("own_products")
      .insert(lote.map(([sku, p]) => ({ organization_id: org, sku, titulo: p.titulo, custo_medio: p.custo, ativo: true, ...(p.criado ? { criado_em: p.criado + "T00:00:00Z" } : {}) })))
      .select("id, sku");
    if (error) return { ok: false, erro: "Falha ao criar produtos: " + error.message };
    for (const d of data) mapa.set(d.sku, d.id);
  }
  // atualiza custo/titulo dos existentes
  for (const [sku, p] of bySku) {
    if (novos.find(([s2]) => s2 === sku)) continue;
    await supabase.from("own_products").update({ titulo: p.titulo, custo_medio: p.custo }).eq("organization_id", org).eq("sku", sku);
  }

  const snaps = [...bySku.entries()].map(([sku, p]) => ({ own_product_id: mapa.get(sku)!, armazem: p.armazem, estoque_atual: p.estoque, custo_medio: p.custo, data_referencia: dataRef }));
  for (const lote of chunk(snaps, 500)) {
    const { error } = await supabase.from("own_stock_snapshots").insert(lote);
    if (error) return { ok: false, erro: "Falha ao gravar estoque: " + error.message };
  }

  await supabase.from("uploads").insert({ organization_id: org, tipo: "estoque", nome_arquivo: arquivo.name, hash_arquivo: hash, usuario_id: s.userId, linhas_processadas: bySku.size, status: "concluido" });
  revalidatePath("/estoque");
  return { ok: true, msg: `Estoque de ${dataRef} importado: ${bySku.size} SKUs.` };
}

export async function subirVendas(_prev: EstadoUp, formData: FormData): Promise<EstadoUp> {
  const ctx = await contexto();
  if ("erro" in ctx) return { ok: false, erro: ctx.erro };
  const { org, s } = ctx;

  const arquivo = formData.get("arquivo");
  const dataRef = String(formData.get("data_referencia") ?? "").trim() || new Date().toISOString().slice(0, 10);
  if (!(arquivo instanceof File) || arquivo.size === 0) return { ok: false, erro: "Escolha um arquivo." };

  const buffer = Buffer.from(await arquivo.arrayBuffer());
  const hash = createHash("sha256").update(buffer).digest("hex");
  if (await jaImportado(org, "vendas", hash)) return { ok: false, erro: "Este arquivo de vendas já foi importado antes." };

  let itens;
  try {
    itens = parseVendasProdutos(lerLinhas(buffer)).itens;
  } catch (e) {
    if (e instanceof LayoutVendasError) return { ok: false, erro: e.message };
    return { ok: false, erro: "Não consegui ler o arquivo de vendas." };
  }
  if (itens.length === 0) return { ok: false, erro: "Nenhuma linha válida." };

  const supabase = await createClient();
  const mapa = await mapaProdutos(org);
  const novos = itens.filter((it) => !mapa.has(it.sku));
  const novosUnicos = [...new Map(novos.map((n) => [n.sku, n])).values()];
  for (const lote of chunk(novosUnicos, 300)) {
    const { data, error } = await supabase
      .from("own_products")
      .insert(lote.map((n) => ({ organization_id: org, sku: n.sku, titulo: n.titulo ?? n.sku, ativo: true })))
      .select("id, sku");
    if (error) return { ok: false, erro: "Falha ao criar produtos: " + error.message };
    for (const d of data) mapa.set(d.sku, d.id);
  }

  const vendas = itens.map((it) => ({ own_product_id: mapa.get(it.sku)!, loja_id: null, canal: it.loja, data: dataRef, unidades: it.unidades, receita: it.receita, fonte: "upseller" as const }));
  for (const lote of chunk(vendas, 500)) {
    const { error } = await supabase.from("own_sales_records").insert(lote);
    if (error) return { ok: false, erro: "Falha ao gravar vendas: " + error.message };
  }

  await supabase.from("uploads").insert({ organization_id: org, tipo: "vendas", nome_arquivo: arquivo.name, hash_arquivo: hash, usuario_id: s.userId, linhas_processadas: itens.length, status: "concluido" });
  revalidatePath("/estoque");
  return { ok: true, msg: `Vendas importadas: ${itens.length} linhas (ref. ${dataRef}).` };
}
