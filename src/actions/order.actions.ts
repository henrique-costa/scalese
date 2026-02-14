"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, withAdmin } from "@/lib/auth";
import { safeAction } from "@/lib/utils";
import type { ApiResponse } from "@/lib/validations";
import type { Order, OrderItem, OrderStatus } from "@prisma/client";

export type OrderWithItems = Order & { items: OrderItem[] };

export async function checkout(): Promise<ApiResponse<OrderWithItems>> {
  return safeAction(async () => {
    const userId = await requireAuth();

    const cart = await prisma.cart.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { items: true },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("Carrinho vazio. Adicione itens antes de finalizar.");
    }

    // Resolve product names and validate availability
    const orderItemsData = await Promise.all(
      cart.items.map(async (item) => {
        const name = await getProductName(item.productId, item.productType);
        return {
          productId: item.productId,
          productType: item.productType,
          productName: name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        };
      })
    );

    const totalAmount = orderItemsData.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // Transaction: create order + clear cart
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: { create: orderItemsData },
        },
        include: { items: true },
      });

      // Clear cart items
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    return order;
  });
}

export async function getOrderById(
  orderId: string
): Promise<ApiResponse<OrderWithItems>> {
  return safeAction(async () => {
    const userId = await requireAuth();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new Error("Pedido não encontrado.");
    if (order.userId !== userId) throw new Error("Acesso negado.");

    return order;
  });
}

export async function listarPedidos(): Promise<ApiResponse<OrderWithItems[]>> {
  return safeAction(async () => {
    const userId = await requireAuth();

    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  });
}

// ---- Admin Actions ----

export async function adminListarPedidos(): Promise<ApiResponse<OrderWithItems[]>> {
  return withAdmin(async () => {
    return prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  });
}

export async function adminAtualizarStatusPedido(
  orderId: string,
  newStatus: OrderStatus
): Promise<ApiResponse<Order>> {
  return withAdmin(async () => {
    // Validate transition
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Pedido não encontrado.");

    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      PENDING: ["CONFIRMED", "CANCELED"],
      CONFIRMED: ["IN_PRODUCTION", "CANCELED"],
      IN_PRODUCTION: ["READY", "CANCELED"],
      READY: ["COMPLETED"],
      COMPLETED: [],
      CANCELED: [],
    };

    const allowed = validTransitions[order.status];
    if (!allowed.includes(newStatus)) {
      throw new Error(`Transição inválida de ${order.status} para ${newStatus}`);
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
  });
}

// ---- Helpers ----

async function getProductName(
  productId: string,
  productType: string
): Promise<string> {
  switch (productType) {
    case "BOMBOM": {
      const p = await prisma.bombom.findUnique({
        where: { id: productId },
        select: { nome: true },
      });
      return p?.nome ?? "Bombom removido";
    }
    case "BOLO": {
      const p = await prisma.bolo.findUnique({
        where: { id: productId },
        select: { nome: true },
      });
      return p?.nome ?? "Bolo removido";
    }
    case "COMBO": {
      const p = await prisma.comboFesta.findUnique({
        where: { id: productId },
        select: { nome: true },
      });
      return p?.nome ?? "Combo removido";
    }
    default:
      return "Produto desconhecido";
  }
}
