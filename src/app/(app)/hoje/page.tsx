import Link from "next/link";
import { getSessao } from "@/lib/data/sessao";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, StatCard, fmtNum } from "@/components/ui";

export default async function HojePage() {
  const s = await getSessao();
  const org = s.organizationId;
  const supabase = await createClient();

  const listingsRes = await supabase
    .from("competitor_listings")
    .select("*", { count: "exact", head: true });
  const agentesRes = await supabase.from("agentes").select("*", { count: "exact", head: true });
  let uploads = 0;
  if (org) {
    const r = await supabase
      .from("uploads")
      .select("*", { count: "exact", head: true })
      .eq("organization_id", org);
    uploads = r.count ?? 0;
  }
  const listings = listingsRes.count ?? 0;
  const agentesAtivos = agentesRes.count ?? 0;

  const primeiroNome = s.nome.split(" ")[0];

  return (
    <div>
      <PageHeader
        titulo={`Olá, ${primeiroNome}`}
        descricao="Esta é a tela que vai concentrar o que precisa da sua atenção. Por enquanto ela mostra o estado geral; o briefing automático do Supervisor entra na Fase 3."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard rotulo="Uploads feitos" valor={fmtNum(uploads)} />
        <StatCard rotulo="Anúncios no banco" valor={fmtNum(listings)} sub="de concorrentes" />
        <StatCard rotulo="Agentes cadastrados" valor={fmtNum(agentesAtivos)} sub="gerenciáveis" />
        <StatCard rotulo="Seu papel" valor={s.papel === "admin" ? "Admin" : "Colaborador"} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-ink">Começar por aqui</h3>
          <p className="mt-1 text-sm text-muted">
            Suba o catálogo de um concorrente e veja as telas de Concorrência ganharem vida.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/concorrencia/upload" className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              Fazer upload
            </Link>
            <Link href="/concorrencia/resumo" className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink hover:bg-ground">
              Ver Resumo
            </Link>
            <Link href="/agentes" className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink hover:bg-ground">
              Ver Agentes
            </Link>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-ink">O que vem por aí</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted">
            <li>• Fase 2: BI (Meus Números), evolução histórica e a 1ª versão do Mural (TV)</li>
            <li>• Fase 3: coleta de preço, cadeia de agentes e o Chat com o Supervisor</li>
            <li>• Fase 4+: alertas, WhatsApp e mais marketplaces</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
