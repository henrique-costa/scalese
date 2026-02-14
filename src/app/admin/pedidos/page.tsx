import { adminListarPedidos } from "@/actions/order.actions";
import OrdersTable from "@/components/admin/OrdersTable";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gerenciar Pedidos | Admin - Confetteria Scalese",
  description: "Gerenciamento de pedidos da loja",
};

export default async function AdminPedidosPage() {
  const result = await adminListarPedidos();
  const pedidos = result.data ?? [];

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="container-scalese py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="text-sm text-brand-chocolate-light hover:text-brand-chocolate mb-2 inline-block"
            >
              ← Voltar ao Painel
            </Link>
            <h1 className="font-display text-4xl font-bold text-brand-chocolate">
              Pedidos
            </h1>
            <p className="text-brand-chocolate-light mt-2">
              {pedidos.length} {pedidos.length === 1 ? "pedido" : "pedidos"} no
              total
            </p>
          </div>
        </div>

        {/* Lista de pedidos */}
        {pedidos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingBag
              size={64}
              className="mx-auto mb-4 text-brand-cream"
            />
            <h2 className="font-display text-2xl font-bold text-brand-chocolate mb-2">
              Nenhum pedido ainda
            </h2>
            <p className="text-brand-chocolate-light">
              Os pedidos dos clientes aparecerão aqui.
            </p>
          </div>
        ) : (
          <OrdersTable pedidos={pedidos} />
        )}
      </div>
    </div>
  );
}
