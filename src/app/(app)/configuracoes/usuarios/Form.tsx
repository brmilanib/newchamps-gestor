"use client";

import { useActionState, useRef, useEffect } from "react";
import { criarUsuario, type EstadoUsuario } from "./actions";

export function FormUsuario() {
  const [estado, action, pending] = useActionState<EstadoUsuario, FormData>(criarUsuario, null);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (estado?.ok) ref.current?.reset();
  }, [estado]);

  return (
    <form ref={ref} action={action} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="nome">Nome</label>
          <input
            id="nome" name="nome" required
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="email">E-mail</label>
          <input
            id="email" name="email" type="email" required
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="papel">Papel</label>
          <select
            id="papel" name="papel" defaultValue="colaborador"
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500"
          >
            <option value="colaborador">Colaborador (usa, não configura)</option>
            <option value="admin">Admin (acesso total)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink" htmlFor="senha">Senha inicial</label>
          <input
            id="senha" name="senha" type="text" minLength={6} required placeholder="mín. 6 caracteres"
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <button
        type="submit" disabled={pending}
        className="w-fit rounded-lg bg-brand-500 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? "Criando..." : "Criar usuário"}
      </button>

      {estado?.ok === true && (
        <div className="rounded-lg bg-ok-50 px-4 py-3 text-sm text-ok">
          Usuário <b>{estado.nome}</b> criado. Ele já pode entrar com o e-mail e a senha inicial (e trocar depois).
        </div>
      )}
      {estado?.ok === false && (
        <div className="rounded-lg bg-risk-50 px-4 py-3 text-sm text-risk">{estado.erro}</div>
      )}
    </form>
  );
}
