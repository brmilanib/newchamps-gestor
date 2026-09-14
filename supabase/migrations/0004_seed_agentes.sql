-- =====================================================================
-- Newchamps Gestor — 0004 seed do catálogo de ferramentas e dos agentes
-- Popula o Painel de Agentes com nome, função e especialidade de cada um.
-- Tudo editável pela tela depois. Agentes de IA nascem em modo simulação e desligados.
-- =====================================================================

insert into agent_tools (slug, nome, descricao, categoria, requer_aprovacao) values
  -- leitura (sem aprovação)
  ('consultar_meus_produtos','Consultar meus produtos','Catálogo com preço, custo e estoque atual','leitura',false),
  ('consultar_estoque','Consultar estoque','Estoque atual, dias de cobertura, velocidade de venda','leitura',false),
  ('consultar_vendas','Consultar vendas','Vendas por período com receita, unidades e margem','leitura',false),
  ('consultar_precos_concorrentes','Consultar preços de concorrentes','O que cada concorrente cobra, do último upload','leitura',false),
  ('consultar_historico_preco','Consultar histórico de preço','Série de preço no tempo — meu e dos concorrentes','leitura',false),
  ('consultar_marcas_oportunidade','Consultar marcas-oportunidade','Marcas que passam no critério de entrada','leitura',false),
  ('consultar_nubmetrics','Consultar Nubmetrics','Dados de mercado da Nubmetrics, mês a mês','leitura',false),
  ('consultar_contexto_empresa','Consultar contexto da empresa','Regras, critérios, mix e tom de voz','leitura',false),
  ('consultar_aprendizados','Consultar aprendizados','O que já foi aprendido e aprovado','leitura',false),
  ('consultar_campanhas','Consultar campanhas','Histórico de campanhas e resultado','leitura',false),
  ('consultar_alertas','Consultar alertas','Alertas abertos e resolvidos','leitura',false),
  ('consultar_desempenho_agentes','Consultar desempenho dos agentes','Execuções, falhas, custo, sugestões feitas × aceitas','leitura',false),
  ('consultar_evolucao','Consultar evolução','Série histórica de qualquer métrica','leitura',false),
  -- externa (sem aprovação, com limite de uso)
  ('buscar_preco_marketplace','Buscar preço no marketplace','Preço atual na API oficial do marketplace','externa',false),
  ('buscar_anuncio_ml','Buscar anúncio no ML','Detalhe de um anúncio do Mercado Livre','externa',false),
  ('buscar_concorrentes_do_produto','Buscar concorrentes do produto','Quem mais vende o mesmo GTIN e a que preço','externa',false),
  ('sincronizar_loja','Sincronizar loja','Puxa pedidos/estoque/anúncios da conta conectada','externa',false),
  -- escrita interna (rastreada, sem aprovação)
  ('criar_alerta','Criar alerta','Gera alerta pra pessoa certa no canal configurado','escrita_interna',false),
  ('criar_tarefa_para_agente','Criar tarefa para agente','Passa trabalho pra outro agente','escrita_interna',false),
  ('enviar_mensagem_para_agente','Enviar mensagem para agente','Recado com contexto, aparece no feed','escrita_interna',false),
  ('registrar_aprendizado','Registrar aprendizado','Propõe um aprendizado — aguarda aprovação','escrita_interna',false),
  ('salvar_rascunho_copy','Salvar rascunho de copy','Guarda copy/legenda/e-mail como rascunho','escrita_interna',false),
  ('salvar_rascunho_campanha','Salvar rascunho de campanha','Monta campanha sem disparar','escrita_interna',false),
  ('atualizar_tabela_derivada','Atualizar tabela derivada','Recalcula GTIN, oportunidades, curva ABC','escrita_interna',false),
  ('registrar_metrica','Registrar métrica','Grava um número pro histórico','escrita_interna',false),
  ('gerar_revisao_semanal','Gerar revisão semanal','Monta e salva o documento da revisão','escrita_interna',false),
  -- ação real (SEMPRE com aprovação)
  ('enviar_whatsapp','Enviar WhatsApp','Manda mensagem de verdade','acao_real',true),
  ('disparar_campanha','Disparar campanha','Dispara pro grupo/lista','acao_real',true),
  ('enviar_email_massa','Enviar e-mail em massa','E-mail marketing','acao_real',true),
  ('publicar_post_instagram','Publicar post no Instagram','Publica de verdade','acao_real',true),
  ('alterar_orcamento_ads','Alterar orçamento de ads','Mexe em dinheiro de anúncio','acao_real',true),
  ('atualizar_preco_anuncio','Atualizar preço do anúncio','Muda meu preço no marketplace','acao_real',true),
  ('atualizar_contexto_empresa','Atualizar contexto da empresa','Muda uma regra da empresa','acao_real',true);

insert into agentes (slug, nome, modulo, funcao, especialidade, tipo, gatilho_tipo, gatilho_config, nivel_autonomia, modo_simulacao, ativo) values
  ('supervisor','Supervisor','global','Briefing do dia, prioriza, delega e atende o chat','Enxergar o todo e dizer o que importa agora','llm','cron','07:00,12:00,18:00,22:00','executar_livre',true,false),
  ('ingestao','Ingestão','uploads','Valida, importa, classifica categoria, limpa GTIN e registra erros','Transformar planilha bruta em dado confiável','deterministico','evento','upload.recebido','executar_livre',false,true),
  ('oportunidades','Oportunidades','concorrencia','Recalcula consolidação por GTIN e marcas-oportunidade','Achar onde vale a pena entrar','deterministico','evento','ingestao.concluida,sync.concluida','executar_livre',false,true),
  ('sincronizacao','Sincronização','conexoes','Puxa pedidos/estoque/anúncios das contas conectadas e renova tokens','Manter os dados das contas sempre atualizados','deterministico','cron','4x/dia','executar_livre',false,false),
  ('vigilancia-conta','Vigilância de Conta','conexoes','Cuida da saúde das contas: reclamação, reputação, cobrança fora do padrão','Antecipar risco de suspensão de conta','llm','cron','diario','executar_livre',true,false),
  ('priorizacao','Priorização','priorizacao','Score ponderado das marcas e ondas de entrada; comenta o porquê','Decidir em que marca entrar primeiro','llm','evento','nubmetrics.importado','executar_livre',true,false),
  ('coleta','Coleta','concorrencia','Preço atual via API do Mercado Livre (depois Amazon/Shopee)','Montar série histórica de preço','deterministico','cron','06:00 + 4h monitorados','executar_livre',false,false),
  ('vigia-de-preco','Vigia de Preço','concorrencia','Julga o que é movimento de preço relevante vs. ruído','Separar o que merece sua atenção do que é ruído','llm','evento','coleta.concluida','executar_livre',true,false),
  ('estoque-compras','Estoque & Compras','estoque','Sugestão de compra, ruptura e geração do import__4_','Não deixar faltar nem sobrar estoque','deterministico','cron','05:30 diario','executar_livre',false,false),
  ('atendimento','Atendimento','atendimento','Dispara campanha agendada; sugere texto e faz triagem','Falar com o cliente na hora e no tom certos','llm','cron','15min + agendamento','executar_com_aprovacao',true,false),
  ('conteudo','Conteúdo','conteudo','Copy, legenda e e-mail no tom de voz de cada loja','Escrever como cada marca fala','llm','manual','sob demanda + semanal','executar_livre',true,false),
  ('ads','Ads','conteudo','Acompanha campanhas e aponta desvio de custo/alcance','Proteger o dinheiro de anúncio','llm','cron','diario','executar_com_aprovacao',true,false),
  ('alertas','Alertas','alertas','Consolida sinais, escolhe pessoa e canal, agrupa (anti-fadiga)','Fazer o alerta certo chegar sem virar ruído','deterministico','manual','continuo (fila)','executar_livre',false,false);
