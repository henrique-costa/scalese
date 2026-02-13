import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { listarBombons } from "@/actions";
import Link from "next/link";

export const metadata = {
  title: "Bombons Gourmet | Confetteria Scalese",
  description:
    "Brigadeiros gourmet, beijinhos e outras delícias artesanais feitas com amor por Marcela Scalese.",
};

export default async function BombonsPage() {
  const result = await listarBombons(true); // apenas disponíveis
  const bombons = result.success ? result.data : [];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Header da página */}
        <section className="relative py-20 bg-gradient-to-br from-brand-chocolate via-brand-chocolate-light to-brand-chocolate overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-white blur-3xl" />
          </div>

          <div className="container-scalese text-center relative z-10">
            <div className="text-7xl mb-6 animate-fade-in-up">🍫</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up delay-100">
              Bombons Gourmet
            </h1>
            <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Brigadeiros tradicionais, beijinhos cremosos e outras delícias
              artesanais em embalagens especiais para presentear ou saborear.
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mt-8 text-white/70 text-sm animate-fade-in delay-300">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <span>/</span>
              <span className="text-white">Bombons</span>
            </div>
          </div>
        </section>

        {/* Grid de produtos */}
        <section className="py-16 bg-brand-cream">
          <div className="container-scalese">
            {bombons.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-brand-chocolate-light">
                  Nenhum bombom disponível no momento.
                </p>
                <Link href="/" className="btn-primary mt-6 inline-block">
                  Voltar para Home
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <p className="text-brand-chocolate-light">
                    {bombons.length}{" "}
                    {bombons.length === 1 ? "produto" : "produtos"}{" "}
                    {bombons.length === 1 ? "encontrado" : "encontrados"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {bombons.map((bombom) => (
                    <ProductCard
                      key={bombom.id}
                      id={bombom.id}
                      nome={bombom.nome}
                      descricao={bombom.descricao}
                      preco={bombom.preco}
                      imagemUrl={bombom.imagemUrl}
                      sabor={bombom.sabor}
                      destaque={bombom.destaque}
                      badge={`${bombom.peso}g · ${bombom.unidades} un`}
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
