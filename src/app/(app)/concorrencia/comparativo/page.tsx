import { getSessao } from "@/lib/data/sessao";
import { getAnuncios } from "@/lib/data/concorrencia";
import { porMarca } from "@/lib/domain/agregacao";
import { estaNoMix } from "@/lib/domain/mix";
import { CRITERIOS_PADRAO } from "@/lib/domain/criterios";
import { PageHeader, Card, Badge, fmtBRL, fmtNum } from "@/components/ui";

export default async function ComparativoPage() {
  const { organizationId } = await getSessao();
  const anuncios = organizationId ? await getAnuncios(organizationId) : [];
  const concs = [...new Set(anuncios.map((a) => a.concorrente))].sort();
  const marcas = porMarca(anuncios, CRITERIOS_PADRAO);

  return (
    <div>
      <PageHeader
        titulo="Comparativo de Marcas"
        descricao={`Todas as ${fmtNum(marcas.length)} marcas lado a lado, receita em cada concorrente.`}
      />

      {marcas.length === 0 ? (
        <Card className="border-dashed">
          <p className="py-6 text-center text-sm text-muted">Nenhum dado ainda.</p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                <th className="px-4 py-3">Marca</th>
                {concs.map((c) => (
                  <th key={c} className="px-4 py-3 text-right">{c}</th>
                ))}
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Vende</th>
                <th className="px-4 py-3">Sinal</th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((m) => (
                <tr key={m.marca} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">
                    {m.marca}
                    {estaNoMix(m.marca) && <span className="ml-2 align-middle"><Badge tom="ok">mix</Badge></span>}
                  </td>
                  {concs.map((c) => (
                    <td key={c} className="px-4 py-3 text-right tabular text-muted">
                      {m.receitaPorConcorrente[c] ? fmtBRL(m.receitaPorConcorrente[c]) : "—"}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right font-semibold tabular">{fmtBRL(m.receitaTotal)}</td>
                  <td className="px-4 py-3 text-center tabular">{m.nConcorrentes}/{concs.length}</td>
                  <td className="px-4 py-3">
                    {m.ehOportunidade && <Badge tom="accent">oportunidade</Badge>}
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
