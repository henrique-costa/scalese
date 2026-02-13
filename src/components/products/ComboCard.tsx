"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface ComboCardProps {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string | null;
  itensInclusos: string; // JSON string
  servePessoas: number;
  temaBolo?: string | null;
  destaque?: boolean;
  onAddToCart?: (id: string) => void;
}

export default function ComboCard({
  id,
  nome,
  descricao,
  preco,
  imagemUrl,
  itensInclusos,
  servePessoas,
  temaBolo,
  destaque,
  onAddToCart,
}: ComboCardProps) {
  // Parse dos itens inclusos
  let itens: string[] = [];
  try {
    itens = JSON.parse(itensInclusos);
  } catch {
    itens = [];
  }

  return (
    <div className="card-product group relative">
      {/* Badge de destaque */}
      {destaque && (
        <div className="absolute top-4 right-4 z-10 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-soft">
          ⭐ Destaque
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-0">
        {/* Imagem do combo */}
        <div className="relative aspect-square md:aspect-auto overflow-hidden bg-brand-cream-warm">
          <Image
            src={imagemUrl ?? "/logo-scalese.png"}
            alt={nome}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Conteúdo */}
        <div className="p-6 md:p-8 flex flex-col gap-4">
          {/* Badge pessoas */}
          <span className="inline-block self-start text-xs font-bold text-brand-gold bg-brand-gold-light px-3 py-1 rounded-full">
            Serve {servePessoas} pessoas
          </span>

          {/* Nome */}
          <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-chocolate">
            {nome}
          </h3>

          {/* Tema do bolo */}
          {temaBolo && (
            <p className="text-sm text-brand-chocolate-light font-medium">
              Tema: {temaBolo}
            </p>
          )}

          {/* Descrição */}
          <p className="text-sm text-brand-chocolate-light">{descricao}</p>

          {/* Itens inclusos */}
          {itens.length > 0 && (
            <div className="mt-2">
              <h4 className="font-body font-bold text-brand-chocolate mb-2">
                Itens inclusos:
              </h4>
              <ul className="space-y-1">
                {itens.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-brand-chocolate-light flex items-start gap-2"
                  >
                    <span className="text-brand-mint mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preço e ação */}
          <div className="flex items-center justify-between gap-4 pt-4 mt-auto border-t border-brand-cream">
            <div>
              <p className="text-sm text-brand-chocolate-light mb-1">
                Valor do combo
              </p>
              <p className="text-3xl font-display font-bold text-brand-rose">
                {formatPrice(preco)}
              </p>
            </div>
            <button
              onClick={() => onAddToCart?.(id)}
              className="btn-primary text-base whitespace-nowrap"
              aria-label={`Adicionar ${nome} ao carrinho`}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
