import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import {
  bombonsDestaque,
  bolosDestaque,
  combosDestaque,
} from "@/actions";

export default async function Home() {
  // Buscar produtos em destaque
  const [bombonsRes, bolosRes, combosRes] = await Promise.all([
    bombonsDestaque(),
    bolosDestaque(),
    combosDestaque(),
  ]);

  const destaques = [
    ...(bombonsRes.data ?? []),
    ...(bolosRes.data ?? []),
    ...(combosRes.data ?? []),
  ].slice(0, 6);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero com Vídeo/Parallax de Fundo */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Vídeo de Fundo */}
          <div className="absolute inset-0 w-full h-full">
           <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover">
            <source
              src="https://videos.pexels.com/video-files/8477931/8477931-hd_1920_1080_24fps.mp4"
              type="video/mp4"
            />
          </video>

            {/* Overlay escuro para legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
          </div>
 
          {/* Conteúdo */}
          <div className="container-scalese text-center relative z-10 px-6 py-20">
            {/* Logo Grande */}
            {/* <div className="mb-8 animate-fade-in-up">
              <img
                src="/logo-scalese.png"
                alt="Confetteria Scalese"
                className="w-64 md:w-96 mx-auto drop-shadow-2xl"
              />
            </div>  */}

            {/* Título */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 animate-fade-in-up delay-100 drop-shadow-2xl">
              Confetteria <span className="text-brand-rose-light">Scalese</span>
            </h1>

            {/* Botões CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <a
                href="#destaques"
                className="bg-brand-rose hover:bg-brand-rose-dark text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-elevated hover:shadow-card text-lg"
              >
                Ver Produtos
              </a>
              <a
                href="#categorias"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-brand-chocolate font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
              >
                Nossas Linhas
              </a>
            </div>
          </div>

          {/* Scroll Indicator - Agora centralizado corretamente */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <svg
              className="w-6 h-6 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Produtos em Destaque */}
        {destaques.length > 0 && (
          <section id="destaques" className="py-20 bg-white">
            <div className="container-scalese">
              <div className="text-center mb-12">
                <h2 className="section-title mb-4">Nossos Destaques</h2>
                <p className="section-subtitle">os queridinhos da casa</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {destaques.map((produto) => {
                  const isBombom = "unidades" in produto;
                  const isBolo = "tamanho" in produto;
                  const isCombo = "servePessoas" in produto;

                  let badge = "";
                  if (isBombom && "peso" in produto) badge = `${produto.peso}g`;
                  if (isBolo && "tamanho" in produto) badge = `Tamanho ${produto.tamanho}`;
                  if (isCombo && "servePessoas" in produto)
                    badge = `Serve ${produto.servePessoas} pessoas`;

                  return (
                    <ProductCard
                      key={produto.id}
                      id={produto.id}
                      nome={produto.nome}
                      descricao={produto.descricao}
                      preco={produto.preco}
                      imagemUrl={produto.imagemUrl}
                      sabor={"sabor" in produto ? produto.sabor : undefined}
                      destaque={produto.destaque}
                      badge={badge}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Nossas Categorias */}
        <section id="categorias" className="py-20 bg-brand-cream">
          <div className="container-scalese">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Nossas Linhas</h2>
              <p className="section-subtitle">escolha sua preferida</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bombons */}
              <Link
                href="/bombons"
                className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 aspect-[4/5]"
              >
                {/* Imagem de Fundo */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1553452118-621e1f860f43?q=80&w=1974"
                    alt="Bombons"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay suave apenas para legibilidade do texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="font-display text-3xl font-bold text-white mb-3 drop-shadow-2xl">
                    Bombons
                  </h3>
                  <p className="font-body text-white text-sm drop-shadow-xl">
                    Brigadeiros gourmet, beijinhos e outras delícias em
                    embalagens especiais
                  </p>
                </div>
              </Link>

              {/* Bolos */}
              <Link
                href="/bolos"
                className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 aspect-[4/5]"
              >
                {/* Imagem de Fundo */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80"
                    alt="Bolos"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay suave apenas para legibilidade do texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="font-display text-3xl font-bold text-white mb-3 drop-shadow-2xl">
                    Bolos
                  </h3>
                  <p className="font-body text-white text-sm drop-shadow-xl">
                    Bolos personalizados para aniversários, casamentos e
                    ocasiões especiais
                  </p>
                </div>
              </Link>

              {/* Combos */}
              <Link
                href="/combos"
                className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 aspect-[4/5]"
              >
                {/* Imagem de Fundo */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1621857524725-fdfeae3465dc?q=80&w=2670"
                    alt="Combos Festa"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay suave apenas para legibilidade do texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                  <h3 className="font-display text-3xl font-bold text-white mb-3 drop-shadow-2xl">
                    Combos Festa
                  </h3>
                  <p className="font-body text-white text-sm drop-shadow-xl">
                    Kits completos com bolo e doces para tornar sua festa
                    inesquecível
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
