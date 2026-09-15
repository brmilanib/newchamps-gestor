import { getSessao } from "@/lib/data/sessao";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Card, Badge } from "@/components/ui";
import { FormUsuario } from "./Form";

export default async function UsuariosPage() {
  const s = await getSessao();

  if (s.papel !== "admin") {
    return (
      <div>
        <PageHeader titulo="Usuários" />
        <Card className="border-dashed">
          <p className="py-6 text-center text-sm text-muted">
            Só administradores podem gerenciar usuários.
          </p>
        </Card>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: usuarios } = await supabase
    .from("users")
    .select("nome, email, papel, ativo, criado_em")
    .order("criado_em", { ascending: true });
  const lista = usuarios ?? [];

  return (
    <div>
      <PageHeader
        titulo="Usuários"
        descricao="Cadastre as pessoas da equipe. Cada uma entra com o próprio e-mail e a senha inicial que você definir (e troca depois)."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-ink">Novo usuário</h3>
          <FormUsuario />
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-ink">Equipe ({lista.length})</h3>
          <ul className="flex flex-col divide-y divide-line">
            {lista.map((u) => (
              <li key={u.email} className="flex items-center justify-between gap-2 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{u.nome}</p>
                  <p className="truncate text-xs text-muted">{u.email}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge tom={u.papel === "admin" ? "brand" : "neutro"}>{u.papel}</Badge>
                  {!u.ativo && <Badge tom="risk">inativo</Badge>}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
