"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-cream/98 backdrop-blur-md border-b border-brand-gold-light/30 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-scalese flex items-center justify-between h-16 md:h-20">
        {/* Logo - Comentado temporariamente */}
        {/* <Logo size="md" variant={isScrolled ? "dark" : "light"} /> */}

        {/* Logo texto temporário */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className={`font-display text-xl md:text-2xl font-bold transition-colors ${
            isScrolled ? "text-brand-chocolate group-hover:text-brand-rose-dark" : "text-white group-hover:text-brand-rose-light"
          }`}>
            Confetteria
          </span>
          <span className={`font-accent text-xl md:text-2xl ${
            isScrolled ? "text-brand-rose" : "text-brand-rose-light"
          }`}>
            Scalese
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/" isScrolled={isScrolled}>
            Início
          </NavLink>
          <NavLink href="/bombons" isScrolled={isScrolled}>
            Bombons
          </NavLink>
          <NavLink href="/bolos" isScrolled={isScrolled}>
            Bolos
          </NavLink>
          <NavLink href="/combos" isScrolled={isScrolled}>
            Combos Festa
          </NavLink>
        </nav>

        {/* Cart + Auth + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Cart button */}
          <button
            onClick={toggleCart}
            className={`relative p-2 transition-colors ${
              isScrolled
                ? "text-brand-chocolate hover:text-brand-rose"
                : "text-white hover:text-brand-rose-light"
            }`}
            aria-label="Abrir carrinho"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-rose text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          <SignedIn>
            <Link
              href="/admin"
              className={`hidden md:inline-flex text-sm font-body font-bold transition-colors ${
                isScrolled
                  ? "text-brand-gold-dark hover:text-brand-gold"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Painel Admin
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 ring-2 ring-brand-rose/30 hover:ring-brand-rose transition-all",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
            >
              Entrar
            </Link>
          </SignedOut>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled
                ? "text-brand-chocolate hover:text-brand-rose"
                : "text-white hover:text-brand-rose-light"
            }`}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-gold-light/20 bg-brand-cream/98 backdrop-blur-md">
          <nav className="container-scalese py-4 flex flex-col gap-3">
            <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>
              Início
            </MobileNavLink>
            <MobileNavLink href="/bombons" onClick={() => setMobileOpen(false)}>
              Bombons
            </MobileNavLink>
            <MobileNavLink href="/bolos" onClick={() => setMobileOpen(false)}>
              Bolos
            </MobileNavLink>
            <MobileNavLink href="/combos" onClick={() => setMobileOpen(false)}>
              Combos Festa
            </MobileNavLink>

            <div className="gold-divider my-2" />

            <SignedIn>
              <MobileNavLink
                href="/admin"
                onClick={() => setMobileOpen(false)}
              >
                Painel Admin
              </MobileNavLink>
            </SignedIn>

            <SignedOut>
              <MobileNavLink
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
              >
                Entrar
              </MobileNavLink>
            </SignedOut>
          </nav>
        </div>
      )}
      <CartDrawer />
    </header>
  );
}

function NavLink({
  href,
  children,
  isScrolled,
}: {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`font-body text-sm font-bold transition-all relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:transition-all hover:after:w-full ${
        isScrolled
          ? "text-brand-chocolate-light hover:text-brand-rose-dark after:bg-brand-rose"
          : "text-white/90 hover:text-white after:bg-white"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="font-body text-base font-bold text-brand-chocolate-light hover:text-brand-rose-dark hover:bg-brand-rose-light/30 px-4 py-2.5 rounded-xl transition-all"
    >
      {children}
    </Link>
  );
}
