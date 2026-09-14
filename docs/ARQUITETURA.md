# Arquitetura — Newchamps Gestor

## As três camadas (desenho híbrido)

| Camada | Onde roda | Por quê |
|---|---|---|
| Aplicação web (todas as telas) | Vercel | Deploy automático, SSL, escala sem manutenção |
| Banco + Auth + Storage + cofre | Supabase (Postgres) | Backup, RLS, realtime, sem cuidar de banco na mão |
| Runtime dos agentes (worker, scheduler, collector) | Servidor próprio, em Docker | Processo ligado 24h, sem limite de tempo, cron real |

**Regra de ouro:** o app web e o worker **conversam pelo banco**, nunca por HTTP
direto. O app escreve uma tarefa na fila (`agent_tasks`); o worker busca e processa.
Assim o servidor não precisa expor porta nenhuma pra internet, e se ele cair o site
continua no ar — a automação só pausa e retoma a fila quando ele voltar.

## Decisões (com o porquê)

- **TypeScript `strict`** em todo o projeto — erro pego em tempo de compilação, não em produção.
- **Regra de negócio no domínio puro** (`src/lib/domain`), sem IA e sem banco: testável
  e de custo zero. IA só entra onde a decisão é qualitativa (ver `docs/AGENTES.md`).
- **Parser tolerante a linha ruim** (`src/lib/parsers`): uma linha inválida é rejeitada
  com motivo, mas não derruba o import. Layout inesperado falha com mensagem clara —
  nunca importa errado em silêncio.
- **Nada é sobrescrito:** todo upload/coleta vira um ponto no tempo com data de referência.
  É isso que permite os gráficos de evolução (seção 6.21 do documento).
- **Meu dado separado do dado de concorrente**, no banco e na interface.
- **Fila:** `pg-boss` sobre o próprio Postgres (evita subir um Redis só pra isso).
- **Segredos:** variáveis de ambiente pro que é fixo; Supabase Vault pras credenciais
  cadastradas pela tela. A `service_role_key` fica só no servidor/worker.

## Pastas do domínio (já implementadas)

```
src/lib/domain/     regras puras e testáveis
  text.ts           conversão de número BR e do formato compacto da Nubmetrics
  gtin.ts           validação/limpeza de GTIN (inclusive notação científica)
  categoria.ts      classificação por título + fallback de marca; tamanho; subcategoria
  criterios.ts      critérios de negócio padrão (editáveis em Configurações)
  oportunidade.ts   regra de marca-oportunidade
  compra.ts         sugestão de compra (cobertura, lead time, 3 listas)
  priorizacao.ts    score ponderado das marcas (Nubmetrics)
  agregacao.ts      receita/categoria/marca e consolidação por GTIN
src/lib/parsers/    leitura de arquivos → domínio
  concorrente.ts    catálogo de concorrente (ML)
  nubmetrics.ts     top-100 marcas
  xlsx-io.ts        leitura de xlsx/csv em memória (SheetJS)
```

Os testes em `tests/golden.test.ts` provam que esse domínio reproduz **exatamente**
os números da planilha `Analise_Comparativa_3_Concorrentes.xlsx`.
