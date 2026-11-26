---
name: recuperacao-creditos-pis-cofins
description: Levanta créditos extemporâneos de PIS/COFINS (Tema 779, ICMS na base — Tema 69, monofásicos, exportação) dos últimos 5 anos, escritura, compensa via PER/DCOMP e gera memória de cálculo defensável.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

## Quando usar

Empresas no Lucro Real com 5 anos de operação. Empresas no Presumido também podem recuperar exclusão do ICMS (Tema 69). Trabalho de revisão fiscal — alto valor agregado por hora.

## Inputs necessários

1. EFD-Contribuições dos últimos 60 meses (5 anos = prazo decadencial Lei 9.430)
2. EFD ICMS/IPI (para identificar ICMS destacado)
3. Notas de entrada e saída
4. Apurações mensais já transmitidas (DCTF/DCTFWeb)
5. Contratos de serviço, folha, energia, aluguel, depreciação
6. Comprovantes de despesas com EPI, treinamento, fardamento (Tema 779)

## Principais teses de recuperação

### 1. Exclusão do ICMS da base PIS/COFINS (Tema 69 STF — RE 574.706)

**O que é**: STF decidiu que ICMS destacado na NF não compõe a base de PIS/COFINS. Modulação: efeitos a partir de **15/03/2017**, mas decisões individuais transitadas em julgado antes podem aplicar para períodos anteriores.

**Cálculo**:
```
Crédito = ICMS destacado × (1,65% + 7,60%) [Real] ou × (0,65% + 3%) [Presumido]
```

**Como recuperar**:
- Real: crédito mensal de cada competência. Lançar em F600/M205 da EFD-Contribuições retificadora.
- Presumido: pagamento a maior. PER/DCOMP por código de receita.

### 2. Tema 779 STJ (REsp 1.221.170) — conceito amplo de insumo

Insumos = essenciais ou relevantes para a atividade. Inclui:
- Combustíveis e lubrificantes da frota
- EPI obrigatório por NR
- Fardamento exigido por contrato
- Treinamento técnico essencial
- Vale-transporte e vale-refeição (quando obrigatórios por norma trabalhista — convenção, sindicato, PAT)
- Manutenção preventiva de máquinas
- Software essencial à produção
- Frete na operação interna entre estabelecimentos

**Como recuperar**: lançar como crédito de insumo (CST 50) na EFD retificadora.

### 3. Receitas monofásicas indevidamente tributadas

Empresa que recebeu monofásicos para revenda mas tributou normalmente em vez de aplicar alíquota zero. Frequente em:
- Postos de combustível
- Lojas de cosméticos
- Distribuidoras de bebidas
- Autopeças

### 4. Exportação com manutenção de créditos não aproveitada

Empresa exportadora deveria manter créditos integrais sobre insumos da exportação. Erros comuns:
- Estornar crédito vinculado à exportação
- Não pedir ressarcimento após 24 meses de saldo credor

### 5. Crédito presumido sobre estoque (migração Presumido → Real)

Lei 10.637 art. 11: empresa que migra do Presumido para o Real tem crédito presumido sobre o estoque inicial — 0,65% PIS + 3% COFINS = 3,65% (ou alíquotas plenas se opta pela sistemática alternativa).

Frequentemente esquecido na transição.

### 6. Alíquota zero / suspensão / isenção mal aplicada

Setores específicos com alíquotas reduzidas (ex.: livros, papel, frutas in natura, defensivos agrícolas). Empresa pagar a alíquota cheia gera direito a recuperar.

### 7. Receita financeira tributada acima do correto

Decreto 8.426/2015: alíquotas PIS 0,65% e COFINS 4% sobre receita financeira no não-cumulativo. Empresas que aplicaram 1,65%/7,6% pagaram a maior.

## Passo a passo

### 1. Análise preliminar (escopo)
- Identificar teses aplicáveis
- Estimar montante recuperável (% receita × período)

### 2. Levantamento detalhado
- Extrair EFD-Contribuições por período
- Cruzar com EFD ICMS/IPI (para Tema 69)
- Identificar todas as despesas com potencial crédito (Tema 779)

### 3. Memória de cálculo
- Mês a mês, por tese
- Atualização monetária (Selic — Lei 9.430 art. 39)

### 4. Retificação das EFDs
- EFD-Contribuições retificadora com ajustes nos blocos M e F
- Validar no PVA, transmitir

### 5. Escolher a forma de recuperação

**a) Compensação administrativa (PER/DCOMP)**
- Crédito em PER/DCOMP Web
- Compensar com débitos próprios (PIS/COFINS futuros, IRPJ, CSLL, IPI)
- Prazo decadencial: 5 anos do pagamento indevido

**b) Restituição em dinheiro**
- Pedido via PER/DCOMP escolhendo "Restituição"
- Demora bastante (12-24 meses)

**c) Habilitação do crédito (créditos > determinado valor)**
- Habilitar previamente o crédito antes de compensar (IN RFB 2.055/2021)

### 6. Acompanhamento
- Despachos da RFB — homologação ou glosa
- Glosa: defender no prazo de 30 dias

## Riscos e cuidados

- **Tema 69 — base do crédito**: RFB tenta limitar à exclusão do "ICMS recolhido"; STF e STJ confirmaram **destacado** (Tema 69 + REsp 1.638.772). Defender pela tese vencedora.
- **Modulação 15/03/2017**: para créditos pré-modulação, precisa de ação judicial individual com trânsito anterior.
- **Compensação cruzada**: vedações específicas (ex.: tributo administrado por órgãos diferentes não compensa).
- **Multa de 75%** em compensação não declarada/glosada (Lei 9.430 art. 74 §17).

## Templates

### Memória de cálculo Tema 69 (mensal)

```
COMPETÊNCIA __/____
ICMS destacado nas saídas (E110): R$ _________
× 1,65% (PIS) = R$ _________
× 7,60% (COFINS) = R$ _________
TOTAL CRÉDITO MENSAL: R$ _________
+ Atualização Selic acumulada de __/____ até __/____: R$ _________
TOTAL ATUALIZADO: R$ _________
```

### Pacote para o cliente

```
CLIENTE _________ CNPJ _________ Período: __ a __

TESES IDENTIFICADAS:
[ ] Tema 69 STF — ICMS na base PIS/COFINS
[ ] Tema 779 STJ — insumos amplos (EPI, frete, etc.)
[ ] Receitas monofásicas tributadas indevidamente
[ ] Manutenção créditos exportação
[ ] Crédito presumido sobre estoque
[ ] Receita financeira (Decreto 8.426)
[ ] Outros: _________

VALOR ESTIMADO RECUPERÁVEL: R$ _________
ATUALIZADO PELA SELIC: R$ _________

PROPOSTA DE TRABALHO:
- Honorários: R$ X (fixo) ou Y% sobre o valor recuperado
- Prazo: 60-180 dias para retificação + 6-24 meses para compensação
- Riscos identificados: _________
```

## Erros comuns

- Compensar antes de retificar a EFD-Contribuições — crédito não escriturado é facilmente glosado.
- Não atualizar pela Selic — perde 30-50% do valor.
- Tese não fundamentada (sem doutrina, sem precedente vinculante) — risco de glosa + multa 75%.
- Compensar com tributo de outro órgão / não permitido pela IN 2.055.
- Cliente sem certidão regular: PER/DCOMP é negada.
- Honorário só sobre crédito homologado — fluxo de caixa do escritório fica longo.

## Checklist

- [ ] Mapeamento das teses aplicáveis ao cliente
- [ ] Levantamento mês a mês (5 anos)
- [ ] Memória de cálculo defensável
- [ ] EFDs retificadoras transmitidas
- [ ] Atualização Selic
- [ ] Habilitação prévia (quando exigida)
- [ ] PER/DCOMP transmitida
- [ ] Acompanhamento de despachos
- [ ] Defesa em caso de glosa
- [ ] Honorários e contrato com cláusula de glosa

## Referências

- RE 574.706 / Tema 69 STF
- REsp 1.221.170 / Tema 779 STJ
- Lei 9.430/1996 (compensação, decadência)
- Lei 10.637/2002 e 10.833/2003
- IN RFB 2.055/2021 (compensação)
- IN RFB 2.121/2022 (PIS/COFINS)
- Decreto 8.426/2015
- Lei 14.592/2023 (consolidação Tema 69)
