import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Newchamps Gestor",
  description: "Inteligência de mercado, BI e operação do Grupo Newchamps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
