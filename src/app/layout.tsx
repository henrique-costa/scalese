import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Confetteria Scalese | Doces Artesanais",
  description:
    "Doces artesanais feitos com amor e ingredientes selecionados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className="min-h-screen flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}