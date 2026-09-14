/** Tipos centrais do domínio de concorrência. */

export type Categoria =
  | "Perfumaria/Colonia"
  | "Saude/Bem-estar"
  | "Suplementos/Nutricao"
  | "Cosmeticos/Skincare"
  | "Tatico/Outdoor"
  | "Automotivo"
  | "Ferramentas"
  | "Utensilios Cozinha/Jardim"
  | "Pesca/Nautica"
  | "Bike/Ciclismo"
  | "Eletronicos/Games"
  | "Casa/Eletrodomesticos"
  | "Outros/Diversos";

/** Subcategoria de perfumaria — usada só quando a categoria é Perfumaria/Colonia. */
export type SubcategoriaPerfumaria = "arabe" | "designer" | "nicho" | null;

/** Um anúncio de concorrente já parseado e classificado. */
export interface AnuncioConcorrente {
  titulo: string;
  marca: string;
  vendasReais: number; // "Vendas em $" — a receita do anúncio
  vendasUnidades: number;
  precoMedio: number | null;
  tipoPublicacao: string | null;
  fulfillment: boolean;
  catalogo: boolean;
  freteGratis: boolean;
  mercadoEnvios: boolean;
  desconto: boolean;
  sku: string | null;
  oem: string | null;
  gtinBruto: string | null;
  gtinLimpo: string | null;
  nPeca: string | null;
  estado: string | null;
  mercadoPago: boolean;
  republicada: boolean;
  condicao: string | null;
  concorrente: string;
  categoria: Categoria;
  subcategoria: SubcategoriaPerfumaria;
  /** Tamanho recuperado do título por heurística, ou "Não identificado no título". */
  tamanhoDetectado: string;
}

/** Uma linha rejeitada no upload, com o motivo — vira relatório de erro exportável. */
export interface LinhaRejeitada {
  linha: number; // número da linha na planilha (1-based, contando o cabeçalho)
  motivo: string;
  dados: Record<string, unknown>;
}

export interface ResultadoParse<T> {
  itens: T[];
  rejeitadas: LinhaRejeitada[];
  totalLinhas: number;
}
