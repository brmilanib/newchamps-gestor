import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface Sessao {
  userId: string;
  email: string;
  nome: string;
  papel: "admin" | "colaborador";
  organizationId: string | null;
  lojas: Array<{ id: string; nome: string }>;
}

/** Carrega o usuário logado + perfil + lojas. Redireciona pro /login se não houver sessão. */
export async function getSessao(): Promise<Sessao> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: perfil } = await supabase
    .from("users")
    .select("nome, papel, organization_id")
    .eq("id", user.id)
    .maybeSingle();

  const { data: lojas } = await supabase
    .from("lojas")
    .select("id, nome")
    .eq("ativa", true)
    .order("nome");

  return {
    userId: user.id,
    email: user.email ?? "",
    nome: perfil?.nome ?? user.email ?? "Usuário",
    papel: (perfil?.papel as "admin" | "colaborador") ?? "colaborador",
    organizationId: perfil?.organization_id ?? null,
    lojas: lojas ?? [],
  };
}
