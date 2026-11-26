---
name: apuracao-lucro-real
description: Apura IRPJ e CSLL no Lucro Real (trimestral ou anual com estimativa), partindo do LAIR contábil, fazendo as adições e exclusões da Parte A do LALUR e controlando prejuízo fiscal e base negativa.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

PJ obrigada ao Lucro Real (faturamento > R$ 78mi, instituições financeiras, factoring, atividade rural com benefício, empresa com lucros do exterior) ou que optou pelo regime. Use trimestral OU anual com recolhimentos mensais por estimativa + ajuste anual.

## Inputs necessários

1. Balancete de suspensão/redução ou balanço do trimestre/ano
2. Receita bruta + custos + despesas operacionais e não operacionais
3. Lista de despesas potencialmente indedutíveis (multas, brindes, doações sem incentivo, alimentação dos sócios)
4. Receitas isentas/não tributadas (dividendos, equivalência patrimonial, ganhos isentos)
5. Saldo de prejuízo fiscal (Parte B do LALUR) e base negativa de CSLL acumulados
6. IRRF e antecipações já recolhidas
7. Forma de apuração: **Trimestral** (definitivo) ou **Anual** (estimativa mensal + ajuste em 31/12)

## Passo a passo

### 1. Partir do LAIR contábil
- LAIR = Resultado antes do IR e CSLL (linha do DRE).

### 2. Adições (Parte A do LALUR)
Despesas/perdas contábeis que **não são dedutíveis** fiscalmente:
- Multas punitivas (de natureza penal — não compensatórias)
- Provisões não autorizadas (exceto férias, 13º, perdas em recebimento de créditos — art. 9-14 Lei 9.430)
- Perdas com equivalência patrimonial
- Doações sem enquadramento em incentivo
- Brindes
- Tributos discutidos em juízo sem depósito (RFB 1.700, art. 76)
- Despesas com alimentação de sócios e administradores
- Resultado negativo em SCP (segregar)
- Ajustes de preço de transferência (Lei 14.596/2023)

### 3. Exclusões (Parte A do LALUR)
Receitas tributadas contabilmente que **não compõem** o lucro real:
- Reversão de provisões antes adicionadas
- Lucros de equivalência patrimonial em controladas no Brasil (já tributados)
- Dividendos recebidos (isentos — Lei 9.249, art. 10)
- Receitas de variação cambial diferida (regime de caixa, opção)
- Ganhos com subvenção para investimento (Lei 14.789/2023, atenção: novo crédito fiscal de 25%)

### 4. Compensar prejuízo fiscal
- Limite: **30% do lucro líquido ajustado** após adições/exclusões (Lei 8.981, art. 42).
- Controlar saldo na Parte B do LALUR. Cada compensação reduz o saldo.
- CSLL: idem 30% sobre a base de cálculo positiva.

### 5. Calcular IRPJ e CSLL

```
Lucro Real = LAIR + Adições − Exclusões − Prejuízo Fiscal compensado
IRPJ = Lucro Real × 15%
Adicional IR = (Lucro Real − R$ 60.000 trimestre OU R$ 240.000 ano) × 10%
CSLL = Base CSLL × 9% (instituições financeiras: 15-20%)
```

### 6. Estimativas mensais (Lucro Real Anual)
- Aplicar percentuais do Lucro Presumido sobre receita do mês para gerar a base de estimativa.
- IRPJ estimativa = Base × 15% + adicional.
- **Suspensão/redução**: levantar balancete acumulado e provar que o lucro real apurado é menor que a estimativa — pode reduzir/suspender o pagamento (RFB 1.700, art. 47).

### 7. Ajuste anual (31/12)
- Apurar lucro real do ano-calendário inteiro.
- Compensar estimativas pagas + IRRF + saldo negativo de anos anteriores.
- Saldo a pagar até 31/03 (ou parcelar em 6 quotas com Selic).

## Templates

```
LALUR PARTE A — TRIMESTRE __/____
LAIR contábil...................................... R$ _________
(+) ADIÇÕES
   Multas punitivas............................... R$ _________
   Provisões não dedutíveis....................... R$ _________
   Doações sem incentivo.......................... R$ _________
   Despesas indedutíveis (sócios, brindes etc.)... R$ _________
   Outras adições................................. R$ _________
(−) EXCLUSÕES
   Dividendos recebidos........................... R$ _________
   Equivalência patrimonial positiva.............. R$ _________
   Reversão de provisões adicionadas.............. R$ _________
LUCRO LÍQUIDO AJUSTADO............................. R$ _________
(−) Prejuízo fiscal (limite 30%)................... R$ _________
LUCRO REAL......................................... R$ _________
IRPJ 15%........................................... R$ _________
Adicional 10% (sobre excesso a R$ 60k tri)......... R$ _________
CSLL 9%............................................ R$ _________
```

## Erros comuns

- Compensar prejuízo fiscal sem limite de 30%
- Não controlar Parte B do LALUR (saldo de prejuízo fiscal por ano de origem)
- Excluir dividendos recebidos quando provém de controlada no exterior (são tributados — art. 76, Lei 12.973)
- Tratar variação cambial pelo regime de caixa sem opção formalizada
- Esquecer de adicionar JCP recebido (PJ recebedor tributa como receita financeira — IRRF na fonte é antecipação)
- Subvenção para investimento: não excluir mais (Lei 14.789/2023 mudou o tratamento — agora gera crédito fiscal)
- Estimativa mensal usando % errado para a atividade

## Checklist

- [ ] LAIR conferido com DRE do balancete
- [ ] Cada adição tem documento comprobatório
- [ ] Cada exclusão tem fundamento legal mapeado
- [ ] Prejuízo fiscal compensado respeita 30%
- [ ] Parte B do LALUR atualizada
- [ ] Adicional de IR calculado corretamente
- [ ] Estimativas mensais lançadas em DCTFWeb
- [ ] ECF (anual) com a apuração casa com EFD-Contribuições e ECD

## Referências

- Decreto 9.580/2018 (RIR/2018)
- IN RFB 1.700/2017 (CSLL/IRPJ consolidada)
- Lei 9.430/1996 (estimativa, suspensão, redução)
- Lei 12.973/2014 (convergência IFRS, lucros no exterior)
- Lei 14.789/2023 (subvenção para investimento — crédito fiscal de 25%)
