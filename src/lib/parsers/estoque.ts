import type { LinhaRejeitada, ResultadoParse } from "../domain/types";
import { parseNumeroBr } from "../domain/text";

/** Uma linha do export de estoque do Upseller (Lista_de_Estoque_*.xlsx). */
export interface LinhaEstoque {
  sku: string;
  titulo: string;
  armazem: string | null;
  estoqueAtual: number;
  custoMedio: number | null;
  criadoEm: string | null; // data em que entrou no estoque (coluna "Criado")
}

const COLUNAS_OBRIGATORIAS = ["SKU", "Estoque Atual", "Custo Médio"] as const;

const str = (v: unknown): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
};

export class LayoutEstoqueError extends Error {
  constructor(public faltando: string[]) {
    super(
      `Layout inesperado no arquivo de estoque. Faltam colunas: ${faltando.join(", ")}. ` +
        `Confira se é o export "Lista de Estoque" do Upseller.`,
    );
    this.name = "LayoutEstoqueError";
  }
}

export function parseEstoque(linhas: Array<Record<string, unknown>>): ResultadoParse<LinhaEstoque> {
  const chaves = new Set(Object.keys(linhas[0] ?? {}));
  const faltando = COLUNAS_OBRIGATORIAS.filter((c) => !chaves.has(c));
  if (faltando.length > 0) throw new LayoutEstoqueError(faltando);

  const itens: LinhaEstoque[] = [];
  const rejeitadas: LinhaRejeitada[] = [];

  linhas.forEach((row, i) => {
    const sku = str(row["SKU"]);
    if (!sku) {
      rejeitadas.push({ linha: i + 2, motivo: "Sem SKU", dados: row });
      return;
    }
    const criado = row["Criado"];
    itens.push({
      sku,
      titulo: str(row["Título"]) ?? sku,
      armazem: str(row["Armazém"]),
      estoqueAtual: parseNumeroBr(row["Estoque Atual"]) ?? 0,
      custoMedio: parseNumeroBr(row["Custo Médio"]),
      criadoEm: criado == null ? null : String(criado).slice(0, 10),
    });
  });

  return { itens, rejeitadas, totalLinhas: linhas.length };
}
