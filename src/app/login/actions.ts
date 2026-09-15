"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type EstadoLogin = { erro: string } | null;

export async function entrar(_prev: EstadoLogin, formData: FormData): Promise<EstadoLogin> {
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");
  if (!email || !senha) return { erro: "Preencha e-mail e senha." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) return { erro: "E-mail ou senha inválidos." };

  redirect("/hoje");
}

export async function sair(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
