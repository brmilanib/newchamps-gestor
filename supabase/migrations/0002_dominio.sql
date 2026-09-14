-- =====================================================================
-- Newchamps Gestor — 0002 domínio
-- Catálogo próprio, concorrência, uploads, monitoramento/coleta,
-- séries históricas e alertas. Meu dado SEPARADO do dado de concorrente.
-- =====================================================================

-- ------------------------- catálogo e operação própria -------------------------
create table own_products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  loja_id uuid references lojas(id) on delete set null,
  sku text not null,
  gtin text,
  titulo text not null,
  marca text,
  categoria text,
  subcategoria text,
  custo_medio numeric,
  preco_atual numeric,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);
create index idx_own_products_org on own_products(organization_id);
create index idx_own_products_loja on own_products(loja_id);
create index idx_own_products_sku on own_products(organization_id, sku);
create index idx_own_products_gtin on own_products(gtin);

create table uploads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  tipo text not null check (tipo in ('concorrente','nubmetrics','estoque','vendas','gestor_seller')),
  nome_arquivo text not null,
  hash_arquivo text,                       -- idempotência: mesmo arquivo não duplica
  usuario_id uuid references users(id),
  linhas_processadas int not null default 0,
  linhas_rejeitadas int not null default 0,
  detalhe_erros_json jsonb,
  status text not null default 'processando' check (status in ('processando','concluido','erro')),
  criado_em timestamptz not null default now()
);
create index idx_uploads_org on uploads(organization_id, tipo, criado_em desc);
create unique index idx_uploads_hash on uploads(organization_id, tipo, hash_arquivo) where hash_arquivo is not null;

create table own_stock_snapshots (
  id uuid primary key default gen_random_uuid(),
  own_product_id uuid not null references own_products(id) on delete cascade,
  armazem text,
  estoque_atual numeric not null default 0,
  custo_medio numeric,
  data_referencia date not null,
  upload_id uuid references uploads(id) on delete set null
);
create index idx_stock_produto_data on own_stock_snapshots(own_product_id, data_referencia desc);

create table own_sales_records (
  id uuid primary key default gen_random_uuid(),
  own_product_id uuid references own_products(id) on delete set null,
  loja_id uuid references lojas(id) on delete set null,
  canal text,
  data date not null,
  unidades numeric not null default 0,
  receita numeric not null default 0,
  comissao numeric,
  frete numeric,
  imposto numeric,
  lucro numeric,
  margem_pct numeric,
  fonte text check (fonte in ('upseller','gestor_seller')),
  upload_id uuid references uploads(id) on delete set null
);
create index idx_sales_produto_data on own_sales_records(own_product_id, data desc);
create index idx_sales_loja_canal on own_sales_records(loja_id, canal, data desc);

-- ------------------------- concorrência -------------------------
create table competitors (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  nome text not null
);
create index idx_competitors_org on competitors(organization_id);

create table competitor_listings (
  id uuid primary key default gen_random_uuid(),
  competitor_id uuid not null references competitors(id) on delete cascade,
  upload_id uuid references uploads(id) on delete set null,
  titulo text not null,
  marca text,
  categoria text,
  subcategoria text,
  vendas_reais numeric not null default 0,
  vendas_unidades numeric not null default 0,
  preco_medio numeric,
  gtin_bruto text,
  gtin_limpo text,
  sku text,
  condicao text,
  fulfillment boolean default false,
  frete_gratis boolean default false,
  mercado_envios boolean default false,
  desconto boolean default false,
  tamanho_detectado text,
  data_referencia date not null
);
create index idx_listings_competitor on competitor_listings(competitor_id, data_referencia desc);
create index idx_listings_gtin on competitor_listings(gtin_limpo);
create index idx_listings_marca on competitor_listings(marca);
create index idx_listings_categoria on competitor_listings(categoria);

-- Consolidação por GTIN (tabela derivada, recalculada pelo Agente de Oportunidades).
create table gtin_groups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  gtin text not null,
  marca text,
  categoria text,
  tamanho_detectado text,
  titulo_representativo text,
  n_concorrentes int not null default 0,
  n_anuncios int not null default 0,
  receita_total numeric not null default 0,
  unidades_total numeric not null default 0,
  preco_medio_ponderado numeric,
  data_referencia date not null,
  atualizado_em timestamptz not null default now()
);
create unique index idx_gtin_groups_uk on gtin_groups(organization_id, gtin, data_referencia);
create index idx_gtin_groups_marca on gtin_groups(organization_id, marca);

-- Nubmetrics (série mensal por marca).
create table brand_reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  marca text not null,
  categoria text,
  mes_referencia date not null,
  receita numeric,
  unidades numeric,
  ticket_medio numeric,
  tendencia_pct numeric,
  n_vendedores numeric,
  posicionamento text,
  ja_no_mix boolean default false,
  score_priorizacao numeric,
  onda_entrada int,
  upload_id uuid references uploads(id) on delete set null
);
create unique index idx_brand_reports_uk on brand_reports(organization_id, marca, mes_referencia);

-- ------------------------- monitoramento e coleta -------------------------
create table monitored_products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  gtin text,
  titulo_referencia text,
  marca text,
  categoria text,
  prioridade int not null default 1,
  criado_por uuid references users(id),
  criado_em timestamptz not null default now()
);
create index idx_monitored_org on monitored_products(organization_id);

create table collect_runs (
  id uuid primary key default gen_random_uuid(),
  marketplace text not null,
  iniciado_em timestamptz not null default now(),
  finalizado_em timestamptz,
  itens_coletados int default 0,
  erros int default 0
);

create table price_snapshots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  gtin text not null,
  marketplace text not null check (marketplace in ('mercado_livre','amazon','shopee','mercado_shops')),
  vendedor text,
  preco numeric,
  disponivel boolean,
  coletado_em timestamptz not null default now(),
  fonte text not null default 'api' check (fonte in ('api','scrape')),
  collect_run_id uuid references collect_runs(id) on delete set null
);
create index idx_price_gtin_data on price_snapshots(gtin, coletado_em desc);

-- ------------------------- séries históricas (6.21) -------------------------
create table metricas_historicas (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  loja_id uuid references lojas(id) on delete set null,
  metrica text not null,          -- ex.: 'receita'
  dimensao text not null,         -- ex.: 'marca'
  chave_dimensao text not null,   -- ex.: 'RABANNE'
  valor numeric not null,
  data_referencia date not null,
  fonte text,
  criado_em timestamptz not null default now()
);
create index idx_metricas_uk on metricas_historicas(organization_id, metrica, dimensao, chave_dimensao, data_referencia);

-- ------------------------- alertas -------------------------
create table alert_types (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  nome text not null,
  descricao text,
  modulo_origem text,
  severidade text default 'media' check (severidade in ('baixa','media','alta')),
  ativo boolean not null default true
);
create index idx_alert_types_org on alert_types(organization_id);

create table alert_rules (
  id uuid primary key default gen_random_uuid(),
  alert_type_id uuid not null references alert_types(id) on delete cascade,
  destinatario_user_id uuid references users(id) on delete cascade,
  canal text not null default 'sistema' check (canal in ('sistema','whatsapp','email')),
  horario_silencio text,
  ativo boolean not null default true
);

create table alerts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  alert_type_id uuid references alert_types(id) on delete set null,
  loja_id uuid references lojas(id) on delete set null,
  titulo text not null,
  descricao text,
  referencia text,
  severidade text default 'media' check (severidade in ('baixa','media','alta')),
  status text not null default 'novo' check (status in ('novo','visto','resolvido')),
  criado_em timestamptz not null default now(),
  visto_em timestamptz,
  resolvido_em timestamptz,
  resolvido_por uuid references users(id)
);
create index idx_alerts_org_status on alerts(organization_id, status, criado_em desc);

-- =====================================================================
-- RLS: tudo com organization_id é lido por membros da org; escrita geral por
-- membros da org (colaborador faz upload); tabelas de config ficam pra 0004.
-- =====================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'own_products','uploads','own_stock_snapshots','own_sales_records',
    'competitors','competitor_listings','gtin_groups','brand_reports',
    'monitored_products','price_snapshots','metricas_historicas',
    'alert_types','alert_rules','alerts'
  ] loop
    execute format('alter table %I enable row level security;', t);
  end loop;
end $$;

-- Tabelas org-scoped diretas (têm organization_id): leitura + escrita por membro da org.
do $$
declare t text;
begin
  foreach t in array array[
    'own_products','uploads','competitors','gtin_groups','brand_reports',
    'monitored_products','price_snapshots','metricas_historicas',
    'alert_types','alerts'
  ] loop
    execute format($p$create policy %1$s_rw on %1$I for all
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());$p$, t);
  end loop;
end $$;

-- Tabelas filhas (sem organization_id direto): amarradas pelo pai.
create policy stock_rw on own_stock_snapshots for all
  using (own_product_id in (select id from own_products where organization_id = current_org_id()))
  with check (own_product_id in (select id from own_products where organization_id = current_org_id()));
create policy sales_rw on own_sales_records for all
  using (loja_id in (select id from lojas where organization_id = current_org_id()))
  with check (loja_id in (select id from lojas where organization_id = current_org_id()));
create policy listings_rw on competitor_listings for all
  using (competitor_id in (select id from competitors where organization_id = current_org_id()))
  with check (competitor_id in (select id from competitors where organization_id = current_org_id()));
create policy alert_rules_rw on alert_rules for all
  using (alert_type_id in (select id from alert_types where organization_id = current_org_id()))
  with check (alert_type_id in (select id from alert_types where organization_id = current_org_id()));
