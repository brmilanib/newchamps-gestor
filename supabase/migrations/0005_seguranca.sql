-- =====================================================================
-- Newchamps Gestor — 0005 correções de segurança (apontadas pelo linter do Supabase)
-- =====================================================================

-- collect_runs estava sem RLS (é global/sem organization_id). Ativa e permite
-- leitura só por usuários logados; escrita fica com o worker (service role).
alter table collect_runs enable row level security;
create policy collect_runs_read on collect_runs for select using (auth.uid() is not null);

-- Fixa o search_path da função de trigger.
alter function set_atualizado_em() set search_path = public;

-- Fecha a superfície RPC das funções auxiliares para anônimos.
-- (authenticated PRECISA executar, porque as policies de RLS as chamam.)
revoke execute on function current_org_id() from anon, public;
revoke execute on function is_admin() from anon, public;
grant execute on function current_org_id() to authenticated;
grant execute on function is_admin() to authenticated;