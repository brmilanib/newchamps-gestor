/**
 * Utilidades de conversão de texto → número, tolerantes aos formatos que
 * aparecem nos exports reais (Mercado Livre, Nubmetrics, Upseller, Gestor Seller).
 * Nada aqui inventa valor: quando não dá pra converter, retorna `null`.
 */

/** "Sim" / "Não" (e variações) → boolean. Vazio/nulo = false. */
export function simNao(v: unknown): boolean {
  if (v == null) return false;
  return String(v).trim().toLowerCase().startsWith("s");
}

/**
 * Número no formato brasileiro: aceita `number`, `"1.234,56"`, `"R$ 1.234,56"`,
 * `"61,3%"` (→ 0,613). Retorna `null` quando não é numérico.
 */
export function parseNumeroBr(v: unknown): number | null {
  if (v == null || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  let s = String(v).trim();
  if (s === "") return null;
  const ehPct = s.includes("%");
  s = s.replace(/[R$\s%]/g, "");
  // Se tem vírgula, ela é o separador decimal e o ponto é milhar.
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return ehPct ? n / 100 : n;
}

/**
 * Número compacto da Nubmetrics: `"+$20.9M"` → 20.900.000, `"+161.6k"` → 161.600,
 * `"-2"` → -2, `"61,3%"` → 0,613. Aqui o ponto é decimal (formato US), exceto em
 * percentuais, que vêm no formato BR com vírgula.
 */
export function parseCompacto(v: unknown): number | null {
  if (v == null || v === "") return null;
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  let s = String(v).trim();
  if (s === "") return null;
  if (s.includes("%")) return parseNumeroBr(s);
  s = s.replace(/[$+\s]/g, "");
  let negativo = false;
  if (s.startsWith("-")) {
    negativo = true;
    s = s.slice(1);
  }
  const m = s.match(/^([\d.]+)\s*([kmb]?)$/i);
  if (!m) return parseNumeroBr(v);
  const base = Number(m[1]);
  if (!Number.isFinite(base)) return null;
  const suf = m[2].toLowerCase();
  const mult = suf === "k" ? 1e3 : suf === "m" ? 1e6 : suf === "b" ? 1e9 : 1;
  const n = base * mult;
  return negativo ? -n : n;
}
