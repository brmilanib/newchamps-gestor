/**
 * Validação e limpeza de GTIN (código de barras).
 * Regra validada (seção 9 do documento): GTIN válido = inteiro de 8, 12, 13 ou 14
 * dígitos. O resto é descartado sem quebrar o processamento — inclusive os valores
 * que chegam corrompidos em notação científica (ex.: "7.89864e+12").
 */
const TAMANHOS_VALIDOS = new Set([8, 12, 13, 14]);

export function limparGtin(raw: unknown): string | null {
  if (raw == null || raw === "") return null;
  let s = String(raw).trim();
  // Notação científica vinda do Excel → expande pra inteiro.
  if (/e\+?\d+/i.test(s)) {
    const n = Number(s);
    if (!Number.isFinite(n)) return null;
    s = n.toFixed(0);
  }
  s = s.replace(/\D/g, "");
  return TAMANHOS_VALIDOS.has(s.length) ? s : null;
}

export function gtinValido(raw: unknown): boolean {
  return limparGtin(raw) !== null;
}
