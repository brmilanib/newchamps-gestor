import Link from "next/link";
import { getSessao } from "@/lib/data/sessao";
import { getAnuncios } from "@/lib/data/concorrencia";
import { porMarca } from "@/lib/domain/agregacao";
import { estaNoMix } from "@/lib/domain/mix";
import { CRITERIOS_PADRAO } from "@/lib/domain/criterios";
import { PageHeader, Card, Badge, fmtBRL, fmtNum } from "@/components/ui";

export default async function OportunidadesPage() {
  const { organizationId } = await getSessao();
  const anuncios = organizationId ? await getAnuncios(organizationId) : [];
  const oportunidades = porMarca(anuncios, CRITERIOS_PADRAO).filter((m) => m.ehOportunidade);

  return (
    <div>
      <PageHeader
        titulo="Oportunidades"
        descricao={`Marcas com ticket médio ≥ ${fmtBRL(CRITERIOS_PADRAO.oportunidadeTicketMin)} e ≥ ${CRITERIOS_PADRAO.oportunidadeUnidadesMin} unidades vendidas somando os concorrentes.`}
      />

      {oportunidades.length === 0 ? (
        <Card className="border-dashed">
          <p className="py-6 text-center text-sm text-muted">
            Nenhuma marca-oportunidade ainda.{" "}
            <Link href="/concorrencia/upload" className="font-medium text-brand-600">
              Suba dados de concorrente
            </Link>{" "}
            para começar.
          </p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3 text-right">Receita total</th>
                <th className="px-4 py-3 text-right">Unidades</th>
                <th className="px-4 py-3 text-right">Ticket médio</th>
                <th className="px-4 py-3 text-center">Concorrentes</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {oportunidades.map((m) => (
                <tr key={m.marca} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-semibold text-ink">{m.marca}</td>
                  <td className="px-4 py-3 text-muted">{m.categoria}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtBRL(m.receitaTotal)}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtNum(m.unidadesTotal)}</td>
                  <td className="px-4 py-3 text-right tabular">{fmtBRL(m.ticketMedio)}</td>
                  <td className="px-4 py-3 text-center tabular">{m.nConcorrentes}</td>
                  <td className="px-4 py-3">
                    {estaNoMix(m.marca) ? (
                      <Badge tom="ok">já no meu mix</Badge>
                    ) : (
                      <Badge tom="accent">marca nova</Badge>
                    )}
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
