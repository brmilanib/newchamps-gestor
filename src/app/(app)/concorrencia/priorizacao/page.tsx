import Link from "next/link";
import { getSessao } from "@/lib/data/sessao";
import { getPriorizacao, type MarcaPriorizada } from "@/lib/data/priorizacao";
import { PageHeader, Card, Badge, fmtBRL, fmtNum, fmtPct, fmtMes } from "@/components/ui";

const ONDAS: Record<number, { titulo: string; desc: string }> = {
  1: { titulo: "Onda 1 — testar agora", desc: "entrar já: alto ticket, poucos vendedores, tendência de alta" },
  2: { titulo: "Onda 2 — próximos passos", desc: "depois da onda 1, conforme o capital de giro" },
  3: { titulo: "Onda 3 — depois de consolidar", desc: "mercado mais disputado ou ticket menor" },
};

// Pesos do modelo (iguais aos da planilha).
const PESOS = [
  { nome: "Ticket médio (lucro/requinte)", peso: 0.35 },
  { nome: "Poucos vendedores (facilidade de entrada)", peso: 0.25 },
  { nome: "Saturação baixa (espaço de mercado)", peso: 0.2 },
  { nome: "Tendência de crescimento", peso: 0.2 },
];

function tomSaturacao(s: string | null): "ok" | "warn" | "risk" | "neutro" {
  const v = (s ?? "").toLowerCase();
  return v === "baixa" ? "ok" : v === "média" || v === "media" ? "warn" : v === "alta" ? "risk" : "neutro";
}
function tomTendencia(t: string | null): "ok" | "neutro" | "risk" {
  const v = (t ?? "").toLowerCase();
  return v === "crescendo" ? "ok" : v === "diminuindo" ? "risk" : "neutro";
}

function Tabela({ marcas }: { marcas: MarcaPriorizada[] }) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
            <th className="px-4 py-3">Marca</th>
            <th className="px-4 py-3">Posicionamento</th>
            <th className="px-4 py-3 text-center">Mix?</th>
            <th className="px-4 py-3 text-right">Pontuação</th>
            <th className="px-4 py-3 text-right">Ticket médio</th>
            <th className="px-4 py-3 text-right">Vendedores</th>
            <th className="px-4 py-3">Saturação</th>
            <th className="px-4 py-3">Tendência</th>
            <th className="px-4 py-3 text-right">Vendas</th>
            <th className="px-4 py-3 text-right">Unidades</th>
            <th className="px-4 py-3 text-right">% Catálogo</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((m) => (
            <tr key={m.marca} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-semibold text-ink">{m.marca}</td>
              <td className="px-4 py-3 text-muted">{m.posicionamento ?? "—"}</td>
              <td className="px-4 py-3 text-center">{m.jaNoMix ? <Badge tom="ok">sim</Badge> : <span className="text-faint">—</span>}</td>
              <td className="px-4 py-3 text-right tabular font-semibold">{m.pontuacao != null ? m.pontuacao.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) : "—"}</td>
              <td className="px-4 py-3 text-right tabular">{m.ticketMedio != null ? fmtBRL(m.ticketMedio) : "—"}</td>
              <td className="px-4 py-3 text-right tabular">{m.nVendedores != null ? fmtNum(m.nVendedores) : "—"}</td>
              <td className="px-4 py-3">{m.saturacao ? <Badge tom={tomSaturacao(m.saturacao)}>{m.saturacao}</Badge> : "—"}</td>
              <td className="px-4 py-3">{m.tendencia ? <Badge tom={tomTendencia(m.tendencia)}>{m.tendencia}</Badge> : "—"}</td>
              <td className="px-4 py-3 text-right tabular">{m.vendas != null ? fmtBRL(m.vendas) : "—"}</td>
              <td className="px-4 py-3 text-right tabular">{m.unidades != null ? fmtNum(m.unidades) : "—"}</td>
              <td className="px-4 py-3 text-right tabular text-muted">{m.pctCatalogo != null ? fmtPct(m.pctCatalogo) : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default async function PriorizacaoPage() {
  const { organizationId } = await getSessao();
  const view = organizationId ? await getPriorizacao(organizationId) : { mes: null, marcas: [] };

  if (view.marcas.length === 0) {
    return (
      <div>
        <PageHeader titulo="Priorização de Entrada" />
        <Card className="border-dashed">
          <p className="py-6 text-center text-sm text-muted">
            Nenhum dado da Nubmetrics ainda.{" "}
            <Link href="/concorrencia/upload" className="font-medium text-brand-600">Suba o relatório da Nubmetrics</Link>.
          </p>
        </Card>
      </div>
    );
  }

  const ondas = [1, 2, 3].map((n) => ({ n, marcas: view.marcas.filter((m) => m.onda === n) })).filter((o) => o.marcas.length > 0);
  const semOnda = view.marcas.filter((m) => m.onda == null);

  return (
    <div>
      <PageHeader
        titulo="Priorização de Entrada"
        descricao={`Em quais marcas entrar primeiro (Nubmetrics${view.mes ? " · " + fmtMes(view.mes) : ""}). Prioriza lucro/requinte, facilidade de entrada e tendência — não só volume.`}
      />

      <Card className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-ink">Pesos do modelo</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PESOS.map((p) => (
            <div key={p.nome} className="rounded-lg bg-brand-50 p-3">
              <p className="text-2xl font-bold tabular text-brand-600">{fmtPct(p.peso)}</p>
              <p className="mt-0.5 text-xs text-muted">{p.nome}</p>
            </div>
          ))}
        </div>
      </Card>

      {ondas.map((o) => (
        <section key={o.n} className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-lg font-bold tracking-tight text-ink">{ONDAS[o.n].titulo}</h2>
            <Badge tom={o.n === 1 ? "ok" : o.n === 2 ? "warn" : "neutro"}>{o.marcas.length} marcas</Badge>
          </div>
          <p className="mb-3 text-sm text-muted">{ONDAS[o.n].desc}</p>
          <Tabela marcas={o.marcas} />
        </section>
      ))}

      {semOnda.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold tracking-tight text-ink">Outras marcas</h2>
          <Tabela marcas={semOnda} />
        </section>
      )}
    </div>
  );
}
