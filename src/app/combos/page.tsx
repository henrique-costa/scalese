import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComboCard from "@/components/products/ComboCard";
import { listarCombos } from "@/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Combos Festa | Confetteria Scalese",
  description:
    "Kits completos com bolo e doces para tornar sua festa inesquecível. Opções para todos os tamanhos de eventos.",
};

export default async function CombosPage() {
  const result = await listarCombos(true); // apenas disponíveis
  const combos = result.data ?? [];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Header da página */}
        <section className="relative py-20 bg-gradient-to-br from-brand-gold via-brand-gold-dark to-brand-gold overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
          </div>

          <div className="container-scalese text-center relative z-10">
            <div className="text-7xl mb-6 animate-fade-in-up">🎁</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up delay-100">
              Combos Festa
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Kits completos com bolo personalizado e doces artesanais para
              tornar sua festa inesquecível. Praticidade e sabor em um só
              pacote.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mt-8 text-white/70 text-sm animate-fade-in delay-300">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <span>/</span>
              <span className="text-white">Combos</span>
            </div>
          </div>
        </section>

        {/* Grid de produtos */}
        <section className="py-16 bg-brand-cream">
          <div className="container-scalese">
            {combos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-brand-chocolate-light">
                  Nenhum combo disponível no momento.
                </p>
                <Link href="/" className="btn-primary mt-6 inline-block">
                  Voltar para Home
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <p className="text-brand-chocolate-light">
                    {combos.length}{" "}
                    {combos.length === 1 ? "combo" : "combos"}{" "}
                    {combos.length === 1 ? "disponível" : "disponíveis"}
                  </p>
                </div>

                <div className="space-y-8">
                  {combos.map((combo) => (
                    <ComboCard
                      key={combo.id}
                      id={combo.id}
                      nome={combo.nome}
                      descricao={combo.descricao}
                      preco={combo.preco}
                      imagemUrl={combo.imagemUrl}
                      itensInclusos={combo.itensInclusos}
                      servePessoas={combo.servePessoas}
                      temaBolo={combo.temaBolo}
                      destaque={combo.destaque}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
