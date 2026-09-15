import type { LinhaRejeitada, ResultadoParse } from "../domain/types";
import { parseNumeroBr } from "../domain/text";

/** Uma linha do export "Vendas por Produtos" do Upseller (agregado por SKU no período). */
export interface LinhaVenda {
  sku: string;
  titulo: string | null;
  loja: string | null;
  unidades: number;
  receita: number;
  precoMedio: number | null;
}

const COLUNAS_OBRIGATORIAS = ["SKU Principal", "Unidades Vendidas"] as const;

const str = (v: unknown): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
};

export class LayoutVendasError extends Error {
  constructor(public faltando: string[]) {
    super(
      `Layout inesperado no arquivo de vendas. Faltam colunas: ${faltando.join(", ")}. ` +
        `Confira se é o export "Vendas por Produtos" do Upseller.`,
    );
    this.name = "LayoutVendasError";
  }
}

export function parseVendasProdutos(linhas: Array<Record<string, unknown>>): ResultadoParse<LinhaVenda> {
  const chaves = new Set(Object.keys(linhas[0] ?? {}));
  const faltando = COLUNAS_OBRIGATORIAS.filter((c) => !chaves.has(c));
  if (faltando.length > 0) throw new LayoutVendasError(faltando);

  const itens: LinhaVenda[] = [];
  const rejeitadas: LinhaRejeitada[] = [];

  linhas.forEach((row, i) => {
    const sku = str(row["SKU Principal"]);
    if (!sku) {
      rejeitadas.push({ linha: i + 2, motivo: "Sem SKU Principal", dados: row });
      return;
    }
    itens.push({
      sku,
      titulo: str(row["Produtos"]),
      loja: str(row["Loja"]),
      unidades: parseNumeroBr(row["Unidades Vendidas"]) ?? 0,
      receita: parseNumeroBr(row["Valor de Vendas"]) ?? 0,
      precoMedio: parseNumeroBr(row["Preço Médio"]),
    });
  });

  return { itens, rejeitadas, totalLinhas: linhas.length };
}
