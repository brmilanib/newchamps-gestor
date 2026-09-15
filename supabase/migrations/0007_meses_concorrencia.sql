-- =====================================================================
-- Newchamps Gestor — 0007 função para listar os meses de dados de concorrência
-- Alimenta o seletor de período das telas de Concorrência.
-- =====================================================================

create or replace function meses_concorrencia()
returns table (mes date)
language sql
stable
security definer
set search_path = public
as $$
  select distinct data_referencia
  from competitor_listings
  where competitor_id in (select id from competitors where organization_id = current_org_id())
  order by data_referencia desc
$$;

revoke execute on function meses_concorrencia() from anon, public;
grant execute on function meses_concorrencia() to authenticated;
