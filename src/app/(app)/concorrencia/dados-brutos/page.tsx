import Link from "next/link";
import { getSessao } from "@/lib/data/sessao";
import { getConcorrentes } from "@/lib/data/concorrencia";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, fmtBRL, fmtNum } from "@/components/ui";

const POR_PAGINA = 50;

export default async function DadosBrutosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; conc?: string; p?: string }>;
}) {
  const { q, conc, p } = await searchParams;
  const { organizationId } = await getSessao();
  const concorrentes = organizationId ? await getConcorrentes(organizationId) : [];
  const pagina = Math.max(1, Number(p) || 1);
  const de = (pagina - 1) * POR_PAGINA;

  const supabase = await createClient();
  let query = supabase
    .from("competitor_listings")
    .select("titulo, marca, categoria, vendas_reais, vendas_unidades, preco_medio, gtin_limpo, data_referencia, competitors!inner(nome, organization_id)", {
      count: "exact",
    })
    .eq("competitors.organization_id", organizationId ?? "")
    .order("vendas_reais", { ascending: false })
    .range(de, de + POR_PAGINA - 1);

  if (q?.trim()) query = query.ilike("titulo", `%${q.trim()}%`);
  if (conc?.trim()) query = query.eq("competitors.nome", conc.trim());

  const { data, count } = await query;
  const linhas = (data ?? []) as unknown as Array<{
    titulo: string; marca: string | null; categoria: string | null;
    vendas_reais: number; vendas_unidades: number; preco_medio: number | null;
    gtin_limpo: string | null; data_referencia: string; competitors: { nome: string };
  }>;
  const total = count ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  const qs = (np: number) => {
    const u = new URLSearchParams();
    if (q) u.set("q", q);
    if (conc) u.set("conc", conc);
    u.set("p", String(np));
    return `?${u.toString()}`;
  };

  return (
    <div>
      <PageHeader
        titulo="Dados Brutos"
        descricao="Todos os anúncios importados, linha a linha. É o audit trail — confiável e filtrável."
      />

      <form className="mb-4 flex flex-wrap items-center gap-3">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar no título…"
          className="w-64 rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <select name="conc" defaultValue={conc ?? ""} className="rounded-lg border border-line bg-white px-3 py-2 text-sm">
          <option value="">Todos os concorrentes</option>
          {concorrentes.map((c) => (
            <option key={c.nome} value={c.nome}>{c.nome}</option>
          ))}
        </select>
        <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          Filtrar
        </button>
        <span className="text-sm text-muted">{fmtNum(total)} anúncios</span>
      </form>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Concorrente</th>
              <th className="px-4 py-3 text-right">Vendas</th>
              <th className="px-4 py-3 text-right">Unid.</th>
              <th className="px-4 py-3 text-right">Preço médio</th>
              <th className="px-4 py-3">GTIN</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-4 py-3 max-w-[240px] truncate text-ink">{r.titulo}</td>
                <td className="px-4 py-3 text-muted">{r.marca}</td>
                <td className="px-4 py-3 text-xs text-faint">{r.categoria}</td>
                <td className="px-4 py-3 text-muted">{r.competitors?.nome}</td>
                <td className="px-4 py-3 text-right tabular">{fmtBRL(r.vendas_reais)}</td>
                <td className="px-4 py-3 text-right tabular">{fmtNum(r.vendas_unidades)}</td>
                <td className="px-4 py-3 text-right tabular">{r.preco_medio != null ? fmtBRL(r.preco_medio) : "—"}</td>
                <td className="px-4 py-3 tabular text-xs text-faint">{r.gtin_limpo ?? "—"}</td>
              </tr>
            ))}
            {linhas.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted">
                  Nenhum anúncio.{" "}
                  <Link href="/concorrencia/upload" className="font-medium text-brand-600">Fazer upload</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {totalPaginas > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">Página {pagina} de {fmtNum(totalPaginas)}</span>
          <div className="flex gap-2">
            {pagina > 1 && (
              <Link href={qs(pagina - 1)} className="rounded-lg border border-line bg-surface px-3 py-1.5 hover:bg-ground">
                Anterior
              </Link>
            )}
            {pagina < totalPaginas && (
              <Link href={qs(pagina + 1)} className="rounded-lg border border-line bg-surface px-3 py-1.5 hover:bg-ground">
                Próxima
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
