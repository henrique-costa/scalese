"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@prisma/client";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

const productTypeLabels: Record<string, string> = {
  BOMBOM: "Bombom",
  BOLO: "Bolo",
  COMBO: "Combo",
};

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const subtotal = item.unitPrice * item.quantity;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-brand-cream last:border-0">
      <div className="flex-1 min-w-0">
        <span className="inline-block text-[10px] font-bold text-brand-mint bg-brand-mint-light px-2 py-0.5 rounded-full mb-1">
          {productTypeLabels[item.productType] ?? item.productType}
        </span>
        <p className="text-sm font-bold text-brand-chocolate truncate">
          {formatPrice(item.unitPrice)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() =>
            item.quantity > 1
              ? onUpdateQuantity(item.id, item.quantity - 1)
              : onRemove(item.id)
          }
          className="w-7 h-7 flex items-center justify-center rounded-full border border-brand-cream hover:border-brand-rose hover:text-brand-rose transition-colors"
          aria-label="Diminuir quantidade"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center text-sm font-bold text-brand-chocolate">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-brand-cream hover:border-brand-rose hover:text-brand-rose transition-colors"
          aria-label="Aumentar quantidade"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Subtotal + remove */}
      <div className="text-right flex items-center gap-2">
        <p className="text-sm font-bold text-brand-rose whitespace-nowrap">
          {formatPrice(subtotal)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-brand-chocolate-light hover:text-red-500 transition-colors"
          aria-label="Remover item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
