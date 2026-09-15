import "server-only";
import { createClient } from "@/lib/supabase/server";

export interface MarcaPriorizada {
  marca: string;
  posicionamento: string | null;
  jaNoMix: boolean;
  pontuacao: number | null;
  ticketMedio: number | null;
  nVendedores: number | null;
  saturacao: string | null;
  tendencia: string | null;
  vendas: number | null;
  unidades: number | null;
  pctCatalogo: number | null;
  onda: number | null;
}

export interface PriorizacaoView {
  mes: string | null;
  marcas: MarcaPriorizada[];
}

export async function getPriorizacao(orgId: string): Promise<PriorizacaoView> {
  const supabase = await createClient();
  const { data: ult } = await supabase
    .from("brand_reports")
    .select("mes_referencia")
    .eq("organization_id", orgId)
    .order("mes_referencia", { ascending: false })
    .limit(1);
  const mes = ult?.[0]?.mes_referencia ?? null;
  if (!mes) return { mes: null, marcas: [] };

  const { data } = await supabase
    .from("brand_reports")
    .select("marca, posicionamento, ja_no_mix, score_priorizacao, ticket_medio, n_vendedores, saturacao, tendencia, receita, unidades, pct_catalogo, onda_entrada")
    .eq("organization_id", orgId)
    .eq("mes_referencia", mes)
    .order("score_priorizacao", { ascending: false });

  const marcas: MarcaPriorizada[] = (data ?? []).map((r) => ({
    marca: r.marca,
    posicionamento: r.posicionamento,
    jaNoMix: !!r.ja_no_mix,
    pontuacao: r.score_priorizacao,
    ticketMedio: r.ticket_medio,
    nVendedores: r.n_vendedores,
    saturacao: r.saturacao,
    tendencia: r.tendencia,
    vendas: r.receita,
    unidades: r.unidades,
    pctCatalogo: r.pct_catalogo,
    onda: r.onda_entrada,
  }));
  return { mes, marcas };
}
