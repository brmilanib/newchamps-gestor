"use client";

import { useState } from "react";
import { Menu, X, LogOut, Store } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { sair } from "@/app/login/actions";

interface Props {
  nome: string;
  papel: string;
  lojas: Array<{ id: string; nome: string }>;
  children: React.ReactNode;
}

export function AppShell({ nome, papel, lojas, children }: Props) {
  const [aberto, setAberto] = useState(false);

  function escolherLoja(id: string) {
    // Persiste a loja escolhida (dimensão global). As telas por loja usam isso.
    document.cookie = `loja_id=${id}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div className="min-h-dvh bg-ground">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-surface lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-line px-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            N
          </div>
          <span className="font-semibold tracking-tight text-ink">Newchamps Gestor</span>
        </div>
        <div className="h-[calc(100dvh-3.5rem)]">
          <Sidebar />
        </div>
      </aside>

      {/* Drawer mobile */}
      {aberto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setAberto(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-line px-4">
              <span className="font-semibold text-ink">Newchamps Gestor</span>
              <button onClick={() => setAberto(false)} aria-label="Fechar menu">
                <X size={20} />
              </button>
            </div>
            <div className="h-[calc(100dvh-3.5rem)]">
              <Sidebar onNavigate={() => setAberto(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Conteúdo */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur">
          <button className="lg:hidden" onClick={() => setAberto(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>

          <label className="flex items-center gap-2 text-sm">
            <Store size={16} className="text-faint" />
            <select
              defaultValue=""
              onChange={(e) => escolherLoja(e.target.value)}
              className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-ink outline-none focus:border-brand-500"
              aria-label="Selecionar loja"
            >
              <option value="">Todas as lojas</option>
              {lojas.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nome}
                </option>
              ))}
            </select>
          </label>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-ink">{nome}</p>
              <p className="text-[11px] uppercase tracking-wide text-faint">{papel}</p>
            </div>
            <form action={sair}>
              <button
                className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-ground hover:text-risk"
                aria-label="Sair"
                title="Sair"
              >
                <LogOut size={17} />
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
