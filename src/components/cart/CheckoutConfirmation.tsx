"use client";

import { CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { OrderWithItems } from "@/actions/order.actions";

interface CheckoutConfirmationProps {
  order: OrderWithItems;
  onClose: () => void;
}

export default function CheckoutConfirmation({
  order,
  onClose,
}: CheckoutConfirmationProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5">
          <div className="text-center">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-3" />
            <h2 className="font-display text-2xl font-bold text-brand-chocolate">
              Pedido Confirmado!
            </h2>
            <p className="text-sm text-brand-chocolate-light mt-1">
              Pedido #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>

          {/* Items summary */}
          <div className="border rounded-xl p-4 space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-brand-chocolate">
                  {item.productName} x{item.quantity}
                </span>
                <span className="font-bold text-brand-chocolate">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between">
              <span className="font-bold text-brand-chocolate">Total</span>
              <span className="font-display text-lg font-bold text-brand-rose">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>

          <p className="text-sm text-center text-brand-chocolate-light">
            Seu pedido foi registrado com sucesso. Entraremos em contato em
            breve!
          </p>

          <button onClick={onClose} className="w-full btn-primary text-center">
            Fechar
          </button>
        </div>
      </div>
    </>
  );
}
