---
name: calculo-icms-icms-st
description: Apura ICMS próprio e ICMS-ST (substituição tributária) em operações internas e interestaduais, calcula MVA ajustada, DIFAL, antecipação tributária e aplica decisões da LC 87/96 e Convênios CONFAZ.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

Empresas no Lucro Real/Presumido (e Simples acima do sublimite) que vendem ou compram mercadorias sujeitas a ICMS. Use também para Simples nas operações com ST, antecipação ou DIFAL.

## Inputs necessários

1. NF de saída ou entrada — itens com NCM, CFOP, alíquota interna do destino, MVA (original e ajustada)
2. Estado do remetente e destinatário
3. Destinatário é contribuinte ou não-contribuinte do ICMS?
4. Produto na ST do estado de destino? (Convênio ICMS 142/2018 + protocolos)
5. Empresa optante do Simples ou regime normal?
6. Existe Convênio/Protocolo entre os estados? (define MVA ajustada)
7. Benefício fiscal aplicável? (FOMENTAR, PRODEPE, etc.)

## Cálculo do ICMS próprio (operação interestadual)

```
ICMS próprio = Base × Alíquota interestadual
```

Alíquotas interestaduais 2026:
- **4%**: produtos importados (Resolução SF 13/2012) com Conteúdo de Importação > 40%
- **7%**: origem SP/RJ/MG/RS/PR/SC para destino N/NE/CO + ES
- **12%**: demais combinações

A base inclui: valor da mercadoria + frete CIF + seguro + outras despesas + IPI (quando o destinatário não for contribuinte ou for uso/consumo).

## Cálculo do ICMS-ST (substituição tributária para frente)

### 1. Identificar se há ST
- Convênio 142/2018 lista NCMs sujeitos a ST + protocolos bilaterais entre estados.
- Se há protocolo entre origem e destino, o remetente é responsável pelo recolhimento.
- Se não há protocolo, o destinatário recolhe na entrada do estado.

### 2. Calcular MVA ajustada (operação interestadual)

```
MVA ajustada = [(1 + MVA original) × (1 − Aliq Inter) / (1 − Aliq Interna)] − 1
```

Exemplo: produto com MVA original 40%, alíquota interestadual 12%, alíquota interna destino 18%:
```
MVAaj = [(1,40 × 0,88) / 0,82] − 1 = (1,232 / 0,82) − 1 = 0,5024 = 50,24%
```

### 3. Base ST e ICMS-ST devido

```
Base ST = (Valor merc + frete + seguro + outras + IPI) × (1 + MVA ajustada)
ICMS-ST = (Base ST × Alíquota interna destino) − ICMS próprio
```

### 4. DIFAL (LC 190/2022 — venda a não-contribuinte)
- Venda de SP para PF em GO, mercadoria não em ST:
- ICMS interestadual (7%) recolhido para SP (origem).
- DIFAL = (Aliq interna destino − Aliq interestadual) sobre a base "por dentro" (cálculo embutido).
- A LC 190/2022 trouxe a base de cálculo dupla (cálculo do ICMS por dentro com a alíquota destino).
- Recolher por GNRE para o destino, antes da saída da mercadoria.

### 5. Antecipação tributária (sem ST)
Vários estados (PE, BA, MG, GO) cobram antecipação na entrada para revenda — recolhimento na primeira fronteira ou na entrada do estabelecimento. Verificar legislação estadual.

## Templates

### Cálculo NF saída interestadual com ST

```
NF nº ____ — destino UF ___ — destinatário: contribuinte
Item: ____ NCM ____ Aliq inter: __% Aliq interna destino: __%
Valor mercadoria: R$ _________
+ IPI (quando contribuinte e não para revenda): R$ _________
+ Frete CIF: R$ _________
+ Seguro: R$ _________
+ Outras despesas: R$ _________
= BASE ICMS PRÓPRIO: R$ _________
ICMS próprio = Base × __% = R$ _________

MVA original: __%   MVA ajustada: __%
BASE ST = Base × (1 + MVA ajustada) = R$ _________
ICMS ST devido = Base ST × Aliq interna destino − ICMS próprio
              = R$ _________
GNRE recolhida antes da saída? [ ] Sim
```

### Exemplo numérico

Vendas SP → BA: R$ 10.000 (mercadoria + frete + IPI), MVA original 35%, alíquota inter 7%, interna BA 19%.

- MVA ajustada = [(1,35 × 0,93) / 0,81] − 1 = (1,2555 / 0,81) − 1 = 55,0%
- ICMS próprio = 10.000 × 7% = R$ 700
- Base ST = 10.000 × 1,55 = R$ 15.500
- ICMS ST = 15.500 × 19% − 700 = 2.945 − 700 = **R$ 2.245**

## Erros comuns

- Usar MVA original em vez da ajustada na interestadual → recolhimento a menor, autuação.
- Não incluir IPI na base quando destinatário não é contribuinte (e a operação for de revenda final).
- Esquecer DIFAL em venda a não-contribuinte — autuação pelo estado de destino.
- Aplicar 4% a importados sem verificar Conteúdo de Importação (FCI atualizada).
- Tratar Simples Nacional como se recolhesse ICMS próprio normal — a alíquota interna do remetente do Simples segue a tabela do anexo (não é 18%); o crédito do destinatário também segue regra própria.
- Esquecer que ST encerra a cadeia — destinatário não recolhe ICMS na revenda interna (mas recolhe se vender para outro estado).

## Checklist

- [ ] NCM checado em Convênio 142/2018 e protocolo bilateral
- [ ] MVA ajustada calculada quando interestadual
- [ ] DIFAL calculado em venda a não-contribuinte (LC 190/2022)
- [ ] GNRE emitida e paga antes da saída
- [ ] Antecipação tributária verificada na UF destino
- [ ] CFOP correto (5.401, 6.401, 5.405, 6.404 etc.)
- [ ] CST/CSOSN consistente (10 com ICMS-ST, 60 já recolhido, etc.)
- [ ] EFD ICMS/IPI com registros C170/C190/E110/E116 batendo

## Referências

- LC 87/1996 (Lei Kandir)
- LC 190/2022 (DIFAL)
- Resolução SF 13/2012 (4% importados)
- Convênio ICMS 142/2018 (regras gerais ST)
- Convênio ICMS 236/2021 (operações com não-contribuinte)
- Decisão STF ADI 5.469 — anuidade DIFAL
