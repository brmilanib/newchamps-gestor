import type { Categoria, SubcategoriaPerfumaria } from "./types";

/**
 * Classificação de categoria por heurística (seção 9). É regex sobre o título +
 * lista de marcas conhecidas de perfumaria como fallback, porque o título vem
 * truncado em 40 caracteres e às vezes corta antes da palavra-chave.
 *
 * IMPORTANTE: isto é heurística, não verdade absoluta. A interface deve marcar o
 * resultado como "detectado automaticamente". Nunca apresentar como certeza.
 */

const norm = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "") // remove acentos (marcas de combinação)
    .toLowerCase();

// Ordem importa: a primeira categoria cujo padrão bater vence.
const REGRAS: Array<{ categoria: Categoria; re: RegExp }> = [
  { categoria: "Perfumaria/Colonia", re: /\b(perfum|eau de|edp|edt|edc|colonia|parfum|body splash|deo colonia|extrait)\b/ },
  { categoria: "Suplementos/Nutricao", re: /\b(whey|creatina|creatin|bcaa|colageno|vitamin|suplement|proteina|termogenic|omega)\b/ },
  { categoria: "Saude/Bem-estar", re: /\b(pressao|oximetro|glicos|nebuliz|termometro|massage|ortoped|inalador|balanca|aparelho de)\b/ },
  { categoria: "Cosmeticos/Skincare", re: /\b(skincare|serum|hidratante|protetor solar|shampoo|condicionad|maquiagem|batom|base facial|acido|creme facial|mascara)\b/ },
  { categoria: "Tatico/Outdoor", re: /\b(tatic|militar|camping|canivete|lanterna tatica|coturno|airsoft|sobreviv)\b/ },
  { categoria: "Automotivo", re: /\b(automotiv|pneu|farol|carro|veicul|oleo motor|bateria automot|parachoque|retrovisor)\b/ },
  { categoria: "Ferramentas", re: /\b(furadeira|parafusadeira|chave de fenda|serra|alicate|martelo|ferramenta|broca|esmerilhad)\b/ },
  { categoria: "Utensilios Cozinha/Jardim", re: /\b(panela|talher|cozinha|jardim|mangueira|regador|utensili|assadeira|frigideira)\b/ },
  { categoria: "Pesca/Nautica", re: /\b(pesca|pescar|molinete|carretilha|anzol|isca|nautic|caiaque|vara de)\b/ },
  { categoria: "Bike/Ciclismo", re: /\b(bike|bicicleta|ciclism|pedal|guidao|capacete ciclis)\b/ },
  { categoria: "Eletronicos/Games", re: /\b(fone|headset|mouse|teclado|notebook|celular|smartphone|console|game|carregador|caixa de som|smartwatch)\b/ },
  { categoria: "Casa/Eletrodomesticos", re: /\b(liquidific|ventilador|geladeira|micro-?ondas|aspirador|cafeteira|air fryer|fritadeira|eletrodom)\b/ },
];

// Marcas conhecidas de perfumaria (fallback quando o título trunca antes da palavra-chave).
const MARCAS_PERFUMARIA = new Set(
  [
    "carolina herrera", "rabanne", "paco rabanne", "jean paul gaultier", "nina ricci",
    "lattafa", "armaf", "al haramain", "lattafa perfumes", "maison alhambra", "orientica",
    "versace", "dior", "chanel", "lancome", "givenchy", "hugo boss", "montblanc", "mont blanc",
    "dolce gabbana", "dolce & gabbana", "calvin klein", "azzaro", "bvlgari", "prada",
    "yves saint laurent", "ysl", "giorgio armani", "armani", "burberry", "guerlain",
    "xerjoff", "nishane", "parfums de marly", "regalien", "thameen", "initio", "amouage",
    "natura", "o boticario", "boticario", "avon", "eudora",
    "antonio banderas", "shakira",
  ].map(norm),
);

/** Marcas árabes/import acessível — subcategoria de perfumaria. */
const MARCAS_ARABE = new Set(
  ["lattafa", "armaf", "al haramain", "maison alhambra", "orientica", "rasasi", "afnan", "ard al zaafaran", "swiss arabian"].map(norm),
);
/** Marcas de nicho — subcategoria de perfumaria. */
const MARCAS_NICHO = new Set(
  ["xerjoff", "nishane", "parfums de marly", "regalien", "thameen", "initio", "amouage", "creed", "maison francis kurkdjian", "mfk"].map(norm),
);

export function classificarCategoria(titulo: string, marca: string): Categoria {
  const t = norm(titulo ?? "");
  for (const { categoria, re } of REGRAS) {
    if (re.test(t)) return categoria;
  }
  // Fallback: se a marca é de perfumaria conhecida, é perfumaria.
  if (MARCAS_PERFUMARIA.has(norm(marca ?? ""))) return "Perfumaria/Colonia";
  return "Outros/Diversos";
}

export function subcategoriaPerfumaria(marca: string, categoria: Categoria): SubcategoriaPerfumaria {
  if (categoria !== "Perfumaria/Colonia") return null;
  const m = norm(marca ?? "");
  if (MARCAS_ARABE.has(m)) return "arabe";
  if (MARCAS_NICHO.has(m)) return "nicho";
  return "designer";
}

/**
 * Tamanho recuperado do título: primeira ocorrência de `\d+\s*(ml|g)`.
 * Se nada bater, retorna "Não identificado no título" — nunca inventa valor.
 */
export function detectarTamanho(titulo: string): string {
  const m = String(titulo ?? "").match(/(\d+)\s*(ml|g)\b/i);
  return m ? `${m[1]}${m[2].toLowerCase()}` : "Não identificado no título";
}
