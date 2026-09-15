import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { AnuncioConcorrente, Categoria, SubcategoriaPerfumaria } from "@/lib/domain/types";

/**
 * Busca todos os anúncios de concorrente da organização e devolve no formato do
 * domínio, pronto pras funções de agregação. Pagina de 1000 em 1000 (limite do
 * PostgREST) pra não perder linha com catálogos grandes (~4 mil anúncios).
 */
export async function getAnuncios(orgId: string): Promise<AnuncioConcorrente[]> {
  const supabase = await createClient();
  const { data: comps } = await supabase
    .from("competitors")
    .select("id, nome")
    .eq("organization_id", orgId);
  const nomePorId = new Map((comps ?? []).map((c) => [c.id, c.nome]));
  if (nomePorId.size === 0) return [];

  const ids = [...nomePorId.keys()];
  const pagina = 1000;
  const linhas: Record<string, unknown>[] = [];
  for (let from = 0; ; from += pagina) {
    const { data, error } = await supabase
      .from("competitor_listings")
      .select("*")
      .in("competitor_id", ids)
      .order("id", { ascending: true }) // ordenação estável: sem isso a paginação repete/pula linhas
      .range(from, from + pagina - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    linhas.push(...(data as Record<string, unknown>[]));
    if (data.length < pagina) break;
  }

  return linhas.map((r) => ({
    titulo: String(r.titulo ?? ""),
    marca: String(r.marca ?? "SEM MARCA"),
    vendasReais: Number(r.vendas_reais) || 0,
    vendasUnidades: Number(r.vendas_unidades) || 0,
    precoMedio: r.preco_medio == null ? null : Number(r.preco_medio),
    tipoPublicacao: null,
    fulfillment: Boolean(r.fulfillment),
    catalogo: false,
    freteGratis: Boolean(r.frete_gratis),
    mercadoEnvios: Boolean(r.mercado_envios),
    desconto: Boolean(r.desconto),
    sku: (r.sku as string) ?? null,
    oem: null,
    gtinBruto: (r.gtin_bruto as string) ?? null,
    gtinLimpo: (r.gtin_limpo as string) ?? null,
    nPeca: null,
    estado: null,
    mercadoPago: false,
    republicada: false,
    condicao: (r.condicao as string) ?? null,
    concorrente: nomePorId.get(r.competitor_id as string) ?? "?",
    categoria: (r.categoria ?? "Outros/Diversos") as Categoria,
    subcategoria: (r.subcategoria ?? null) as SubcategoriaPerfumaria,
    tamanhoDetectado: (r.tamanho_detectado as string) ?? "Não identificado no título",
  }));
}

/** Lista de concorrentes com contagem de anúncios (pro cabeçalho das telas). */
export async function getConcorrentes(orgId: string): Promise<Array<{ nome: string }>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("competitors")
    .select("nome")
    .eq("organization_id", orgId)
    .order("nome");
  return data ?? [];
}
