import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/next";
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
        <body className="min-h-screen flex flex-col">
          <CartProvider>{children}</CartProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}