"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessao } from "@/lib/data/sessao";

export type EstadoUsuario = { ok: true; nome: string } | { ok: false; erro: string } | null;

export async function criarUsuario(_prev: EstadoUsuario, formData: FormData): Promise<EstadoUsuario> {
  const s = await getSessao();
  if (s.papel !== "admin") return { ok: false, erro: "Só administradores podem criar usuários." };

  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const papel = String(formData.get("papel") ?? "colaborador");
  const senha = String(formData.get("senha") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.rpc("criar_usuario_equipe", {
    p_email: email,
    p_nome: nome,
    p_papel: papel,
    p_senha: senha,
  });

  if (error) return { ok: false, erro: error.message };

  revalidatePath("/configuracoes/usuarios");
  return { ok: true, nome };
}
