"use client";

import { useActionState } from "react";
import { subirEstoque, subirVendas, type EstadoUp } from "./actions";
import { Card } from "@/components/ui";

function FormArquivo({
  titulo,
  descricao,
  action,
}: {
  titulo: string;
  descricao: string;
  action: (p: EstadoUp, f: FormData) => Promise<EstadoUp>;
}) {
  const [estado, run, pending] = useActionState<EstadoUp, FormData>(action, null);
  return (
    <Card>
      <h3 className="text-sm font-semibold text-ink">{titulo}</h3>
      <p className="mt-1 text-xs text-muted">{descricao}</p>
      <form action={run} className="mt-3 flex flex-col gap-3">
        <input
          type="date"
          name="data_referencia"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
        />
        <input
          type="file"
          name="arquivo"
          accept=".xlsx,.xls,.csv"
          required
          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-600"
        />
        <button
          disabled={pending}
          className="w-fit rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Importar"}
        </button>
        {estado?.ok === true && <p className="rounded-lg bg-ok-50 px-3 py-2 text-sm text-ok">{estado.msg}</p>}
        {estado?.ok === false && <p className="rounded-lg bg-risk-50 px-3 py-2 text-sm text-risk">{estado.erro}</p>}
      </form>
    </Card>
  );
}

export function UploadsEstoque() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormArquivo
        titulo="Atualizar estoque"
        descricao="Export Lista de Estoque do Upseller (SKU, Título, Estoque Atual, Custo Médio)."
        action={subirEstoque}
      />
      <FormArquivo
        titulo="Atualizar vendas"
        descricao="Export Vendas por Produtos do Upseller (últimos 30 dias)."
        action={subirVendas}
      />
    </div>
  );
}
