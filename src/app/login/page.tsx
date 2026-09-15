"use client";

import { useActionState } from "react";
import { entrar, type EstadoLogin } from "./actions";

export default function LoginPage() {
  const [estado, action, pending] = useActionState<EstadoLogin, FormData>(entrar, null);

  return (
    <main className="min-h-dvh grid place-items-center bg-ground px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-white text-xl font-bold shadow-sm">
            N
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">Newchamps Gestor</h1>
          <p className="mt-1 text-sm text-muted">Entre com seu e-mail e senha</p>
        </div>

        <form action={action} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <label className="block text-sm font-medium text-ink" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1.5 mb-4 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />

          <label className="block text-sm font-medium text-ink" htmlFor="senha">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />

          {estado?.erro && (
            <p className="mt-4 rounded-lg bg-risk-50 px-3 py-2 text-sm text-risk">{estado.erro}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-6 w-full rounded-lg bg-brand-500 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-faint">Grupo Newchamps · uso interno</p>
      </div>
    </main>
  );
}
