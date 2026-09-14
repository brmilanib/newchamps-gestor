# Newchamps Gestor

Sistema de inteligência de mercado, BI e operação do Grupo Newchamps, com uma
camada de agentes de IA que trabalham sozinhos todo dia. Construído por fases
(veja [`docs/STATUS.md`](docs/STATUS.md) pro que já está pronto).

## Stack

- **Web:** Next.js 16 (App Router) + React 19 + TypeScript (`strict`) + Tailwind 4
- **Banco/Auth:** Supabase (Postgres) com RLS por `organization_id`
- **Planilhas:** SheetJS (xlsx)
- **Testes:** Vitest
- **Agentes (Fase 3):** worker Node em Docker no servidor, conversando pelo banco

## Rodar local

```bash
npm install
cp .env.example .env.local   # e preencha as chaves do Supabase
npm run dev                  # http://localhost:3000
```

## Comandos

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run test       # roda os testes (inclui o "golden" contra as planilhas reais)
npm run typecheck  # checagem de tipos (tsc --noEmit)
npm run lint       # ESLint
```

## Banco de dados

As migrations ficam em [`supabase/migrations/`](supabase/migrations/), versionadas
no repositório. **Nunca** alterar tabela direto pelo painel do Supabase — toda
mudança nasce como migration comitada.

## Documentação

- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) — as decisões técnicas
- [`docs/AGENTES.md`](docs/AGENTES.md) — a camada de agentes em linguagem simples
- [`docs/STATUS.md`](docs/STATUS.md) — o que está pronto, o que falta, o que depende de você
