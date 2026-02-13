"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string | null;
  sabor?: string;
  destaque?: boolean;
  badge?: string; // Ex: "50g", "Serve 10", "M (1kg)"
  onAddToCart?: (id: string) => void;
}

export default function ProductCard({
  id,
  nome,
  descricao,
  preco,
  imagemUrl,
  sabor,
  destaque,
  badge,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="card-product group relative">
      {/* Badge de destaque */}
      {destaque && (
        <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-soft">
          ⭐ Destaque
        </div>
      )}

      {/* Imagem do produto */}
      <div className="relative aspect-square overflow-hidden bg-brand-cream-warm">
        <Image
          src={imagemUrl ?? "/logo-scalese.png"}
          alt={nome}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col gap-3">
        {/* Badge adicional (tamanho, peso, etc) */}
        {badge && (
          <span className="inline-block self-start text-xs font-bold text-brand-mint bg-brand-mint-light px-3 py-1 rounded-full">
            {badge}
          </span>
        )}

        {/* Nome */}
        <h3 className="font-display text-xl font-bold text-brand-chocolate line-clamp-2">
          {nome}
        </h3>

        {/* Sabor */}
        {sabor && (
          <p className="text-sm text-brand-chocolate-light font-medium">
            Sabor: {sabor}
          </p>
        )}

        {/* Descrição */}
        <p className="text-sm text-brand-chocolate-light line-clamp-2 flex-1">
          {descricao}
        </p>

        {/* Preço e ação */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-brand-cream">
          <div>
            <p className="text-2xl font-display font-bold text-brand-rose">
              {formatPrice(preco)}
            </p>
          </div>
          <button
            onClick={() => onAddToCart?.(id)}
            className="btn-primary text-sm whitespace-nowrap"
            aria-label={`Adicionar ${nome} ao carrinho`}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
