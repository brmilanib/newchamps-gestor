import { getSessao } from "@/lib/data/sessao";
import { getEstoqueView, type ItemEstoque } from "@/lib/data/estoque";
import { PageHeader, Card, StatCard, Badge, fmtBRL, fmtNum, fmtMes } from "@/components/ui";
import { UploadsEstoque } from "./Uploads";
import { Download } from "lucide-react";

const LISTA: Record<ItemEstoque["lista"], { label: string; tom: "risk" | "warn" | "accent" | "neutro" | "ok" }> = {
  reposicao_urgente: { label: "repor urgente", tom: "risk" },
  fase_b: { label: "girando", tom: "warn" },
  promocao: { label: "promover", tom: "accent" },
  ok: { label: "ok", tom: "ok" },
  aguardar: { label: "novo", tom: "neutro" },
};

function cob(d: number | null): string {
  if (d == null) return "sem venda";
  if (d === Infinity) return "∞";
  return `${Math.round(d)}d`;
}

function Tabela({ itens }: { itens: ItemEstoque[] }) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
            <th className="px-4 py-3">SKU / Produto</th>
            <th className="px-4 py-3 text-right">Estoque</th>
            <th className="px-4 py-3 text-right">Vendas 30d</th>
            <th className="px-4 py-3 text-right">Cobertura</th>
            <th className="px-4 py-3 text-right">Sugestão</th>
            <th className="px-4 py-3">Situação</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((i) => {
            const l = LISTA[i.lista];
            return (
              <tr key={i.sku} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs text-muted">{i.sku}</span>
                  <span className="block max-w-[280px] truncate text-ink">{i.titulo}</span>
                </td>
                <td className="px-4 py-3 text-right tabular">{fmtNum(i.estoqueAtual)}</td>
                <td className="px-4 py-3 text-right tabular">{fmtNum(i.unidadesVendidas)}</td>
                <td className="px-4 py-3 text-right tabular">{cob(i.diasCobertura)}</td>
                <td className="px-4 py-3 text-right tabular font-semibold">{i.quantidadeSugerida > 0 ? `+${fmtNum(i.quantidadeSugerida)}` : "—"}</td>
                <td className="px-4 py-3"><Badge tom={l.tom}>{l.label}</Badge></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default async function EstoquePage() {
  const { organizationId } = await getSessao();
  const view = organizationId ? await getEstoqueView(organizationId) : null;

  if (!view || view.totalSkus === 0) {
    return (
      <div>
        <PageHeader titulo="Estoque & Gestor Seller" />
        <UploadsEstoque />
      </div>
    );
  }

  const topVendidos = [...view.itens].sort((a, b) => b.unidadesVendidas - a.unidadesVendidas).slice(0, 10);
  const ruptura = view.itens
    .filter((i) => i.lista === "reposicao_urgente" || (i.estoqueAtual <= 0 && i.unidadesVendidas > 0))
    .sort((a, b) => (a.diasCobertura ?? 0) - (b.diasCobertura ?? 0))
    .slice(0, 20);

  return (
    <div>
      <PageHeader
        titulo="Estoque & Gestor Seller"
        descricao={view.dataEstoque ? `Estoque de ${fmtMes(view.dataEstoque)} · vendas dos últimos 30 dias` : undefined}
        acao={
          <a
            href="/api/import4"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            <Download size={16} /> Baixar import__4_.xlsx
          </a>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard rotulo="SKUs no catálogo" valor={fmtNum(view.totalSkus)} />
        <StatCard rotulo="Valor em estoque" valor={fmtBRL(view.valorEstoque)} sub="a custo médio" />
        <StatCard rotulo="Em ruptura" valor={fmtNum(view.emRuptura)} sub="zerado e vendendo" />
        <StatCard rotulo="Repor urgente" valor={fmtNum(view.aRepor)} sub="cobertura curta" />
      </div>

      <h2 className="mt-8 mb-3 text-lg font-bold tracking-tight text-ink">Repor com urgência</h2>
      {ruptura.length ? (
        <Tabela itens={ruptura} />
      ) : (
        <Card><p className="py-4 text-center text-sm text-muted">Nada em ruptura urgente. 👍</p></Card>
      )}

      <h2 className="mt-8 mb-3 text-lg font-bold tracking-tight text-ink">Top 10 mais vendidos</h2>
      <Tabela itens={topVendidos} />

      <h2 className="mt-8 mb-3 text-lg font-bold tracking-tight text-ink">Atualizar dados</h2>
      <UploadsEstoque />
    </div>
  );
}
