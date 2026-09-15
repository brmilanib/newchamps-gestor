/**
 * URL e chave PUBLICÁVEL (anon) do Supabase.
 *
 * Estes dois valores são públicos por design — a chave publicável é feita pra ir no
 * navegador, e o que protege os dados é a RLS do banco. Preferimos ler das variáveis
 * de ambiente (NEXT_PUBLIC_*), com um fallback pros valores do projeto para o deploy
 * funcionar sem configuração extra. A chave SECRETA (service_role) nunca fica aqui.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://tjurcifqezmhmnegquaq.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_zKXRYF0Halun8ekG94PJyg_326VVitu";
