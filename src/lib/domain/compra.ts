import type { CriteriosNegocio } from "./criterios";

export type ListaCompra = "reposicao_urgente" | "fase_b" | "promocao" | "ok" | "aguardar";

export interface EntradaEstoque {
  sku: string;
  estoqueAtual: number;
  /** Média de unidades vendidas por dia no período analisado. */
  vendaMediaDia: number;
  /** Há quantos dias este SKU está em estoque (pra proteger produto novo). */
  diasEmEstoque: number;
}

export interface SugestaoCompra {
  sku: string;
  diasCobertura: number | null; // null = sem venda medível
  quantidadeSugerida: number;
  lista: ListaCompra;
}

/**
 * Sugestão de compra (seção 9), validada em produção:
 * - cobertura alvo = coberturaDiasAlvo, com crescimento aplicado sobre a venda média
 * - considera lead time do fornecedor + margem de segurança
 * - saída em 3 listas: reposição urgente / fase B / promoção
 * - produto com menos de `diasMinimoParaAvaliar` dias em estoque NÃO entra em "sem venda"
 *   (ainda não teve chance justa de vender)
 */
export function sugerirCompra(e: EntradaEstoque, c: CriteriosNegocio): SugestaoCompra {
  const vendaProjetada = e.vendaMediaDia * (1 + c.coberturaCrescimento);
  const diasCobertura = e.vendaMediaDia > 0 ? e.estoqueAtual / e.vendaMediaDia : null;

  // Alvo = cobrir (cobertura alvo + lead time + segurança) dias de venda projetada.
  const diasAlvo = c.coberturaDiasAlvo + c.leadTimeDias + c.leadTimeSegurancaDias;
  const estoqueDesejado = vendaProjetada * diasAlvo;
  const quantidadeSugerida = Math.max(0, Math.ceil(estoqueDesejado - e.estoqueAtual));

  let lista: ListaCompra;
  if (e.vendaMediaDia <= 0) {
    // Sem venda: só marca pra promoção se já teve tempo justo em estoque.
    lista = e.diasEmEstoque >= c.diasMinimoParaAvaliar ? "promocao" : "aguardar";
  } else if (diasCobertura !== null && diasCobertura <= c.leadTimeDias + c.leadTimeSegurancaDias) {
    lista = "reposicao_urgente";
  } else if (diasCobertura !== null && diasCobertura < c.coberturaDiasAlvo) {
    lista = "fase_b";
  } else {
    lista = "ok";
  }

  return { sku: e.sku, diasCobertura, quantidadeSugerida, lista };
}
