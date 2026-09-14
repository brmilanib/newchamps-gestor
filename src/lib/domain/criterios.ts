/**
 * Critérios de negócio validados (seção 9 do documento).
 * São os valores PADRÃO — todos ficam editáveis na tela de Configurações e
 * guardados por organização. Nada aqui pode virar "número mágico" espalhado no código.
 */
export interface CriteriosNegocio {
  /** Oportunidade de marca: ticket médio combinado ≥ este valor (R$)... */
  oportunidadeTicketMin: number;
  /** ...E unidades vendidas somando os concorrentes ≥ este valor. */
  oportunidadeUnidadesMin: number;
  /** Sugestão de compra: dias de cobertura alvo. */
  coberturaDiasAlvo: number;
  /** Crescimento esperado aplicado sobre a venda média (ex.: 0,05 = 5%). */
  coberturaCrescimento: number;
  /** Lead time do fornecedor (dias) + margem de segurança (dias). */
  leadTimeDias: number;
  leadTimeSegurancaDias: number;
  /** Produto com menos que isto de dias em estoque não entra na lista de "sem venda". */
  diasMinimoParaAvaliar: number;
  /** Meta de margem (ex.: 0,20 = 20%) e custo fixo mensal de referência. */
  margemMeta: number;
  custoFixoMensal: number;
  /** Pesos do score de priorização (Nubmetrics). Somam ~1,0. */
  pesoTicket: number;
  pesoPoucosVendedores: number;
  pesoSaturacaoBaixa: number;
  pesoTendencia: number;
  pesoVolume: number;
}

export const CRITERIOS_PADRAO: CriteriosNegocio = {
  oportunidadeTicketMin: 100,
  oportunidadeUnidadesMin: 100,
  coberturaDiasAlvo: 14,
  coberturaCrescimento: 0.05,
  leadTimeDias: 4,
  leadTimeSegurancaDias: 3,
  diasMinimoParaAvaliar: 10,
  margemMeta: 0.2,
  custoFixoMensal: 50000,
  // Pesos espelhados da planilha Priorizacao_Entrada (aba "Priorização de Entrada").
  pesoTicket: 0.35,
  pesoPoucosVendedores: 0.25,
  pesoSaturacaoBaixa: 0.2,
  pesoTendencia: 0.1,
  pesoVolume: 0.1,
};
