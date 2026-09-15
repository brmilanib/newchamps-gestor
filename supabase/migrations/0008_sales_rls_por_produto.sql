-- =====================================================================
-- Newchamps Gestor — 0008 ajusta RLS de vendas para escopo por produto
-- Antes amarrava por loja_id (bloqueava venda sem loja). Agora amarra pela
-- organização do produto — venda é "minha venda do meu produto".
-- =====================================================================

drop policy if exists sales_rw on own_sales_records;

create policy sales_rw on own_sales_records for all
  using (own_product_id in (select id from own_products where organization_id = current_org_id()))
  with check (own_product_id in (select id from own_products where organization_id = current_org_id()));
