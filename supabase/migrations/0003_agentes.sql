-- =====================================================================
-- Newchamps Gestor — 0003 camada de agentes (o coração do sistema)
-- Agentes gerenciáveis pela tela: nome, função, especialidade, provedor de IA,
-- ferramentas (allowlist), gatilho, autonomia e limites. Multi-provedor.
-- =====================================================================

-- Provedores de IA (Anthropic, OpenAI e outros) — a chave fica no cofre (segredo_ref).
create table ai_providers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  nome text not null,
  tipo text not null check (tipo in ('anthropic','openai','google','outro')),
  segredo_ref text,                 -- referência ao Supabase Vault; NUNCA a chave em texto puro
  modelo_padrao text,
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);
create index idx_ai_providers_org on ai_providers(organization_id);

-- Catálogo de ferramentas (skills). Cada uma com schema de entrada e flag de aprovação.
create table agent_tools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nome text not null,
  descricao text,
  categoria text check (categoria in ('leitura','externa','escrita_interna','acao_real')),
  schema_entrada_json jsonb,
  requer_aprovacao boolean not null default false,
  ativo boolean not null default true
);

-- Os agentes. `especialidade` é a descrição do que ele faz de melhor (pedido do Bruno).
create table agentes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  slug text not null,
  nome text not null,
  modulo text,
  funcao text,                      -- o que ele faz, em uma linha
  especialidade text,               -- no que ele é especialista
  tipo text not null check (tipo in ('deterministico','llm')),
  ai_provider_id uuid references ai_providers(id) on delete set null,
  modelo text,
  system_prompt text,
  gatilho_tipo text not null default 'manual' check (gatilho_tipo in ('cron','evento','manual')),
  gatilho_config text,
  nivel_autonomia text not null default 'sugerir' check (nivel_autonomia in ('sugerir','executar_com_aprovacao','executar_livre')),
  limite_execucoes_dia int,
  limite_custo_mes_brl numeric,
  timeout_segundos int default 120,
  modo_simulacao boolean not null default true,
  ativo boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create unique index idx_agentes_slug on agentes(slug);
create trigger trg_agentes_atualizado before update on agentes for each row execute function set_atualizado_em();

-- Histórico de versões do prompt (pra poder voltar atrás).
create table agente_prompt_versoes (
  id uuid primary key default gen_random_uuid(),
  agente_id uuid not null references agentes(id) on delete cascade,
  system_prompt text not null,
  criado_em timestamptz not null default now(),
  criado_por uuid references users(id)
);

-- Allowlist: quais ferramentas cada agente pode usar.
create table agente_ferramentas (
  agente_id uuid not null references agentes(id) on delete cascade,
  agent_tool_id uuid not null references agent_tools(id) on delete cascade,
  primary key (agente_id, agent_tool_id)
);

-- Barramento: eventos (mural de avisos).
create table eventos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  payload_json jsonb,
  origem text,
  criado_em timestamptz not null default now(),
  processado_em timestamptz
);
create index idx_eventos_tipo on eventos(tipo, criado_em desc);

-- Fila de tarefas (caixa de entrada de cada agente) — com retry/backoff/dead-letter.
create table agent_tasks (
  id uuid primary key default gen_random_uuid(),
  agente_id uuid references agentes(id) on delete cascade,
  tipo text not null,
  payload_json jsonb,
  chave_idempotencia text,
  status text not null default 'pendente' check (status in ('pendente','em_execucao','concluida','erro','dead_letter')),
  tentativas int not null default 0,
  proxima_tentativa_em timestamptz,
  origem_agente_id uuid references agentes(id) on delete set null,
  criado_em timestamptz not null default now(),
  executado_em timestamptz,
  erro text
);
create index idx_tasks_fila on agent_tasks(status, proxima_tentativa_em);
create unique index idx_tasks_idem on agent_tasks(chave_idempotencia) where chave_idempotencia is not null;

-- Mensagens de agente pra agente (recado com contexto, aparece no feed).
create table agent_messages (
  id uuid primary key default gen_random_uuid(),
  de_agente_id uuid references agentes(id) on delete set null,
  para_agente_id uuid references agentes(id) on delete set null,
  assunto text,
  corpo text,
  payload_json jsonb,
  lido boolean not null default false,
  criado_em timestamptz not null default now()
);
create index idx_messages_feed on agent_messages(criado_em desc);

-- Observabilidade e custo de cada execução.
create table agent_runs (
  id uuid primary key default gen_random_uuid(),
  agente_id uuid references agentes(id) on delete cascade,
  iniciado_em timestamptz not null default now(),
  finalizado_em timestamptz,
  status text not null default 'ok' check (status in ('ok','erro','timeout')),
  itens_processados int default 0,
  tokens_entrada int default 0,
  tokens_saida int default 0,
  custo_estimado numeric default 0,
  erro text
);
create index idx_runs_agente on agent_runs(agente_id, iniciado_em desc);

-- Fila de aprovações (ação que exige meu OK antes de acontecer).
create table aprovacoes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  agente_id uuid references agentes(id) on delete set null,
  agent_tool_id uuid references agent_tools(id) on delete set null,
  descricao text,
  payload_json jsonb,
  justificativa_agente text,
  status text not null default 'pendente' check (status in ('pendente','aprovada','rejeitada')),
  solicitado_em timestamptz not null default now(),
  decidido_em timestamptz,
  decidido_por uuid references users(id)
);
create index idx_aprovacoes_pend on aprovacoes(organization_id, status, solicitado_em desc);

-- Contexto da empresa (o que todo agente lê antes de agir).
create table empresa_contexto (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  loja_id uuid references lojas(id) on delete cascade,
  chave text not null,
  valor text not null,
  atualizado_em timestamptz not null default now(),
  atualizado_por uuid references users(id)
);
create index idx_contexto_org on empresa_contexto(organization_id, chave);

-- Aprendizados propostos pelos agentes (eu aprovo ou descarto).
create table agent_learnings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  agente_id uuid references agentes(id) on delete set null,
  tipo text check (tipo in ('observacao','hipotese','resultado')),
  texto text not null,
  evidencia_ref text,
  status text not null default 'novo' check (status in ('novo','aprovado','descartado')),
  criado_em timestamptz not null default now(),
  revisado_por uuid references users(id),
  revisado_em timestamptz
);
create index idx_learnings_status on agent_learnings(organization_id, status);

-- Chat com o Supervisor.
create table conversas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  titulo text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
create table conversa_mensagens (
  id uuid primary key default gen_random_uuid(),
  conversa_id uuid not null references conversas(id) on delete cascade,
  papel text not null check (papel in ('usuario','supervisor')),
  texto text not null,
  ferramentas_usadas_json jsonb,
  tokens int,
  custo_estimado numeric,
  criado_em timestamptz not null default now()
);
create index idx_conversa_msgs on conversa_mensagens(conversa_id, criado_em);

-- Tokens de serviço da API do chat.
create table api_tokens (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  nome text not null,
  token_hash text not null,
  escopos text[] not null default '{}',
  limite_dia int,
  ultimo_uso_em timestamptz,
  revogado_em timestamptz,
  criado_por uuid references users(id),
  criado_em timestamptz not null default now()
);

-- Revisão semanal e prestação de contas por agente.
create table agente_relatorios (
  id uuid primary key default gen_random_uuid(),
  agente_id uuid references agentes(id) on delete cascade,
  periodo_inicio date not null,
  periodo_fim date not null,
  execucoes int default 0,
  falhas int default 0,
  itens_processados int default 0,
  sugestoes_feitas int default 0,
  sugestoes_aceitas int default 0,
  sugestoes_recusadas int default 0,
  aprendizados_propostos int default 0,
  aprendizados_aprovados int default 0,
  custo_periodo numeric default 0,
  resumo_json jsonb
);
create table revisoes_semanais (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete cascade,
  periodo_inicio date not null,
  periodo_fim date not null,
  documento_md text,
  resumo text,
  recomendacoes_json jsonb,
  custo_total_ia numeric,
  criado_em timestamptz not null default now(),
  lido_em timestamptz
);

-- =====================================================================
-- RLS da camada de agentes.
-- Config/leitura por membros da org; escrita das tabelas de runtime é do worker
-- (service role, que ignora RLS). Config sensível (agentes, providers) só admin.
-- =====================================================================
alter table ai_providers enable row level security;
alter table agent_tools enable row level security;
alter table agentes enable row level security;
alter table agente_prompt_versoes enable row level security;
alter table agente_ferramentas enable row level security;
alter table eventos enable row level security;
alter table agent_tasks enable row level security;
alter table agent_messages enable row level security;
alter table agent_runs enable row level security;
alter table aprovacoes enable row level security;
alter table empresa_contexto enable row level security;
alter table agent_learnings enable row level security;
alter table conversas enable row level security;
alter table conversa_mensagens enable row level security;
alter table api_tokens enable row level security;
alter table agente_relatorios enable row level security;
alter table revisoes_semanais enable row level security;

-- Config gerenciável só por admin.
create policy ai_providers_admin on ai_providers for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());
create policy agent_tools_read on agent_tools for select using (auth.uid() is not null);
create policy agent_tools_admin on agent_tools for all using (is_admin()) with check (is_admin());
create policy agentes_read on agentes for select using (auth.uid() is not null);
create policy agentes_admin on agentes for all using (is_admin()) with check (is_admin());
create policy prompt_versoes_read on agente_prompt_versoes for select using (auth.uid() is not null);
create policy prompt_versoes_admin on agente_prompt_versoes for all using (is_admin()) with check (is_admin());
create policy agente_ferr_read on agente_ferramentas for select using (auth.uid() is not null);
create policy agente_ferr_admin on agente_ferramentas for all using (is_admin()) with check (is_admin());

-- Runtime: leitura por qualquer membro logado (feed/observabilidade). Escrita = worker.
create policy eventos_read on eventos for select using (auth.uid() is not null);
create policy tasks_read on agent_tasks for select using (auth.uid() is not null);
create policy messages_read on agent_messages for select using (auth.uid() is not null);
create policy runs_read on agent_runs for select using (auth.uid() is not null);

-- Aprovações e aprendizados: membros leem; admin decide.
create policy aprovacoes_read on aprovacoes for select using (organization_id = current_org_id());
create policy aprovacoes_admin on aprovacoes for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());
create policy learnings_read on agent_learnings for select using (organization_id = current_org_id());
create policy learnings_admin on agent_learnings for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());

-- Contexto da empresa: membros leem; admin edita (agente nunca edita sozinho).
create policy contexto_read on empresa_contexto for select using (organization_id = current_org_id());
create policy contexto_admin on empresa_contexto for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());

-- Chat: cada pessoa vê as próprias conversas.
create policy conversas_own on conversas for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy conversa_msgs_own on conversa_mensagens for all
  using (conversa_id in (select id from conversas where user_id = auth.uid()))
  with check (conversa_id in (select id from conversas where user_id = auth.uid()));

-- Tokens de API e revisões: admin.
create policy api_tokens_admin on api_tokens for all using (is_admin() and organization_id = current_org_id()) with check (organization_id = current_org_id());
create policy relatorios_read on agente_relatorios for select using (auth.uid() is not null);
create policy revisoes_read on revisoes_semanais for select using (organization_id = current_org_id());
