"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { fmtMes } from "./ui";

/** Seletor de mês de referência. Atualiza ?mes= na URL, preservando outros filtros. */
export function PeriodoSelect({ meses }: { meses: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  if (meses.length === 0) return null;

  const atual = params.get("mes") ?? meses[0];

  function mudar(mes: string) {
    const p = new URLSearchParams(params.toString());
    p.set("mes", mes);
    router.push(`${pathname}?${p.toString()}`);
  }

  return (
    <label className="mb-4 flex w-fit items-center gap-2 text-sm">
      <CalendarDays size={16} className="text-faint" />
      <span className="text-muted">Período:</span>
      <select
        value={atual}
        onChange={(e) => mudar(e.target.value)}
        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm font-medium text-ink outline-none focus:border-brand-500"
      >
        {meses.map((m) => (
          <option key={m} value={m}>
            {fmtMes(m)}
          </option>
        ))}
      </select>
      {meses.length === 1 && (
        <span className="text-xs text-faint">— suba outro mês pra comparar e ver evolução</span>
      )}
    </label>
  );
}
