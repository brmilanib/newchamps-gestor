import { getSessao } from "@/lib/data/sessao";
import { getAnuncios } from "@/lib/data/concorrencia";
import { porCategoria } from "@/lib/domain/agregacao";
import { PageHeader, Card, fmtBRL, fmtNum, fmtPct } from "@/components/ui";

export default async function CategoriasPage() {
  const { organizationId } = await getSessao();
  const anuncios = organizationId ? await getAnuncios(organizationId) : [];
  const cats = porCategoria(anuncios);
  const receitaTotal = cats.reduce((s, c) => s + c.receita, 0);

  return (
    <div>
      <PageHeader
        titulo="Por Categoria"
        descricao="Os concorrentes de perfumaria não vendem só perfume — aqui você vê a distribuição por categoria (detectada automaticamente)."
      />

      {cats.length === 0 ? (
        <Card className="border-dashed">
          <p className="py-6 text-center text-sm text-muted">Nenhum dado ainda.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3 text-right">Marcas</th>
                <th className="px-4 py-3 text-right">Anúncios</th>
                <th className="px-4 py-3 text-right">Unidades</th>
                <th className="px-4 py-3 text-right">Receita</th>
                <th className="px-4 py-3 text-right">Ticket médio</th>
                <th className="px-4 py-3 text-right">% receita</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.categoria} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{c.categoria}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtNum(c.nMarcas)}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtNum(c.nAnuncios)}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtNum(c.unidades)}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtBRL(c.receita)}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtBRL(c.ticketMedio)}</td>
                  <td className="px-4 py-3 text-right tabular text-muted">
                    {receitaTotal > 0 ? fmtPct(c.receita / receitaTotal) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
