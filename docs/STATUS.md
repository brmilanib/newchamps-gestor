# STATUS

_Atualizado em 2026-09-13 · Fase 1 em andamento (parte 1 de N)._

## ✅ Pronto nesta entrega (fundação + núcleo de dados)

- Projeto Next.js 16 + React 19 + TypeScript `strict` + Tailwind 4, nomeado `newchamps-gestor`.
- **Camada de domínio testada** (`src/lib/domain`): conversão de número BR e do formato
  compacto da Nubmetrics; validação/limpeza de GTIN; classificação de categoria +
  fallback de marca + tamanho + subcategoria (árabe/designer/nicho); regra de
  oportunidade; sugestão de compra (3 listas); score de priorização; agregações e
  consolidação por GTIN.
- **Parsers** (`src/lib/parsers`): concorrente (ML) e Nubmetrics, com relatório de linha
  rejeitada e erro claro em layout inesperado.
- **Testes (Vitest): 25 passando**, incluindo o teste _golden_ que trava os números da
  planilha real: receita por concorrente (8.228.730 / 3.808.650 / 9.294.080 = 21.331.460),
  3.988 anúncios, Perfumaria/Colonia 3.058 anúncios / R$ 15.170.130, GTIN 2.142 únicos /
  351 sem GTIN válido / 310 em mais de um concorrente, e o caso Nina Ricci (BAGATELLE
  ~R$412 × AUMA ~R$599).
- **Schema completo do banco** em migrations versionadas (`supabase/migrations/`): base
  (org/usuários/lojas), domínio (catálogo próprio, concorrência, uploads, monitoramento/
  coleta, séries históricas, alertas) e a **camada de agentes inteira** (providers
  multi-IA, agentes com especialidade, ferramentas, eventos, fila, aprovações, contexto,
  aprendizados, chat, revisões). RLS habilitada em toda tabela com `organization_id`.
- **Seed** dos 13 agentes (nome, função, especialidade, tipo, gatilho, autonomia) e do
  catálogo de ferramentas — o Painel de Agentes já nasce povoado e gerenciável.
- Docs: `README`, `ARQUITETURA`, `AGENTES`, este `STATUS`, e `.env.example`.

## 🔜 Próximo na Fase 1 (próximas sessões)

- Rotas de upload (concorrente, Nubmetrics, estoque/vendas) gravando no banco + tela de
  auditoria (linhas processadas/rejeitadas, exportável).
- As 6 telas de Concorrência (Resumo, Oportunidades, Comparativo, Por Categoria, GTIN,
  Dados Brutos) com filtro/busca, lendo do banco.
- Módulo Estoque & Gestor Seller: upload, Top 10/ruptura, e geração do `import__4_.xlsx`.
- Autenticação (Supabase Auth) + cadastro de funcionários + seletor de loja no topo.
- Estrutura de fila/eventos rodando com os agentes determinísticos Ingestão e Oportunidades.
- CI (GitHub Actions: lint + typecheck + test + build) e deploy no Vercel.

## ⏳ Depende de você

- **GitHub:** criar o repositório privado `newchamps-gestor` e me passar o link (aqui não
  tem `gh` e o conector caiu). Por ora o versionamento é **git local** — nada se perde.
- **Supabase e Vercel:** criar os projetos novos (posso criar por MCP com sua confirmação,
  já que criar projeto pode ter custo) quando a fundação estiver pronta pra subir.
- **Fotos dos produtos:** de onde vêm hoje (URL na planilha / pasta / API do ML)?
- **Funcionários:** começar só com você ou já cadastrar 1-2 pessoas?

## 📌 Decisões registradas

- Produção na máquina do escritório; desenvolvimento agora nesta máquina (Apple M4, 16 GB).
- Projeto criado em `/Users/brunomilani/newchamps-gestor` (sem espaço no caminho — espaço
  quebra o build do Next.js).
- Especificação oficial: `PROMPT_Newchamps_Gestor.md` (revisado) + `ANEXO_A_Camada_de_Agentes.md`.
- Novo pedido acatado: **Mural (Modo TV)** para o escritório (1ª versão na Fase 2).
- Migrations escritas mas **ainda não aplicadas** a um banco real (falta criar o Supabase).
