import type { AnuncioConcorrente, LinhaRejeitada, ResultadoParse } from "../domain/types";
import { parseNumeroBr, simNao } from "../domain/text";
import { limparGtin } from "../domain/gtin";
import { classificarCategoria, subcategoriaPerfumaria, detectarTamanho } from "../domain/categoria";

/**
 * Parser do catálogo de um concorrente (export do Mercado Livre).
 * Recebe as linhas já lidas do xlsx (array de objetos por coluna) + o nome do
 * concorrente informado no upload. Valida linha a linha: uma linha ruim é rejeitada
 * com motivo, mas NÃO derruba o import inteiro. Se o layout for inesperado, falha
 * com mensagem clara (nunca importa errado em silêncio).
 */

const COLUNAS_OBRIGATORIAS = ["Título", "Vendas em $", "Vendas em Unid."] as const;

const str = (v: unknown): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
};

export class LayoutInesperadoError extends Error {
  constructor(public faltando: string[]) {
    super(
      `Layout inesperado no arquivo de concorrente. Faltam colunas: ${faltando.join(", ")}. ` +
        `Confira se é o export correto do catálogo do Mercado Livre.`,
    );
    this.name = "LayoutInesperadoError";
  }
}

export function parseConcorrente(
  linhas: Array<Record<string, unknown>>,
  concorrente: string,
): ResultadoParse<AnuncioConcorrente> {
  const primeira = linhas[0] ?? {};
  const chaves = new Set(Object.keys(primeira));
  const faltando = COLUNAS_OBRIGATORIAS.filter((c) => !chaves.has(c));
  if (faltando.length > 0) throw new LayoutInesperadoError(faltando);

  const itens: AnuncioConcorrente[] = [];
  const rejeitadas: LinhaRejeitada[] = [];

  linhas.forEach((row, i) => {
    const titulo = str(row["Título"]);
    if (!titulo) {
      rejeitadas.push({ linha: i + 2, motivo: "Sem título", dados: row });
      return;
    }
    const marca = str(row["Marca"]) ?? "SEM MARCA";
    const categoria = classificarCategoria(titulo, marca);
    itens.push({
      titulo,
      marca,
      vendasReais: parseNumeroBr(row["Vendas em $"]) ?? 0,
      vendasUnidades: parseNumeroBr(row["Vendas em Unid."]) ?? 0,
      precoMedio: parseNumeroBr(row["Preço Médio"]),
      tipoPublicacao: str(row["Tipo de Publicação"]),
      fulfillment: simNao(row["Fulfillment"]),
      catalogo: simNao(row["Catálogo."]),
      freteGratis: simNao(row["Com Frete grátis"]),
      mercadoEnvios: simNao(row["Com Mercado Envios"]),
      desconto: simNao(row["Com desconto"]),
      sku: str(row["SKU"]),
      oem: str(row["OEM"]),
      gtinBruto: str(row["GTIN"]),
      gtinLimpo: limparGtin(row["GTIN"]),
      nPeca: str(row["N° PEÇA"]),
      estado: str(row["Estado"]),
      mercadoPago: simNao(row["MercadoPago"]),
      republicada: simNao(row["Republicada"]),
      condicao: str(row["Condição"]),
      concorrente,
      categoria,
      subcategoria: subcategoriaPerfumaria(marca, categoria),
      tamanhoDetectado: detectarTamanho(titulo),
    });
  });

  return { itens, rejeitadas, totalLinhas: linhas.length };
}
