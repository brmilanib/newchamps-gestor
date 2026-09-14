import type { CriteriosNegocio } from "./criterios";

export interface MarcaNubmetrics {
  marca: string;
  vendas: number;
  unidades: number;
  ticketMedio: number;
  nVendedores: number;
  tendenciaPct: number; // variação (proxy de tendência)
  jaNoMix: boolean;
}

export interface PrioritizacaoResultado {
  marca: string;
  pontuacao: number; // 0-100
  onda: number; // 1, 2, 3...
}

/** Normaliza um valor pra 0-1 dentro do intervalo [min,max] do conjunto. */
function normalizar(v: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return (v - min) / (max - min);
}

/**
 * Score ponderado de priorização de entrada em marca (seção 9 / planilha Nubmetrics).
 * Prioriza lucro/requinte (ticket), facilidade de entrada (poucos vendedores) e
 * espaço de mercado (saturação baixa) — não só volume. Gera ondas faseadas por
 * causa de capital de giro. Pesos configuráveis.
 */
export function priorizarMarcas(
  marcas: MarcaNubmetrics[],
  c: CriteriosNegocio,
  marcasPorOnda = 8,
): PrioritizacaoResultado[] {
  if (marcas.length === 0) return [];

  const tickets = marcas.map((m) => m.ticketMedio);
  const vendedores = marcas.map((m) => m.nVendedores);
  const volumes = marcas.map((m) => m.vendas);
  const tendencias = marcas.map((m) => m.tendenciaPct);
  const [tMin, tMax] = [Math.min(...tickets), Math.max(...tickets)];
  const [vMin, vMax] = [Math.min(...vendedores), Math.max(...vendedores)];
  const [volMin, volMax] = [Math.min(...volumes), Math.max(...volumes)];
  const [teMin, teMax] = [Math.min(...tendencias), Math.max(...tendencias)];

  const pontuadas = marcas.map((m) => {
    const sTicket = normalizar(m.ticketMedio, tMin, tMax);
    const sPoucos = 1 - normalizar(m.nVendedores, vMin, vMax); // menos vendedores = melhor
    const sSaturacao = 1 - normalizar(m.nVendedores, vMin, vMax); // proxy de saturação
    const sTendencia = normalizar(m.tendenciaPct, teMin, teMax);
    const sVolume = normalizar(m.vendas, volMin, volMax);
    const bruto =
      c.pesoTicket * sTicket +
      c.pesoPoucosVendedores * sPoucos +
      c.pesoSaturacaoBaixa * sSaturacao +
      c.pesoTendencia * sTendencia +
      c.pesoVolume * sVolume;
    return { marca: m.marca, pontuacao: Math.round(bruto * 1000) / 10 };
  });

  pontuadas.sort((a, b) => b.pontuacao - a.pontuacao);
  return pontuadas.map((p, i) => ({ ...p, onda: Math.floor(i / marcasPorOnda) + 1 }));
}
