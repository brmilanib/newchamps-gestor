# 01 — Regimes tributários, Reforma do Consumo e Reforma da Renda

> Base de conhecimento do "contador IA" do Grupo Newchamps (e-commerce em marketplaces + importação).
> Atualizado em **26/11/2026**. Itens marcados **(verificar)** não foram confirmados em fonte primária durante a pesquisa.
> Isto é material de referência, não parecer. Decisões de regime, cisão de empresas e distribuição de lucros devem ser validadas por contador/tributarista com os números reais do grupo.

## Novidades de 2026 que mudam a análise (ler primeiro)

| # | Norma | O que muda | Vigência |
|---|---|---|---|
| 1 | **LC 224/2025** (26/12/2025) | Lucro Presumido passa a ser tratado como "benefício fiscal": **+10% nos percentuais de presunção** sobre a parcela da receita bruta anual **acima de R$ 5 mi**. Corte linear de benefícios federais. **JCP: IRRF de 15% para 17,5%.** | IRPJ e JCP: 01/01/2026. CSLL: 01/04/2026 (noventena) |
| 2 | **LC 239/2026** (24/11/2026, publicada há 2 dias) | Altera o art. 4º, §4º da LC 224: o acréscimo na presunção **sobe de 10% para 20%**, e o corte linear de benefícios passa de 10% para 20% | IRPJ/IPI etc.: **01/01/2027**. CSLL/PIS/COFINS (noventena): **01/03/2027** (1º dia do 4º mês após a publicação) |
| 3 | **Lei 15.270/2025** (26/11/2025) | Isenção efetiva do IRPF até R$ 5 mil/mês. **Retenção de 10% sobre dividendos acima de R$ 50 mil/mês** (mesma PJ → mesma PF). **IRPF mínimo (IRPFM)** para renda anual acima de R$ 600 mil. Redutor que limita a carga PJ+PF a 34% | 01/01/2026 (IRPFM: ano-calendário 2026, DAA 2027) |
| 4 | **LC 227/2026** (13/01/2026) | 2ª lei de regulamentação da reforma: institui o **Comitê Gestor do IBS (CGIBS)**, trata do contencioso do IBS e do ITCMD, e altera a LC 214 | 14/01/2026 |
| 5 | **Decreto 12.955/2026** (Regulamento da CBS) + **Resolução CGIBS nº 6/2026** (Regulamento do IBS) | Regulamentos operacionais publicados em 30/04/2026 | 2026 |
| 6 | **Res. CGSN 186/2026, alterada pela 194/2026** | Opção do Simples pelo **regime regular de IBS/CBS** para 2027: de **01/09 a 30/10/2026**. Cancelamento: **03/11 a 20/12/2026** | Efeitos a partir de 01/01/2027 |
| 7 | **Ato Técnico Conjunto CGIBS/RFB nº 1/2026** (31/07/2026) e Ato Conjunto RFB/CGIBS nº 4/2026 | Adiaram a **rejeição** de NF-e/NFC-e sem os campos de IBS/CBS, que estava prevista para 03/08/2026. A obrigação de preencher os campos continua valendo | Ver seção 2.9 |

---

## 1. Regimes tributários

### 1.1 MEI (Microempreendedor Individual)
- **Base legal:** LC 123/2006, art. 18-A.
- **Limite:** R$ 81.000/ano (R$ 6.750/mês, proporcional no ano de abertura). Há projetos de lei para elevar o limite (PLP 108/2021 e outros), mas nenhum aprovado até esta data **(verificar)**.
- **Custo:** valor fixo mensal (DAS-MEI) = 5% do salário mínimo de INSS + R$ 1 de ICMS (comércio) e/ou R$ 5 de ISS.
- **Restrições:** só 1 empregado; não pode ser sócio de outra empresa; lista fechada de ocupações.
- **Reforma:** o MEI recolhe IBS/CBS em valores fixos dentro do DAS-MEI e **não pode** optar pelo regime regular de IBS/CBS (LC 214/2025, art. 41 **(verificar o parágrafo)**).
- **Para o Newchamps:** não serve para operar marketplace/importação em escala. No máximo para atividades periféricas de um sócio, e mesmo assim com risco de ser vista como **fragmentação artificial**.

### 1.2 Simples Nacional
- **Base legal:** LC 123/2006 (arts. 3º, 12–18, 17, 29, 30 e Anexos I a V, na redação da LC 155/2016).
- **Limites:** ME até R$ 360 mil; EPP até **R$ 4,8 mi** de receita bruta anual (art. 3º, II).
- **Sublimite estadual de R$ 3,6 mi** (art. 13-A, art. 19 e art. 20): acima dele, o **ICMS e o ISS saem do DAS** e são recolhidos pelo regime normal do estado/município (débito/crédito, ST, DIFAL). Os tributos federais continuam no DAS até R$ 4,8 mi.
- **Exclusão:** quem ultrapassa o limite em mais de 20% (receita acima de R$ 5,76 mi) é excluído no mês seguinte. Até 20% de excesso, a exclusão vale a partir de janeiro do ano seguinte (art. 30, IV e §1º).
- **Alíquota efetiva** = (RBT12 × Alíq. nominal − Parcela a deduzir) ÷ RBT12, em que RBT12 é a receita bruta dos últimos 12 meses (art. 18, §1º-A).

**Anexo I — Comércio (revenda de mercadorias; é o anexo do e-commerce)**

| Faixa | RBT12 (R$) | Alíq. nominal | Parcela a deduzir (R$) |
|---|---|---|---|
| 1 | até 180.000 | 4,00% | 0 |
| 2 | 180.000,01 – 360.000 | 7,30% | 5.940 |
| 3 | 360.000,01 – 720.000 | 9,50% | 13.860 |
| 4 | 720.000,01 – 1.800.000 | 10,70% | 22.500 |
| 5 | 1.800.000,01 – 3.600.000 | 14,30% | 87.300 |
| 6 | 3.600.000,01 – 4.800.000 | 19,00% | 378.000 |

Exemplos: com RBT12 de R$ 1,2 mi a alíquota efetiva é ≈ 8,83%; com R$ 3,0 mi, ≈ 11,39%; com R$ 4,5 mi, ≈ 10,6% federal, porque o ICMS sai do DAS e passa a ser recolhido por fora, o que na prática encarece. Na faixa 1, a partilha do DAS é: IRPJ 5,5%, CSLL 3,5%, COFINS 12,74%, PIS 2,76%, CPP 41,5%, ICMS 34%.

**Demais anexos (resumo)**

| Anexo | Atividade | Faixa 1 → Faixa 6 (alíq. nominal) |
|---|---|---|
| II | Indústria | 4,5% → 30% (PD 6ª faixa R$ 720 mil) |
| III | Serviços (ex.: manutenção, agência, e serviços do Anexo V com Fator R ≥ 28%) | 6% → 33% (PD R$ 648 mil) |
| IV | Construção, vigilância, limpeza, advocacia (CPP paga por fora, 20% sobre a folha) | 4,5% → 33% (PD R$ 828 mil) |
| V | Serviços intelectuais/técnicos (TI, consultoria, publicidade, engenharia) com Fator R < 28% | 15,5% → 30,5% (PD R$ 540 mil) |

- **Fator R** (art. 18, §§5º-J e 5º-M): folha de salários dos últimos 12 meses (incluindo pró-labore e FGTS) ÷ RBT12. Se for **≥ 28%**, a atividade do Anexo V é tributada pelo **Anexo III**. Isso importa para empresas de serviços do grupo, como agência, marketing ou TI, e não para a revenda.
- **Segregação de receitas no DAS** (art. 18, §4º-A): receitas com **ICMS-ST** já retido e de produtos **monofásicos de PIS/COFINS** (autopeças, cosméticos, medicamentos, bebidas etc.) têm o percentual correspondente excluído do DAS. É uma economia frequentemente esquecida no e-commerce.
- **Importação no Simples:** permitida. O ICMS, IPI, II, PIS/COFINS-Importação e AFRMM da importação são pagos **fora do DAS** (art. 13, §1º, XII). Na revenda de importado, o IPI não é destacado, mas o importador é equiparado a industrial **(verificar o enquadramento caso a caso)**.
- **DIFAL nas vendas B2C interestaduais:** o Simples recolhe o DIFAL (EC 87/2015; LC 190/2022) quando a legislação do estado de destino exigir. O tema tem disputa no STF (Tema 517 e decisões estaduais) **(verificar a situação por UF)**.
- **Vedações relevantes para grupos** (art. 3º, §4º): não pode se beneficiar do Simples a PJ:
  - (III) cujo titular ou sócio participe de **outra empresa do Simples** quando a receita **global** ultrapassar R$ 4,8 mi;
  - (IV) cujo sócio tenha **mais de 10%** de outra empresa não optante, com receita global acima do limite;
  - (V) cujo sócio seja **administrador** de outra PJ com fins lucrativos, com receita global acima do limite;
  - (VII) que participe do capital de outra PJ, ou (II) que seja filial/representação de PJ estrangeira.
- **Exclusão de ofício** (art. 29): inclui constituição da empresa por **interpostas pessoas** (IV), embaraço à fiscalização e falta de escrituração do caixa. O impedimento é de **3 anos**, ou **10 anos** em caso de fraude/simulação (art. 29, §§1º e 2º).
- **Reforma:** de 2027 a 2028 a partilha dos Anexos troca PIS/COFINS por CBS. O Senado já publicou tabelas do Anexo I "vigência 01/01/2027 a 31/12/2028", e as alíquotas nominais seriam as mesmas, com mudança só na partilha **(verificar)**.

### 1.3 Lucro Presumido
- **Base legal:** Lei 9.249/1995, art. 15 (IRPJ) e art. 20 (CSLL); Lei 9.430/1996, arts. 25 a 27; Lei 9.718/1998, art. 13 (limite de **R$ 78 mi**/ano).
- **Presunções (sobre a receita bruta):**

| Atividade | IRPJ | CSLL |
|---|---|---|
| Comércio/revenda de mercadorias, indústria | **8%** | **12%** |
| Revenda de combustíveis | 1,6% | 12% |
| Transporte de cargas | 8% | 12% |
| Serviços em geral, intermediação, locação de bens, administração de imóveis | **32%** | **32%** |
| Serviços até R$ 120 mil/ano (exceto profissões regulamentadas) | 16% | 32% |

- **IRPJ:** 15% + **adicional de 10%** sobre a base que exceder R$ 20 mil/mês (R$ 60 mil/trimestre) (Lei 9.249, art. 3º, §1º). **CSLL:** 9%. Apuração trimestral.
- **PIS/COFINS cumulativos:** 0,65% + 3% = **3,65%** sem créditos (Lei 9.718/1998).
- **Carga federal típica no comércio:** cerca de **5,9% a 6,7% da receita** (IRPJ 1,2% + adicional até 0,8% + CSLL 1,08% + PIS/COFINS 3,65%). A esse valor se somam ICMS e a folha (CPP 20% + RAT + terceiros).

**Majoração pela LC 224/2025, art. 4º, §§4º, VII, e 5º (alterada pela LC 239/2026)**
- O acréscimo se aplica **somente sobre a parcela da receita bruta anual que exceder R$ 5 mi**, controlado proporcionalmente por período de apuração (**R$ 1,25 mi por trimestre**, com ajuste nos períodos seguintes) e proporcionalmente às receitas de cada atividade (§5º, I e II). A regulamentação está no Decreto 12.808/2025 e na **IN RFB 2.305/2025**.
- **2026 (acréscimo de 10%):** comércio passa de 8% para **8,8%** (IRPJ) e de 12% para **13,2%** (CSLL) sobre o excedente; serviços passam de 32% para **35,2%**. CSLL majorada só a partir de **01/04/2026**.
- **2027 (LC 239/2026, acréscimo de 20%):** comércio **9,6%** (IRPJ) e **14,4%** (CSLL); serviços **38,4%**. Vigência: IRPJ em **01/01/2027**, CSLL em **01/03/2027**.
- **Impacto no comércio, por R$ 1 mi de receita excedente:** em 2026, IRPJ+adicional sobe ≈ R$ 2.000 e CSLL ≈ R$ 1.080 (≈ +0,31% da receita excedente). Em 2027 o efeito dobra (≈ +0,62%).
- **Judicialização:** há ações (inclusive decisões no TRF3) e artigos sustentando a inconstitucionalidade de tratar o Lucro Presumido como "benefício" **(acompanhar)**.
- **JCP:** a LC 224, art. 8º, alterou o art. 9º, §2º, da Lei 9.249, e o IRRF passou de 15% para **17,5%** a partir de 2026.
- **Corte linear de benefícios** (LC 224, art. 4º, §4º, I a VI, e §8º): isenções e alíquota zero passam a 10% (2026) e depois 20% (2027, pela LC 239) da alíquota padrão; reduções de base e créditos presumidos ficam limitados a 90% e depois 80%. **Não se aplica** ao Simples Nacional (art. 146, III, "d", da CF, §8º, VI), à ZFM e às ALCs, à cesta básica da LC 214, à CPRB, a imunidades e ao Prouni, entre outros.

### 1.4 Lucro Real
- **Base legal:** Lei 9.430/1996; Decreto 9.580/2018 (RIR/2018); Lei 12.973/2014. É **obrigatório** acima de R$ 78 mi de receita, para quem tem lucros do exterior e em outras hipóteses (Lei 9.718/1998, art. 14).
- **IRPJ** 15% + 10% de adicional e **CSLL** 9% sobre o **lucro líquido ajustado** (adições e exclusões no LALUR/e-Lacs). Na prática, **34%** do lucro tributável. A apuração pode ser trimestral ou anual com estimativas mensais, com possibilidade de suspensão/redução por balancete.
- **Prejuízo fiscal:** compensável com o limite de 30% do lucro de cada período (Lei 9.065/1995, art. 15).
- **PIS/COFINS não cumulativos:** 1,65% + 7,6% = **9,25%**, com créditos (Lei 10.637/2002 e Lei 10.833/2003, art. 3º):
  - **comércio:** créditos sobre bens adquiridos para revenda (inclusive importados, pelo PIS/COFINS-Importação pago — Lei 10.865/2004, art. 15), energia elétrica, aluguéis de PJ, depreciação de máquinas, armazenagem e **frete na operação de venda** quando suportado pelo vendedor (Lei 10.833, art. 3º, IX);
  - o conceito de **insumo** (essencialidade e relevância, STJ REsp 1.221.170/PR, Tema 779) é mais restrito para comércio puro. Créditos sobre **comissões de marketplace**, anúncios e fulfillment são controvertidos **(verificar posição atual do CARF/RFB)**;
  - o ICMS é excluído da base do PIS/COFINS (STF Tema 69, RE 574.706), e o ICMS **destacado** não gera crédito de PIS/COFINS (Lei 14.592/2023).
- **Incentivos de ICMS (subvenções):** desde 2024 a **Lei 14.789/2023** tributa as subvenções de ICMS por IRPJ/CSLL/PIS/COFINS. Em troca, há **crédito fiscal de 25%** (IRPJ) sobre as subvenções para implantação ou expansão de empreendimento, mediante habilitação. Isso afeta importadores que usam TTD/Corredor de importação (SC, ES, MG, AL etc.).
- **Quando compensa:** margem líquida baixa, prejuízo, grande volume de crédito de PIS/COFINS (importação com PIS/COFINS-Imp de 2,1% + 9,65% para a maioria dos NCMs **(verificar o NCM)**) e receita acima de R$ 5 mi (por causa da majoração do Presumido). **Regra de bolso no comércio:** se a margem líquida antes de IR estiver **abaixo de ~8 a 10% da receita**, o Real tende a ganhar, e a LC 239 desloca esse ponto para cima. Sempre simular com os números reais.

### 1.5 Comparativo rápido (comércio, federal, sem ICMS)

| Regime | IR/CSLL | PIS/COFINS | Observação |
|---|---|---|---|
| Simples (Anexo I) | dentro do DAS | dentro do DAS | DAS inclui CPP e ICMS (até R$ 3,6 mi) |
| Presumido | ≈ 2,3–3,1% da receita (mais com a LC 224/239 acima de R$ 5 mi) | 3,65% cumulativo | Simples de operar, sem crédito |
| Real | 34% do lucro efetivo | 9,25% − créditos | Melhor com margem baixa e importação |

---

## 2. Reforma Tributária do Consumo (IBS/CBS/IS)

### 2.1 Arcabouço legal
- **EC 132/2023:** cria IBS (estados e municípios), CBS (União) e Imposto Seletivo (IS). Arts. 156-A, 195, V, e 153, VIII, da CF, e arts. 124 a 135 do ADCT (transição).
- **LC 214/2025** (16/01/2025): institui IBS, CBS e IS. Define fato gerador, base, não cumulatividade, split payment, regimes diferenciados e específicos, cashback, importação, Simples e transição (arts. 343 e seguintes).
- **LC 227/2026** (13/01/2026): institui o **CGIBS** (administração, arrecadação e distribuição do IBS), o contencioso administrativo do IBS e normas gerais do **ITCMD** (relevante para holding/sucessão). Faz ajustes na LC 214 e teve vetos.
- **Regulamentos:** CBS pelo **Decreto 12.955/2026**; IBS pela **Resolução CGIBS nº 6/2026** (30/04/2026), com ajustes posteriores (Res. CGIBS nº 20/2026, 17/11/2026 **(verificar o conteúdo)**).
- **Obrigações acessórias:** Ato Conjunto RFB/CGIBS nº 1/2025 (22/12/2025). Tabelas cClassTrib/CST no **Informe Técnico 2025.002** (versão 1.7x em out/2026).

### 2.2 Cronograma da transição (ADCT arts. 125–133; LC 214 arts. 343+)

| Ano | CBS | IBS | PIS/COFINS | IPI | ICMS / ISS | IS |
|---|---|---|---|---|---|---|
| **2026** | **0,9%** (teste) | **0,1%** (teste) | integrais | integral | integrais | — |
| **2027** | **alíquota cheia** (menos 0,1 p.p.) | 0,1% (0,05 estadual + 0,05 municipal) | **extintos** | **zerado** (exceto produtos com industrialização incentivada na ZFM) | integrais | **começa** |
| 2028 | cheia (−0,1 p.p.) | 0,1% | — | idem | integrais | sim |
| **2029** | cheia | sobe | — | — | **90%** das alíquotas | sim |
| 2030 | cheia | sobe | — | — | **80%** | sim |
| 2031 | cheia | sobe | — | — | **70%** | sim |
| 2032 | cheia | sobe | — | — | **60%** | sim |
| **2033** | cheia | **cheio** | — | — | **extintos** | sim |

- **Alíquota de referência:** fixada por Resolução do Senado. As estimativas oficiais apontam IVA dual (CBS+IBS) de ~26,5% a 28%. A LC 214 prevê revisão para trazer a alíquota a 26,5% se ela for superada (art. 475 **(verificar)**). A alíquota exata da CBS para 2027 ainda depende de cálculo/resolução **(verificar antes de precificar 2027)**.
- **Lei 15.270, art. 5º:** a arrecadação excedente da reforma da renda será usada como fonte de compensação para reduzir a alíquota de referência da CBS.

### 2.3 Ano-teste de 2026
- As NF-e/NFC-e de contribuintes do **regime regular** (Presumido/Real) destacam **CBS 0,9%** e **IBS 0,1%**.
- O valor **pode ser compensado com PIS/COFINS** devidos, ou há **dispensa de recolhimento** para quem cumpre as obrigações acessórias (LC 214, art. 348, §1º, entre outros **(verificar a numeração exata dos arts. 343–348)**).
- **Simples Nacional e MEI não se sujeitam** às alíquotas-teste em 2026 (art. 348, III, "c" **(verificar)**). Para eles, o destaque é facultativo em 2026.
- **Penalidades:** o Ato Conjunto RFB/CGIBS nº 1/2025 dispensa multas pela falta dos campos até o 1º dia do 4º mês após a publicação dos regulamentos comuns. Como os regulamentos saíram em 30/04/2026, a dispensa iria até ~01/08/2026 **(verificar se foi prorrogada)**.

### 2.4 Princípios e mecânica do IBS/CBS
- **Base ampla:** incide sobre operações com bens materiais **e imateriais**, inclusive direitos e serviços (LC 214, art. 4º). O ICMS, ISS, IPI e PIS/COFINS deixam de compor a base. É um imposto "por fora".
- **Destino:** o IBS pertence ao estado/município do **destino** (adquirente/entrega) (art. 11). Isso acaba com a guerra fiscal e com a vantagem de localizar o CD em estado com benefício.
- **Não cumulatividade plena ("crédito amplo")** (arts. 47 a 57): crédito de tudo o que é adquirido, **exceto bens de uso e consumo pessoal** (art. 57: veículos de passeio, joias, bebidas, alimentação, saúde e educação de sócios etc., salvo exceções). O crédito fica condicionado ao **efetivo pagamento** do tributo da etapa anterior (via split payment ou recolhimento pelo fornecedor).
  - Para o e-commerce, passam a gerar crédito: **comissões de marketplace, anúncios (Mercado Ads/Shopee Ads/Google), frete, fulfillment, armazenagem, software/SaaS, energia, aluguel, embalagens** e o IBS/CBS pagos na importação.
- **Ressarcimento:** saldo credor ressarcível em prazos definidos (arts. 39 e seguintes **(verificar)**). Ganha relevância para importador com estoque alto.

### 2.5 Split payment (LC 214, arts. 31 a 35)
- No pagamento eletrônico (PIX, boleto, cartão, transferência), o prestador de serviço de pagamento **segrega o IBS/CBS** e repassa ao fisco. O fornecedor recebe o valor líquido.
- **Cronograma:** previsto para **2027 em caráter facultativo e gradual**, começando por operações **B2B** e fora do cartão. O Decreto 12.955/2026 prevê pelo menos duas etapas. O setor financeiro fala em piloto em mar/2027 e fase definitiva em out/2027. Segundo a imprensa, a obrigatoriedade plena viria só em **2028** **(verificar)**.
- **Impacto no caixa:** acaba o "float" do tributo. Marketplaces (Mercado Pago, Shopee Pay etc.) serão agentes de retenção/repasse. Rever contratos e conciliação de repasses.

### 2.6 Plataformas digitais / marketplaces (LC 214, art. 22; regulamentos)
- A **plataforma digital** (inclusive estrangeira) que intermedia a operação é **responsável solidária**, ou substituta, pelo IBS/CBS do vendedor, nas hipóteses do art. 22 e dos regulamentos (Res. CGIBS 6/2026; Decreto 12.955/2026).
- Se o vendedor for **contribuinte inscrito** (regular ou Simples) e emitir documento fiscal, a responsabilidade da plataforma é mitigada. Se o vendedor **não emitir NF** ou não estiver inscrito, a plataforma responde e tende a **reter, bloquear ou exigir conformidade**.
- **Consequência prática:** os marketplaces vão exigir NF-e com cClassTrib/CST corretos, CNPJ regular e conciliação venda × nota. Seller sem nota tende a ser descredenciado.
- **Importação via plataforma (remessas internacionais/cross-border):** o IBS/CBS incide na importação de bens materiais, inclusive remessas, com a plataforma/remessa conforme como responsável (LC 214, arts. 63 e seguintes e regras de remessa **(verificar os artigos)**). O "Programa Remessa Conforme" e o II de 20% para compras até US$ 50 (Lei 14.902/2024) continuam como tema aduaneiro à parte.

### 2.7 Regimes diferenciados, específicos e cashback
- **Redução de 60%** (LC 214, arts. 128 e seguintes): saúde, educação, dispositivos médicos e de acessibilidade, medicamentos, alimentos destinados ao consumo humano (lista), higiene pessoal e limpeza de baixa renda, insumos agropecuários, produções artísticas/culturais etc.
- **Redução de 30%** (art. 127): serviços de profissões intelectuais regulamentadas (advogados, contadores, engenheiros, médicos etc.), sujeita a requisitos.
- **Alíquota zero:** **Cesta Básica Nacional** (Anexo I da LC 214), alguns medicamentos e dispositivos, hortícolas, frutas e ovos etc.
- **Regimes específicos:** combustíveis (monofásico), serviços financeiros, planos de saúde, bens imóveis (com redutores), bares/restaurantes, hotelaria, agências de turismo etc.
- **Imposto Seletivo** (arts. 409 e seguintes): fumo, bebidas alcoólicas e açucaradas, veículos, embarcações e aeronaves, bens minerais, apostas/fantasy. Começa em 2027. Importa se o grupo vender esses itens.
- **Cashback** (arts. 112 a 124): devolução a famílias do CadÚnico. 100% da CBS e 20% do IBS no gás de botijão; 50% da CBS e 20% do IBS em energia, água, esgoto e telecom; 20% nos demais casos **(verificar os percentuais por item)**. Não altera a apuração do vendedor, mas exige NF com CPF.
- **Para o Newchamps:** confirmar o **NCM de cada SKU** e se cai em redução de 60%, alíquota zero ou IS. Isso define o cClassTrib e o preço.

### 2.8 Simples Nacional na reforma (LC 214, art. 41; LC 123 alterada)
- **Padrão ("por dentro"):** IBS/CBS são recolhidos **dentro do DAS**, na partilha do Anexo. O cliente **B2B** só toma crédito equivalente ao valor efetivamente recolhido no DAS, que é bem menor que a alíquota cheia.
- **Opção pelo regime regular de IBS/CBS ("por fora", "híbrido"):** a empresa continua no Simples para IRPJ/CSLL/CPP/ICMS, mas apura IBS/CBS por débito e crédito, com alíquota cheia, **gerando crédito integral ao cliente** e **tomando créditos** das compras.
  - Prazos para 2027: opção de **01/09 a 30/10/2026**; cancelamento de **03/11 a 20/12/2026** (Res. CGSN 186/2026 com a redação da Res. CGSN 194/2026). A Res. 186 indica que essa opção inicial cobre **jan–jun/2027**, com nova janela semestral; uma fonte cita uma janela em março/2027 **(verificar)**.
  - **Quando compensa:** vendas majoritariamente **B2B** (revenda para lojistas e empresas), compras com muito crédito (importação com IBS/CBS pago, frete, comissões) e margem que suporte a alíquota cheia.
  - **Quando não compensa:** venda **B2C** em marketplace (o consumidor final não toma crédito), que é o caso típico do Newchamps. Nesse caso, o Simples "por dentro" tende a ser mais barato.
- O ICMS do Simples continua no DAS até 2032, sendo reduzido proporcionalmente de 2029 a 2032 **(verificar a mecânica de partilha)**.

### 2.9 NF-e / NFC-e: novos campos (NT 2025.002 e Informe Técnico 2025.002)
- **Grupo `IBSCBS` por item:** **CST IBS/CBS** (3 dígitos), **cClassTrib** (6 dígitos, código de classificação tributária que, com o CST, define incidência, redução, diferimento ou crédito presumido), base de cálculo, alíquotas e valores de IBS UF, IBS Município e CBS, além de grupos de redução, diferimento, crédito presumido, monofásico e totais (`IBSCBSTot`).
- **Campos novos por documento:** tipo de operação/ente governamental, indicador de doação, município de ocorrência (cMunFGIBS) etc. **(verificar o leiaute vigente NT 2025.002 v1.3x)**.
- **Status de obrigatoriedade em 2026:**
  - desde 01/01/2026, as empresas do regime regular devem informar os campos (LC 214 e Ato Conjunto nº 1/2025);
  - a **rejeição** automática de notas sem os campos estava prevista para **03/08/2026** e foi **adiada** pelo Ato Técnico Conjunto CGIBS/RFB nº 1/2026 (31/07/2026) e pelo Ato Conjunto RFB/CGIBS nº 4/2026. Um comunicado de mercado cita **05/10/2026** como nova data. A obrigação legal permanece e a falta dos campos sujeita a penalidade **(verificar a data vigente de rejeição no Portal NF-e)**;
  - **Simples Nacional:** os campos são facultativos em 2026. Para 2027, a NF-e do Simples também deve trazer IBS/CBS; um blog técnico cita cronograma com 01/01/2027 e 01/03/2027 **(verificar)**.
- O **Programa Nacional de Conformidade** de 2026 (Ato Conjunto RFB/CGIBS nº 5/2026) considera "conforme" quem aumenta progressivamente a emissão com os campos corretos.
- **Ação:** cadastrar cClassTrib/CST em todos os SKUs no ERP/hub (Bling, Tiny, Olist etc.) e validar com o marketplace.

### 2.10 Incentivos de ICMS e Fundo de Compensação
- Os benefícios de ICMS ficam convalidados até **31/12/2032** (LC 160/2017; EC 132, ADCT art. 128) e **acabam com o ICMS em 2033**. O IBS **não admite** benefícios estaduais.
- **Fundo de Compensação de Benefícios Fiscais** (EC 132, ADCT art. 12): compensa os titulares de benefícios **onerosos** concedidos até 31/05/2023 e regularmente fruídos, de 2029 a 2032. Aportes da União: R$ 8 bi (2025), 16 (2026), 24 (2027), 32 (2028), 32 (2029), 24 (2030), 16 (2031) e 8 bi (2032). Exige **habilitação** e regras da LC 214 (arts. 384 e seguintes **(verificar)**).
- **Fundo de Desenvolvimento Regional** (ADCT art. 13): substitui a guerra fiscal com recursos da União.
- **Para importador:** TTD/SC, Compete/ES, Pró-Emprego, Corredor de Importação/MG e similares perdem valor progressivamente de 2029 a 2032. Avaliar habilitação ao Fundo (se o benefício for oneroso) e a tributação federal da subvenção (Lei 14.789/2023).

---

## 3. Reforma da Renda — Lei 15.270/2025

### 3.1 Isenção até R$ 5 mil (Lei 9.250, arts. 3º-A e 11-A)
- Redução mensal que **zera o IR** para rendimentos tributáveis de até **R$ 5.000/mês** (redução de até R$ 312,89). Entre R$ 5.000,01 e R$ 7.350, a redução é de R$ 978,62 − 0,133145 × rendimento, decrescente. Acima de R$ 7.350 não há redução.
- **Anual** (a partir da DAA 2027, ano-calendário 2026): zera o IR até R$ 60 mil/ano. Entre R$ 60 mil e R$ 88,2 mil, a redução é de R$ 8.429,73 − 0,095575 × rendimento.
- **Efeito sobre o pró-labore:** um pró-labore de até R$ 5 mil/mês fica **sem IRPF** (continua o INSS de 11% até o teto).

### 3.2 Retenção de 10% sobre dividendos (Lei 9.250, art. 6º-A)
- A partir de **jan/2026**, lucros e dividendos pagos por **uma mesma PJ** a **uma mesma PF residente** acima de **R$ 50.000 no mês** sofrem **IRRF de 10% sobre o total** (não só sobre o excedente), **sem deduções**. Vários pagamentos no mesmo mês são somados e o IR é recalculado (§§1º e 2º).
- É **antecipação** do IRPFM e é compensada na declaração anual (art. 16-A, §5º).
- **Remessa ao exterior:** IRRF de **10%** sobre dividendos remetidos a não residentes (Lei 9.249, art. 10, §4º), com crédito opcional se a soma das cargas passar de 34% (art. 10-A).
- **Transição (art. 6º-A, §3º; art. 16-A, §1º, XII; art. 10, §5º, da Lei 9.249):** ficam fora da retenção e do IRPFM os lucros que atendam cumulativamente a três condições:
  1. sejam relativos a resultados apurados **até o ano-calendário de 2025**;
  2. tenham distribuição **aprovada até 31/12/2025** pelo órgão societário competente (ata/alteração contratual);
  3. sejam pagos nos termos originalmente previstos na aprovação. Para o IRPFM, o pagamento deve ocorrer **em 2026, 2027 ou 2028**.
- → Verificar se as empresas do grupo aprovaram até 31/12/2025 a distribuição dos lucros acumulados até 2025, e **cumprir o cronograma da ata à risca**. Pagamento fora do previsto perde a proteção.
- **Simples Nacional:** a **RFB entende que a retenção se aplica** também a dividendos de optantes do Simples (Perguntas e Respostas RFB, pergunta 10, segundo o IOB). A doutrina majoritária sustenta a isenção do **art. 14 da LC 123** (uma lei ordinária não revoga lei complementar). Há a **ADI 7.914 (CNI)** no STF e ações individuais. **Tema controvertido.** Por prudência, reter ou buscar uma decisão judicial própria.

### 3.3 IRPF Mínimo — IRPFM (Lei 9.250, art. 16-A)
- Aplica-se à PF com **soma de todos os rendimentos** no ano acima de **R$ 600 mil**, a partir do ano-calendário 2026 (DAA 2027).
- **Base:** todos os rendimentos, inclusive isentos, exclusivos na fonte e dividendos. **Excluem-se**, entre outros: ganhos de capital (exceto bolsa), poupança, LCI/LCA/CRI/CRA/LIG/LCD, debêntures incentivadas, FII/Fiagro com cotas em bolsa e ≥ 100 cotistas, heranças/doações em adiantamento de legítima, indenizações, moléstia grave e **lucros de 2025 cobertos pela transição**.
- **Alíquota:** para rendimentos ≥ R$ 1,2 mi, **10%**. Entre R$ 600 mil e R$ 1,2 mi, **Alíq% = (REND ÷ 60.000) − 10** (linear de 0 a 10%). Ex.: R$ 900 mil → 5%.
- **Deduções do IRPFM devido** (§3º): IRPF da declaração anual, IR exclusivo na fonte sobre rendimentos da base (ex.: JCP e aplicações), IR da Lei 14.754/2023 (offshores/fundos), outros IR definitivos e o **redutor do art. 16-B**. Depois se abate o IRRF de 10% já retido (§5º).

### 3.4 Redutor — limite de 34% de carga combinada (Lei 9.250, art. 16-B)
- Se a **alíquota efetiva da PJ** (IRPJ+CSLL devidos ÷ lucro contábil antes dos tributos) **somada à alíquota efetiva do IRPFM** ultrapassar **34%** (40% para seguradoras e financeiras; 45% para bancos), o excesso é devolvido como redutor, calculado por PJ pagadora.
- O redutor depende da apresentação de **demonstrações financeiras** conforme a legislação societária (§4º).
- **Empresas fora do Lucro Real** podem usar o **lucro contábil simplificado** (§6º): faturamento − folha/pró-labore e encargos − custo das mercadorias − aluguéis − juros bancários − depreciação (indústria).
- **Leitura prática:**
  - **Lucro Real com carga efetiva próxima de 34%:** o redutor tende a zerar o IRPFM sobre os dividendos dessa PJ.
  - **Presumido/Simples com lucro contábil alto e carga efetiva baixa** (ex.: 10–15%): o IRPFM de até 10% "pega", e a carga total sobe para ~20–25%, ainda abaixo de 34%, portanto sem redutor.
  - **Contabilidade regular** (balanço, DRE) deixa de ser opcional para quem quer o redutor.

### 3.5 JCP
- O IRRF sobre JCP sobe para **17,5%** a partir de 2026 (LC 224, art. 8º). A dedutibilidade continua limitada à TJLP × PL ajustado (Lei 9.249, art. 9º, com as mudanças da Lei 14.789/2023 na base do PL).
- Só faz sentido no **Lucro Real**. A economia é de 34% (PJ) − 17,5% (PF) = **16,5 p.p.** O JCP entra na base do IRPFM, mas o IR retido é dedutível.
- Houve propostas no Congresso para extinguir ou limitar o JCP **(verificar PLs em trâmite)**.

---

## 4. Implicações práticas para o Grupo Newchamps (e-commerce + importação)

### 4.1 Qual regime em cada faixa (receita bruta anual por CNPJ, revenda B2C em marketplace)

| Faixa de receita | Tendência | Por quê | Atenção |
|---|---|---|---|
| até ~R$ 1,8 mi | **Simples (Anexo I)** | Efetiva de 4% a ~10,7%, já com ICMS e CPP | Segregar monofásico/ST. DIFAL |
| R$ 1,8–3,6 mi | Simples, mas **simular o Presumido/Real** | Efetiva de ~10% a 11,9%. Com folha pequena, o Presumido pode empatar | A CPP está no DAS: com folha relevante, o Simples ganha |
| R$ 3,6–4,8 mi | **Avaliar sair do Simples** | ICMS por fora + 19% nominal. A 6ª faixa costuma ser a pior | Planejar a migração em janeiro |
| R$ 4,8–5 mi | Presumido ou Real | Fora do Simples | Margem baixa favorece o Real |
| acima de R$ 5 mi | **Lucro Real**, salvo margem alta | Majoração da presunção de +10% (2026) e +20% (2027); crédito de PIS/COFINS na importação | Exige contabilidade robusta, LALUR, EFD-Contribuições |
| a partir de 2027 | Real/Presumido equivalentes no IBS/CBS | IBS/CBS são iguais nos dois regimes (débito/crédito). A diferença fica só no IRPJ/CSLL | O Presumido perde o "atalho" do PIS/COFINS cumulativo de 3,65% |

- **Importador:** no Real, o PIS/COFINS-Importação gera crédito, o que pesa a favor do Real. A partir de 2027, IBS/CBS na importação geram crédito em qualquer regime regular. No Simples "por dentro", o importador **não credita** o IBS/CBS pago na importação.
- **Margem baixa de marketplace** (comissões de 11–20% + frete + ads) **favorece o Lucro Real**, porque o IR incide sobre o lucro real. Simular trimestralmente.
- **Mudança de regime:** é anual e irretratável, feita com o 1º DARF/DAS de janeiro (Presumido/Real) ou pela opção no Simples em janeiro.

### 4.2 Pró-labore × dividendos depois de 2026
- **Pró-labore:** INSS do sócio de 11% até o teto do RGPS (valor de 2026 **(verificar)**); CPP patronal de 20% no Presumido/Real (no Simples Anexo I/II/III/V está dentro do DAS); IRPF pela tabela, **zero até R$ 5 mil/mês**.
  - **Faixa ótima no Simples Anexo I:** pró-labore de ~R$ 5 mil (sem IR, INSS de 11%, sem CPP adicional) e o restante como dividendos.
  - No Presumido/Real, o custo do pró-labore = 20% CPP + 11% INSS + IR. O pró-labore é dedutível no Real (34%).
- **Dividendos:**
  - **até R$ 50 mil/mês por PJ por sócio:** sem retenção;
  - **acima disso:** 10% na fonte sobre o total;
  - **anual:** se a renda total do sócio passar de R$ 600 mil, IRPFM de até 10%, com o redutor de 34%;
  - os dividendos exigem **lucro contábil apurado e escrituração** (Lei 6.404, art. 201; IN RFB 1.700/2017, art. 238). Sem escrituração, só a presunção menos os tributos é isenta.
- **Estratégias legítimas:**
  1. Distribuir em parcelas de até R$ 50 mil/mês por PJ: evita a retenção mensal, mas **não** o IRPFM anual. Ajuda no caixa.
  2. Manter Lucro Real com carga efetiva próxima de 34% nas operações lucrativas: o redutor neutraliza o IRPFM.
  3. JCP no Lucro Real, dentro do limite.
  4. Investimentos isentos fora da base do IRPFM (LCI/LCA/CRI/CRA, FII listados) para a PF.
  5. Retenção de lucros na PJ para reinvestimento (sem tributação na PF até a distribuição).
- **Cuidado:** "dividendos" pagos sem lucro contábil, ou adiantamentos disfarçados ao sócio, podem ser requalificados como remuneração (IRPF de 27,5% + INSS).

### 4.3 Holding patrimonial
- **Prós:**
  - planejamento sucessório (doação de quotas com reserva de usufruto, cláusulas de inalienabilidade e incomunicabilidade);
  - **ITBI:** imunidade na integralização de imóveis ao capital (CF art. 156, §2º, I), mas o STF limita a imunidade ao valor do capital integralizado (Tema 796) e ela não se aplica se a atividade preponderante for imobiliária;
  - concentração de dividendos das operacionais (PJ → PJ: dividendos isentos na holding, Lei 9.249, art. 10, e a retenção do art. 6º-A só alcança PF);
  - governança e acordo de sócios.
- **Contras e mudanças:**
  - a **retenção de 10% e o IRPFM** atingem quando a holding distribui à PF. A holding **não elimina** a tributação, apenas a difere;
  - **ITCMD progressivo obrigatório** (CF art. 155, §1º, VI, pela EC 132) e normas gerais da LC 227/2026: base pelo valor de mercado e não pelo valor contábil das quotas **(verificar as regras da LC 227 e a lei do seu estado)**. A vantagem de "doar quotas a valor contábil" diminuiu;
  - holding de aluguel no Presumido: presunção de 32% → ~11,33% de IRPJ/CSLL + PIS/COFINS de 3,65%. Com a LC 224/239, receita acima de R$ 5 mi fica ainda mais cara. Na reforma, locação tem regime específico com redutor de 70% da alíquota **(verificar o percentual e os requisitos na LC 214)**;
  - custo de manutenção (contabilidade, obrigações acessórias) e risco de desconsideração se a holding for usada para blindagem fraudulenta (CC art. 50).
- **Conclusão:** a holding faz sentido para sucessão e governança. Como "economia de IR", o argumento ficou mais fraco depois da Lei 15.270.

### 4.4 Separar operações em vários CNPJs
- **Motivos legítimos:** segregar riscos (importação × varejo), atividades distintas (indústria, serviços de marketing/TI, logística), marcas diferentes com gestão própria, localização (CD em outro estado) e preparação para sócios/investidores.
- **Riscos:**
  - **LC 123, art. 3º, §4º, III a V:** a receita de empresas com sócios em comum **soma-se** para o limite de R$ 4,8 mi. Usar parentes ou "laranjas" como sócios é **interposição de pessoas** (art. 29, IV) → exclusão retroativa + 10 anos de impedimento + cobrança com multa qualificada;
  - **grupo econômico de fato:** mesmo endereço/CD, mesmos funcionários, mesma conta de marketplace ou de anúncios, mesmo contador e caixa único. A RFB aplica **responsabilidade solidária** (CTN art. 124, I, "interesse comum"; Parecer Normativo COSIT 4/2018) e requalifica as operações como uma só;
  - **planejamento abusivo:** CTN art. 116, parágrafo único (norma antielisiva, constitucional segundo o STF na ADI 2.446/2022). O CARF exige **propósito negocial** e **substância** (estrutura, pessoal, ativos e riscos próprios);
  - **marketplaces:** contas por CNPJ com o mesmo titular, mesmo endereço de expedição e mesmo dispositivo/IP são sinal de vínculo e também violam termos de uso.
- **Requisitos mínimos para uma cisão defensável:** contrato social e sócios reais com capital próprio; empregados registrados em cada empresa; contratos intercompany a preço de mercado (aluguel, cessão de marca, serviços compartilhados com rateio documentado); contas bancárias e de marketplace separadas; atividade ou mercado distinto; ata/memorando do propósito negocial.

### 4.5 Elisão × evasão × simulação
| Conceito | Definição | Base legal | Consequência |
|---|---|---|---|
| **Elisão (lícita)** | Escolher, **antes do fato gerador**, a forma menos onerosa permitida em lei, com substância | CF art. 5º, II; liberdade de organização | Válida |
| **Elusão / planejamento abusivo** | Forma lícita, mas **sem propósito negocial**, só para reduzir tributo (abuso de forma) | CTN art. 116, p.ú.; jurisprudência do CARF | Desconsideração do ato, cobrança do tributo + multa de ofício de 75% |
| **Simulação / fraude / sonegação** | Ato aparente que esconde a realidade (laranjas, notas frias, subfaturamento, "meia nota") | CTN art. 149, VII; CC art. 167; Lei 4.502/1964, arts. 71 a 73 | Multa qualificada de **100%** (150% na reincidência — Lei 9.430, art. 44, §1º, VI, pela Lei 14.689/2023), crime contra a ordem tributária (Lei 8.137/1990, art. 1º: reclusão de 2 a 5 anos) e responsabilidade pessoal dos administradores (CTN art. 135) |
| **Evasão** | Deixar de pagar após o fato gerador (omissão de receita, falta de NF) | Lei 8.137/1990; Lei 9.430, art. 42 (depósitos não comprovados) | Idem |

- **Importação:** subfaturamento, falsa declaração de NCM/origem e **interposição fraudulenta** (importação por conta e ordem ou encomenda oculta) levam a pena de **perdimento**, ou multa de 100% do valor aduaneiro, e inaptidão do CNPJ (Decreto-Lei 1.455/1976, art. 23, V e §3º; Lei 10.637/2002, art. 33 — multa de 10% para a cedente do nome **(verificar a redação vigente)**). Paraguai: compras de "sacoleiro" sem DI/DUIMP não geram crédito e caracterizam descaminho (CP art. 334). Para microimportação regular existe o RTU (Lei 11.898/2009), com limites **(verificar a vigência e os limites atuais)**.

---

## Checklist de oportunidades

- [ ] **Simular o regime 2027 por CNPJ** (Simples × Presumido × Real), já com a majoração de 20% da LC 239 e a CBS cheia. A decisão é tomada no 1º pagamento de jan/2027.
- [ ] **Simples B2C:** confirmar que **não** convém optar pelo regime regular de IBS/CBS. Para CNPJs com vendas B2B relevantes, avaliar a próxima janela semestral **(verificar a data)**.
- [ ] **Segregar receitas monofásicas e com ST no PGDAS-D** e recuperar pagamentos a maior dos últimos 5 anos (CTN art. 168).
- [ ] **Lucro Real:** mapear créditos de PIS/COFINS (importação, frete de venda, armazenagem, energia, aluguel, depreciação) e avaliar créditos sobre comissões e ads (tese).
- [ ] **Exclusão do ICMS da base do PIS/COFINS** (Tema 69) aplicada corretamente. Revisar teses já transitadas.
- [ ] **Dividendos:** conferir as atas de aprovação de lucros até 2025 feitas até 31/12/2025 e cumprir o cronograma de pagamento até 2028.
- [ ] **Distribuição mensal ≤ R$ 50 mil por PJ por sócio** quando o caixa permitir. Projetar a renda anual de cada sócio em relação a R$ 600 mil e R$ 1,2 mi (IRPFM).
- [ ] **Escrituração contábil completa** (balanço/DRE) em todas as PJs: viabiliza dividendos acima da presunção e o **redutor do art. 16-B**.
- [ ] **Pró-labore de ~R$ 5 mil/mês** (zero IRPF) quando o Fator R não exigir mais.
- [ ] **JCP** em PJs do Lucro Real com PL relevante (economia de 16,5 p.p.).
- [ ] **Cadastro fiscal de SKUs:** NCM, CEST, **cClassTrib** e **CST IBS/CBS** no ERP/hub, e testes de emissão em homologação.
- [ ] **Reprecificação para 2027:** a CBS entra cheia e o PIS/COFINS sai. Recalcular o markup por canal (comissão do marketplace + split payment + crédito).
- [ ] **Fluxo de caixa com split payment** (2027–2028): fim do float e acompanhamento do crédito condicionado ao pagamento.
- [ ] **Benefício de ICMS na importação:** avaliar habilitação ao **Fundo de Compensação** (se oneroso) e o crédito fiscal da Lei 14.789/2023.
- [ ] **Holding:** revisar o custo do ITCMD (LC 227 + lei estadual) antes de doar quotas e antecipar doações enquanto as alíquotas estaduais forem menores **(verificar a UF)**.
- [ ] **Monitorar:** ADI 7.914 (dividendos/Simples), ações contra a LC 224/239, regulamentação do split payment, Res. CGIBS de ajuste e alíquota da CBS de 2027.

## Riscos / linhas vermelhas

- **Nunca** usar sócios interpostos (parentes, funcionários, "laranjas") para manter CNPJs no Simples: exclusão + 10 anos + multa de 100–150% + crime (Lei 8.137/90).
- **Nunca** vender sem NF ou emitir "meia nota" (subfaturamento). Com split payment, cruzamento com marketplaces/PSPs (e-Financeira, DIMP) e responsabilidade solidária da plataforma, a detecção é quase automática.
- **Nunca** subfaturar importação, declarar NCM/origem falsos ou ocultar o real adquirente (interposição fraudulenta → perdimento e inaptidão do CNPJ).
- **Não** pagar dividendos sem lucro contábil escriturado nem fazer retiradas sem lastro (requalificação como remuneração e IRRF).
- **Não** dividir empresas sem substância (mesmo CD, equipe, caixa e conta de anúncios): risco de grupo econômico, CTN 124 e 116.
- **Não** ignorar a retenção de 10% sobre dividendos acima de R$ 50 mil/mês, inclusive no Simples, enquanto a ADI 7.914 não for julgada (a responsabilidade é da fonte pagadora).
- **Não** pagar lucros de 2025 fora do cronograma da ata aprovada até 31/12/2025: a proteção da transição se perde.
- **Não** deixar de preencher cClassTrib/CST IBS/CBS por causa do adiamento das rejeições: a obrigação e a penalidade continuam.
- **Não** tomar crédito de IBS/CBS sobre despesas de uso e consumo pessoal dos sócios (LC 214, art. 57).
- **Não** confiar em benefício de ICMS como vantagem permanente: ele cai de 2029 a 2032 e termina em 2033.
- **Não** trocar de regime no meio do ano: a opção é anual e irretratável.

## Fontes

**Legislação (oficial)**
- LC 123/2006 (Simples) — https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm
- Lei 9.249/1995 — https://www.planalto.gov.br/ccivil_03/LEIS/L9249.htm
- Lei 9.430/1996 — https://www.planalto.gov.br/ccivil_03/LEIS/L9430.htm
- Lei 9.250/1995 (com a Lei 15.270) — https://www.planalto.gov.br/ccivil_03/LEIS/L9250.htm
- **Lei 15.270/2025** — https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm
- **LC 224/2025** — https://www.planalto.gov.br/ccivil_03/leis/lcp/Lcp224.htm
- **LC 239/2026** — https://www.planalto.gov.br/ccivil_03/leis/lcp/Lcp239.htm
- EC 132/2023 — https://www.planalto.gov.br/ccivil_03/Constituicao/Emendas/Emc/emc132.htm
- **LC 214/2025** — https://www.planalto.gov.br/ccivil_03/LEIS/LCP/Lcp214.htm
- **LC 227/2026** (Câmara, texto atualizado) — https://www2.camara.leg.br/legin/fed/leicom/2026/leicomplementar-227-13-janeiro-2026-798657-normaatualizada-pl.pdf
- LC 227/2026 (SEF-MG) — https://www.fazenda.mg.gov.br/export/sites/fazenda/empresas/legislacao_tributaria/leis/2026/lc227_2026.pdf
- Ato Conjunto RFB/CGIBS nº 5/2026 — https://www.gov.br/sped/pt-br/assuntos/documentos-fiscais/dere/atos-conjuntos/ato-conjunto-rfb_cgibs-no-5-de-12-de-agosto-dee-2026.pdf/@@display-file/file
- Ato Conjunto RFB/CGIBS nº 1/2025 — https://www.cgibs.gov.br/upload/arquivos/202609/09104120-ato-conjunto-rfb-cgibs-n-1-de-22-de-dezembro-de-2025.pdf
- Resolução CGIBS nº 20/2026 — https://cgibs.gov.br/upload/arquivos/202611/17165820-resoluc-a-o-cgibs-n-20-de-17-de-novembro-de-2026.pdf
- Manual da opção pelo regime regular de IBS/CBS no Simples — https://www8.receita.fazenda.gov.br/SimplesNacional/Arquivos/manual/Manual%20op%C3%A7%C3%A3o%20regime%20regular%20IBS%20e%20CBS%20no%20Simples%20Nacional.pdf

**Receita Federal / CGIBS / Fiscos**
- RFB, Perguntas e Respostas — Redução de benefícios (LC 224) — https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/beneficios-fiscais/perguntas-e-respostas-reducao-dos-incentivos-e-beneficios-tributarios-v5-final.pdf
- RFB, Nota CETAD/COEST nº 9/2026 — https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/estudos/notas-cetad/notas-tecnicas/2026/nota-cetad-coest-no-009-2026
- RFB, Comunicado sobre o ambiente de produção beta (dez/2025) — https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/manuais/reforma-tributaria-do-consumo/comunicado-sobre-o-ambiente-de-producao-beta-versao-1-dezembro25
- RFB/CFC, curso de obrigações acessórias e documentos fiscais — https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/material-de-apoio/5o-modulo-cfc-rfb-obrigacoes-acessorias-documentos-fiscais-marco-duran.pdf
- CGIBS, adiamento das regras de validação — https://cgibs.gov.br/receita-federal-e-comite-gestor-do-ibs-esclarecem-adiamento-das-regras-de-validacao-dos-documentos-fiscais-eletronicos
- SEFIN-RO, não rejeição de NF-e sem CBS/IBS — https://reformatributaria.sefin.ro.gov.br/noticias/comite-gestor-do-ibs-e-receita-federal-do-brasil-decidem-nao-rejeitar-nfe-sem-as-informacoes-da-cbs-e-ibs
- SEFIN-RO, LC 227/2026 sumarizada — https://reformatributaria.sefin.ro.gov.br/noticias/veja-a-lei-complementar-no-227-26-sumarizada-que-institui-o-comite-gestor-do-ibs-e-atualiza-a-lc-214-25
- Agência Senado, LC 227 — https://www12.senado.leg.br/noticias/materias/2026/01/14/reforma-tributaria-lei-cria-comite-gestor-do-ibs-e-define-regras-do-imposto
- Portal NF-e (NT 2025.002, Informe Técnico 2025.002 com as tabelas cClassTrib/CST) — https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=04BIflQt1aY=

**Escritórios e portais especializados**
- PwC, Tax Intelligence: LC 224/25 — https://www.pwc.com.br/pt/thinking-about-taxes/tax-intelligence/2025/tax-intelligence-express-ed42-publicacao-da-lc-n224-25.pdf
- PwC, Regulamentos IBS/CBS — https://www.pwc.com.br/pt/thinking-about-taxes/tax-intelligence/2026/tax-intelligence-express-ed45-Regulamentos-do-IBS-e-da-CBS.pdf
- PwC, Marketplaces — https://www.pwc.com.br/pt/thinking-about-taxes/tax-intelligence/2026/tax-intelligence-raciocinios-ed-07_marketplaces.pdf
- EY, Decreto 12.808 / IN RFB 2.305 — https://www.ey.com/content/dam/ey-unified-site/ey-com/pt-br/campaigns/tax/documents/ey-brasil-alert-decreto-12808-in-rfb2305-01-06-2026.pdf
- EY, Plataformas digitais e IBS/CBS — https://www.ey.com/pt_br/newsroom/2026/07/obrigacoes-plataformas-digitais-contexto-ibs-cbs
- EY, Publicação dos regulamentos — https://taxnews.ey.com/news/2026-0987-brazil-publishes-ibs-and-cbs-regulations-marking-start-of-operational-phase-of-indirect-tax-reform
- Mattos Filho, LC 227 — https://www.mattosfilho.com.br/?p=119007
- Mattos Filho, documentos fiscais eletrônicos — https://www.mattosfilho.com.br/unico/reforma-tributaria-documentos-fiscais-eletronicos/
- Mayer Brown, Lei 15.270 — https://www.mayerbrown.com/pt/insights/publications/2025/12/enactment-of-law-no-15270-2025-which-establishes-dividend-taxation-expands-the-exemption-threshold-and-introduces-a-minimum-tax-on-high-incomes
- Demarest, LC 224 — https://www.demarest.com.br/wp-content/uploads/2026/01/Client-Alert-LEI-COMPLEMENTAR-No-224-2025-vf2.pdf
- Contábeis, Presumido + LC 224 — https://www.contabeis.com.br/noticias/75261/lucro-presumido-tera-aumento-de-10-na-base-do-irpj-e-csll-em-2026/
- Contábeis, Lei 15.270 e dividendos no Simples — https://www.contabeis.com.br/artigos/77587/lei-15-270-afeta-dividendos-no-simples-nacional/
- ReformaTributaria.com, RFB: imposto mínimo também atinge o Simples — https://www.reformatributaria.com/economia/novo-imposto-minimo-sobre-dividendos-tambem-atinge-empresas-do-simples-nacional-explica-receita-federal/
- Migalhas, dividendos do Simples — https://www.migalhas.com.br/depeso/447996/a-lei-15-270-25-nao-se-aplica-a-distribuicao-de-dividendos-do-simples
- Legisweb, prazos do CGSN para 2027 — https://www.legisweb.com.br/noticia/?id=34449
- CRC-SP, prazos do CGSN para 2027 — https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11355
- ReformaTributaria.com, Simples e alíquotas-teste de 2026 — https://www.reformatributaria.com/negocios/empresas-do-simples-nacional-nao-estao-obrigados-as-aliquotas-teste-de-ibs-cbs-em-2026/
- Contábeis, split payment gradual — https://www.contabeis.com.br/noticias/78421/split-payment-tera-testes-em-2026-mas-implantacao-sera-gradual/
- ReformaTributaria.com, cronograma do split payment (setor financeiro) — https://www.reformatributaria.com/tecnologia/financeiras-preveem-piloto-do-split-em-marco-e-fase-definitiva-em-outubro-de-2027-leia-o-cronograma/
- Omie, PLP 299/2026 (origem da LC 239) — https://www.omie.com.br/blog/lucro-presumido-aumento-impostos-plp-299-2026/
- Contábeis, tabela do Anexo I — https://artigos.agilize.com.br/anexo-i-simples-nacional-2026/
