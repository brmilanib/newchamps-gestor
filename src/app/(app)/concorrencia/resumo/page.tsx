import Link from "next/link";
import { getSessao } from "@/lib/data/sessao";
import { getAnuncios, getMeses } from "@/lib/data/concorrencia";
import { receitaPorConcorrente, porMarca, consolidarGtin } from "@/lib/domain/agregacao";
import { CRITERIOS_PADRAO } from "@/lib/domain/criterios";
import { PageHeader, Card, StatCard, Badge, fmtBRL, fmtNum } from "@/components/ui";
import { PeriodoSelect } from "@/components/PeriodoSelect";
import { ReceitaPorConcorrente } from "@/components/Charts";

export default async function ResumoPage({ searchParams }: { searchParams: Promise<{ mes?: string }> }) {
  const { mes } = await searchParams;
  const { organizationId } = await getSessao();
  const meses = organizationId ? await getMeses() : [];
  const mesAtual = mes ?? meses[0];
  const anuncios = organizationId ? await getAnuncios(organizationId, mesAtual) : [];

  if (anuncios.length === 0) {
    return (
      <div>
        <PageHeader titulo="Resumo Executivo" />
        <Card className="border-dashed">
          <div className="py-8 text-center">
            <p className="text-sm font-medium text-ink">Nenhum dado de concorrente ainda</p>
            <p className="mt-1 text-sm text-muted">Suba o catálogo de um concorrente para ver os números aqui.</p>
            <Link
              href="/concorrencia/upload"
              className="mt-4 inline-block rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Fazer upload
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const receita = receitaPorConcorrente(anuncios);
  const marcas = porMarca(anuncios, CRITERIOS_PADRAO);
  const { totalGtinsUnicos } = consolidarGtin(anuncios);
  const receitaTotal = Object.values(receita).reduce((a, b) => a + b, 0);
  const unidadesTotal = anuncios.reduce((s, a) => s + a.vendasUnidades, 0);
  const oportunidades = marcas.filter((m) => m.ehOportunidade).length;
  const vendidasPelosTres = marcas.filter((m) => m.nConcorrentes >= 3).length;
  const marcaLider = marcas[0];

  const concs = [...new Set(anuncios.map((a) => a.concorrente))].sort();
  const porConc = concs.map((c) => {
    const doC = anuncios.filter((a) => a.concorrente === c);
    return {
      nome: c,
      receita: receita[c] ?? 0,
      unidades: doC.reduce((s, a) => s + a.vendasUnidades, 0),
      anuncios: doC.length,
      marcasDistintas: new Set(doC.map((a) => a.marca)).size,
      lider: porMarca(doC, CRITERIOS_PADRAO)[0]?.marca ?? "—",
    };
  });

  return (
    <div>
      <PageHeader titulo="Resumo Executivo" descricao={`${concs.length} concorrentes · ${fmtNum(anuncios.length)} anúncios`} />
      <PeriodoSelect meses={meses} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard rotulo="Receita total" valor={fmtBRL(receitaTotal)} sub="soma dos concorrentes" />
        <StatCard rotulo="Unidades" valor={fmtNum(unidadesTotal)} />
        <StatCard rotulo="Anúncios" valor={fmtNum(anuncios.length)} />
        <StatCard rotulo="GTINs únicos" valor={fmtNum(totalGtinsUnicos)} sub="produtos consolidados" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 text-sm font-semibold text-ink">Receita por concorrente</h3>
          <ReceitaPorConcorrente dados={porConc.map((c) => ({ nome: c.nome, receita: c.receita }))} />
        </Card>
        <div className="grid grid-cols-2 gap-4 self-start">
          <StatCard rotulo="Marcas distintas" valor={fmtNum(marcas.length)} />
          <StatCard rotulo="Marcas-oportunidade" valor={fmtNum(oportunidades)} sub="passam no seu critério" />
          <StatCard rotulo="Disputadas pelos 3" valor={fmtNum(vendidasPelosTres)} sub="alta concorrência" />
          <StatCard rotulo="Marca líder" valor={marcaLider?.marca ?? "—"} />
        </div>
      </div>

      <Card className="mt-4 overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
              <th className="px-4 py-3">Concorrente</th>
              <th className="px-4 py-3 text-right">Receita</th>
              <th className="px-4 py-3 text-right">Unidades</th>
              <th className="px-4 py-3 text-right">Anúncios</th>
              <th className="px-4 py-3 text-right">Marcas</th>
              <th className="px-4 py-3">Marca líder</th>
            </tr>
          </thead>
          <tbody>
            {porConc.map((c) => (
              <tr key={c.nome} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-semibold text-ink">{c.nome}</td>
                <td className="px-4 py-3 text-right tabular">{fmtBRL(c.receita)}</td>
                <td className="px-4 py-3 text-right tabular">{fmtNum(c.unidades)}</td>
                <td className="px-4 py-3 text-right tabular">{fmtNum(c.anuncios)}</td>
                <td className="px-4 py-3 text-right tabular">{fmtNum(c.marcasDistintas)}</td>
                <td className="px-4 py-3 text-muted">{c.lider}</td>
              </tr>
            ))}
            <tr className="bg-ground font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-right tabular">{fmtBRL(receitaTotal)}</td>
              <td className="px-4 py-3 text-right tabular">{fmtNum(unidadesTotal)}</td>
              <td className="px-4 py-3 text-right tabular">{fmtNum(anuncios.length)}</td>
              <td className="px-4 py-3 text-right tabular">{fmtNum(marcas.length)}</td>
              <td className="px-4 py-3">{marcaLider ? <Badge tom="brand">{marcaLider.marca}</Badge> : "—"}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
