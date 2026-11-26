---
name: fluxo-caixa-projetado
description: Monta fluxo de caixa direto realizado e projetado (curto e médio prazo), diário/semanal/mensal, identificando déficits, excedentes e antecipação de necessidades.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

## Quando usar

Empresas com sazonalidade, prazo médio descompassado, precisando antecipar capital de giro ou planejar investimentos. Atualização semanal ou diária para gestão ativa.

## Inputs necessários

1. Saldo inicial de caixa + bancos + aplicações de liquidez imediata
2. Carteira de recebíveis com vencimento (clientes, cartões a receber, boletos a vencer)
3. Carteira de pagáveis com vencimento (fornecedores, tributos, folha, empréstimos)
4. Histórico de receita por mês (sazonalidade)
5. Compromissos fixos: aluguel, salários, INSS, FGTS, IRPJ
6. Investimentos planejados (CAPEX)
7. Linhas de crédito disponíveis (cheque especial, capital de giro, antecipação)

## Estrutura — método direto

```
SALDO INICIAL DO PERÍODO

(+) ENTRADAS
  Recebimentos de clientes (boletos, PIX, transferências)
  Repasses de cartões (líquido das taxas)
  Adiantamentos / sinais
  Empréstimos captados
  Aporte de sócio
  Outras entradas

(−) SAÍDAS
  Pagamento a fornecedores
  Folha de pagamento (líquida)
  Encargos da folha (INSS, FGTS, IRRF — datas separadas)
  Tributos (DAS, ICMS, PIS/COFINS, IRPJ/CSLL — por vencimento)
  Aluguel
  Utilities (energia, água, internet)
  Marketing
  Pró-labore / dividendos
  Empréstimo (juros + amortização)
  CAPEX (investimentos)
  Outras saídas

= SALDO FINAL DO PERÍODO

(+) Disponibilidades complementares
  Cheque especial não usado: R$ ___
  Antecipação de recebíveis disponível: R$ ___
  Capital de giro contratado: R$ ___
= LIQUIDEZ TOTAL DISPONÍVEL
```

## Periodicidades

### Diário (curto prazo — próximas 4 semanas)
- Granular: cada entrada/saída por dia.
- Útil para empresa com caixa apertado / sazonalidade alta.

### Semanal (próximos 3 meses)
- Agrupa por semana.
- Permite planejar antecipação.

### Mensal (próximos 12 meses)
- Visão estratégica.
- Base do orçamento.

## Premissas e cenários

### Recebimentos
- Histórico de inadimplência (ajustar receita prevista por taxa de não-recebimento)
- Sazonalidade (vendas dezembro >> janeiro)
- Prazos médios

### Pagamentos
- Compromissos contratuais firmes
- Tributos com vencimentos fixos
- Folha tem dia certo

### Cenários
- **Pessimista**: receita −20%, prazo cliente +15 dias
- **Realista**: histórico ajustado
- **Otimista**: receita conforme orçamento

## Templates

### Fluxo semanal (próximas 8 semanas)

```
                   S1   S2   S3   S4   S5   S6   S7   S8
SALDO INICIAL     ___  ___  ___  ___  ___  ___  ___  ___

ENTRADAS
Recebimento clientes ___ ___ ___ ___ ___ ___ ___ ___
Cartões repasse      ___ ___ ___ ___ ___ ___ ___ ___
Outras               ___ ___ ___ ___ ___ ___ ___ ___
Total entradas       ___ ___ ___ ___ ___ ___ ___ ___

SAÍDAS
Folha                  -    -    -    -   ___   -    -    -
Fornecedores         ___ ___ ___ ___ ___ ___ ___ ___
INSS/FGTS/IRRF         -    -    -   ___   -    -    -    -
Tributos federais       -   ___   -    -    -    -   ___   -
Tributos estaduais     -    -   ___   -    -    -   ___   -
Aluguel               ___   -    -    -    -   ___   -    -
Empréstimos          ___ ___ ___ ___ ___ ___ ___ ___
Total saídas         ___ ___ ___ ___ ___ ___ ___ ___

SALDO FINAL          ___ ___ ___ ___ ___ ___ ___ ___
DÉFICIT?             ☐   ☐   ☐   ✓   ☐   ☐   ✓   ☐
LINHA NECESSÁRIA     -    -    -  R$X  -    -  R$Y   -
```

### Decisões a partir do fluxo

- **Excedente de caixa** > 1,5 × despesas mensais: aplicar (CDB liquidez diária, fundo conservador).
- **Déficit projetado**: antecipação de recebíveis (skill 34) ou capital de giro.
- **Fornecedor estratégico** com prazo curto: negociar prazo maior.

## Erros comuns

- Considerar receita pelo regime de competência (NF emitida) — fluxo é caixa.
- Esquecer pagamentos não-mensais (IPTU anual, prêmios, paritários).
- Cartões: lançar receita bruta na semana da venda (errado — só na semana do repasse).
- Não considerar inadimplência de 3-5% típica.
- Pessimismo excessivo levando a contratar crédito desnecessário (juros caros).
- Fluxo sem reconciliação com extrato real — vira só estimativa que ninguém audita.

## Checklist

- [ ] Saldo inicial = saldo bancário real + caixa físico + aplicações líquidas
- [ ] Recebíveis com vencimento (não com competência)
- [ ] Pagáveis com vencimento (não com competência)
- [ ] Tributos pelo calendário (não pelo dia 30)
- [ ] Folha + encargos
- [ ] CAPEX previsto
- [ ] 3 cenários (otimista, realista, pessimista)
- [ ] Linhas de crédito mapeadas (se necessário)
- [ ] Atualização periódica (semanal mínimo)
- [ ] Reconciliação semanal com extrato real

## Referências

- CPC 03 (DFC — apresentação)
- CPC 26
- ITG 2000
- Boa prática (Brealey/Myers, Damodaran — finanças corporativas)
