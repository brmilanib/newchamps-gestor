"use client";

import { useActionState } from "react";
import { subirConcorrente, type EstadoUpload } from "./actions";
import { PageHeader, Card } from "@/components/ui";

export default function UploadPage() {
  const [estado, action, pending] = useActionState<EstadoUpload, FormData>(subirConcorrente, null);

  return (
    <div>
      <PageHeader
        titulo="Upload de dados"
        descricao="Suba o catálogo de um concorrente exportado do Mercado Livre (.xlsx). Cada upload guarda a data de referência — nada sobrescreve o mês anterior."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <form action={action} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-ink" htmlFor="concorrente">
                  Concorrente
                </label>
                <input
                  id="concorrente"
                  name="concorrente"
                  placeholder="ex.: SIENO"
                  required
                  className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 uppercase text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink" htmlFor="data_referencia">
                  Data de referência
                </label>
                <input
                  id="data_referencia"
                  name="data_referencia"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink" htmlFor="arquivo">
                Arquivo (.xlsx)
              </label>
              <input
                id="arquivo"
                name="arquivo"
                type="file"
                accept=".xlsx,.xls,.csv"
                required
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-brand-600"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-fit rounded-lg bg-brand-500 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
            >
              {pending ? "Processando..." : "Importar"}
            </button>

            {estado?.ok === true && (
              <div className="rounded-lg bg-ok-50 px-4 py-3 text-sm text-ok">
                Importado <b>{estado.concorrente}</b>: {estado.processadas.toLocaleString("pt-BR")} anúncios
                {estado.rejeitadas > 0 ? `, ${estado.rejeitadas} linha(s) rejeitada(s)` : ", nenhuma linha rejeitada"}.
              </div>
            )}
            {estado?.ok === false && (
              <div className="rounded-lg bg-risk-50 px-4 py-3 text-sm text-risk">{estado.erro}</div>
            )}
          </form>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink">Colunas esperadas</h3>
          <p className="mt-2 text-xs text-muted">
            Título, Marca, Vendas em $, Vendas em Unid., Preço Médio, Tipo de Publicação, Fulfillment,
            Catálogo., Com Frete grátis, Com Mercado Envios, Com desconto, SKU, OEM, GTIN, N° PEÇA,
            Estado, MercadoPago, Republicada, Condição.
          </p>
          <p className="mt-3 text-xs text-muted">
            Uma linha ruim é rejeitada com o motivo, mas não derruba o import. GTIN corrompido é
            descartado sem quebrar. Categoria e tamanho são <b>detectados automaticamente</b>.
          </p>
        </Card>
      </div>
    </div>
  );
}
