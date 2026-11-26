---
name: retencoes-tributarias-tomador
description: Identifica quando o tomador deve reter IR, CSLL, PIS, COFINS, INSS e ISS sobre serviços contratados de PJ ou PF, gera DARF/GPS e arquiva comprovantes para o prestador compensar.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

Toda contratação de serviço pelo seu cliente (tomador) que possa estar sujeita a retenção. Skill imprescindível em fechamento de mês para conferir DCTFWeb e DIRF do ano.

## Quadro de retenções

| Retenção | Norma | Quando se aplica | Alíquota |
|---|---|---|---|
| **IRRF PJ** | Lei 7.713/88 art. 7º; Decreto 9.580/18 art. 716 | Serviços profissionais listados (advocacia, contabilidade, consultoria, engenharia, propaganda, etc.) | 1,5% |
| **IRRF Limpeza/Vigilância** | RIR/2018 art. 716 | Serviços de limpeza, conservação, segurança, locação de mão de obra | 1% |
| **CSRF (PIS+COFINS+CSLL)** | Lei 10.833/2003 art. 30 | Limpeza, segurança, transporte de valores, manutenção, consultoria, contabilidade etc. quando pago > R$ 215,05/mês | 4,65% (1+3+0,65) |
| **INSS retenção 11%** | Lei 8.212/91 art. 31 | Cessão de mão de obra ou empreitada (construção civil, conservação, vigilância, limpeza) | 11% |
| **ISS retido** | LC 116/2003 + lei municipal | Serviços listados art. 3º LC 116 ou conforme lei municipal | Conforme município (2-5%) |
| **IRRF aluguel PF** | Tabela progressiva | Aluguel pago por PJ a PF | Tabela 0-27,5% |
| **IRRF autônomo** | Tabela progressiva | Serviços de PF a PJ | Tabela 0-27,5% |
| **Royalties / Direitos** | RIR | Pagamento ao exterior (CIDE 10% e IRRF 15-25%) | Conforme contrato |

## Inputs necessários

1. Tipo de serviço contratado e código de natureza
2. Prestador é PF ou PJ? Optante do Simples?
3. Valor do serviço (alguns retemtos têm piso — IRRF dispensa < R$ 10,00 ou base < limite; CSRF dispensa pagamento mensal ≤ R$ 215,05)
4. Município do prestador e do tomador
5. Existe dispensa por declaração (Simples Anexo IV, imune, isenta)?

## Regra prática para serviços profissionais (PJ → PJ)

Pagamento de serviço profissional (consultoria, advocacia, contabilidade, propaganda, RH, etc.):

```
Sobre o valor bruto da NF:
- IRRF 1,5% (código 1708)  → DARF
- CSRF 4,65% (cód 5952)    → DARF — só se acumulado mensal > R$ 215,05 com o mesmo prestador
- ISS retido (varia)       → DAM municipal
- INSS 11%? Geralmente NÃO (apenas em cessão de MO ou empreitada).
```

## Dispensas comuns

- Prestador é **Simples Nacional** que não emite serviço por cessão de MO: dispensa IRRF e CSRF (declaração do prestador anexa à NF — IN RFB 765/2007, IN RFB 1.234/2012).
- Prestador é cooperativa de trabalho: dispensa IRRF (IRRF é dos cooperados), mas INSS 15% pelo tomador (extinto desde RE 595.838 STF, decisão 2014).
- Prestador é imune (entidade educacional/assistencial CF art. 150 VI c) ou isento.
- ME/EPP no Simples Anexo IV: aplica IRRF e CSRF normais (Anexo IV não é dispensa).

## Cálculo passo a passo

1. Receber NF do prestador (verificar regime, atividade, código serviço)
2. Verificar se a atividade está na lista das retenções
3. Calcular cada retenção sobre o valor bruto
4. Pagar ao prestador o valor líquido (Bruto − retenções)
5. Recolher cada retenção:
   - IRRF: DARF até dia 20 do mês subsequente, código por natureza
   - CSRF: DARF até último dia útil da quinzena seguinte ao pagamento
   - INSS 11%: GPS/DCTFWeb até dia 20 do mês subsequente
   - ISS retido: DAM municipal conforme prazo da prefeitura
6. Entregar comprovantes ao prestador
7. Lançar em EFD-Reinf (R-2010 cessão de MO, R-4010 IR pessoa jurídica) e DIRF

## Templates

### NF de serviço com cálculo de retenção

```
NF nº ____ Prestador: __________ CNPJ ____________ Regime: __________
Item LC 116: ____  Município prestador: _____  Tomador: _____

Valor bruto: R$ _________

RETENÇÕES:
[ ] IRRF 1,5% (cód 1708): R$ _________
[ ] IRRF 1,0% (cód 1708 — limpeza): R$ _________
[ ] CSRF 4,65% (cód 5952): R$ _________  (acumulado mês > R$ 215,05? ___)
[ ] INSS 11% (cessão MO): R$ _________
[ ] ISS retido ___%: R$ _________

VALOR LÍQUIDO A PAGAR: R$ _________
```

### Exemplo

NF de consultoria PJ → PJ, R$ 10.000:
- IRRF 1,5%: R$ 150
- CSRF 4,65%: R$ 465
- ISS retido 5%: R$ 500
- INSS: não aplica
- **Líquido pago ao prestador: R$ 8.885**

## Erros comuns

- Não reter de Simples Nacional **fora** das atividades de cessão de MO. Atenção: pagamento a Simples por serviço de limpeza/vigilância **tem retenção de INSS 11%** (Lei 8.212/91, art. 31).
- Reter CSRF em pagamento ≤ R$ 215,05/mês — não devido (Lei 13.137/2015 que substituiu IN 459).
- Aplicar 1,5% em limpeza/vigilância (correto: 1%).
- Esquecer DIRF anual com os IRRF retidos.
- Não reter ISS quando o tomador é obrigado pela lei municipal.

## Checklist

- [ ] Cada NF analisada quanto à atividade e ao regime do prestador
- [ ] Retenções calculadas e descontadas no pagamento
- [ ] Comprovantes (declaração simples, PER/DCOMP, comprovantes de retenção) anexados
- [ ] DARFs/GPSs/DAMs gerados com códigos corretos
- [ ] EFD-Reinf transmitida (eventos de retenção)
- [ ] DCTFWeb com débitos
- [ ] DIRF anual fechada até 28/02

## Referências

- Lei 7.713/1988 + RIR/2018
- Lei 10.833/2003 art. 30 (CSRF)
- Lei 8.212/1991 art. 31 (INSS retenção 11%)
- LC 116/2003 (ISS retido)
- IN RFB 1.234/2012 (PJs imunes/isentas)
- IN RFB 2.043/2021 (EFD-Reinf)
- Lei 13.137/2015 (limites CSRF)
