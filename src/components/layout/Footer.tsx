import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-chocolate text-brand-cream-warm mt-auto relative">
      {/* Ondas de chocolate */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[calc(100%-1px)]">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C200,50 400,30 600,40 C800,50 1000,30 1200,40 L1200,60 L0,60 Z"
            className="fill-brand-chocolate"
          />
        </svg>
      </div>

      <div className="container-scalese py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Confetteria{" "}
              <span className="text-brand-rose">Scalese</span>
            </h3>
            <p className="font-accent text-brand-gold-light text-lg mb-4">
              De enfermeira a confeiteira
            </p>
            <p className="font-body text-sm text-brand-cream-warm/70 leading-relaxed">
              Doces experiências e momentos especiais com qualidade e
              exclusividade. Cada doce é feito com amor e ingredientes
              selecionados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4">
              Navegação
            </h4>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/">Início</FooterLink>
              <FooterLink href="/bombons">Bombons</FooterLink>
              <FooterLink href="/bolos">Bolos</FooterLink>
              <FooterLink href="/combos">Combos Festa</FooterLink>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4">
              Contato
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm text-brand-cream-warm/70">
              <p>São Paulo, SP</p>
              <p>Encomendas sob consulta</p>
              <p className="text-brand-rose mt-2">
                @confetteriascalese
              </p>
            </div>
          </div>
        </div>

        <div className="gold-divider my-8 opacity-30" />

        <div className="text-center font-body text-xs text-brand-cream-warm/50">
          © {currentYear} Confetteria Scalese. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-body text-sm text-brand-cream-warm/70 hover:text-brand-rose transition-colors"
    >
      {children}
    </Link>
  );
}
