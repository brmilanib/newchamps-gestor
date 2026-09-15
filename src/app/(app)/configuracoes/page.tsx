import Link from "next/link";
import { Users, SlidersHorizontal, Building2, Plug, Bot } from "lucide-react";
import { PageHeader, Card, Badge } from "@/components/ui";

const ITENS = [
  { href: "/configuracoes/usuarios", icon: Users, titulo: "Usuários", desc: "Cadastrar a equipe e definir papéis", pronto: true },
  { href: "#", icon: SlidersHorizontal, titulo: "Critérios de negócio", desc: "Oportunidade, sugestão de compra, priorização", pronto: false },
  { href: "#", icon: Building2, titulo: "Lojas & contexto da empresa", desc: "As 7 marcas, mix, margem, tom de voz", pronto: false },
  { href: "#", icon: Plug, titulo: "Conexões", desc: "Mercado Livre, Amazon, Shopee, Gestor Seller", pronto: false },
  { href: "#", icon: Bot, titulo: "IAs conectadas", desc: "Chaves de Anthropic, OpenAI e outros", pronto: false },
];

export default function ConfiguracoesPage() {
  return (
    <div>
      <PageHeader titulo="Configurações" descricao="Ajustes do sistema. Só administradores." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITENS.map((it) => {
          const Icon = it.icon;
          const conteudo = (
            <Card className={it.pronto ? "transition hover:shadow-md" : "opacity-70"}>
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink">{it.titulo}</h3>
                    {!it.pronto && <Badge>em breve</Badge>}
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{it.desc}</p>
                </div>
              </div>
            </Card>
          );
          return it.pronto ? (
            <Link key={it.titulo} href={it.href}>{conteudo}</Link>
          ) : (
            <div key={it.titulo}>{conteudo}</div>
          );
        })}
      </div>
    </div>
  );
}
