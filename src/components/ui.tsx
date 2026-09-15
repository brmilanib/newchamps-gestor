import type { ReactNode } from "react";

export function PageHeader({ titulo, descricao, acao }: { titulo: string; descricao?: string; acao?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{titulo}</h1>
        {descricao && <p className="mt-1 max-w-2xl text-sm text-muted">{descricao}</p>}
      </div>
      {acao}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-5 shadow-sm ${className}`}>{children}</div>
  );
}

export function StatCard({
  rotulo,
  valor,
  sub,
}: {
  rotulo: string;
  valor: string;
  sub?: string;
}) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-faint">{rotulo}</p>
      <p className="mt-1 text-2xl font-bold tabular text-ink">{valor}</p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </Card>
  );
}

export function Badge({
  children,
  tom = "neutro",
}: {
  children: ReactNode;
  tom?: "neutro" | "ok" | "brand" | "accent" | "warn" | "risk";
}) {
  const tons: Record<string, string> = {
    neutro: "bg-ground text-muted",
    ok: "bg-ok-50 text-ok",
    brand: "bg-brand-50 text-brand-600",
    accent: "bg-accent-50 text-accent-600",
    warn: "bg-warn-50 text-warn",
    risk: "bg-risk-50 text-risk",
  };
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${tons[tom]}`}>
      {children}
    </span>
  );
}

export function EmBreve({ titulo, fase, children }: { titulo: string; fase?: string; children?: ReactNode }) {
  return (
    <div>
      <PageHeader titulo={titulo} />
      <Card className="border-dashed">
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-ink">Em breve</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted">
            {children ?? "Esta tela ainda não foi construída."}
          </p>
          {fase && (
            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-faint">Prevista para a {fase}</p>
          )}
        </div>
      </Card>
    </div>
  );
}

/** Formatações BR reutilizadas nas telas. */
export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const fmtNum = (n: number) => n.toLocaleString("pt-BR");
export const fmtPct = (n: number) => `${(n * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
