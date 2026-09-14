import type { LinhaRejeitada, ResultadoParse } from "../domain/types";
import type { MarcaNubmetrics } from "../domain/priorizacao";
import { parseCompacto, parseNumeroBr, simNao } from "../domain/text";

/**
 * Parser do export mensal da Nubmetrics (top-100 marcas por categoria).
 * Aceita tanto o formato compacto do relatório ("+$20.9M", "+161.6k", "61,3%")
 * quanto números já decodificados — os dois passam por `parseCompacto`/`parseNumeroBr`.
 */

const str = (v: unknown): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
};

// Aceita variações de nome de coluna que aparecem entre versões do export.
function pega(row: Record<string, unknown>, nomes: string[]): unknown {
  for (const n of nomes) if (n in row) return row[n];
  return undefined;
}

export function parseNubmetrics(
  linhas: Array<Record<string, unknown>>,
): ResultadoParse<MarcaNubmetrics> {
  const itens: MarcaNubmetrics[] = [];
  const rejeitadas: LinhaRejeitada[] = [];

  linhas.forEach((row, i) => {
    const marca = str(pega(row, ["Marca", "marca"]));
    if (!marca) {
      rejeitadas.push({ linha: i + 2, motivo: "Sem marca", dados: row });
      return;
    }
    const vendas = parseCompacto(pega(row, ["Vendas (R$)", "Vendas em $", "Vendas", "Receita (R$)"]));
    const unidades = parseCompacto(pega(row, ["Unidades Vendidas", "Vendas em Unid.", "Unidades"]));
    if (vendas == null && unidades == null) {
      rejeitadas.push({ linha: i + 2, motivo: "Sem vendas nem unidades", dados: row });
      return;
    }
    const v = vendas ?? 0;
    const u = unidades ?? 0;
    const ticket = parseNumeroBr(pega(row, ["Ticket Médio (R$)", "Ticket Médio", "Ticket"])) ?? (u > 0 ? v / u : 0);
    itens.push({
      marca,
      vendas: v,
      unidades: u,
      ticketMedio: ticket,
      nVendedores: parseNumeroBr(pega(row, ["Nº Vendedores", "N Vendedores", "Vendedores"])) ?? 0,
      tendenciaPct: parseNumeroBr(pega(row, ["Variação Ranking", "Tendência %", "Tendencia"])) ?? 0,
      jaNoMix: simNao(pega(row, ["Já no seu mix de nicho?", "Já no mix?", "No mix"])),
    });
  });

  return { itens, rejeitadas, totalLinhas: linhas.length };
}
