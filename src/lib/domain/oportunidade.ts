import type { CriteriosNegocio } from "./criterios";

/**
 * Regra de oportunidade de marca (seção 9): ticket médio combinado ≥ limite
 * E unidades vendidas somadas ≥ limite. Os dois precisam ser verdade.
 */
export function marcaEhOportunidade(
  ticketMedio: number,
  unidadesTotal: number,
  criterios: CriteriosNegocio,
): boolean {
  return (
    ticketMedio >= criterios.oportunidadeTicketMin &&
    unidadesTotal >= criterios.oportunidadeUnidadesMin
  );
}
