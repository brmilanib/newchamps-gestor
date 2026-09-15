/**
 * Meu mix de nicho atual (do documento; depois vem do empresa_contexto editável).
 * Serve pra marcar visualmente "já vendo" vs "marca nova" nas telas de oportunidade.
 */
const norm = (s: string): string =>
  s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();

const MIX = new Set(
  ["xerjoff", "nishane", "parfums de marly", "regalien", "thameen"].map(norm),
);

export function estaNoMix(marca: string): boolean {
  return MIX.has(norm(marca ?? ""));
}
