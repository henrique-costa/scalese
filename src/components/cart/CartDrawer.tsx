"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import CartItemRow from "./CartItemRow";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { checkout } from "@/actions/order.actions";
import type { OrderWithItems } from "@/actions/order.actions";
import { useUser } from "@clerk/nextjs";

export default function CartDrawer() {
  const { items, itemCount, isOpen, closeCart, updateQuantity, removeItem, clearCart, refreshCart } =
    useCart();
  const { isSignedIn } = useUser();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderWithItems | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleCheckout() {
    if (!isSignedIn) {
      // Redirect to sign-in (cart will persist via session cookie)
      window.location.href = "/sign-in";
      return;
    }

    setCheckoutLoading(true);
    try {
      const result = await checkout();
      if (result.success && result.data) {
        setCompletedOrder(result.data);
        await refreshCart();
      } else {
        alert(result.error ?? "Erro ao finalizar pedido.");
      }
    } finally {
      setCheckoutLoading(false);
    }
  }

  if (!mounted) return null;

  if (completedOrder) {
    return createPortal(
      <CheckoutConfirmation
        order={completedOrder}
        onClose={() => {
          setCompletedOrder(null);
          closeCart();
        }}
      />,
      document.body
    );
  }

  const drawerContent = (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9998] transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[9999] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-cream">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-rose" />
            <h2 className="font-display text-lg font-bold text-brand-chocolate">
              Carrinho
            </h2>
            {itemCount > 0 && (
              <span className="bg-brand-rose text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1 hover:text-brand-rose transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-brand-cream mb-4" />
              <p className="text-brand-chocolate-light font-body">
                Seu carrinho está vazio
              </p>
              <button
                onClick={closeCart}
                className="mt-4 btn-primary text-sm"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}

              <button
                onClick={clearCart}
                className="mt-3 text-xs text-brand-chocolate-light hover:text-red-500 transition-colors underline"
              >
                Limpar carrinho
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-cream px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body font-bold text-brand-chocolate">
                Total
              </span>
              <span className="font-display text-xl font-bold text-brand-rose">
                {formatPrice(total)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full btn-primary text-center disabled:opacity-50"
            >
              {checkoutLoading
                ? "Finalizando..."
                : !isSignedIn
                  ? "Entrar para Finalizar"
                  : "Finalizar Pedido"}
            </button>
          </div>
        )}
      </div>
    </>
  );

  return createPortal(drawerContent, document.body);
}
