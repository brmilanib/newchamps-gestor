import { getSessao } from "@/lib/data/sessao";
import { getAnuncios } from "@/lib/data/concorrencia";
import { consolidarGtin } from "@/lib/domain/agregacao";
import { PageHeader, Card, Badge, fmtBRL, fmtNum } from "@/components/ui";

const LIMITE = 250;

export default async function GtinPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; multi?: string }>;
}) {
  const { q, multi } = await searchParams;
  const { organizationId } = await getSessao();
  const anuncios = organizationId ? await getAnuncios(organizationId) : [];
  const { grupos, totalGtinsUnicos, gtinsMultiConcorrente } = consolidarGtin(anuncios);
  const concs = [...new Set(anuncios.map((a) => a.concorrente))].sort();

  const termo = (q ?? "").trim().toLowerCase();
  const somenteMulti = multi === "1";
  let filtrados = grupos;
  if (somenteMulti) filtrados = filtrados.filter((g) => g.nConcorrentes > 1);
  if (termo)
    filtrados = filtrados.filter(
      (g) =>
        g.gtin.includes(termo) ||
        g.marca.toLowerCase().includes(termo) ||
        g.tituloRepresentativo.toLowerCase().includes(termo),
    );
  filtrados.sort((a, b) => b.receitaTotal - a.receitaTotal);
  const visiveis = filtrados.slice(0, LIMITE);

  function diffPct(g: (typeof grupos)[number]): number | null {
    const precos = concs
      .map((c) => g.precoMedioPorConcorrente[c])
      .filter((p): p is number => p != null && p > 0);
    if (precos.length < 2) return null;
    const min = Math.min(...precos);
    const max = Math.max(...precos);
    return (max - min) / min;
  }

  return (
    <div>
      <PageHeader
        titulo="Produtos por GTIN"
        descricao={`${fmtNum(totalGtinsUnicos)} produtos únicos consolidados por código de barras · ${fmtNum(gtinsMultiConcorrente)} vendidos por mais de um concorrente (dá pra comparar o mesmo produto físico).`}
      />

      <form className="mb-4 flex flex-wrap items-center gap-3">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Buscar por GTIN, marca ou título…"
          className="w-72 rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="multi" value="1" defaultChecked={somenteMulti} />
          só os vendidos por mais de um concorrente
        </label>
        <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          Buscar
        </button>
      </form>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
              <th className="px-4 py-3">GTIN</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Tamanho</th>
              {concs.map((c) => (
                <th key={c} className="px-4 py-3 text-right">{c}</th>
              ))}
              <th className="px-4 py-3 text-right">Diferença</th>
              <th className="px-4 py-3 text-right">Receita</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((g) => {
              const d = diffPct(g);
              return (
                <tr key={g.gtin} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 tabular text-muted">{g.gtin}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-ink">{g.marca}</span>
                    <span className="block max-w-[220px] truncate text-xs text-faint">
                      {g.tituloRepresentativo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {g.tamanhoDetectado === "Não identificado no título" ? (
                      <span className="text-xs text-faint">não identificado</span>
                    ) : (
                      <Badge>{g.tamanhoDetectado}</Badge>
                    )}
                  </td>
                  {concs.map((c) => (
                    <td key={c} className="px-4 py-3 text-right tabular text-muted">
                      {g.precoMedioPorConcorrente[c] != null ? fmtBRL(g.precoMedioPorConcorrente[c]!) : "—"}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    {d != null ? (
                      <Badge tom={d >= 0.2 ? "risk" : "neutro"}>
                        {(d * 100).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular">{fmtBRL(g.receitaTotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length > LIMITE && (
          <p className="border-t border-line px-4 py-3 text-xs text-muted">
            Mostrando os {LIMITE} de maior receita, de {fmtNum(filtrados.length)}. Use a busca pra afinar.
          </p>
        )}
      </Card>
    </div>
  );
}
