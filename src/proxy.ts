import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// No Next 16 o antigo `middleware` foi renomeado para `proxy`.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Roda em tudo, menos assets estáticos e imagens.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
