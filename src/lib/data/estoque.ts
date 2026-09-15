import "server-only";
import { createClient } from "@/lib/supabase/server";
import { sugerirCompra, type SugestaoCompra } from "@/lib/domain/compra";
import { CRITERIOS_PADRAO } from "@/lib/domain/criterios";

const PERIODO_VENDAS_DIAS = 30; // o export de vendas cobre ~30 dias

export interface ItemEstoque {
  sku: string;
  titulo: string;
  estoqueAtual: number;
  custoMedio: number | null;
  unidadesVendidas: number;
  vendaMediaDia: number;
  diasCobertura: number | null;
  quantidadeSugerida: number;
  lista: SugestaoCompra["lista"];
}

export interface EstoqueView {
  dataEstoque: string | null;
  itens: ItemEstoque[];
  totalSkus: number;
  valorEstoque: number;
  emRuptura: number;
  aRepor: number;
}

async function fetchAll<T>(run: (from: number, to: number) => PromiseLike<{ data: T[] | null }>): Promise<T[]> {
  const pagina = 1000;
  const out: T[] = [];
  for (let from = 0; ; from += pagina) {
    const { data } = await run(from, from + pagina - 1);
    if (!data || data.length === 0) break;
    out.push(...data);
    if (data.length < pagina) break;
  }
  return out;
}

export async function getEstoqueView(orgId: string): Promise<EstoqueView> {
  const supabase = await createClient();

  const produtos = await fetchAll<{ id: string; sku: string; titulo: string; custo_medio: number | null; criado_em: string }>(
    (from, to) =>
      supabase.from("own_products").select("id, sku, titulo, custo_medio, criado_em").eq("organization_id", orgId).order("id", { ascending: true }).range(from, to),
  );
  if (produtos.length === 0) {
    return { dataEstoque: null, itens: [], totalSkus: 0, valorEstoque: 0, emRuptura: 0, aRepor: 0 };
  }
  const ids = produtos.map((p) => p.id);

  // Última data de estoque
  const { data: ult } = await supabase
    .from("own_stock_snapshots")
    .select("data_referencia")
    .in("own_product_id", ids)
    .order("data_referencia", { ascending: false })
    .limit(1);
  const dataEstoque = ult?.[0]?.data_referencia ?? null;

  const snaps = dataEstoque
    ? await fetchAll<{ own_product_id: string; estoque_atual: number; custo_medio: number | null }>((from, to) =>
        supabase.from("own_stock_snapshots").select("own_product_id, estoque_atual, custo_medio").eq("data_referencia", dataEstoque).in("own_product_id", ids).order("own_product_id", { ascending: true }).range(from, to),
      )
    : [];
  const estoquePorProd = new Map(snaps.map((s) => [s.own_product_id, s]));

  const vendas = await fetchAll<{ own_product_id: string | null; unidades: number }>((from, to) =>
    supabase.from("own_sales_records").select("own_product_id, unidades").in("own_product_id", ids).order("own_product_id", { ascending: true }).range(from, to),
  );
  const unidPorProd = new Map<string, number>();
  for (const v of vendas) {
    if (!v.own_product_id) continue;
    unidPorProd.set(v.own_product_id, (unidPorProd.get(v.own_product_id) ?? 0) + Number(v.unidades));
  }

  const hoje = Date.now();
  const itens: ItemEstoque[] = produtos.map((p) => {
    const snap = estoquePorProd.get(p.id);
    const estoqueAtual = snap ? Number(snap.estoque_atual) : 0;
    const custoMedio = snap?.custo_medio != null ? Number(snap.custo_medio) : p.custo_medio;
    const unidades = unidPorProd.get(p.id) ?? 0;
    const vendaMediaDia = unidades / PERIODO_VENDAS_DIAS;
    const diasEmEstoque = p.criado_em ? Math.max(0, (hoje - new Date(p.criado_em).getTime()) / 86400000) : 999;
    const s = sugerirCompra({ sku: p.sku, estoqueAtual, vendaMediaDia, diasEmEstoque }, CRITERIOS_PADRAO);
    return {
      sku: p.sku,
      titulo: p.titulo,
      estoqueAtual,
      custoMedio: custoMedio ?? null,
      unidadesVendidas: unidades,
      vendaMediaDia,
      diasCobertura: s.diasCobertura,
      quantidadeSugerida: s.quantidadeSugerida,
      lista: s.lista,
    };
  });

  const valorEstoque = itens.reduce((sum, i) => sum + i.estoqueAtual * (i.custoMedio ?? 0), 0);
  const emRuptura = itens.filter((i) => i.estoqueAtual <= 0 && i.unidadesVendidas > 0).length;
  const aRepor = itens.filter((i) => i.lista === "reposicao_urgente").length;

  return { dataEstoque, itens, totalSkus: produtos.length, valorEstoque, emRuptura, aRepor };
}
