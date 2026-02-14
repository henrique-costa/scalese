"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { adminAtualizarStatusPedido } from "@/actions/order.actions";
import type { OrderWithItems } from "@/actions/order.actions";
import type { OrderStatus } from "@prisma/client";
import { Clock, CheckCircle, Package, Truck, XCircle } from "lucide-react";

interface OrdersTableProps {
  pedidos: OrderWithItems[];
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  CONFIRMED: {
    label: "Confirmado",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  IN_PRODUCTION: {
    label: "Em Produção",
    color: "bg-purple-100 text-purple-800",
    icon: Package,
  },
  READY: {
    label: "Pronto",
    color: "bg-green-100 text-green-800",
    icon: Truck,
  },
  COMPLETED: {
    label: "Concluído",
    color: "bg-gray-100 text-gray-800",
    icon: CheckCircle,
  },
  CANCELED: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

const nextStatusOptions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELED"],
  CONFIRMED: ["IN_PRODUCTION", "CANCELED"],
  IN_PRODUCTION: ["READY", "CANCELED"],
  READY: ["COMPLETED"],
  COMPLETED: [],
  CANCELED: [],
};

export default function OrdersTable({ pedidos }: OrdersTableProps) {
  const [orders, setOrders] = useState(pedidos);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusUpdate(orderId: string, newStatus: OrderStatus) {
    setUpdatingId(orderId);
    try {
      const result = await adminAtualizarStatusPedido(orderId, newStatus);
      if (result.success && result.data) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: result.data!.status } : order
          )
        );
      } else {
        alert(result.error ?? "Erro ao atualizar status.");
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const StatusIcon = statusConfig[order.status].icon;
        const isExpanded = expandedId === order.id;

        return (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-6 flex items-center justify-between cursor-pointer hover:bg-brand-cream/30 transition-colors"
              onClick={() =>
                setExpandedId(isExpanded ? null : order.id)
              }
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-brand-chocolate-light">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      statusConfig[order.status].color
                    }`}
                  >
                    <StatusIcon size={14} />
                    {statusConfig[order.status].label}
                  </span>
                </div>
                <p className="text-sm text-brand-chocolate-light">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="text-right">
                <p className="font-display text-2xl font-bold text-brand-rose">
                  {formatPrice(order.totalAmount)}
                </p>
                <p className="text-sm text-brand-chocolate-light">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "itens"}
                </p>
              </div>
            </div>

            {/* Detalhes expandidos */}
            {isExpanded && (
              <div className="border-t border-brand-cream px-6 py-4 space-y-4">
                {/* Itens */}
                <div>
                  <h3 className="font-bold text-brand-chocolate mb-2">
                    Itens do Pedido
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-brand-chocolate">
                          {item.productName}{" "}
                          <span className="text-brand-chocolate-light">
                            x{item.quantity}
                          </span>
                        </span>
                        <span className="font-bold text-brand-chocolate">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ações de status */}
                {nextStatusOptions[order.status].length > 0 && (
                  <div>
                    <h3 className="font-bold text-brand-chocolate mb-2">
                      Atualizar Status
                    </h3>
                    <div className="flex gap-2">
                      {nextStatusOptions[order.status].map((nextStatus) => (
                        <button
                          key={nextStatus}
                          onClick={() => handleStatusUpdate(order.id, nextStatus)}
                          disabled={updatingId === order.id}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 ${
                            nextStatus === "CANCELED"
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : "bg-brand-mint-light text-brand-mint hover:bg-brand-mint hover:text-white"
                          }`}
                        >
                          {updatingId === order.id
                            ? "..."
                            : statusConfig[nextStatus].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
