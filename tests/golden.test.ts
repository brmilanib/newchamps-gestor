import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";
import type { AnuncioConcorrente, Categoria } from "@/lib/domain/types";
import { limparGtin } from "@/lib/domain/gtin";
import { detectarTamanho } from "@/lib/domain/categoria";
import { simNao } from "@/lib/domain/text";
import { receitaPorConcorrente, porCategoria, consolidarGtin } from "@/lib/domain/agregacao";
import { parseConcorrente, LayoutInesperadoError } from "@/lib/parsers/concorrente";
import { parseNubmetrics } from "@/lib/parsers/nubmetrics";
import { priorizarMarcas } from "@/lib/domain/priorizacao";
import { CRITERIOS_PADRAO } from "@/lib/domain/criterios";

const fx = (nome: string) => fileURLToPath(new URL(`./fixtures/${nome}`, import.meta.url));

function aba(arquivo: string, nome: string): Array<Record<string, unknown>> {
  const wb = XLSX.read(readFileSync(fx(arquivo)), { type: "buffer" });
  return XLSX.utils.sheet_to_json(wb.Sheets[nome], { defval: null });
}

/**
 * Estas asserções são o critério de aceite da Fase 1 em código: o sistema tem que
 * reproduzir exatamente os números da planilha `Analise_Comparativa_3_Concorrentes.xlsx`.
 */
describe("golden — concorrência (Analise_Comparativa_3_Concorrentes.xlsx)", () => {
  const brutos = aba("Analise_Comparativa_3_Concorrentes.xlsx", "Dados Brutos");

  // Mapeia a aba "Dados Brutos" (já com Concorrente e Categoria) para o tipo de domínio,
  // usando a MESMA lógica de GTIN/tamanho do sistema.
  const anuncios: AnuncioConcorrente[] = brutos.map((r) => ({
    titulo: String(r["Título"] ?? ""),
    marca: String(r["Marca"] ?? ""),
    vendasReais: Number(r["Vendas em $"]) || 0,
    vendasUnidades: Number(r["Vendas em Unid."]) || 0,
    precoMedio: r["Preço Médio"] == null ? null : Number(r["Preço Médio"]),
    tipoPublicacao: null,
    fulfillment: simNao(r["Fulfillment"]),
    catalogo: simNao(r["Catálogo."]),
    freteGratis: simNao(r["Com Frete grátis"]),
    mercadoEnvios: simNao(r["Com Mercado Envios"]),
    desconto: simNao(r["Com desconto"]),
    sku: r["SKU"] == null ? null : String(r["SKU"]),
    oem: null,
    gtinBruto: r["GTIN"] == null ? null : String(r["GTIN"]),
    gtinLimpo: limparGtin(r["GTIN"]),
    nPeca: null,
    estado: null,
    mercadoPago: simNao(r["MercadoPago"]),
    republicada: simNao(r["Republicada"]),
    condicao: null,
    concorrente: String(r["Concorrente"] ?? ""),
    categoria: String(r["Categoria"] ?? "Outros/Diversos") as Categoria,
    subcategoria: null,
    tamanhoDetectado: detectarTamanho(String(r["Título"] ?? "")),
  }));

  it("tem 3.988 anúncios", () => {
    expect(anuncios).toHaveLength(3988);
  });

  it("receita por concorrente bate com o Resumo Executivo", () => {
    const rc = receitaPorConcorrente(anuncios);
    expect(rc.SIENO).toBe(8_228_730);
    expect(rc.BAGATELLE).toBe(3_808_650);
    expect(rc.AUMA).toBe(9_294_080);
    expect(rc.SIENO + rc.BAGATELLE + rc.AUMA).toBe(21_331_460);
  });

  it("Perfumaria/Colonia bate com a aba Por Categoria", () => {
    const perf = porCategoria(anuncios).find((c) => c.categoria === "Perfumaria/Colonia");
    expect(perf).toBeDefined();
    expect(perf!.nAnuncios).toBe(3058);
    expect(perf!.receita).toBe(15_170_130);
  });

  it("consolidação por GTIN bate com a aba Produtos por GTIN", () => {
    const cg = consolidarGtin(anuncios);
    expect(cg.totalGtinsUnicos).toBe(2142);
    expect(cg.anunciosSemGtin).toBe(351);
    expect(cg.gtinsMultiConcorrente).toBe(310);
  });

  it("caso Nina Ricci: GTIN 3137370359487 caro num concorrente vs barato no outro", () => {
    const cg = consolidarGtin(anuncios);
    const nina = cg.grupos.find((g) => g.gtin === "3137370359487");
    expect(nina).toBeDefined();
    expect(nina!.nConcorrentes).toBe(2);
    expect(Math.round(nina!.precoMedioPorConcorrente.BAGATELLE!)).toBe(412);
    expect(Math.round(nina!.precoMedioPorConcorrente.AUMA!)).toBe(599);
  });
});

describe("parser de concorrente", () => {
  const brutos = aba("Analise_Comparativa_3_Concorrentes.xlsx", "Dados Brutos");
  const sieno = brutos.filter((r) => r["Concorrente"] === "SIENO");

  it("reproduz a receita da SIENO a partir das linhas cruas", () => {
    const res = parseConcorrente(sieno, "SIENO");
    const receita = res.itens.reduce((s, a) => s + a.vendasReais, 0);
    expect(receita).toBe(8_228_730);
    expect(res.rejeitadas).toHaveLength(0);
  });

  it("rejeita linha ruim sem derrubar o import", () => {
    const res = parseConcorrente(
      [
        { "Título": "Bom produto", "Vendas em $": 100, "Vendas em Unid.": 2 },
        { "Título": null, "Vendas em $": 50, "Vendas em Unid.": 1 },
      ],
      "TESTE",
    );
    expect(res.itens).toHaveLength(1);
    expect(res.rejeitadas).toHaveLength(1);
    expect(res.rejeitadas[0].motivo).toBe("Sem título");
  });

  it("falha com mensagem clara em layout inesperado", () => {
    expect(() => parseConcorrente([{ coluna_errada: 1 }], "X")).toThrow(LayoutInesperadoError);
  });
});

describe("golden — Nubmetrics / priorização (Priorizacao_Entrada_Perfumaria_Ago2026.xlsx)", () => {
  const dados = aba("Priorizacao_Entrada_Perfumaria_Ago2026.xlsx", "Dados");

  it("parseia as 100 marcas", () => {
    const res = parseNubmetrics(dados);
    expect(res.itens).toHaveLength(100);
    expect(res.rejeitadas).toHaveLength(0);
  });

  it("marca de massa (NATURA) não fica na onda 1 — o modelo prioriza requinte", () => {
    const res = parseNubmetrics(dados);
    const ranking = priorizarMarcas(res.itens, CRITERIOS_PADRAO);
    const natura = ranking.find((m) => m.marca === "NATURA");
    expect(natura).toBeDefined();
    expect(natura!.onda).toBeGreaterThan(1);
  });
});
