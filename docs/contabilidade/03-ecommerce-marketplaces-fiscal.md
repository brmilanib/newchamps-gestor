# 03 — E-commerce e Marketplaces: Fiscal e Tributário (Brasil, 2025–2026)

> Base de conhecimento do "contador IA" do Grupo Newchamps (venda online em Mercado Livre, Shopee, Amazon, TikTok Shop, Magalu; produtos possivelmente importados).
> Pesquisa feita em **26/11/2026**. Itens marcados **(verificar)** não foram confirmados em fonte primária ou dependem de norma estadual/regulamento que muda com frequência.
> Isto é material de referência, **não parecer**. Toda decisão relevante (troca de regime, filial, regime especial, pedido de restituição) precisa de validação com contador ou advogado tributarista habilitado e consulta ao texto vigente.

---

## 0. Resumo executivo (o que o seller precisa saber)

1. **O vendedor (seller) é o contribuinte.** O marketplace é intermediador. Cada venda exige **NF-e (modelo 55)** emitida pelo seller, com o grupo do intermediador preenchido (`indIntermed` / CNPJ do marketplace, NT 2020.006). Sem nota, o marketplace pode responder solidariamente em vários estados e, a partir de 2027, pela própria LC 214/2025 (IBS/CBS).
2. **Fulfillment (Full/FBA/Shopee Full) = remessa de estoque para outro estabelecimento.** É preciso NF de remessa (CFOP 5.905/6.905 ou equivalentes), e possivelmente inscrição estadual (IE) no estado do CD. O tratamento do ICMS na remessa interestadual **varia por UF** e é o ponto de maior risco operacional.
3. **DIFAL B2C:** é válido desde **04/04/2022** (STF, Tema 1.266, julgado em 22/10/2025). Para optante do Simples, o DIFAL **nas vendas B2C** não está previsto na LC 123, e o entendimento predominante é de que não é devido. Já o DIFAL/antecipação **nas compras** do Simples é constitucional (Tema 517).
4. **Simples Nacional (Anexo I)** costuma ser bom para revenda até ~R$ 3,6 mi, **desde que** se segreguem receitas monofásicas (PIS/COFINS) e com ICMS-ST. Não segregar é o erro nº 1 e a maior fonte de restituição.
5. **Reforma tributária:** 2026 é ano-teste (CBS 0,9% e IBS 0,1% destacados). Em **2027** começam a CBS cheia (fim de PIS/COFINS), o IPI zerado (exceto produtos com produção na ZFM) e o split payment opcional/gradual. Pelo art. 22 da LC 214/2025, as plataformas digitais passam a ser responsáveis pelo IBS/CBS das vendas que intermediam quando não há split payment ou quando o vendedor não emite documento fiscal.
6. **Benefícios estaduais de e-commerce** (MG, GO, ES, SC, BA, SP) podem levar a carga própria de ICMS para cerca de 1% a 1,3% nas vendas interestaduais B2C. Mas eles exigem estabelecimento real, termo de acordo/regime especial, e **acabam com a extinção do ICMS (2029–2032)**.

---

## 1. Tributação da venda via marketplace

### 1.1 Quem emite a nota e quem é responsável

| Ponto | Regra prática | Base |
|---|---|---|
| Contribuinte do ICMS / PIS / COFINS / IRPJ na venda | O **seller** (titular da mercadoria) | LC 87/1996; CTN |
| Documento | NF-e mod. 55 por pedido (B2C ou B2B). NFC-e (mod. 65) **não** serve para venda não presencial/interestadual | Ajuste SINIEF 07/2005; legislação estadual |
| Identificação do marketplace na NF-e | Campos `indIntermed=1` e `infIntermed` (CNPJ + identificador do pedido) | NT 2020.006 (verificar versão vigente) |
| Frete cobrado do comprador | Integra a base do ICMS quando o seller é o responsável pelo frete (CIF). Quando a plataforma contrata e cobra a parte, analisar o contrato | LC 87, art. 13, §1º, II, "b" |
| Prazo | NF-e antes da saída da mercadoria (no Full, a NF de venda é emitida quando o pedido sai do CD) | — |

**Marketplaces exigem a NF-e.** O Mercado Livre, a Shopee, a Amazon e a Magalu bloqueiam ou suspendem a conta CNPJ que não vincula XML ao pedido. A API do ML permite cadastrar uma IE por estado: https://developers.mercadolivre.com.br/envio-de-inscricoes-estaduais

### 1.2 Responsabilidade solidária dos marketplaces (ICMS, regime atual)

- Vários estados editaram **leis ordinárias** que atribuem responsabilidade solidária ao marketplace e/ou ao intermediador de pagamento pelo ICMS quando não há emissão de NF ou há descumprimento de obrigação acessória. Exemplos: **RJ** (Lei 8.795/2020, verificar número), **SP** (Lei 6.374/89, art. 9º, com a redação da Lei 13.918/2009 e posteriores), **BA**, **CE**, **MT**, **PB**.
- Os modelos variam: (a) solidariedade ilimitada; (b) solidariedade só quando a NF não é emitida; (c) solidariedade por falta de envio de informações ao fisco.
- **STF, Tema 1.413 (RE 1.554.371, rel. Fux):** repercussão geral reconhecida. A questão é se lei ordinária estadual pode criar essa responsabilidade, ou se isso exige lei complementar (art. 146, III, "b", CF). **Mérito pendente** até a data desta pesquisa (verificar andamento). Fontes: https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=1413 e https://noticias.stf.jus.br/?p=146394
- **Efeito prático para o seller:** como o marketplace corre risco, ele repassa a pressão. Exige NF-e, cruza dados e pode reter repasses ou descredenciar a conta.

### 1.3 Troca de informações com os fiscos (DIMP e intermediadores)

- **Convênio ICMS 134/2016:** instituições e intermediadores de **pagamento** (Mercado Pago, PagSeguro, Stripe, adquirentes) informam aos estados todas as transações de cada recebedor, por meio da **DIMP**.
- **Convênio ICMS 71/2020** (incluiu a cláusula terceira-A): **intermediadores de serviços e de negócios** (marketplaces) também informam as operações intermediadas, até o último dia do mês seguinte. A internalização é desigual entre as UFs. Fonte: https://www.bmalaw.com.br/conteudo/direito-tributario/artigos-e-noticias/intermediadores-de-negocios-tem-ate-o-fim-de-abril-para-entregar-declaracao-aos-estados/pdf
- **Convênio ICMS 101/2025:** permite usar os dados da DIMP para cadastrar contribuintes de ofício no DT-e. https://www.confaz.fazenda.gov.br/legislacao/convenios/2025/CV101_25
- **Consequência:** a SEFAZ sabe quanto o CNPJ (ou o CPF) recebeu em cada plataforma e cruza com as NF-e emitidas e com o PGDAS-D/EFD. Diferença entre o que passou na DIMP e o que foi faturado gera **malha estadual** (autuação de ICMS mais multa, e no Simples, possível exclusão).
- **Convênio ICMS 236/2021:** substituiu o Convênio 93/2015 e regula os **procedimentos do DIFAL B2C** (não confundir com troca de informações). O Convênio 235/2021 criou o Portal Nacional do DIFAL. https://www.legisweb.com.br/legislacao/?id=425891

### 1.4 Reforma tributária: plataformas digitais e split payment (LC 214/2025)

**Cronograma relevante para o seller**

| Ano | O que acontece |
|---|---|
| 2026 | Ano-teste: **CBS 0,9% e IBS 0,1%** destacados na NF-e, compensáveis com PIS/COFINS. Sem recolhimento efetivo se as obrigações acessórias forem cumpridas (verificar regras de dispensa). Testes do split payment |
| 2027 | **CBS cheia; PIS/COFINS extintos**; IPI com alíquota zero, exceto produtos com industrialização incentivada na ZFM; início do Imposto Seletivo; IBS 0,1%. Split payment em operação **opcional/gradual** (há notícias de obrigatoriedade só em 2028, verificar). Microempresas do Simples "puro" e vendas a pessoa física ficam fora da 1ª etapa do split (verificar) |
| 2029–2032 | ICMS reduzido gradualmente (90% → 60%) e IBS subindo. Benefícios fiscais de ICMS minguam |
| 2033 | ICMS extinto; IBS/CBS plenos |

**Art. 22 da LC 214/2025: plataformas digitais**
- A plataforma (inclusive a domiciliada no exterior) que intermedeia operações é **responsável pelo pagamento do IBS/CBS** em determinadas hipóteses. Há uma combinação de: responsabilidade própria quando o fornecedor é estrangeiro ou não inscrito, solidariedade quando o fornecedor nacional não emite documento fiscal, e um modelo próximo de substituição quando a plataforma controla o pagamento.
- Quando a plataforma **inicia o pagamento** e fornece os dados para o split (incluindo o procedimento simplificado, arts. 31–35), ela fica livre das diferenças entre o recolhido e o devido pelo fornecedor nacional.
- O **art. 23** obriga a plataforma a se inscrever como contribuinte regular de IBS/CBS.
- Regulamentação: **Decreto 12.955/2026** (CBS) e **Resolução CGIBS nº 6/2026** (IBS), segundo a PwC (verificar numeração). https://www.pwc.com.br/pt/thinking-about-taxes/tax-intelligence/2026/tax-intelligence-raciocinios-ed-07_marketplaces.pdf
- Análises: EY https://www.ey.com/pt_br/newsroom/2026/07/obrigacoes-plataformas-digitais-contexto-ibs-cbs ; ConJur https://www.conjur.com.br/2025-dez-29/responsabilidade-tributaria-das-plataformas-digitais-na-reforma/ ; Migalhas https://www.migalhas.com.br/depeso/434556/reforma-tributaria-36-tributacao-nas-plataformas-digitais

**Como isso atinge o seller**
- O repasse do marketplace tende a vir **já líquido de IBS/CBS** (split na liquidação) quando o seller não usa split próprio, ou quando a plataforma assume o recolhimento. O fluxo de caixa piora, porque o imposto deixa de "passar" pelo caixa da empresa.
- A plataforma terá **incentivo máximo a exigir NF-e correta** (NCM, cClassTrib/CST de IBS/CBS) e cadastro regular. Seller informal ou com CPF tende a ser expulso ou onerado.
- Quem está no **Simples "puro"** recolhe IBS/CBS dentro do DAS. A opção pelo regime regular de IBS/CBS ("Simples híbrido") para o 1º semestre de 2027 teve prazo prorrogado até **30/10/2026** (Res. CGSN 194/2026, verificar). Ela é irretratável no semestre. Para B2C puro, o ganho de crédito ao cliente é irrelevante; o híbrido só compensa se os créditos sobre compras (mercadoria, frete, embalagem, tecnologia, comissões) superarem o custo do IBS/CBS fora do DAS e o custo de conformidade. Fontes: https://www.reformatributaria.com/tecnologia/empresas-do-simples-fora-do-modelo-hibrido-nao-farao-split-payment-em-2027/ ; https://www8.receita.fazenda.gov.br/SimplesNacional/Arquivos/manual/Manual%20op%C3%A7%C3%A3o%20regime%20regular%20IBS%20e%20CBS%20no%20Simples%20Nacional.pdf
- **No IBS/CBS (regime regular), comissões de marketplace, anúncios, frete e armazenagem geram crédito amplo** (crédito financeiro, sem o teste de essencialidade). Isso muda a comparação de regimes a partir de 2027.

---

## 2. Fulfillment (Mercado Livre Full, Amazon FBA, Shopee Full, Magalu Entregas)

### 2.1 Estrutura fiscal da operação

1. **Remessa** do estoque do seller para o CD da plataforma, com NF-e de remessa. O destinatário é o CD/operador logístico, com o CNPJ e a IE do CD informados no painel.
2. **Venda** a cada pedido: NF-e de venda emitida pelo seller, com o comprador como destinatário. A mercadoria sai fisicamente do CD (a NF referencia o local de retirada ou a remessa, conforme a regra da UF).
3. **Retorno simbólico/físico** e **devoluções** com NF de entrada correspondente.
4. **Conciliação mensal:** enviado ao CD × vendido × saldo no painel × saldo no ERP × devoluções.

Guia prático (2026): https://www.contabilidadezen.com.br/blog/mercado-livre-full-impostos-2026/

### 2.2 CFOPs usuais (confirmar com a UF de origem e as instruções da plataforma)

| Situação | CFOP típico |
|---|---|
| Remessa interna para depósito fechado/armazém geral | 5.905 |
| Remessa interestadual para depósito/armazém | 6.905 (há quem use 6.152/6.949 conforme o enquadramento) |
| Retorno simbólico de armazém | 5.906/6.906 / 5.907/6.907 |
| Venda de mercadoria depositada em armazém geral (saída direta do armazém) | 5.117/6.117 ou 5.923 (no armazém), conforme a UF (verificar) |
| Transferência para filial própria (mesmo titular) | 5.152/6.152 |

**Atenção:** a suspensão de ICMS em remessa para **armazém geral/depósito fechado** costuma valer só em operações **internas** (mesmo estado). Na remessa **interestadual** a um depósito de terceiro, muitos estados tratam a operação como tributada ou exigem regime especial ou IE no destino. Não existe regra nacional uniforme para o Full. A SEFAZ-SP já orientou o uso de 6.152 com NF simbólica 5.934 do armazém em entrega direta (contexto genérico).

### 2.3 Filial x depósito de terceiro x operador logístico

| Modelo | Como funciona | Prós | Contras |
|---|---|---|---|
| **IE do seller no estado do CD** (estabelecimento "virtual" no endereço do operador) | O seller se inscreve na UF do CD (ex.: SP, CADESP no endereço do operador) e o CD vira estabelecimento próprio | Transferência entre estabelecimentos do **mesmo titular** fora do campo do ICMS (**ADC 49 + LC 204/2023**, desde 01/01/2024). As vendas saem do estado do CD | Obrigações acessórias completas na UF (EFD, GIA/DeSTDA). Venda passa a ser interna ou interestadual a partir do CD. Possível ICMS-ST na entrada |
| **Remessa para depósito de terceiro sem IE** | NF de remessa ao operador; o seller continua só na UF de origem | Simples | Risco de autuação na UF do CD por manter estoque sem inscrição. Tratamento do ICMS na remessa incerto |
| **Regime especial do operador logístico** | O próprio operador tem regime (ex.: SP, Portaria CAT-31/2019) | Pode dispensar a IE do depositante de outra UF em certos casos | As respostas a consulta da SEFAZ-SP divergem conforme o caso |

**São Paulo (Portaria CAT-31/2019, operador logístico):** há resposta a consulta que reconhece a **dispensa de CADESP** (art. 12, §2º) para depositante de outro estado (RC 22406/2020). Outras exigem **inscrição autônoma em SP** no endereço do operador (RC 30881/2024, que excepciona o Simples que vende só a pessoa física; RC 27877/2023). A Portaria SRE 55/2023 alterou o art. 8º. **Exige análise caso a caso (verificar).**
- https://legislacao.fazenda.sp.gov.br/Paginas/Portaria-CAT-31-de-2019.aspx
- https://legislacao.fazenda.sp.gov.br/Paginas/RC30881_2024.aspx
- https://legislacao.fazenda.sp.gov.br/Paginas/RC22406_2020.aspx

**Goiás (abril/2026):** pacote de medidas para o e-commerce, com alteração do RCTE (Decreto 4.852/1997) e memorando com a Shopee. Segundo a imprensa, **desobriga de IE os vendedores de outros estados que usam CDs goianos** (verificar texto do decreto). https://goias.gov.br/economia/?p=449056 ; https://www.maisgoias.com.br/cidades/daniel-vilela-assina-acordos-por-crescimento-da-shopee-em-goias-e-mira-3-mil-empregos/

**Minas Gerais:** cartilha da SEF/MG sobre remessa entre estabelecimentos do mesmo titular, pós-LC 204 (art. 153-A do RICMS/2023 e a opção por equiparar a operação tributada para manter crédito ou benefício). https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/orientacao/2025.01.16_Cartilha_Remessa_M_Titular.pdf

### 2.4 Transferências entre estabelecimentos próprios (pós-LC 204/2023)

- **Não incide ICMS** na transferência entre estabelecimentos do mesmo titular, inclusive interestadual (STF ADC 49; LC 204/2023, que alterou a LC 87, art. 12, §4º e seguintes).
- **Crédito:** a transferência do crédito de origem passou a ser **facultativa** (o veto foi derrubado). Pode-se equiparar a transferência a operação tributada para levar o crédito ao destino. O **Convênio ICMS 109/2024** revogou o 178/2023. Fonte: https://www.mayerbrown.com/-/media/files/perspectives-events/publications/2025/01/direito-tributrio-em-destaque-convenio-icms.pdf
- **Uso prático:** filial no estado do CD do marketplace (ou num estado com benefício) recebe o estoque sem ICMS, e as vendas saem de lá.

### 2.5 DIFAL e ICMS-ST no fulfillment

- **Venda saindo do CD:** origem = UF do CD. Em venda interestadual B2C a partir do CD, aplicam-se a alíquota interestadual e o DIFAL para a UF do consumidor. Em venda **interna** no estado do CD, aplica-se a alíquota interna cheia.
- **ICMS-ST:** produtos em listas de ST (autopeças, eletrônicos em algumas UFs, cosméticos/perfumaria, materiais de construção, ferramentas, bebidas, brinquedos em alguns estados etc.) e transferência a estabelecimento **varejista** do mesmo titular em outra UF podem exigir ST ou antecipação na entrada, conforme protocolo ou convênio. O Convênio ICMS 142/2018 afasta a ST nas transferências entre estabelecimentos do mesmo titular, **exceto** quando o destinatário é varejista (verificar a cláusula vigente). Produto que já teve ST recolhida não deve ser tributado de novo na venda: segregar no PGDAS ou na EFD.
- **SP:** o regime especial de e-commerce (Decreto 57.608/2011) dispensa ST em certas entradas de UF signatária de protocolo (verificar vigência).
- **Importado:** a alíquota interestadual é de **4%** (Res. Senado 13/2012, com FCI). Numa venda interestadual B2C de importado, o DIFAL fica maior (ex.: 18% − 4% = 14% para a UF de destino).

### 2.6 Amazon FBA e Shopee

- **Amazon FBA:** CDs principalmente em SP (Cajamar), além de PE, MG, RS, DF e outros (verificar a malha atual). A mesma lógica do Full: NF de remessa ao CD da Amazon, venda emitida pelo seller e IE na UF do CD quando exigida. A Amazon publica as instruções fiscais no Seller Central (verificar).
- **Shopee:** expansão de CDs (ex.: Goiás 2026, com dispensa de IE para seller de fora, segundo a imprensa). Fulfillment ainda limitado em relação a ML/Amazon (verificar).

---

## 3. DIFAL nas vendas a consumidor final (B2C)

### 3.1 Linha do tempo

| Marco | Conteúdo |
|---|---|
| **EC 87/2015** | Interestadual a não contribuinte: a origem cobra a alíquota interestadual e o destino cobra o DIFAL (100% para o destino desde 2019). O remetente recolhe |
| **STF ADI 5469 / Tema 1.093 (2021)** | DIFAL B2C exige lei complementar. Cobrança com base no Conv. 93/2015 invalidada a partir de 2022 |
| **LC 190/2022** (publicada em 05/01/2022) | Regulamenta o DIFAL. Art. 3º: vigência após 90 dias |
| **Convênios ICMS 235 e 236/2021** | Portal Nacional do DIFAL e procedimentos |
| **ADIs 7066, 7070, 7078 (nov/2023)** | Validaram a LC 190 sem anterioridade anual |
| **STF Tema 1.266 (RE 1.426.271, julgado em 22/10/2025, publicado em dez/2025)** | Art. 3º da LC 190 constitucional. DIFAL não cria nem majora tributo, logo **sem anterioridade anual**, mas com **noventena**. **Cobrança válida a partir de 04/04/2022.** Modulação: não se exige o DIFAL de 2022 de quem ajuizou ação até 29/11/2023 |

Fontes: https://portal.stf.jus.br/jurisprudenciaRepercussao/verTeseTema.asp?numTema=1266 ; https://contadores.cnt.br/projetos/46/noticias/tecnicas/2025/12/19/stf-valida-cobranca-do-difal-a-partir-de-abril-de-2022-e-fixa-tese-em-repercussao-geral.html

### 3.2 Mecânica (regime normal)

- `DIFAL = Base × (alíquota interna do destino − alíquota interestadual)`, com **base dupla** (por dentro) na maioria das UFs, mais o **FCP** do destino quando houver.
- Alíquotas interestaduais: 7% (do Sul/Sudeste, exceto ES, para N/NE/CO/ES), 12% (demais) e **4% (importados)**.
- Recolhimento por GNRE a cada operação, ou por **inscrição estadual de substituto (IE-ST) na UF de destino** para recolher mensalmente. Quem vende muito para uma UF deve pedir IE-ST lá: libera o fluxo e evita reter mercadoria no posto fiscal.
- Alíquotas internas modais subiram em várias UFs em 2023–2025 (vários estados em 19%, 20%, 20,5%, 22%; verificar a tabela atual antes de precificar).

### 3.3 Simples Nacional e DIFAL

- **Nas compras interestaduais (entradas) do Simples:** o DIFAL/antecipação é **constitucional** (**STF Tema 517, RE 970.821, 2021**). Base: LC 123, art. 13, §1º, XIII, "g" e "h". Mas exige **lei estadual em sentido estrito** (Tema 456 e jurisprudência do STF; **Tema 1.284** discute cobrança fundada só em decreto, verificar o resultado). Cobrança por decreto pode ser contestada.
- **Nas vendas B2C interestaduais do Simples:** a cláusula nona do Conv. 93/2015, que estendia o DIFAL ao Simples, foi suspensa (ADI 5464) e a LC 123 não prevê esse recolhimento. **Entendimento predominante: o optante do Simples não recolhe DIFAL nas vendas a não contribuinte de outra UF.** Algumas UFs tentam cobrar; checar a legislação da UF de destino (verificar).
- Fonte Tema 517: https://www.ibet.com.br/cobranca-de-diferencial-de-icms-para-empresas-que-optam-pelo-simples-nacional-e-constitucional/

---

## 4. Simples Nacional para e-commerce

### 4.1 Anexo I (comércio): tabela vigente (LC 123, Anexo I, redação da LC 155/2016)

| Faixa | RBT12 (R$) | Alíquota nominal | Parcela a deduzir (R$) | Efetiva no topo da faixa | % do ICMS no DAS |
|---|---|---|---|---|---|
| 1 | até 180.000 | 4,00% | 0 | 4,00% | 34% |
| 2 | 180.000,01–360.000 | 7,30% | 5.940 | 5,65% | 34% |
| 3 | 360.000,01–720.000 | 9,50% | 13.860 | 7,58% | 33,5% |
| 4 | 720.000,01–1.800.000 | 10,70% | 22.500 | 9,45% | 33,5% |
| 5 | 1.800.000,01–3.600.000 | 14,30% | 87.300 | 11,88% | 33,5% |
| 6 | 3.600.000,01–4.800.000 | 19,00% | 378.000 | 11,13% (sem ICMS) | 0% (ICMS por fora) |

`Alíquota efetiva = (RBT12 × nominal − parcela a deduzir) / RBT12`. Exemplo: com RBT12 de R$ 1,2 mi, (128.400 − 22.500) / 1.200.000 = **8,83%**.

### 4.2 Sublimite, limite e exclusão

- **Sublimite de R$ 3,6 mi:** acima dele, **ICMS (e ISS) passam a ser recolhidos por fora do DAS**, no regime normal (débito/crédito, ST, DIFAL de regime normal, EFD ICMS/IPI). Os tributos federais seguem no DAS. Se a receita do ano-calendário passar de R$ 3,6 mi em até 20%, o efeito vale a partir do ano seguinte; acima de 20% (R$ 4,32 mi), vale a partir do mês seguinte.
- **Limite de R$ 4,8 mi:** se excedido, há **exclusão** do Simples. Com excesso de até 20% (até R$ 5,76 mi), a exclusão vale a partir de janeiro do ano seguinte. Acima disso, vale retroativamente ao mês seguinte ao do excesso (LC 123, art. 30, IV e §1º). Planejar a migração para o Presumido ou o Real **antes**.
- **Impedimentos:** sócio com mais de 10% em outra empresa não optante e receita global acima de R$ 4,8 mi; sócio de outra optante com receita global acima do limite (LC 123, art. 3º, §4º, III a V); filial no exterior etc.
- **MEI:** limite de R$ 81 mil/ano (projetos para elevar o limite tramitam, verificar). Inviável para operação Newchamps.

### 4.3 ICMS-ST no Simples

- **Simples como substituído** (compra produto com ST já retida): no PGDAS-D, marcar a receita como "**com substituição tributária**" (ICMS = 0 nessa parcela do DAS). Não marcar significa pagar ICMS duas vezes. Isso é recuperável.
- **Simples como substituto** (ex.: importador ou fabricante de item em ST): recolhe o ICMS-ST **por fora do DAS**, por guia própria.
- **Antecipação com encerramento** nas entradas interestaduais: depende da UF e exige lei.

### 4.4 PIS/COFINS monofásico no Simples (maior oportunidade)

- Em produtos com tributação **concentrada (monofásica)**, a indústria ou o importador recolhe PIS/COFINS com alíquota majorada e a revenda tem **alíquota zero**. No Simples, a revenda deve ser marcada no PGDAS-D como "**tributação monofásica**". Com isso, as parcelas de PIS e COFINS do DAS são zeradas (cerca de 2,76% + 12,74% do DAS nas faixas 1–5, verificar a repartição exata).
- **Categorias monofásicas comuns no e-commerce:** perfumaria, cosméticos e higiene pessoal (Lei 10.147/2000; NCMs 3303 a 3307, 3401, 9603.21, entre outros); medicamentos; **autopeças** (Lei 10.485/2002, Anexos I e II); **pneus e câmaras** (Lei 10.485/2002, art. 5º); bebidas frias (água, refrigerante, cerveja; Lei 13.097/2015); combustíveis e lubrificantes.
- **Recuperação:** retificar os PGDAS-D dos últimos **5 anos** (CTN, art. 168) e pedir restituição/compensação no Portal do Simples. Manual: https://www8.receita.fazenda.gov.br/simplesnacional/arquivos/manual/manual_restituicao.pdf . Guia: https://www.contabeis.com.br/artigos/7115/guia-completo-credito-de-pis-e-cofins-monofasico-no-simples-nacional/
- **Urgência:** PIS/COFINS acabam em 2027 (CBS). Os períodos de 2021–2026 vão prescrevendo mês a mês. A janela de recuperação fecha progressivamente até 2031.
- Na revenda de importados, o **importador** é quem recolhe o monofásico na saída. Se a Newchamps importa (é o importador), **ela é a "fabricante" no sistema monofásico** e paga alíquota concentrada. Não há benefício nesse caso: a vantagem é só para quem compra de importador ou indústria nacional.

### 4.5 Comparação: Simples x Lucro Presumido x Lucro Real (revenda, margem bruta de 20–40%)

**Lucro Presumido (comércio):**
- IRPJ: presunção de 8% × 15% = **1,20%** da receita, mais adicional de 10% sobre o lucro presumido acima de R$ 60 mil/trimestre (≈ +0,80% da receita para quem fatura acima de ~R$ 750 mil/trimestre).
- CSLL: 12% × 9% = **1,08%**.
- PIS/COFINS cumulativos: 0,65% + 3% = **3,65%** (sem crédito; monofásicos com alíquota zero na revenda).
- **Total federal ≈ 5,93% a 6,73% da receita**, mais o ICMS no regime normal (débito − crédito) e o IPI se for importador (equiparado a industrial).
- **LC 224/2025:** desde 2026, os percentuais de presunção sobem 10% (8% → 8,8%; 12% → 13,2%) **sobre a parcela da receita anual acima de R$ 5 mi**. CSLL majorada só a partir de abr/2026 (noventena), e há judicialização. https://www.contabeis.com.br/noticias/75261/lucro-presumido-tera-aumento-de-10-na-base-do-irpj-e-csll-em-2026/

**Lucro Real:**
- IRPJ/CSLL (34%) sobre o **lucro real**. Faz sentido para seller com margem líquida baixa (comum depois de comissão de 12–20%, frete, ADS e devoluções) ou com prejuízo.
- PIS/COFINS não cumulativos (9,25%) **com crédito** sobre mercadorias para revenda, **frete na venda e armazenagem suportados pelo vendedor (Lei 10.833/2003, art. 3º, IX; Lei 10.637/2002, art. 3º, IX)**, energia, aluguel e depreciação. Comissões de marketplace são controversas (ver item 5).

**Exemplo ilustrativo** (venda de 100; CMV 70, margem bruta de 30%; ICMS interno de 18% na venda e crédito de 12% na compra; venda interna):

| Regime | Tributos sobre venda (aprox.) | Observação |
|---|---|---|
| Simples (RBT12 R$ 3 mi) | ≈ 11,4% | ICMS embutido. Cai para ≈ 9–10% se parte for monofásico ou ST segregado |
| Presumido | 5,93% federal + ICMS líquido (18 − 12,6 = 5,4) ≈ **11,3%** (+0,8% com adicional de IR) | Sem crédito de PIS/COFINS. IR independe da margem real |
| Real | PIS/COFINS 9,25% × (100 − 70 − frete/armaz. creditável) ≈ 2,5–2,8% + ICMS 5,4% + IRPJ/CSLL 34% sobre o lucro real | Melhor quando a margem líquida é menor que ~8% (cerca de 2,7% de IR sobre a receita equivale à presunção) |

**Regras de bolso:**
- Abaixo de ~R$ 3,6 mi, com mix de monofásico/ST bem segregado, o **Simples** costuma vencer.
- Entre R$ 3,6 e 4,8 mi, o Simples perde força (ICMS por fora mais faixa de 19%). Simular Presumido e Real.
- Com margem líquida real baixa e muitas despesas creditáveis (frete, armazenagem do Full, mercadoria com PIS/COFINS cheio), o **Real** costuma vencer o Presumido.
- **A partir de 2027** (CBS não cumulativa ampla, inclusive para o Presumido), o PIS/COFINS cumulativo do Presumido deixa de existir. Refazer a simulação em 2026 para 2027.
- Importador: IPI na saída (STF Tema 906, revenda de importado) até 2026. A partir de 2027, IPI zero para a maioria dos NCMs (verificar a lista da ZFM). Isso altera a vantagem relativa.

---

## 5. Tarifas de marketplace, anúncios e serviços do exterior

### 5.1 IRPJ/CSLL

- Comissões de marketplace, tarifa de frete subsidiado, ADS, armazenagem do Full e taxa de antecipação são **despesas operacionais dedutíveis** no Lucro Real (necessárias, usuais e normais; RIR/2018, art. 311). A Receita reconheceu a dedutibilidade de comissão a marketplace (solução de consulta noticiada pela APET/CRC-SP, verificar o número). https://online.crcsp.org.br/portal/noticias/noticia.asp?c=9056
- No Simples e no Presumido essas despesas **não reduzem a base** (a receita bruta é a base).

### 5.2 Crédito de PIS/COFINS (Lucro Real, até 2026)

- **STJ Tema 779 (REsp 1.221.170, 2018):** o insumo segue os critérios de **essencialidade ou relevância**, aferidos caso a caso. Comércio tem menos "insumo" do que indústria. A RFB (Parecer Normativo COSIT 5/2018) restringe o crédito no comércio.
- **Frete na operação de venda e armazenagem**, quando suportados pelo vendedor, têm **crédito expresso** (art. 3º, IX, das Leis 10.637 e 10.833). Isso cobre o frete pago pelo seller ao ML ou à transportadora e a tarifa de armazenagem do Full, desde que haja documento fiscal segregado. Pedir à plataforma NF de serviço separando armazenagem e frete da comissão.
- **Comissões de marketplace, taxas de cartão/meios de pagamento e ADS:** **divergência**. O TRF3 tem decisões negando crédito (art. 27 da Lei 10.865/2004, tarifas financeiras). Há decisão judicial favorável a seller com faturamento majoritário via marketplace (IBET), e decisões do CARF por voto de qualidade em casos específicos. Considerar tese **litigiosa** (mandado de segurança), não crédito "de prateleira".
  - https://www.ibet.com.br/justica-autoriza-creditos-de-pis-cofins-sobre-despesas-com-marketplaces/
  - https://tagdlaw.com.br/carf-reconhece-creditos-de-pis-e-cofins-sobre-pagamentos-eletronicos-para-plataformas-digitais/
  - https://web.trf3.jus.br/acordaos/Acordao/BuscarDocumentoPje/382025017
- **2027+ (CBS/IBS):** crédito amplo sobre comissões, ADS, frete e armazenagem, com documento fiscal e tributo efetivamente pago (ou split).

### 5.3 Retenções na fonte

- Pagamentos aos marketplaces nacionais (ML, Shopee Brasil, Amazon Serviços de Varejo do Brasil, Magalu) são feitos por **dedução no repasse**. Em regra não há retenção de IRRF/CSRF pelo seller sobre comissão de intermediação (não é serviço profissional da lista do art. 714 do RIR, nem do art. 30 da Lei 10.833, verificar caso a caso). Exigir **NFS-e** das tarifas para lastro contábil (o ML e a Shopee disponibilizam nota ou fatura mensal das tarifas).

### 5.4 Anúncios: Google, Meta, TikTok

- **Meta:** contas em BRL com CNPJ são faturadas pela subsidiária brasileira (Facebook Serviços Online do Brasil Ltda.), com NFS-e (São Paulo). **Desde 01/01/2026**, a Meta passou a somar ao valor do orçamento **PIS/COFINS (9,25%) e ISS (2,9%)** na nota e no boleto. O custo efetivo do anúncio subiu cerca de 12%. Comunicado: https://www.reformatributaria.com/wp-content/uploads/2025/09/Comunicado-oficial-Meta.pdf
- **Google Ads:** contas brasileiras em BRL são, em regra, faturadas pela Google Brasil Internet Ltda., com NF local (**verificar na conta qual entidade fatura**). Se a fatura vier do Google Ireland/LLC, o caso é de importação de serviço.
- **TikTok Ads / outros:** verificar a entidade faturadora (pode ser estrangeira).
- **Quando o faturamento é do exterior (importação de serviço):** a empresa brasileira é responsável por:
  - **IRRF de 15%** (25% se paraíso fiscal), com reajuste da base (gross-up) se o contrato for "líquido";
  - **CIDE-Remessas de 10%** (Lei 10.168/2000). O STF (Tema 914) tratou da amplitude da CIDE; há controvérsia se publicidade online é "serviço técnico" (verificar a tese fixada);
  - **PIS/COFINS-Importação** de 1,65% + 7,6% (crédito no Lucro Real);
  - **ISS** de 2% a 5% no município do tomador (LC 116/2003);
  - **IOF-câmbio** (alíquota alterada em 2025, verificar a atual).
  - Na prática, pagar com cartão internacional não elimina a obrigação de reter e recolher. É risco recorrente em seller pequeno.

---

## 6. Fluxos de pagamento, receita bruta e malha fiscal

### 6.1 Receita bruta = valor cheio

- A **receita bruta é o preço de venda ao comprador** (produto mais frete cobrado, quando o seller é responsável), **não o repasse líquido** do Mercado Pago, da Shopee ou da Amazon. Tarifas, comissões, frete subsidiado e antecipação são **despesas**, não deduções da receita (LC 123, art. 3º, §1º; DL 1.598/77, art. 12). Cupons ou descontos **incondicionais** dados pelo **seller** e destacados na NF reduzem a receita. Cupom bancado pela plataforma: analisar (verificar o tratamento como subvenção ou receita).
- **Erro clássico:** emitir NF pelo valor líquido do repasse ou declarar no PGDAS o que caiu na conta. Isso subfatura, e a DIMP/e-Financeira mostra o valor bruto.

### 6.2 Conciliação (obrigatória para não cair em malha)

Conciliar mensalmente, por plataforma:
1. Pedidos (relatório de vendas) × NF-e emitidas (XML) × cancelamentos e devoluções (NF de entrada).
2. Valor bruto das NF-e × valor bruto informado pela plataforma ou pelo meio de pagamento (o que vai para a DIMP).
3. Repasse líquido no extrato (Mercado Pago, conta Shopee, Amazon) × bruto − tarifas (com NF/fatura das tarifas) − estornos − chargebacks − antecipações.
4. Estoque no ERP × painel do Full/FBA.
5. PGDAS-D ou EFD = soma das NF-e de saída (e segregação ST/monofásico por NCM).

### 6.3 Reporting financeiro à Receita Federal

- **e-Financeira** (IN RFB 1.571/2015): bancos informam movimentações acima dos limites semestrais/mensais.
- **IN RFB 2.219/2024:** estendia a e-Financeira às instituições de pagamento (Pix, cartões, carteiras), com limites de R$ 5 mil/mês para PF e R$ 15 mil/mês para PJ. **Foi revogada em janeiro de 2025** depois da onda de desinformação sobre "taxação do Pix" (revogação pela IN RFB 2.243/2025, verificar o número).
- **IN RFB 2.278/2025 (agosto/2025):** **restabeleceu a obrigação**. Instituições de pagamento e participantes de arranjos ficam sujeitos às mesmas obrigações acessórias dos bancos (e-Financeira), afastando a dispensa do art. 6º, §4º, da Lei 12.865/2013. Há **dados retroativos a janeiro de 2025** (entrega de dados de 2025 ao longo de 2026). Limites aplicáveis: verificar. https://serur.com.br/wp-content/uploads/2025/11/Informe-IN-2278-2025-E-Financeira.pdf ; https://www.machadomeyer.com.br/pt/boletim/legislacao-federal-fintechs-e-transparencia-fiscal
- **Status atual (nov/2026):** o Mercado Pago, o PagBank, contas digitais e afins **informam à RFB** (e-Financeira) e aos estados (**DIMP**). **Pix não é tributado**; o que se tributa é a receita omitida que o cruzamento revela.
- **Decred** (cartões): foi absorvida pela e-Financeira no novo modelo (verificar se a Decred foi formalmente extinta e a data).
- **Risco de malha fina:** recebimentos em **CPF de sócio** (contas pessoais no ML ou Shopee) e receita do PGDAS menor que o movimentado. O cruzamento e-Financeira/DIMP × PGDAS-D/DEFIS/ECF gera **omissão de receita presumida** (Lei 9.430/96, art. 42: depósitos sem origem comprovada), multa de 75% a 150% (qualificada reduzida a 100% pela Lei 14.689/2023 em regra; verificar) e exclusão do Simples.

---

## 7. "Manobras" comuns: legalidade e risco

| Prática | Legal? | Risco / comentário |
|---|---|---|
| **Vários CNPJs ou MEIs** (em nome de parentes ou funcionários) para dividir o faturamento e ficar no Simples | **Não**, quando há unidade econômica (mesmo estoque, mesmos funcionários, mesma gestão, mesma conta de anúncios ou logística) | Simulação ou interposição (CTN, art. 116, p. único; art. 149, VII). **Exclusão retroativa do Simples** de todos (LC 123, art. 29), cobrança pelo regime normal com multa qualificada, responsabilidade pessoal (CTN 135) e crime (Lei 8.137/90). O fisco cruza endereço, IP, sócios, contas e DIMP. Marketplaces também detectam contas vinculadas |
| Empresas separadas com **substância real** (atividades ou marcas distintas, sócios distintos, estrutura própria) | Sim | Mesmo sócio em várias optantes: a **receita global** conta para o limite (LC 123, art. 3º, §4º, III) |
| **Filial ou CD em estado com benefício** (MG, GO, ES, SC, BA) | Sim, se houver **estabelecimento efetivo** e regime concedido | "Filial de papel" (sem estoque nem operação) gera glosa e guerra fiscal com o estado de destino. Benefícios convalidados (LC 160/2017) **acabam até 2032**. Não é possível no Simples para benefícios que exigem regime normal de ICMS (em geral, o regime especial exige débito e crédito) |
| Usar o **CD do marketplace** em outra UF sem IE quando a UF exige | Não | Autuação na UF do CD; mercadoria em situação irregular |
| Emitir NF com **valor menor** (pelo repasse ou "meia nota") | Não | Crime de sonegação; DIMP revela |
| Vender pelo **CPF** para não emitir NF | Não | Omissão de receita, e-Financeira, IR PF, exclusão pelos marketplaces |
| Classificar NCM "amigável" (monofásico ou ST indevido) | Não | Autuação mais multa; importador também responde na aduana |
| **Subfaturar importação** ou usar "trading de fachada" | Não | Perdimento, multa aduaneira, crime de descaminho |
| **Simples híbrido 2027** para tomar crédito | Sim | Só compensa com créditos relevantes; avaliar o custo de conformidade |

### 7.1 Programas estaduais de e-commerce (2025–2026)

| UF | Instrumento | Carga efetiva noticiada | Condições / obs. |
|---|---|---|---|
| **MG** | Regime especial e-commerce (critérios na **Res. SEF 5.793/2024**; e-commerce via TTS/regime especial) | Vendas B2C a outras UFs: ICMS devido a MG cai de 7%/12% para **≈ 1,3%**, e **≈ 1% após 12 meses** (só a parcela que fica em MG; o DIFAL do destino continua) | Estabelecimento em MG, regime normal, metas. https://diariodocomercio.com.br/economia/beneficio-fiscal-e-commerce-minas/ ; https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/resolucoes/2024/rr5793_2024.html |
| **GO** | Regime especial e-commerce (RCTE, Anexo IX, art. 11, crédito outorgado; termo de acordo) mais o pacote de **abril/2026** (simplificação, dispensa de IE para sellers de fora em CDs goianos) | Crédito outorgado que leva a ≈ 1% a 2% (**verificar** o percentual vigente) | Termo de acordo, metas de arrecadação para quem já opera em GO. https://goias.gov.br/economia/?p=449056 |
| **ES** | COMPETE-ES / regime de comércio eletrônico | **≈ 1%** mais DIFAL (verificar a norma vigente) | Estabelecimento no ES |
| **SC** | TTD (crédito presumido) para comércio eletrônico e importação | ≈ 1% a 2,6% conforme TTD (verificar) | Pró-Emprego / TTD importação (porto) também relevante para importados |
| **BA** | Regime de e-commerce (verificar) | ≈ 1% a 2% (verificar) | — |
| **SP** | Regime especial e-commerce (Decreto 57.608/2011) | Não reduz alíquota; dispensa ST em certas entradas | Logística (CDs de ML e Amazon em SP) |

**Observações:**
- Benefício na origem **não reduz o DIFAL do destino** em vendas B2C interestaduais. O ganho é sobre a parcela da origem (7% ou 12%, ou 4% no importado).
- Para **importados**, a interestadual já é de 4%, então o benefício de origem vale pouco na venda, mas pode valer muito na **importação** (diferimento ou crédito presumido na entrada, por exemplo TTD/SC, Compete/ES, Pró-Goiás/Comex, verificar).
- **Horizonte:** de 2029 a 2032 o ICMS cai e os benefícios perdem valor. Avaliar se o investimento em filial se paga até 2032.
- Pesquisas não acharam programa oficial chamado "Pró-Ecommerce" nacional (verificar programas municipais ou estaduais com esse nome).

---

## 8. Produtos: amigáveis x pesados (tributário e regulatório)

### 8.1 Tax-friendly (para revendedor)

- **Monofásicos comprados de indústria ou importador nacional** (cosméticos, perfumaria, higiene; autopeças; pneus): PIS/COFINS zero na revenda (até 2026).
- **Produtos já com ICMS-ST retido** na compra: o ICMS do DAS ou da EFD é zerado (mas o custo de aquisição é maior; checar MVA).
- Livros (imunidade, CF 150, VI, "d"); alguns itens com alíquota reduzida de ICMS em certas UFs (verificar).
- Mercadoria nacional comprada com crédito integral, vendida a partir de estado com benefício.

### 8.2 Tax-heavy / alto atrito

- **Importados com IPI alto** (até 2026): o importador é equiparado a industrial e paga IPI no desembaraço **e na revenda** (STF Tema 906). Exemplos: eletrônicos, cosméticos importados, relógios, armas de pressão.
- **Itens em ST com MVA alta** (eletrônicos em algumas UFs, autopeças, ferramentas, materiais elétricos, brinquedos em algumas UFs): custo de antecipação e complexidade interestadual.
- **Imposto Seletivo (2027+)**: bebidas açucaradas, alcoólicas, tabaco e veículos, entre outros. Evitar como core.
- **Importado vendido B2C interestadual:** alíquota de 4% na origem e DIFAL alto no destino. A carga no destino chega à alíquota modal de 17% a 22%.

### 8.3 Barreiras regulatórias que bloqueiam importação ou anúncio

| Órgão | Produtos | Efeito |
|---|---|---|
| **Anatel** (homologação) | Tudo com rádio: Bluetooth, Wi-Fi, fones TWS, smartwatches, drones, carregadores sem fio, TV boxes, roteadores, controles RF | Sem certificado, o marketplace remove o anúncio (ações da Anatel com ML/Amazon em 2024–2025) e a mercadoria pode ser retida na importação. TV box pirata gera apreensão |
| **Inmetro** (certificação compulsória) | Brinquedos; plugues, adaptadores e carregadores; cabos e extensões; lâmpadas e LEDs; capacetes; pneus; panelas de pressão; artigos infantis (cadeirinhas, berços); eletrodomésticos | Licença de importação (LI) com anuência; venda sem selo é infração |
| **Anvisa** | Cosméticos, saneantes, suplementos, produtos para saúde, alguns eletrônicos médicos | Notificação ou registro; RDCs de importação |
| **MAPA** | Pet food, produtos de origem animal ou vegetal | Registro |
| **Exército** | Airsoft, simulacros, facas táticas (alguns), fogos | Controlado |
| **Ibama** | Pilhas, baterias, pneus (logística reversa); itens com madeira | Cadastro técnico federal |

(Atualizar lista de portarias Inmetro e atos Anatel: verificar.)

### 8.4 Importação: lembrete rápido

- Tributos na importação formal: II (TEC, de 0% a 35%), IPI (TIPI; até 2026), PIS-Importação de 2,1% e COFINS-Importação de 9,65% (alíquotas gerais, mais 1% adicional de COFINS em NCMs específicos, verificar), ICMS-importação (alíquota interna da UF do importador, por dentro), AFRMM e taxa Siscomex.
- Concorrência cross-border: o Remessa Conforme tem II de 20% até US$ 50 (Lei 14.902/2024) mais ICMS de 17% a 20% (várias UFs elevaram para 20% em 2025). Acima de US$ 50, II de 60% com dedução. O seller nacional formal compete com isso; acompanhar mudanças.
- Importação por conta e ordem ou encomenda: atenção à equiparação a industrial (IPI) e à responsabilidade solidária.

---

## 9. Checklist mensal fiscal do seller

**Até o dia 5–10**
- [ ] Baixar os relatórios de vendas de todas as plataformas (ML, Shopee, Amazon, TikTok Shop, Magalu) e os XML de NF-e emitidas e recebidas.
- [ ] Conferir **pedidos × NF-e** (zero pedido sem nota) e cancelamentos/devoluções com NF de entrada.
- [ ] Conferir **bruto NF-e × bruto informado pelas plataformas e meios de pagamento** (base da DIMP/e-Financeira).
- [ ] Conciliar o **estoque Full/FBA** × ERP e as NF de remessa e retorno.
- [ ] Obter as **NF/faturas de tarifas** (comissão, frete, armazenagem, ADS) de cada plataforma. Segregar armazenagem e frete (crédito no Real).
- [ ] Verificar os anúncios do Meta, Google e TikTok: entidade faturadora; se estrangeira, **reter e recolher IRRF/CIDE/PIS-COFINS-Imp/ISS**.

**Apuração**
- [ ] Simples: PGDAS-D com **segregação por NCM**: monofásico, ICMS-ST, revenda normal, mercado interno × exportação. Conferir RBT12 × sublimite de R$ 3,6 mi e limite de R$ 4,8 mi (projeção).
- [ ] Regime normal: EFD ICMS/IPI, EFD-Contribuições, DIFAL por UF (GNRE ou IE-ST), ST/antecipação, FCP.
- [ ] DIFAL: conferir as alíquotas internas atualizadas das UFs de destino e o cadastro de IE-ST onde o volume justificar.
- [ ] 2026: preencher os campos de **IBS/CBS (CST/cClassTrib)** na NF-e (ano-teste) e acompanhar as rejeições.
- [ ] DCTFWeb / Reinf quando houver retenções; DEFIS anual (Simples); ECF/ECD (Presumido e Real).

**Trimestral / anual**
- [ ] Simular Simples × Presumido × Real (e o híbrido de IBS/CBS no semestre seguinte).
- [ ] Revisar a cadeia de NCM × listas de ST × monofásico (mudanças de protocolos e convênios).
- [ ] Revisar as certificações (Anatel, Inmetro, Anvisa) do catálogo ativo.
- [ ] Revisar contas recebedoras: **nenhuma venda em CPF de sócio**.

---

## 10. Oportunidades de recuperação de créditos

1. **PIS/COFINS monofásico no Simples** (cosméticos, autopeças, pneus, bebidas frias): retificar o PGDAS-D dos últimos 5 anos e pedir restituição. **Prioridade máxima antes de 2027** (a janela vai fechando).
2. **ICMS-ST pago em duplicidade no Simples** (receita com ST não segregada no PGDAS): retificar e restituir a parcela de ICMS.
3. **ICMS-ST pago a maior** (base presumida maior que o preço praticado): restituição permitida pelo **STF Tema 201 (RE 593.849)**, conforme a lei e o procedimento da UF (verificar regras e prazos estaduais).
4. **DIFAL de 2022** pago indevidamente: só para quem tinha ação ajuizada até 29/11/2023 (modulação do Tema 1.266). Para os demais, em regra **não há recuperação**.
5. **DIFAL cobrado do Simples por decreto, sem lei estadual** (Temas 456 e 1.284): possível ação, conforme a UF.
6. **DIFAL B2C cobrado de optante do Simples** por UF de destino: contestável (verificar a UF).
7. **Lucro Real:** créditos de PIS/COFINS sobre **frete na venda e armazenagem** (Full/FBA) não aproveitados nos últimos 5 anos (base legal expressa). Comissões de marketplace e meios de pagamento: **tese judicial** (risco médio ou alto).
8. **ICMS na transferência entre filiais** cobrado após 2024 (ADC 49 / LC 204): restituição.
9. **Exclusão do ICMS da base de PIS/COFINS** (STF Tema 69; fatos desde 15/03/2017) para quem esteve no Presumido ou no Real e não aplicou. Também o **ICMS-ST na base de PIS/COFINS do substituído** (STJ Tema 1.125, favorável ao contribuinte; verificar a modulação).
10. **IPI na revenda de importado:** em regra devido (Tema 906), sem tese forte. Verificar créditos de IPI não aproveitados na entrada.
11. **Retenções sobre anúncios do exterior** recolhidas em duplicidade ou a maior (por exemplo, gross-up errado).

---

## 11. Linhas vermelhas (nunca recomendar)

- ❌ Dividir faturamento em CNPJs ou MEIs de "laranjas" ou parentes sem substância para ficar no Simples.
- ❌ Receber vendas em conta de **CPF** de sócio ou terceiro, ou vender sem NF-e.
- ❌ Emitir NF pelo valor líquido do repasse, "meia nota" ou NF com produto diferente do vendido.
- ❌ Usar NCM incorreto para enquadrar em monofásico, ST ou alíquota menor.
- ❌ Manter estoque em CD de outra UF sem cumprir a exigência de IE ou regime da UF.
- ❌ Usar "filial de papel" (sem operação real) para capturar benefício de ICMS.
- ❌ Subfaturar importação, usar interposição fraudulenta ou importar sem LI/anuência (Anatel, Inmetro, Anvisa).
- ❌ Vender produto sem homologação Anatel ou certificação Inmetro compulsória.
- ❌ Ignorar a retenção (IRRF/CIDE/PIS-COFINS-Imp/ISS) em serviços pagos ao exterior.
- ❌ Compensar crédito tributário de "tese" sem decisão judicial transitada (art. 170-A do CTN) ou crédito de terceiros (compensação não declarada mais multa de 75% a 150%).
- ❌ Prometer resultado de tese controversa como certo (comissões de marketplace, DIFAL, Tema 1.413).

---

## 12. Itens a verificar (pendências da pesquisa)

- Número exato das leis estaduais de solidariedade (RJ, BA) e o andamento do **Tema 1.413** no STF.
- Redação vigente do **art. 22 da LC 214/2025** (parágrafos), do Decreto 12.955/2026 e da Res. CGIBS 6/2026. Data da obrigatoriedade do split payment (2027 ou 2028).
- Prazo final efetivo da opção pelo Simples híbrido para 2027 (30/10/2026, segundo a Res. CGSN 194/2026).
- Tratamento do ICMS na **remessa interestadual ao Full/FBA** em cada UF de origem e destino. Redação atual do art. 12 da Portaria CAT-31/2019 (SP). Texto do decreto de GO de abril/2026 (dispensa de IE).
- Percentuais vigentes dos regimes de e-commerce de **GO, ES, SC e BA**.
- Número da IN que revogou a IN 2.219/2024 (provavelmente a IN 2.243/2025); limites de reporte da e-Financeira sob a IN 2.278/2025; extinção da Decred.
- Entidade faturadora do Google Ads e do TikTok Ads para contas brasileiras; tese fixada no STF Tema 914 (CIDE); alíquota atual de IOF sobre remessas.
- DIFAL B2C de optante do Simples: lista de UFs que ainda tentam cobrar. Resultado do **Tema 1.284**.
- Repartição percentual exata de PIS e COFINS no DAS do Anexo I por faixa.

---

## Fontes

**Legislação e tribunais (oficiais)**
- LC 214/2025 (texto, SEF/MG): https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/leis/2025/lc214_2025.pdf
- LC 204/2023 (Câmara): https://www2.camara.leg.br/legin/fed/leicom/2023/leicomplementar-204-28-dezembro-2023-795189-normaatualizada-pl.html
- STF Tema 1.266 (DIFAL): https://portal.stf.jus.br/jurisprudenciaRepercussao/verTeseTema.asp?numTema=1266
- STF Tema 1.413 (marketplace): https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=1413 ; https://noticias.stf.jus.br/?p=146394
- STF Tema 1.284 (DIFAL Simples por decreto): https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=1284
- Convênio ICMS 236/2021: https://www.legisweb.com.br/legislacao/?id=425891
- Convênio ICMS 134/2016: https://www.normasbrasil.com.br/norma/convenio-134-2016_333471.html ; Convênio 71/2020: https://www.legisweb.com.br/legislacao/?id=399417 ; Convênio 101/2025: https://www.confaz.fazenda.gov.br/legislacao/convenios/2025/CV101_25
- SEF/MG, intermediadores: https://www.fazenda.mg.gov.br/empresas/instituicoes-e-intermediadores-de-pagamentos-servicos-e-negocios/
- SEF/MG, cartilha de remessa ao mesmo titular: https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/orientacao/2025.01.16_Cartilha_Remessa_M_Titular.pdf
- SEF/MG, Res. 5.793/2024: https://www.fazenda.mg.gov.br/empresas/legislacao_tributaria/resolucoes/2024/rr5793_2024.html
- SEFAZ-SP, Portaria CAT-31/2019 e RCs: https://legislacao.fazenda.sp.gov.br/Paginas/Portaria-CAT-31-de-2019.aspx ; https://legislacao.fazenda.sp.gov.br/Paginas/RC30881_2024.aspx ; https://legislacao.fazenda.sp.gov.br/Paginas/RC22406_2020.aspx ; https://legislacao.fazenda.sp.gov.br/Paginas/RC27877_2023.aspx ; https://legislacao.fazenda.sp.gov.br/Paginas/RC34125_2026.aspx
- Goiás, medidas de e-commerce (2026): https://goias.gov.br/economia/?p=449056
- Receita Federal, manual de restituição do Simples: https://www8.receita.fazenda.gov.br/simplesnacional/arquivos/manual/manual_restituicao.pdf
- Receita Federal, manual de opção pelo regime regular de IBS/CBS no Simples: https://www8.receita.fazenda.gov.br/SimplesNacional/Arquivos/manual/Manual%20op%C3%A7%C3%A3o%20regime%20regular%20IBS%20e%20CBS%20no%20Simples%20Nacional.pdf
- Agência Gov, opção pelo IBS/CBS fora do DAS: https://agenciagov.ebc.com.br/noticias/202609/empresas-do-simples-nacional-ja-podem-optar-pelo-recolhimento-de-ibs-e-cbs-fora-do-regime-unificado
- API Mercado Livre (IE por estado): https://developers.mercadolivre.com.br/envio-de-inscricoes-estaduais
- CARF, súmulas de PIS/COFINS: https://www.gov.br/carf/pt-br/jurisprudencia/sumulas-carf/pis-cofins-cide
- TRF3 (crédito sobre marketplace negado): https://web.trf3.jus.br/acordaos/Acordao/BuscarDocumentoPje/382025017

**Escritórios, consultorias e imprensa especializada**
- PwC, Tax Intelligence: marketplaces (2026): https://www.pwc.com.br/pt/thinking-about-taxes/tax-intelligence/2026/tax-intelligence-raciocinios-ed-07_marketplaces.pdf
- EY, plataformas digitais e IBS/CBS: https://www.ey.com/pt_br/newsroom/2026/07/obrigacoes-plataformas-digitais-contexto-ibs-cbs ; https://www.ey.com/pt_br/insights/tax/ibs-e-cbs-responsabilidades-das-plataformas-digitais
- ConJur, responsabilidade das plataformas: https://www.conjur.com.br/2025-dez-29/responsabilidade-tributaria-das-plataformas-digitais-na-reforma/
- Machado Meyer, Tema 1.413: https://www.machadomeyer.com.br/pt/boletim/stf-stf-analisara-a-responsabilidade-tributaria-do-marketplace-pelo-pagamento-do-icms-nas-hipoteses-de-operacoes-com-bens-e-mercadorias-digitais-e-nao-digitais
- Machado Meyer, fintechs e transparência (IN 2.278): https://www.machadomeyer.com.br/pt/boletim/legislacao-federal-fintechs-e-transparencia-fiscal
- Serur, informe sobre a IN 2.278/2025: https://serur.com.br/wp-content/uploads/2025/11/Informe-IN-2278-2025-E-Financeira.pdf
- BMA, intermediadores de negócios (Conv. 134/2016): https://www.bmalaw.com.br/conteudo/direito-tributario/artigos-e-noticias/intermediadores-de-negocios-tem-ate-o-fim-de-abril-para-entregar-declaracao-aos-estados/pdf
- BMA, LC 204/2023: https://www.bmalaw.com.br/conteudo/direito-tributario/informativos-e-newsletters/sancionada-lei-complementar-que-veda-incidencia-de-icms-sobre-transferencias-de-mercadorias-entre-estabelecimentos-do-mesmo-contribuinte/pdf
- Mayer Brown, Convênio ICMS 109/2024: https://www.mayerbrown.com/-/media/files/perspectives-events/publications/2025/01/direito-tributrio-em-destaque-convenio-icms.pdf
- TAG Advogados, split 2027: https://tagdlaw.com.br/?p=14896 ; créditos sobre plataformas digitais no CARF: https://tagdlaw.com.br/carf-reconhece-creditos-de-pis-e-cofins-sobre-pagamentos-eletronicos-para-plataformas-digitais/
- Reformatributaria.com, Simples fora do híbrido: https://www.reformatributaria.com/tecnologia/empresas-do-simples-fora-do-modelo-hibrido-nao-farao-split-payment-em-2027/
- Comunicado da Meta (PIS/COFINS e ISS a partir de 2026): https://www.reformatributaria.com/wp-content/uploads/2025/09/Comunicado-oficial-Meta.pdf
- Contadores.cnt.br, Tema 1.266: https://contadores.cnt.br/projetos/46/noticias/tecnicas/2025/12/19/stf-valida-cobranca-do-difal-a-partir-de-abril-de-2022-e-fixa-tese-em-repercussao-geral.html
- IBET, Tema 517: https://www.ibet.com.br/cobranca-de-diferencial-de-icms-para-empresas-que-optam-pelo-simples-nacional-e-constitucional/
- IBET, crédito sobre marketplace: https://www.ibet.com.br/justica-autoriza-creditos-de-pis-cofins-sobre-despesas-com-marketplaces/
- CRC-SP, dedutibilidade de comissão de marketplace: https://online.crcsp.org.br/portal/noticias/noticia.asp?c=9056
- Contábeis, LC 224/2025: https://www.contabeis.com.br/noticias/75261/lucro-presumido-tera-aumento-de-10-na-base-do-irpj-e-csll-em-2026/
- Contábeis, monofásico no Simples: https://www.contabeis.com.br/artigos/7115/guia-completo-credito-de-pis-e-cofins-monofasico-no-simples-nacional/
- Diário do Comércio, regime de e-commerce de MG: https://diariodocomercio.com.br/economia/beneficio-fiscal-e-commerce-minas/
- Mais Goiás, Shopee e dispensa de IE: https://www.maisgoias.com.br/cidades/daniel-vilela-assina-acordos-por-crescimento-da-shopee-em-goias-e-mira-3-mil-empregos/
- Contabilidade Zen, Full e impostos (2026): https://www.contabilidadezen.com.br/blog/mercado-livre-full-impostos-2026/
- Jornal Contábil, prazo do Simples para IBS/CBS em 2027: https://jornalcontabil.com.br/noticia/empresas-do-simples-ganham-mais-tempo-para-decidir-sobre-ibs-e-cbs-para-2027/amp/
