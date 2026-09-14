-- =====================================================================
-- Newchamps Gestor — 0001 base
-- Organização, usuários, lojas e utilidades. Nomes em português, snake_case.
-- RLS habilitada em toda tabela com organization_id (seção 8.3/8.4 do documento).
-- =====================================================================

create extension if not exists "pgcrypto";

-- Atualiza automaticamente a coluna atualizado_em.
create or replace function set_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end $$;

-- ---------------------------------------------------------------------
create table organizations (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  criado_em timestamptz not null default now()
);

create table users (
  id uuid primary key,                      -- = auth.users.id (Supabase Auth)
  organization_id uuid not null references organizations(id) on delete cascade,
  email text not null unique,
  nome text not null,
  papel text not null default 'colaborador' check (papel in ('admin','colaborador')),
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);
create index idx_users_org on users(organization_id);

create table lojas (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  nome text not null,
  canais text[] not null default '{}',
  ativa boolean not null default true,
  criado_em timestamptz not null default now()
);
create index idx_lojas_org on lojas(organization_id);

-- Quais lojas cada pessoa acompanha.
create table user_lojas (
  user_id uuid not null references users(id) on delete cascade,
  loja_id uuid not null references lojas(id) on delete cascade,
  primary key (user_id, loja_id)
);

-- ---------------------------------------------------------------------
-- Descobre a organização do usuário logado (usada nas policies de RLS).
create or replace function current_org_id()
returns uuid language sql stable security definer set search_path = public as $$
  select organization_id from users where id = auth.uid()
$$;

create or replace function is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from users where id = auth.uid() and papel = 'admin' and ativo)
$$;

-- RLS
alter table organizations enable row level security;
alter table users enable row level security;
alter table lojas enable row level security;
alter table user_lojas enable row level security;

create policy org_leitura on organizations for select using (id = current_org_id());
create policy users_leitura on users for select using (organization_id = current_org_id());
create policy users_admin_escreve on users for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());
create policy lojas_leitura on lojas for select using (organization_id = current_org_id());
create policy lojas_admin_escreve on lojas for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());
create policy user_lojas_leitura on user_lojas for select using (user_id in (select id from users where organization_id = current_org_id()));
