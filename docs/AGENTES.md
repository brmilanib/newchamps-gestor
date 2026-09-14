# A camada de agentes — em linguagem simples

Um **agente** é um trabalhador digital. Cada um tem **uma função só dele**, um
**gatilho** que o acorda (um horário ou um acontecimento), uma **lista fechada de
ferramentas** que pode usar, o **contexto da sua empresa** que ele lê antes de agir,
e um **nível de autonomia** que você controla.

## Dois tipos (a diferença é de custo, não de filosofia)

- **Determinístico** — decide por regra escrita em código. Conta, filtra, importa,
  calcula, dispara agendado. **Custo praticamente zero** e resultado sempre igual.
  É a maioria dos agentes.
- **Com IA (LLM)** — decide com um modelo de linguagem julgando. Escreve texto, julga
  se algo é relevante, resume, propõe. Custa tokens — por isso o painel mostra o custo
  por agente desde o dia 1, e os de IA nascem em **modo simulação**.

## Você gerencia tudo pela tela

No Painel de Agentes você vai: **conectar vários provedores de IA** (Anthropic, OpenAI
e outros) e escolher qual cada agente usa; editar nome, função, especialidade, prompt,
ferramentas, gatilho, autonomia e limites de cada um; **criar um agente novo sem
código**; ligar/desligar; e ver o custo do mês. Nada disso exige programador.

## Os 13 agentes (já cadastrados no banco)

| Agente | Tipo | Especialidade |
|---|---|---|
| Supervisor | IA | Enxergar o todo e dizer o que importa agora |
| Ingestão | determinístico | Transformar planilha bruta em dado confiável |
| Oportunidades | determinístico | Achar onde vale a pena entrar |
| Sincronização | determinístico | Manter os dados das contas atualizados |
| Vigilância de Conta | IA | Antecipar risco de suspensão de conta |
| Priorização | IA | Decidir em que marca entrar primeiro |
| Coleta | determinístico | Montar série histórica de preço |
| Vigia de Preço | IA | Separar o que merece atenção do que é ruído |
| Estoque & Compras | determinístico | Não deixar faltar nem sobrar estoque |
| Atendimento | IA | Falar com o cliente na hora e no tom certos |
| Conteúdo | IA | Escrever como cada marca fala |
| Ads | IA | Proteger o dinheiro de anúncio |
| Alertas | determinístico | Fazer o alerta certo chegar sem virar ruído |

## As travas que te deixam dormir tranquilo

- **Autonomia por agente e por ferramenta:** tudo que fala com cliente ou gasta
  dinheiro nasce como "executar com aprovação".
- **Fila de aprovação:** ações sensíveis param e esperam seu OK.
- **Modo simulação:** o agente faz tudo e registra o que *faria*, sem executar.
- **Teto de custo e de execuções por agente**, botão de pânico, e nenhum agente apaga dado.
- **O agente nunca reescreve as próprias regras nem o contexto da empresa.** Ele propõe;
  você aprova; aí vira parte do contexto que o próximo agente já usa.

> Nesta fase (1) entram só a **estrutura** (tabelas de fila, eventos, agentes) e os dois
> agentes **determinísticos** de baixo risco: Ingestão e Oportunidades. Os de IA e a
> cadeia completa entram na Fase 3. Ver `docs/STATUS.md`.
