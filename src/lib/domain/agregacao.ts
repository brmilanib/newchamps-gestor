import type { AnuncioConcorrente, Categoria } from "./types";
import type { CriteriosNegocio } from "./criterios";
import { marcaEhOportunidade } from "./oportunidade";

/** Receita (soma de vendasReais) por concorrente. */
export function receitaPorConcorrente(anuncios: AnuncioConcorrente[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of anuncios) out[a.concorrente] = (out[a.concorrente] ?? 0) + a.vendasReais;
  return out;
}

export interface ResumoCategoria {
  categoria: Categoria;
  nMarcas: number;
  nAnuncios: number;
  receita: number;
  unidades: number;
  ticketMedio: number;
}

export function porCategoria(anuncios: AnuncioConcorrente[]): ResumoCategoria[] {
  const map = new Map<Categoria, { anuncios: number; receita: number; unidades: number; marcas: Set<string> }>();
  for (const a of anuncios) {
    let g = map.get(a.categoria);
    if (!g) {
      g = { anuncios: 0, receita: 0, unidades: 0, marcas: new Set() };
      map.set(a.categoria, g);
    }
    g.anuncios++;
    g.receita += a.vendasReais;
    g.unidades += a.vendasUnidades;
    if (a.marca) g.marcas.add(a.marca);
  }
  return [...map.entries()]
    .map(([categoria, g]) => ({
      categoria,
      nMarcas: g.marcas.size,
      nAnuncios: g.anuncios,
      receita: g.receita,
      unidades: g.unidades,
      ticketMedio: g.unidades > 0 ? g.receita / g.unidades : 0,
    }))
    .sort((a, b) => b.receita - a.receita);
}

export interface ResumoMarca {
  marca: string;
  categoria: Categoria;
  receitaPorConcorrente: Record<string, number>;
  receitaTotal: number;
  unidadesTotal: number;
  nAnuncios: number;
  ticketMedio: number;
  nConcorrentes: number;
  ehOportunidade: boolean;
}

export function porMarca(anuncios: AnuncioConcorrente[], criterios: CriteriosNegocio): ResumoMarca[] {
  const map = new Map<
    string,
    { categorias: Map<Categoria, number>; porConc: Record<string, number>; receita: number; unidades: number; anuncios: number; concorrentes: Set<string> }
  >();
  for (const a of anuncios) {
    let g = map.get(a.marca);
    if (!g) {
      g = { categorias: new Map(), porConc: {}, receita: 0, unidades: 0, anuncios: 0, concorrentes: new Set() };
      map.set(a.marca, g);
    }
    g.categorias.set(a.categoria, (g.categorias.get(a.categoria) ?? 0) + a.vendasReais);
    g.porConc[a.concorrente] = (g.porConc[a.concorrente] ?? 0) + a.vendasReais;
    g.receita += a.vendasReais;
    g.unidades += a.vendasUnidades;
    g.anuncios++;
    g.concorrentes.add(a.concorrente);
  }
  return [...map.entries()]
    .map(([marca, g]) => {
      // Categoria predominante = a de maior receita.
      const categoria = [...g.categorias.entries()].sort((a, b) => b[1] - a[1])[0][0];
      const ticketMedio = g.unidades > 0 ? g.receita / g.unidades : 0;
      return {
        marca,
        categoria,
        receitaPorConcorrente: g.porConc,
        receitaTotal: g.receita,
        unidadesTotal: g.unidades,
        nAnuncios: g.anuncios,
        ticketMedio,
        nConcorrentes: g.concorrentes.size,
        ehOportunidade: marcaEhOportunidade(ticketMedio, g.unidades, criterios),
      };
    })
    .sort((a, b) => b.receitaTotal - a.receitaTotal);
}

export interface GrupoGtin {
  gtin: string;
  marca: string;
  categoria: Categoria;
  tamanhoDetectado: string;
  tituloRepresentativo: string;
  nConcorrentes: number;
  nAnuncios: number;
  receitaTotal: number;
  unidadesTotal: number;
  precoMedioPorConcorrente: Record<string, number | null>;
}

export interface ConsolidacaoGtin {
  grupos: GrupoGtin[];
  totalGtinsUnicos: number;
  anunciosSemGtin: number;
  gtinsMultiConcorrente: number;
}

/**
 * Consolidação por GTIN (a funcionalidade mais valiosa): dedupe por código de barras,
 * tamanho recuperado da primeira variação de título que tem tamanho, e preço médio
 * por concorrente pra comparar o mesmo produto físico. Anúncios sem GTIN válido são
 * contados à parte — não entram nos grupos, e não quebram o processo.
 */
export function consolidarGtin(anuncios: AnuncioConcorrente[]): ConsolidacaoGtin {
  const map = new Map<
    string,
    {
      marca: string;
      categoria: Categoria;
      tamanho: string;
      titulo: string;
      receita: number;
      unidades: number;
      anuncios: number;
      concorrentes: Set<string>;
      precoSoma: Record<string, number>;
      precoN: Record<string, number>;
    }
  >();
  let semGtin = 0;

  for (const a of anuncios) {
    if (!a.gtinLimpo) {
      semGtin++;
      continue;
    }
    let g = map.get(a.gtinLimpo);
    if (!g) {
      g = {
        marca: a.marca,
        categoria: a.categoria,
        tamanho: "Não identificado no título",
        titulo: a.titulo,
        receita: 0,
        unidades: 0,
        anuncios: 0,
        concorrentes: new Set(),
        precoSoma: {},
        precoN: {},
      };
      map.set(a.gtinLimpo, g);
    }
    // Recupera o primeiro tamanho identificado entre as variações de título.
    if (g.tamanho === "Não identificado no título" && a.tamanhoDetectado !== "Não identificado no título") {
      g.tamanho = a.tamanhoDetectado;
    }
    g.receita += a.vendasReais;
    g.unidades += a.vendasUnidades;
    g.anuncios++;
    g.concorrentes.add(a.concorrente);
    if (a.precoMedio != null) {
      g.precoSoma[a.concorrente] = (g.precoSoma[a.concorrente] ?? 0) + a.precoMedio;
      g.precoN[a.concorrente] = (g.precoN[a.concorrente] ?? 0) + 1;
    }
  }

  const grupos: GrupoGtin[] = [...map.entries()].map(([gtin, g]) => {
    const precoMedioPorConcorrente: Record<string, number | null> = {};
    for (const conc of g.concorrentes) {
      precoMedioPorConcorrente[conc] = g.precoN[conc] ? g.precoSoma[conc] / g.precoN[conc] : null;
    }
    return {
      gtin,
      marca: g.marca,
      categoria: g.categoria,
      tamanhoDetectado: g.tamanho,
      tituloRepresentativo: g.titulo,
      nConcorrentes: g.concorrentes.size,
      nAnuncios: g.anuncios,
      receitaTotal: g.receita,
      unidadesTotal: g.unidades,
      precoMedioPorConcorrente,
    };
  });

  return {
    grupos,
    totalGtinsUnicos: grupos.length,
    anunciosSemGtin: semGtin,
    gtinsMultiConcorrente: grupos.filter((g) => g.nConcorrentes > 1).length,
  };
}
