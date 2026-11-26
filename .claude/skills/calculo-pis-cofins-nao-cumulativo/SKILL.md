---
name: calculo-pis-cofins-nao-cumulativo
description: Apura PIS (1,65%) e COFINS (7,6%) não-cumulativos com créditos sobre insumos (conceito Tema 779 STJ), exporta tratamento de monofásicos, ICMS Tema 69, e identifica oportunidades de recuperação.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

Empresas no Lucro Real (regra geral) — Leis 10.637/2002 (PIS) e 10.833/2003 (COFINS). Apuração mensal, vencimento dia 25 do mês subsequente.

## Inputs necessários

1. Receita bruta segregada (vendas, prestação de serviços, financeiras, locação)
2. Notas de entradas dos últimos 12 meses (insumos, frete, energia, aluguel, depreciação)
3. Imobilizado adquirido (créditos em 12 ou 48 meses dependendo do bem)
4. Receitas com alíquota zero, monofásicos, exportação
5. Estoque inicial (crédito presumido, decreto-lei 1.598)
6. Saldos de crédito a recuperar de meses anteriores
7. CFOP/CST informados nas NFs de entrada — base para a EFD-Contribuições

## Cálculo

```
Débito = Receita tributada × (1,65% + 7,6%) = 9,25%
Crédito = Despesas elegíveis × 9,25%
A recolher = Débito − Crédito
```

Receita exclui: ICMS destacado (Tema 69), IPI, ICMS-ST, vendas canceladas, descontos incondicionais, devoluções.

## Créditos (insumos — Tema 779 STJ)

O STJ definiu (REsp 1.221.170 — repetitivo) o conceito de **insumo** como tudo que é **essencial ou relevante** para a atividade, não apenas o que se incorpora ao produto. Aproveitar:

### Créditos comuns
- Bens adquiridos para revenda
- Insumos (matéria-prima, embalagem, MP secundária)
- Energia elétrica e térmica
- Aluguel de prédios, máquinas, equipamentos pessoa jurídica
- Arrendamento mercantil (leasing) — exceto de imóveis após 2009
- Depreciação de máquinas e equipamentos da produção (12 ou 48 meses)
- Edificações utilizadas na atividade (depreciação 25 anos = 1/300 mês)
- Bens recebidos em devolução
- Armazenagem e frete na operação de venda (cobrado por terceiro)
- Vale-transporte, vale-refeição, fardamento (Tema 779 — quando obrigatório por norma trabalhista ou por relevância à atividade)
- EPI, uniforme, treinamento (essenciais à produção)

### Créditos vedados
- Mão de obra (PF) — vedação expressa Lei 10.833 art. 3º §2º II
- Bens adquiridos de Simples Nacional (regra com exceções — IN RFB 2.121, art. 174)
- Aquisições com alíquota zero ou suspensão (não geram crédito por princípio)
- Despesas administrativas em geral (telefone, internet, software ERP) — tema discutido caso a caso

### Crédito presumido sobre estoque (na adesão ao Real)
- Estoque inicial × 0,65 + 3 = 3,65% (alternativa simplificada). Usar quando a empresa migra do Presumido para o Real.

## Operações monofásicas

- Receita de revenda de monofásicos: alíquota zero (concentrado no produtor).
- Compra de monofásicos pelo varejista: **não gera crédito** (alíquota zero na origem da próxima cadeia).
- Receita de produtor/importador monofásico: alíquotas diferenciadas (combustíveis, cosméticos, autopeças). Verificar Lei 10.485 e 10.147.

## Exportação

- Receita de exportação: **alíquota zero** (não tributa) E gera **manutenção dos créditos** sobre os insumos usados (Lei 10.833, art. 6º).
- Crédito acumulado: usar para compensar com outros tributos federais (PER/DCOMP) ou ressarcir em dinheiro (após 24 meses sem compensação, possível ressarcimento).

## Templates

```
PIS/COFINS NÃO-CUMULATIVO — MM/AAAA

DÉBITOS
Receita bruta..................... R$ _________
(−) Exclusões (ICMS, dev., desc.). R$ _________
(−) Receitas alíquota zero........ R$ _________
(−) Receita exportação (manut.cred) R$ _________
Base débito....................... R$ _________
PIS débito (1,65%)................ R$ _________
COFINS débito (7,60%)............. R$ _________

CRÉDITOS
Insumos (NFs de entrada)......... R$ _________
Energia elétrica................. R$ _________
Aluguel PJ....................... R$ _________
Depreciação (12 ou 48 meses)..... R$ _________
Frete na venda................... R$ _________
Outros (Tema 779)................ R$ _________
Base crédito..................... R$ _________
PIS crédito (1,65%).............. R$ _________
COFINS crédito (7,60%)........... R$ _________

A RECOLHER (ou saldo credor):
PIS............................. R$ _________
COFINS.......................... R$ _________
```

### Exemplo

Indústria Real: receita R$ 2.000.000, ICMS R$ 240.000, insumos R$ 800.000, energia R$ 30.000, aluguel R$ 20.000.
- Base débito = 2.000.000 − 240.000 = R$ 1.760.000
- PIS débito = R$ 29.040 / COFINS débito = R$ 133.760
- Base crédito = 800.000 + 30.000 + 20.000 = R$ 850.000
- PIS crédito = R$ 14.025 / COFINS crédito = R$ 64.600
- A recolher: PIS R$ 15.015 / COFINS R$ 69.160

## Erros comuns

- Não aproveitar créditos amplos do Tema 779 (combustíveis da frota, EPIs, fretes entre estabelecimentos).
- Tomar crédito de monofásicos comprados para revenda (vedação por alíquota zero).
- Esquecer manutenção de créditos da exportação.
- Excluir ICMS apenas de débito, mas não dos créditos (a regra do ICMS na base do crédito é pacífica desde a Lei 14.592/2023 — exclui-se ICMS dos créditos também).
- Lançar depreciação de 100% no mês em vez de 1/12 ou 1/48.
- Empresa Real cumulativa em algumas atividades (atenção a hospitais, transporte de passageiros, telecomunicações — receita mantida no cumulativo por opção legal).

## Checklist

- [ ] Receita conferida com EFD-Contribuições e NFs
- [ ] ICMS excluído da base (Tema 69)
- [ ] Créditos categorizados (insumo, energia, aluguel, depreciação, frete)
- [ ] Tema 779: insumos essenciais/relevantes documentados (laudo técnico ou parecer)
- [ ] Crédito presumido sobre estoque (se houver mudança de regime)
- [ ] Manutenção de créditos da exportação
- [ ] Saldo credor anterior compensado
- [ ] EFD-Contribuições com Bloco M (apuração) e F600 (créditos) corretos

## Referências

- Lei 10.637/2002 (PIS não-cumulativo)
- Lei 10.833/2003 (COFINS não-cumulativo)
- Lei 14.592/2023 (consolida exclusão do ICMS)
- IN RFB 2.121/2022 (regulamento consolidado)
- REsp 1.221.170/PR — Tema 779 STJ (conceito de insumo)
- Solução de Consulta COSIT 7/2021 (Tema 779 aplicado)
