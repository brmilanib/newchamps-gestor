"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, MessageSquare, BarChart3, Target, GitCompare, FolderTree, Barcode, Database,
  Upload, Radar, LineChart, Package, Send, ImageIcon, FlaskConical, Bell, Bot,
  CalendarCheck, Settings, Tv,
} from "lucide-react";

type Item = { href: string; label: string; icon: React.ComponentType<{ size?: number }>; pronto?: boolean };
type Grupo = { titulo: string; itens: Item[] };

const GRUPOS: Grupo[] = [
  {
    titulo: "Principal",
    itens: [
      { href: "/hoje", label: "Hoje", icon: Home },
      { href: "/chat", label: "Chat", icon: MessageSquare },
    ],
  },
  {
    titulo: "Concorrência",
    itens: [
      { href: "/concorrencia/resumo", label: "Resumo Executivo", icon: BarChart3, pronto: true },
      { href: "/concorrencia/oportunidades", label: "Oportunidades", icon: Target, pronto: true },
      { href: "/concorrencia/comparativo", label: "Comparativo de Marcas", icon: GitCompare, pronto: true },
      { href: "/concorrencia/categorias", label: "Por Categoria", icon: FolderTree, pronto: true },
      { href: "/concorrencia/gtin", label: "Produtos por GTIN", icon: Barcode, pronto: true },
      { href: "/concorrencia/dados-brutos", label: "Dados Brutos", icon: Database, pronto: true },
      { href: "/concorrencia/upload", label: "Upload de dados", icon: Upload, pronto: true },
      { href: "/concorrencia/monitoramento", label: "Monitoramento", icon: Radar },
    ],
  },
  {
    titulo: "Meu negócio",
    itens: [
      { href: "/meus-numeros", label: "Meus Números", icon: LineChart },
      { href: "/estoque", label: "Estoque & Gestor Seller", icon: Package },
    ],
  },
  {
    titulo: "Operação",
    itens: [
      { href: "/atendimento", label: "Atendimento", icon: Send },
      { href: "/conteudo", label: "Conteúdo & Instagram", icon: ImageIcon },
      { href: "/sillage", label: "Sillage Club", icon: FlaskConical },
      { href: "/alertas", label: "Alertas", icon: Bell },
      { href: "/mural", label: "Mural (Modo TV)", icon: Tv },
    ],
  },
  {
    titulo: "Sistema",
    itens: [
      { href: "/agentes", label: "Agentes", icon: Bot },
      { href: "/revisoes", label: "Revisões", icon: CalendarCheck },
      { href: "/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex h-full flex-col gap-5 overflow-y-auto p-3">
      {GRUPOS.map((g) => (
        <div key={g.titulo}>
          <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint">
            {g.titulo}
          </p>
          <ul className="flex flex-col gap-0.5">
            {g.itens.map((it) => {
              const ativo = pathname === it.href || pathname.startsWith(it.href + "/");
              const Icon = it.icon;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
                      ativo
                        ? "bg-brand-50 font-semibold text-brand-600"
                        : "text-muted hover:bg-ground hover:text-ink"
                    }`}
                  >
                    <Icon size={17} />
                    <span className="flex-1">{it.label}</span>
                    {!it.pronto && (
                      <span className="rounded bg-ground px-1.5 py-0.5 text-[9px] font-medium uppercase text-faint">
                        em breve
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
