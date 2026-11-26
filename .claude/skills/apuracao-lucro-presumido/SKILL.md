---
name: apuracao-lucro-presumido
description: Apura IRPJ, CSLL, PIS, COFINS trimestrais no Lucro Presumido aplicando os percentuais de presunção corretos por atividade, com adicional de IR e tratamento de receitas financeiras.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

PJ que faturou até R$ 78 milhões no ano-calendário anterior e optou pelo Lucro Presumido (Lei 9.430/96, art. 13). Apuração trimestral (mar/jun/set/dez). Use também para clientes saindo do Simples e migrando.

**NÃO use** para: Simples Nacional (skill 01), Lucro Real obrigatório (skill 03), atividades vedadas ao presumido (factoring, securitização, instituições financeiras).

## Inputs necessários

1. CNPJ + atividade(s) com CNAE — para identificar percentual de presunção
2. Receita bruta do trimestre, segregada por atividade
3. Receitas financeiras e ganhos de capital (somam direto à base, sem presunção)
4. ISS/ICMS retido na fonte e IRRF retido por terceiros (compensáveis)
5. Faturamento dos últimos 12 meses para ver se ainda cabe no presumido
6. Regime de PIS/COFINS — Presumido = cumulativo (3,65%) salvo exceções (combustíveis, autopeças)
7. Receita de exportação (não tem PIS/COFINS, mas tem IRPJ/CSLL)

## Passo a passo

### 1. Aplicar percentual de presunção sobre a receita bruta

| Atividade | IRPJ | CSLL |
|---|---|---|
| Revenda de combustíveis | 1,6% | 12% |
| Comércio, indústria, transporte de cargas | 8% | 12% |
| Serviços hospitalares, transporte passageiros | 8% (16% CSLL) | 12% |
| Serviços em geral (até R$ 120k/ano) | 16% | 32% |
| Serviços profissionais, intermediação, locação | 32% | 32% |

### 2. Calcular base presumida e IRPJ
- Base IRPJ trimestral = Receita × % presunção + ganhos capital + receitas financeiras + variação cambial ativa.
- IRPJ = Base × 15%.
- **Adicional**: 10% sobre o que exceder R$ 60.000 no trimestre (R$ 20.000/mês).

### 3. CSLL
- Base CSLL = Receita × % presunção CSLL + adições.
- CSLL = Base × 9%. Sem adicional.

### 4. PIS/COFINS cumulativo
- PIS = Receita × 0,65%.
- COFINS = Receita × 3%.
- Apuração mensal (não trimestral). Vencimento dia 25 do mês seguinte.
- Excluir: ICMS destacado (Tema 69 STF — "tese do século"), vendas canceladas, descontos incondicionais, IPI, devoluções.

### 5. Compensações
- IRRF retido por terceiros (TOM, financeiras): abater do IRPJ devido.
- Imposto pago no exterior (se aplicável).
- ISS/ICMS retido: não compensa com IRPJ; é crédito municipal/estadual.

### 6. DARFs e prazos
- IRPJ/CSLL: vencimento último dia útil do mês subsequente ao trimestre. Pode parcelar em 3 quotas (mín R$ 1.000, juros Selic).
- PIS/COFINS: dia 25 do mês seguinte.
- Códigos DARF: IRPJ 2089 (presumido), CSLL 2372, PIS 8109, COFINS 2172.

## Templates

```
TRIMESTRE: __/____  CNPJ: __________

RECEITA BRUTA POR ATIVIDADE:
  Comércio (8%/12%): R$ _________
  Serviços (32%/32%): R$ _________
  Outros: R$ _________

GANHOS DE CAPITAL: R$ _________
RECEITAS FINANCEIRAS: R$ _________

BASE IRPJ: R$ _________ × 15% = R$ _________
  Adicional (10% sobre o que exceder R$ 60k): R$ _________
  IRRF a compensar: R$ _________
  IRPJ A PAGAR: R$ _________

BASE CSLL: R$ _________ × 9% = R$ _________

PIS mensal: Receita × 0,65%
COFINS mensal: Receita × 3%
```

### Exemplo

Comércio com receita de R$ 1.000.000 no trimestre, R$ 5.000 de receita financeira:
- Base IRPJ = 1.000.000 × 8% + 5.000 = R$ 85.000.
- IRPJ = 85.000 × 15% = R$ 12.750.
- Adicional: 85.000 − 60.000 = R$ 25.000 × 10% = R$ 2.500.
- **IRPJ total: R$ 15.250**.
- Base CSLL = 1.000.000 × 12% + 5.000 = R$ 125.000 × 9% = **R$ 11.250**.

## Erros comuns

- Aplicar 32% em transporte de cargas (correto: 8%) ou 8% em transporte de passageiros (correto: 16%/12%).
- Esquecer ganhos de capital e receitas financeiras na base — somam **direto**, sem presunção.
- Não excluir ICMS da base de PIS/COFINS (Tema 69) → pagamento a maior.
- Calcular adicional sobre o lucro contábil em vez da base presumida.
- Confundir vencimentos: IRPJ/CSLL é trimestral, PIS/COFINS é mensal.
- Empresa com mais de uma atividade aplicando um único % → segregar por receita.

## Checklist

- [ ] CNAE confere com atividade real (revisar contrato social)
- [ ] Receita do trimestre conferida com NFe + ECD
- [ ] Percentuais por atividade aplicados corretamente
- [ ] Receita financeira e ganho de capital somados sem presunção
- [ ] Adicional de IR calculado (R$ 60k trimestrais)
- [ ] ICMS excluído da base PIS/COFINS
- [ ] IRRF retido por terceiros compensado
- [ ] Códigos DARF corretos
- [ ] DCTFWeb e EFD-Contribuições alinhados com a apuração

## Referências

- Lei 9.430/1996 (apuração trimestral)
- Lei 9.249/1995 (% de presunção)
- Lei 9.715/1998 e LC 70/1991 (PIS/COFINS cumulativo)
- IN RFB 1.700/2017 (consolidação IRPJ/CSLL)
- RE 574.706 (Tema 69 STF — exclusão do ICMS da base)
