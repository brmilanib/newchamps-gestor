---
name: lancamentos-contabeis-padrao
description: Catálogo de lançamentos padrão para operações cotidianas (vendas, compras, folha, tributos, ativo imobilizado, empréstimos), com débitos e créditos prontos e fundamentação em CPCs.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

## Quando usar

Como referência rápida para conferência ou treinamento de equipe júnior. Cada operação tem um padrão D/C que pode ser adaptado ao plano de contas do cliente.

## Vendas

### Venda à vista (mercadoria, com ICMS, PIS, COFINS)

```
D 1.1.1.02 Banco c/c            R$ 10.000
   C 3.1.1.01 Vendas mercadorias  R$ 10.000

(impostos sobre venda)
D 3.2.1.01 ICMS sobre vendas      R$ 1.700
   C 2.1.4.01 ICMS a recolher     R$ 1.700
D 3.2.1.02 PIS sobre vendas       R$ 65
   C 2.1.4.03 PIS a recolher      R$ 65
D 3.2.1.03 COFINS sobre vendas    R$ 300
   C 2.1.4.03 COFINS a recolher   R$ 300

(baixa de estoque + custo)
D 4.1.1 CMV                       R$ 6.000
   C 1.1.3.01 Mercadorias revenda R$ 6.000
```

### Venda a prazo
- Substituir Banco por Clientes (1.1.2.01).
- Recebimento: D Banco / C Clientes.
- Juros sobre atraso: D Clientes / C 3.4 Receita financeira.

## Compras

### Compra para revenda (com créditos PIS/COFINS Real)

```
D 1.1.3.01 Mercadorias revenda           R$ 5.000
D 1.1.4.02 PIS a recuperar               R$    65
D 1.1.4.02 COFINS a recuperar            R$   300
D 1.1.4.01 ICMS a recuperar              R$   850
   C 2.1.1 Fornecedores                  R$ 6.215
```

### Compra de imobilizado (ativo permanente)

```
D 1.2.3.03 Máquinas e equipamentos       R$ 50.000
D 1.1.4.01 ICMS a recuperar (CIAP 1/48)  R$  9.000  (registrado integral, mas creditado em 48 parcelas)
   C 2.1.1 Fornecedores                  R$ 59.000

(reconhecimento mensal de depreciação — ex.: 10 anos = 0,8333% ao mês)
D 5.5 Despesa depreciação                R$    417
   C 1.2.3.99 Depreciação acumulada      R$    417
```

## Folha de pagamento

```
(Folha provisionada)
D 5.1 Despesa salários                   R$ 50.000
   C 2.1.3.01 Salários a pagar           R$ 38.500
   C 2.1.3.02 INSS empregado a recolher  R$  4.500
   C 2.1.3.03 IRRF folha a recolher      R$  3.000
   C 2.1.3.06 VT/Plano (descontos)       R$  4.000

(encargos patronais)
D 5.1 INSS patronal                      R$ 14.000
D 5.1 FGTS                               R$  4.000
   C 2.1.3.02 INSS empresa a recolher    R$ 14.000
   C 2.1.3.04 FGTS a recolher            R$  4.000

(provisão de férias e 13º — CPC 33)
D 5.1 Provisão férias + 1/3 e encargos   R$  6.000
   C 2.1.3.05 Provisão férias            R$  6.000

D 5.1 Provisão 13º + encargos            R$  4.500
   C 2.1.3.06 Provisão 13º               R$  4.500
```

## Tributos sobre lucro

```
(IRPJ apurado no trimestre — Presumido)
D 5.6 Despesa IRPJ                       R$ 12.000
   C 2.1.4.04 IRPJ a recolher            R$ 12.000

D 5.6 Despesa CSLL                       R$  4.500
   C 2.1.4.04 CSLL a recolher            R$  4.500
```

## Empréstimos

### Captação

```
D 1.1.1.02 Banco c/c                     R$ 100.000
   C 2.1.2 Empréstimos curto prazo       R$ 100.000
```

### Apropriação de juros (custo amortizado — CPC 48)

```
D 5.4 Despesas financeiras (juros)       R$ 1.200
   C 2.1.2 Empréstimos curto prazo       R$ 1.200
```

### Pagamento da parcela

```
D 2.1.2 Empréstimos curto prazo          R$ 5.000  (principal + juros)
   C 1.1.1.02 Banco c/c                  R$ 5.000
```

## Equivalência patrimonial (CPC 18)

```
(Resultado positivo da controlada — receita não-realizada)
D 1.2.2 Investimentos em controladas     R$ 30.000
   C 3.3 Receita equivalência patrimonial R$ 30.000

(Distribuição de dividendos)
D 1.1.1.02 Banco c/c                     R$ 10.000
   C 1.2.2 Investimentos em controladas  R$ 10.000
```

## Provisão para perdas em créditos (PCLD — CPC 47/48)

```
D 5.5 Despesa PCLD                       R$ 5.000
   C 1.1.2.02 (-) PCLD                   R$ 5.000

(Quando o cliente paga depois de ter sido provisionado)
D 1.1.1.02 Banco c/c                     R$ 5.000
   C 1.1.2.02 PCLD                       R$ 5.000
(reverte a provisão simultaneamente)
D 1.1.2.02 PCLD                          R$ 5.000
   C 5.5 Reversão de PCLD                R$ 5.000
```

## Arrendamento (CPC 6 R2 / IFRS 16) — locatário

### Início do contrato

```
D 1.2.5 Direito de uso                   R$ 200.000
   C 2.2.4 Passivo de leasing            R$ 200.000
```

### Pagamento da parcela e despesas

```
D 2.2.4 Passivo de leasing (principal)   R$ 4.500
D 5.4 Despesas financeiras (juros)       R$ 1.500
   C 1.1.1.02 Banco c/c                  R$ 6.000

D 5.5 Despesa amortização (depreciação)  R$ 3.333  (200.000 / 60 meses)
   C 1.2.5 (-) Amortização do direito    R$ 3.333
```

## Erros comuns

- "Diversos" no histórico — sempre detalhar a transação.
- D/C invertidos na baixa de estoque (CMV é despesa, é débito).
- Não registrar provisão de férias/13º em competência mensal (CPC 33).
- Imposto sobre venda lançado em despesa em vez de redutor de receita bruta.
- Empréstimo: lançar inteiro como receita ou despesa (correto: passivo + apropriação juros).
- Equivalência sem documentação da controlada.
- Imobilizado < R$ 1.200 (limite RIR/2018) sendo capitalizado em vez de despesa.

## Checklist mensal

- [ ] Lançamentos com histórico explicativo
- [ ] Provisões mensais (férias, 13º, encargos) atualizadas
- [ ] Depreciação/amortização lançadas
- [ ] Apropriação de juros do mês
- [ ] PCLD revisada
- [ ] Tributos a recolher batendo com apurações
- [ ] Conciliação banco × razão
- [ ] Razão de cada conta auditável

## Referências

- Lei 6.404/1976 (Lei das S.A.) e Lei 11.638/2007
- CPC 26, 27, 4, 18, 33, 47, 48, 6 (R2)
- RIR/2018 (Decreto 9.580)
- Resoluções CFC NBC TG (Normas Brasileiras de Contabilidade)
