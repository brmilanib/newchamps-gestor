import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { createClient } from "@/lib/supabase/server";

/**
 * Gera o import__4_.xlsx pronto pro Gestor Seller a partir do catálogo próprio.
 * Colunas validadas: SKU Interno / SKU externo / Link da Imagem / Título /
 * Preço de Custo / Custo Extra / EAN. SKU Interno = SKU externo = SKU;
 * Preço de Custo = Custo Médio.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Não autenticado", { status: 401 });
  const { data: perfil } = await supabase.from("users").select("organization_id").eq("id", user.id).maybeSingle();
  const org = perfil?.organization_id;
  if (!org) return new NextResponse("Sem organização", { status: 400 });

  const pagina = 1000;
  const produtos: Array<{ sku: string; titulo: string; custo_medio: number | null; gtin: string | null }> = [];
  for (let from = 0; ; from += pagina) {
    const { data } = await supabase
      .from("own_products")
      .select("sku, titulo, custo_medio, gtin")
      .eq("organization_id", org)
      .eq("ativo", true)
      .order("sku", { ascending: true })
      .range(from, from + pagina - 1);
    if (!data || data.length === 0) break;
    produtos.push(...data);
    if (data.length < pagina) break;
  }

  const linhas = produtos.map((p) => ({
    "SKU Interno": p.sku,
    "SKU externo (opcional)": p.sku,
    "Link da Imagem (opcional)": null,
    "Título": p.titulo,
    "Preço de Custo": p.custo_medio ?? null,
    "Custo Extra (opcional)": null,
    "EAN (opcional)": p.gtin ?? null,
  }));

  const ws = XLSX.utils.json_to_sheet(linhas, {
    header: ["SKU Interno", "SKU externo (opcional)", "Link da Imagem (opcional)", "Título", "Preço de Custo", "Custo Extra (opcional)", "EAN (opcional)"],
  });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Planilha1");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;

  return new NextResponse(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="import__4_.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
