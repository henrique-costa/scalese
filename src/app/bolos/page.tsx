import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BolosList from "@/components/products/BolosList";
import { listarBolos } from "@/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bolos Personalizados | Confetteria Scalese",
  description:
    "Bolos artesanais personalizados para aniversários, casamentos e ocasiões especiais. Feitos com amor por Marcela Scalese.",
};

export default async function BolosPage() {
  const result = await listarBolos(true); // apenas disponíveis
  const bolos = result.data ?? [];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Header da página */}
        <section className="relative py-20 bg-gradient-to-br from-brand-rose via-brand-rose-dark to-brand-rose overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
          </div>

          <div className="container-scalese text-center relative z-10">
            <div className="text-7xl mb-6 animate-fade-in-up">🎂</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up delay-100">
              Bolos Personalizados
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Bolos artesanais para aniversários, casamentos e ocasiões
              especiais. Sabores exclusivos, decoração personalizada e muito
              carinho em cada detalhe.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mt-8 text-white/70 text-sm animate-fade-in delay-300">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <span>/</span>
              <span className="text-white">Bolos</span>
            </div>
          </div>
        </section>

        {/* Grid de produtos com filtro */}
        <section className="py-16 bg-brand-cream">
          <div className="container-scalese">
            {bolos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-brand-chocolate-light">
                  Nenhum bolo disponível no momento.
                </p>
                <Link href="/" className="btn-primary mt-6 inline-block">
                  Voltar para Home
                </Link>
              </div>
            ) : (
              <BolosList bolos={bolos} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
