import { AppShell } from "@/components/AppShell";
import { getSessao } from "@/lib/data/sessao";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const s = await getSessao();
  return (
    <AppShell nome={s.nome} papel={s.papel} lojas={s.lojas}>
      {children}
    </AppShell>
  );
}
