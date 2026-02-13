import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "light", size = "md" }: LogoProps) {
  const heights = {
    sm: 40,
    md: 60,
    lg: 80,
  };

  const widths = {
    sm: 120,
    md: 180,
    lg: 240,
  };

  // Por enquanto usando placeholder - substitua pelo caminho da sua logo
  // Salve a imagem em: public/logo-scalese.png
  const logoSrc = "/logo-scalese.png";

  return (
    <Link href="/" className="relative block">
      <Image
        src={logoSrc}
        alt="Confetteria Scalese"
        width={widths[size]}
        height={heights[size]}
        className={`object-contain transition-all duration-300 ${
          variant === "dark" ? "brightness-0" : "brightness-100"
        }`}
        priority
      />
    </Link>
  );
}
