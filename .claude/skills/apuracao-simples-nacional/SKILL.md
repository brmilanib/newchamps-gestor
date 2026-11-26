---
name: apuracao-simples-nacional
description: Apura o DAS mensal de empresas do Simples Nacional aplicando a fórmula da alíquota efetiva, segregando receitas por anexo e tratando ICMS-ST, ISS retido, sublimite estadual e fator R.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

> ⚠️ **AVISO FISCAL — CONFIRA ANTES DE GERAR A GUIA.** Todo código de receita (DARF/DAS), alíquota, base de cálculo, valor e data de vencimento gerado por este agente é **rascunho de apoio** e pode variar por ano, regime tributário, município ou caso específico. **Confira sempre na fonte oficial vigente (Receita Federal / e-CAC / legislação estadual e municipal) antes de transmitir declaração ou pagar guia.** A conferência final é responsabilidade do contador responsável.

## Quando usar

Empresas optantes pelo Simples Nacional (LC 123/2006), todo dia 1 ao 20 do mês subsequente ao fato gerador. Ative quando o cliente envia o faturamento do mês e você precisa gerar o DAS.

**NÃO use** para: MEI (use 04-apuracao-mei), empresas no Lucro Presumido/Real, ou quando houver suspeita de desenquadramento (use 42-analise-tributaria-regime antes).

## Inputs necessários

Peça ao usuário:

1. **CNPJ + razão social** e mês/ano de competência
2. **Faturamento bruto do mês**, segregado por:
   - Receita de revenda de mercadorias (Anexo I)
   - Receita de indústria (Anexo II)
   - Receita de serviços do Anexo III, IV ou V (identificar por CNAE)
   - Exportação (tributação reduzida)
   - Receita com substituição tributária / monofásica (segregar para abater)
3. **RBT12** — Receita Bruta Total dos 12 meses anteriores ao período de apuração
4. **Folha de pagamento dos 12 meses** (necessário para fator R em serviços do Anexo III/V)
5. **Sublimite estadual** vigente (R$ 3,6 mi para a maioria dos estados em 2026)
6. **ISS retido na fonte pelo tomador** (se houver) — para abater do DAS
7. **Empresa em início de atividade?** (proporcionalização da RBT12)

## Passo a passo

### 1. Validar enquadramento
- Confirmar que RBT12 ≤ R$ 4,8 mi (limite federal). Se ultrapassou, partir para 42-analise-tributaria-regime.
- Verificar se ultrapassou sublimite estadual de ICMS/ISS — receita acima do sublimite paga ICMS/ISS por fora (regime normal).
- CNAE permitido (consultar Resolução CGSN 140/2018, Anexos VI e VII de vedações).

### 2. Identificar o anexo de cada receita
- **Anexo I**: comércio
- **Anexo II**: indústria
- **Anexo III**: serviços com folha relevante (instalação, manutenção, agências de viagem, escritórios contábeis a partir de 2018, salões, academias)
- **Anexo IV**: construção civil, vigilância, limpeza (recolhe INSS patronal por fora — CPP em GPS)
- **Anexo V**: serviços intelectuais quando fator R < 28%
- **Fator R = Folha 12 meses / RBT12**. Se ≥ 28%, serviços do Anexo V migram para o Anexo III (mais barato). Calcular e documentar.

### 3. Calcular a alíquota efetiva (fórmula nuclear)

```
Alíquota Efetiva = ((RBT12 × Aliq Nominal) − Parcela a Deduzir) / RBT12
```

- **Aliq Nominal e PD**: tabela do anexo correspondente, faixa em que RBT12 se enquadra.
- A alíquota efetiva é aplicada sobre a receita do mês (não sobre RBT12).
- Se houver mais de um anexo, calcular alíquota efetiva por anexo, aplicar sobre a receita correspondente, somar.

### 4. Segregar receitas com tratamento especial
- **ICMS-ST / Substituição tributária**: aplicar a alíquota efetiva, mas **excluir a parcela do ICMS** (já recolhido pelo substituto). Mesmo princípio para PIS/COFINS monofásicos.
- **Exportação**: alíquota efetiva sem ICMS, ISS, PIS, COFINS, IPI (saem da composição).
- **ISS retido pelo tomador**: aplicar normalmente; o ISS recolhido pelo tomador é compensado/abatido no DAS.

### 5. Aplicar sublimite estadual
- Receita até o sublimite: ICMS/ISS dentro do DAS.
- Receita acima do sublimite: ICMS/ISS por fora (apurar e recolher conforme regime normal estadual/municipal). Continua no Simples para os demais tributos.

### 6. Gerar DAS
- Acessar PGDAS-D (Portal do Simples Nacional).
- Lançar receitas segregadas por anexo, com flags de ST/monofásico/exportação.
- Conferir cálculo do sistema com o cálculo manual (divergência > R$ 0,01 indica erro de classificação).
- Emitir DAS, vencimento dia 20 do mês subsequente.

## Templates

### Planilha de apuração (modelo)

```
EMPRESA: ____________________  CNPJ: __________  COMPETÊNCIA: ___/___

RBT12 (R$): _____________
Folha 12m: _____________  Fator R: _____%  → Anexo aplicável aos serviços: ___

RECEITAS DO MÊS:
  Comércio (Anexo I)............... R$ _________
  Indústria (Anexo II)............. R$ _________
  Serviços (Anexo ___)............. R$ _________
  Receita com ST/monofásico........ R$ _________
  Exportação....................... R$ _________
  TOTAL............................ R$ _________

ALÍQUOTAS EFETIVAS:
  Anexo I:  ((RBT12 × ___%) − ___) / RBT12 = ____%
  Anexo II: ____%
  Anexo III: ____%

DAS DEVIDO: R$ _________
ISS retido a abater: R$ _________
DAS A RECOLHER: R$ _________
```

### Exemplo numérico (fictício)

- Empresa de TI, Anexo III, RBT12 = R$ 1.800.000, Folha 12m = R$ 540.000 → Fator R = 30% → Anexo III mantido.
- Faixa 4 do Anexo III (R$ 720.000 a 1.800.000): Aliq Nominal 16%, PD R$ 35.640.
- Alíquota Efetiva = ((1.800.000 × 16%) − 35.640) / 1.800.000 = (288.000 − 35.640) / 1.800.000 = **14,02%**.
- Receita do mês: R$ 150.000. DAS = R$ 21.030.

## Erros comuns

- **Misturar receita com ST na base normal** → DAS pago a maior (cliente paga duas vezes o ICMS).
- **Esquecer fator R** em serviços intelectuais (advocacia, contabilidade, TI, medicina) → Anexo V (até 30,5%) quando deveria ser III (até 21%).
- **Usar receita do mês como RBT12** em empresa nova sem proporcionalizar (multiplicar pelo número de meses em atividade × 12).
- **Não abater ISS retido na fonte** quando o tomador é substituto.
- **Ignorar sublimite estadual** — ICMS/ISS continuam dentro do DAS quando deveriam sair.
- **Empresa com filial em estado com sublimite diferente** — apurar por estabelecimento.

## Checklist de validação

- [ ] CNAE confere com receita declarada (verificar se houve mudança no objeto social)
- [ ] RBT12 corresponde aos 12 meses anteriores (não acumulado do ano)
- [ ] Receita de ST/monofásico segregada e classificada corretamente
- [ ] Fator R calculado e documentado (com folha base)
- [ ] Sublimite estadual verificado para ICMS/ISS
- [ ] ISS retido na fonte abatido
- [ ] DAS conferido com cálculo manual (tolerância R$ 0,01)
- [ ] Vencimento agendado (dia 20)
- [ ] Comprovante arquivado na pasta do cliente

## Referências legais

- LC 123/2006 — Estatuto da MPE
- LC 155/2016 — fórmula da alíquota efetiva e novos anexos
- Resolução CGSN nº 140/2018 — regulamentação operacional
- IN RFB nº 2.005/2021 — DCTFWeb (substituto da DCTF mensal para Simples desde 2024)
