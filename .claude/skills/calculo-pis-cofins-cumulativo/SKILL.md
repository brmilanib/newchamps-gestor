---
name: calculo-pis-cofins-cumulativo
description: Apura PIS (0,65%) e COFINS (3%) cumulativos para empresas no Lucro Presumido, com exclusão do ICMS da base (Tema 69 STF) e tratamento de receitas excluídas e regime monofásico.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

Empresas no Lucro Presumido em geral (Lei 9.715/98 e LC 70/91). Algumas atividades do Real também são cumulativas (financeiras, locação de mão de obra antes da Lei 12.973). Apuração mensal. Vencimento dia 25 do mês subsequente.

## Inputs necessários

1. Receita bruta mensal (faturamento) — segregar por tipo
2. Vendas canceladas, devoluções, descontos incondicionais, IPI destacado, ICMS-ST destacado (todos excluem da base)
3. **ICMS destacado em NFs de saída** (Tema 69 STF — RE 574.706 — exclusão modulada a partir de 15/03/2017)
4. Receita financeira, ganhos de capital (compõem base no cumulativo)
5. Receitas com regime monofásico (combustíveis, autopeças, cosméticos, bebidas frias) — alíquota zero na revenda, concentração no produtor/importador
6. Receitas isentas/imunes (exportação, livros, papel)
7. Retenções na fonte (IRRF, CSRF — comp. com PIS/COFINS)

## Cálculo

```
PIS = (Receita − Exclusões) × 0,65%
COFINS = (Receita − Exclusões) × 3%
```

### Exclusões da base
- IPI destacado
- ICMS-ST destacado
- **ICMS destacado nas saídas** (Tema 69 STF — pacífico desde 2017; Lei 14.592/2023 consolidou)
- Vendas canceladas
- Descontos incondicionais
- Reversões de provisões e recuperações de créditos baixados (que não geraram receita anteriormente)
- Receitas com alíquota zero (monofásicos na revenda)
- Receitas isentas (exportação)
- Doações e subvenções para investimento

### Receitas que entram normalmente (no cumulativo)
- Receita bruta de vendas
- Receitas financeiras
- Receitas de aluguel (atividade comercial ou eventual)
- Variação cambial (regime de competência ou caixa por opção)

## Regime monofásico

Em produtos monofásicos (combustíveis — Lei 9.718; autopeças — Lei 10.485; cosméticos — Lei 10.147; bebidas frias — Lei 13.097), o produtor/importador concentra a tributação. Nas etapas seguintes (atacado e varejo), a alíquota é **zero**.

- Comércio que revende monofásicos: alíquota zero na receita do produto, mas os tributos foram pagos no início da cadeia.
- Importante: a empresa em Presumido pode ter parte da receita monofásica (alíquota zero) e parte tributada (cumulativo). Segregar.

## Templates

```
PIS/COFINS CUMULATIVO — MM/AAAA

Receita bruta total................. R$ _________
(−) Vendas canceladas............... R$ _________
(−) Descontos incondicionais........ R$ _________
(−) IPI destacado................... R$ _________
(−) ICMS-ST destacado............... R$ _________
(−) ICMS destacado nas saídas (T69). R$ _________
(−) Receitas exportação............. R$ _________
(−) Receitas monofásicas (aliq 0)... R$ _________
(=) BASE PIS/COFINS................. R$ _________

PIS (0,65%)......................... R$ _________
COFINS (3,0%)....................... R$ _________

(−) CSRF retida 4,65% por terceiros. R$ _________
PIS/COFINS A RECOLHER............... R$ _________
```

### Exemplo

Comércio Lucro Presumido, receita bruta de R$ 800.000, ICMS destacado R$ 96.000, vendas canceladas R$ 5.000.
- Base = 800.000 − 96.000 − 5.000 = R$ 699.000
- PIS = R$ 4.543,50 / COFINS = R$ 20.970

## Erros comuns

- **Não excluir ICMS** da base (deixa de aplicar Tema 69) → recolhimento a maior de ~18% sobre a base.
- Excluir ICMS-ST quando ele já não compõe a receita (atenção: se o produto foi adquirido com ST e revendido, o ICMS-ST é destacado mas ICMS-ST no destinatário é "fato gerador encerrado"; só exclui se a receita está bruta com ST embutido).
- Tratar receita monofásica como tributada → recolhe a maior.
- Esquecer de tributar receita financeira no cumulativo (no não-cumulativo, alíquota financeira é 0,65%/4% mas regulamentada por decreto).
- Não compensar CSRF (4,65% = PIS 0,65 + COFINS 3 + CSLL 1) retida por contratantes PJ (Lei 10.833 art. 30).
- Empresa nova ainda no Presumido aplicando regime não-cumulativo por engano.

## Checklist

- [ ] Faturamento bruto conferido com NFs e EFD-Contribuições
- [ ] ICMS das saídas excluído (Tema 69)
- [ ] Receitas monofásicas segregadas com alíquota zero
- [ ] CSRF de terceiros compensada
- [ ] Vencimento dia 25 (DARF 8109/2172)
- [ ] EFD-Contribuições mensal transmitida (até dia 10 do segundo mês subsequente)
- [ ] DCTFWeb com débitos batendo

## Referências

- Lei 9.715/98 e LC 70/91
- Lei 9.718/98 (alargamento da base — declarado inconstitucional na parte de "outras receitas" no cumulativo, RE 585.235)
- Lei 14.592/2023 (consolidação Tema 69)
- RE 574.706 (Tema 69 STF — exclusão do ICMS)
- IN RFB 2.121/2022 (regulamentação consolidada PIS/COFINS)
