import { describe, it, expect } from "vitest";
import { parseNumeroBr, parseCompacto, simNao } from "@/lib/domain/text";
import { limparGtin } from "@/lib/domain/gtin";
import { classificarCategoria, detectarTamanho, subcategoriaPerfumaria } from "@/lib/domain/categoria";
import { marcaEhOportunidade } from "@/lib/domain/oportunidade";
import { sugerirCompra } from "@/lib/domain/compra";
import { priorizarMarcas } from "@/lib/domain/priorizacao";
import { CRITERIOS_PADRAO } from "@/lib/domain/criterios";

describe("text", () => {
  it("parseNumeroBr", () => {
    expect(parseNumeroBr("1.234,56")).toBeCloseTo(1234.56);
    expect(parseNumeroBr("61,3%")).toBeCloseTo(0.613);
    expect(parseNumeroBr("R$ 100")).toBe(100);
    expect(parseNumeroBr("")).toBeNull();
    expect(parseNumeroBr(null)).toBeNull();
    expect(parseNumeroBr(42)).toBe(42);
  });
  it("parseCompacto (Nubmetrics)", () => {
    expect(parseCompacto("+$20.9M")).toBe(20_900_000);
    expect(parseCompacto("+161.6k")).toBe(161_600);
    expect(parseCompacto("61,3%")).toBeCloseTo(0.613);
    expect(parseCompacto("-2")).toBe(-2);
    expect(parseCompacto(5)).toBe(5);
    expect(parseCompacto("")).toBeNull();
  });
  it("simNao", () => {
    expect(simNao("Sim")).toBe(true);
    expect(simNao("Não")).toBe(false);
    expect(simNao(null)).toBe(false);
  });
});

describe("gtin", () => {
  it("aceita 8/12/13/14 dígitos", () => {
    expect(limparGtin(8411061838778)).toBe("8411061838778");
    expect(limparGtin("3137370359487")).toBe("3137370359487");
    expect(limparGtin("07898301059895")).toBe("07898301059895");
  });
  it("descarta o que não é GTIN válido, sem quebrar", () => {
    expect(limparGtin("123")).toBeNull();
    expect(limparGtin("abc")).toBeNull();
    expect(limparGtin(null)).toBeNull();
    expect(limparGtin("")).toBeNull();
  });
  it("lida com notação científica do Excel", () => {
    // 7.898639690388e12 → 13 dígitos
    expect(limparGtin("7.898639690388e12")).toHaveLength(13);
  });
});

describe("categoria", () => {
  it("classifica por palavra-chave no título", () => {
    expect(classificarCategoria("Perfume 212 Vip Rosé Carolina Herrera", "CAROLINA HERRERA")).toBe("Perfumaria/Colonia");
    expect(classificarCategoria("Aparelho De Medir Pressão Digital", "G-TECH")).toBe("Saude/Bem-estar");
  });
  it("usa fallback de marca quando o título trunca antes da palavra-chave", () => {
    expect(classificarCategoria("Nina Le", "NINA RICCI")).toBe("Perfumaria/Colonia");
  });
  it("detecta tamanho ou marca como não identificado", () => {
    expect(detectarTamanho("Nina Le Perfume 50 Ml")).toBe("50ml");
    expect(detectarTamanho("Produto sem tamanho no titulo")).toBe("Não identificado no título");
  });
  it("subdivide perfumaria em árabe/nicho/designer", () => {
    expect(subcategoriaPerfumaria("LATTAFA", "Perfumaria/Colonia")).toBe("arabe");
    expect(subcategoriaPerfumaria("XERJOFF", "Perfumaria/Colonia")).toBe("nicho");
    expect(subcategoriaPerfumaria("DIOR", "Perfumaria/Colonia")).toBe("designer");
    expect(subcategoriaPerfumaria("G-TECH", "Saude/Bem-estar")).toBeNull();
  });
});

describe("oportunidade", () => {
  it("exige ticket >= 100 E unidades >= 100", () => {
    expect(marcaEhOportunidade(120, 150, CRITERIOS_PADRAO)).toBe(true);
    expect(marcaEhOportunidade(90, 150, CRITERIOS_PADRAO)).toBe(false);
    expect(marcaEhOportunidade(120, 50, CRITERIOS_PADRAO)).toBe(false);
  });
});

describe("sugestão de compra", () => {
  it("marca reposição urgente quando a cobertura é curta", () => {
    const s = sugerirCompra({ sku: "A", estoqueAtual: 5, vendaMediaDia: 2, diasEmEstoque: 60 }, CRITERIOS_PADRAO);
    expect(s.lista).toBe("reposicao_urgente");
    expect(s.quantidadeSugerida).toBeGreaterThan(0);
  });
  it("não coloca produto novo (sem venda) na lista de promoção", () => {
    const s = sugerirCompra({ sku: "B", estoqueAtual: 10, vendaMediaDia: 0, diasEmEstoque: 3 }, CRITERIOS_PADRAO);
    expect(s.lista).toBe("aguardar");
  });
  it("produto parado e antigo vai pra promoção", () => {
    const s = sugerirCompra({ sku: "C", estoqueAtual: 10, vendaMediaDia: 0, diasEmEstoque: 40 }, CRITERIOS_PADRAO);
    expect(s.lista).toBe("promocao");
  });
});

describe("priorização", () => {
  it("gera ondas e favorece ticket/poucos vendedores sobre volume puro", () => {
    const r = priorizarMarcas(
      [
        { marca: "MASSA", vendas: 20_000_000, unidades: 160_000, ticketMedio: 125, nVendedores: 550, tendenciaPct: 0, jaNoMix: false },
        { marca: "NICHO", vendas: 500_000, unidades: 1_000, ticketMedio: 500, nVendedores: 20, tendenciaPct: 3, jaNoMix: false },
      ],
      CRITERIOS_PADRAO,
      1,
    );
    expect(r).toHaveLength(2);
    expect(r[0].marca).toBe("NICHO"); // requinte/facilidade ganha do volume
    expect(r[0].onda).toBe(1);
    expect(r[1].onda).toBe(2);
  });
});
