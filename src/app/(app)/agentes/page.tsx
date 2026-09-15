import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge } from "@/components/ui";

export default async function AgentesPage() {
  const supabase = await createClient();
  const { data: agentes } = await supabase
    .from("agentes")
    .select("nome, funcao, especialidade, tipo, modulo, gatilho_tipo, nivel_autonomia, modo_simulacao, ativo")
    .order("nome");
  const { count: ferramentas } = await supabase
    .from("agent_tools")
    .select("*", { count: "exact", head: true });

  const lista = agentes ?? [];

  return (
    <div>
      <PageHeader
        titulo="Agentes"
        descricao={`${lista.length} agentes cadastrados e ${ferramentas ?? 0} ferramentas no catálogo. Nesta fase eles estão listados; editar prompt/ferramentas, custo por agente e criar agente novo pela tela entram na Fase 3.`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lista.map((a) => (
          <Card key={a.nome}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-ink">{a.nome}</h3>
              <Badge tom={a.tipo === "llm" ? "accent" : "ok"}>
                {a.tipo === "llm" ? "IA" : "determinístico"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{a.funcao}</p>
            <p className="mt-2 text-xs text-faint">
              <span className="font-medium text-muted">Especialidade:</span> {a.especialidade}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge>{a.modulo}</Badge>
              <Badge>{a.gatilho_tipo}</Badge>
              {a.ativo ? <Badge tom="ok">ativo</Badge> : <Badge>desligado</Badge>}
              {a.modo_simulacao && <Badge tom="warn">simulação</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
