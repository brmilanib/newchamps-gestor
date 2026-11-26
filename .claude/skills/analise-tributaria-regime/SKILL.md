---
name: analise-tributaria-regime
description: Compara cargas de Simples, Lucro Presumido e Lucro Real para o cliente, projetando 12 meses, considerando ICMS, ISS, PIS/COFINS, IRPJ/CSLL, INSS e produzindo recomendação fundamentada.
allowed-tools: Read Grep Bash Edit Write
user-invocable: true
---

## Quando usar

- No início de cada ano-calendário (dezembro/janeiro): a opção pelo Simples deve ser feita até janeiro; pelo Lucro Real anual ou Presumido, no primeiro DARF do ano.
- Sempre que houver mudança relevante no negócio: novos sócios, mudança de atividade, expansão, queda de margem.
- Quando o cliente está prestes a estourar o limite do Simples (R$ 4,8 mi).

## Inputs necessários

1. Histórico de receita dos últimos 12 meses + projeção para os próximos 12
2. CNAE / atividades (define alíquotas, regime monofásico, cessão de mão de obra)
3. Folha de pagamento total e fator R
4. Custos diretos (CMV/CPV/CSP) e despesas operacionais
5. Insumos e despesas geradoras de crédito PIS/COFINS no Real
6. Receita de exportação
7. Aquisições de imobilizado previstas (CIAP, depreciação)
8. Estados onde opera (alíquotas ICMS internas e interestaduais)
9. Existência de benefícios fiscais (estaduais ou federais)

## Estrutura da análise

### Passo 1 — Cenário Simples Nacional (skill 01)

```
Para cada mês projetado:
- Receita do mês × alíquota efetiva = DAS
- Limites: R$ 4,8 mi anual; sublimite estadual
- Fator R para anexos III/V
```

Output: carga total Simples nos 12 meses.

### Passo 2 — Cenário Lucro Presumido (skill 02)

```
- IRPJ trimestral: receita × % presunção × 15% + adicional
- CSLL trimestral: receita × % CSLL × 9%
- PIS 0,65% × receita
- COFINS 3% × receita
- ICMS conforme estado / atividade
- ISS conforme município / item LC 116
- INSS: 20% folha + RAT × FAP + Terceiros
```

Output: carga total Presumido.

### Passo 3 — Cenário Lucro Real (skill 03)

```
- Apurar lucro real estimado (LAIR ± adições/exclusões)
- IRPJ 15% + adicional 10%
- CSLL 9%
- PIS 1,65% × receita − créditos
- COFINS 7,6% × receita − créditos
- INSS 20% + RAT × FAP + Terceiros (ou CPRB se for o caso)
```

Output: carga total Real.

### Passo 4 — Comparação

```
                Simples    Presumido   Real
Receita anual   ___        ___         ___
DAS / IRPJ      ___        ___         ___
PIS+COFINS      ___        ___         ___
INSS empresa    ___        ___         ___
ICMS            ___        ___         ___
ISS             ___        ___         ___
TOTAL CARGA     ___        ___         ___
% s/ receita    ___%       ___%        ___%
```

### Passo 5 — Sensibilidade

Reanalisar com:
- Receita +/− 20%
- Margem (lucro/receita) +/− 5pp
- Folha como % da receita +/− 5pp

Identificar **break-even** entre regimes.

## Heurísticas de partida

| Situação | Regime tipicamente vantajoso |
|---|---|
| Receita até R$ 4,8 mi, margem alta, folha baixa | Simples (Anexo III com fator R) |
| Receita até R$ 4,8 mi, comércio com margem média | Simples (Anexo I) |
| Receita até R$ 78 mi, margem alta (>32% no serviço, >8% comércio) | Lucro Presumido |
| Receita até R$ 78 mi, margem baixa | Lucro Real |
| Indústria com muita aquisição de insumo | Lucro Real (créditos PIS/COFINS, IPI) |
| Exportadora | Lucro Real (manutenção de créditos PIS/COFINS) |
| Atividade vedada ao Simples (factoring, instituição financeira) | Real obrigatório |
| Empresa nova, ainda cabe MEI (R$ 81k) | MEI |

## Templates

### Pacote de análise

```
CLIENTE __________________ CNPJ __________
Análise tributária ano-calendário ____

PROJEÇÃO DE RECEITA
Mês          Real_12m   Projet
Jan          ___        ___
Fev          ___        ___
...
Total        ___        ___

CENÁRIOS
              Simples    Presumido    Real
Carga total   R$ ____    R$ ____      R$ ____
% receita     __%        __%          __%
Saldo p/ caixa R$ ____   R$ ____      R$ ____

RISCOS / ATENÇÃO
[ ] Limite Simples (R$ 4,8 mi)
[ ] Sublimite estadual
[ ] Atividades vedadas
[ ] Substituição tributária / DIFAL
[ ] CPRB (desoneração)

RECOMENDAÇÃO: ____________
JUSTIFICATIVA:
1. ____________
2. ____________
3. ____________

PRAZO PARA OPÇÃO:
- Simples: até último dia útil de janeiro (com efeito retroativo a 1/jan)
- Lucro Real anual: 1ª DARF do ano (cód 2362)
- Lucro Real trimestral: idem 1ª DARF
- Presumido: 1ª DARF (cód 2089)

ASSINATURA RESPONSÁVEL TÉCNICO:
Contador __________ CRC __________
```

## Erros comuns

- Olhar só IRPJ/CSLL e ignorar ICMS/ISS — em comércio o ICMS é o tributo dominante.
- Esquecer INSS folha — Lucro Presumido com folha alta pode ficar pior que Real (que pode optar por CPRB).
- Não considerar créditos PIS/COFINS no Real (Tema 779 STJ — insumos amplos).
- Empresa em início de atividade no Simples: alíquota efetiva inicial é a da menor faixa (favorável).
- Migrar do Presumido para Real sem usar crédito presumido sobre estoque (Lei 10.637 art. 11) — perde dinheiro.
- Não verificar atividades vedadas no Simples (Anexo VI/VII Resolução CGSN 140).
- Análise estática sem cenário de crescimento — empresa vai estourar Simples em 6 meses.

## Checklist

- [ ] Histórico 12m + projeção 12m
- [ ] Atividades validadas (CNAE × regime)
- [ ] Cargas calculadas em cada cenário
- [ ] Sensibilidade (±20% receita, ±5pp margem)
- [ ] Heurísticas e exceções consideradas
- [ ] Recomendação fundamentada
- [ ] Cliente ciente do prazo de opção
- [ ] Pacote assinado pelo contador (CRC)
- [ ] Reapreciação prevista (ex.: revisão semestral)

## Referências

- LC 123/2006 (Simples)
- Lei 9.430/1996 (Presumido / Real)
- Lei 9.249/1995 (% presunção)
- IN RFB 1.700/2017
- Resolução CGSN 140/2018
- LC 175/2020 / 192/2022 (ISS)
- Lei 14.973/2024 (CPRB transição)
