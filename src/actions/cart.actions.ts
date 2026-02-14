"use server";

import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { safeAction } from "@/lib/utils";
import {
  AddToCartSchema,
  UpdateCartItemSchema,
  RemoveCartItemSchema,
  type AddToCartInput,
  type UpdateCartItemInput,
  type RemoveCartItemInput,
  type ApiResponse,
} from "@/lib/validations";
import type { Cart, CartItem, ProductType } from "@prisma/client";

// ---- Types ----
export type CartWithItems = Cart & { items: CartItem[] };

// ---- Helpers ----

async function getSessionId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("cart_session")?.value;
}

async function setSessionId(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("cart_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

async function generateSessionId(): Promise<string> {
  const { randomUUID } = await import("crypto");
  return randomUUID();
}

async function getOrCreateCart(): Promise<Cart> {
  const { userId } = await auth();
  const sessionId = await getSessionId();

  // Logged-in user: find by userId
  if (userId) {
    const existing = await prisma.cart.findFirst({
      where: { userId, status: "ACTIVE" },
    });
    if (existing) return existing;

    return prisma.cart.create({ data: { userId } });
  }

  // Guest: find by sessionId
  if (sessionId) {
    const existing = await prisma.cart.findFirst({
      where: { sessionId, status: "ACTIVE" },
    });
    if (existing) return existing;
  }

  // Create guest cart with new session
  const newSessionId = sessionId || (await generateSessionId());
  if (!sessionId) {
    await setSessionId(newSessionId);
  }

  return prisma.cart.create({ data: { sessionId: newSessionId } });
}

async function resolveActiveCart(): Promise<CartWithItems | null> {
  const { userId } = await auth();
  const sessionId = await getSessionId();

  if (userId) {
    return prisma.cart.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { items: { orderBy: { createdAt: "asc" } } },
    });
  }

  if (sessionId) {
    return prisma.cart.findFirst({
      where: { sessionId, status: "ACTIVE" },
      include: { items: { orderBy: { createdAt: "asc" } } },
    });
  }

  return null;
}

async function getProductPrice(
  productId: string,
  productType: ProductType
): Promise<{ preco: number; nome: string } | null> {
  switch (productType) {
    case "BOMBOM": {
      const p = await prisma.bombom.findUnique({
        where: { id: productId },
        select: { preco: true, nome: true, disponivel: true },
      });
      return p?.disponivel ? { preco: p.preco, nome: p.nome } : null;
    }
    case "BOLO": {
      const p = await prisma.bolo.findUnique({
        where: { id: productId },
        select: { preco: true, nome: true, disponivel: true },
      });
      return p?.disponivel ? { preco: p.preco, nome: p.nome } : null;
    }
    case "COMBO": {
      const p = await prisma.comboFesta.findUnique({
        where: { id: productId },
        select: { preco: true, nome: true, disponivel: true },
      });
      return p?.disponivel ? { preco: p.preco, nome: p.nome } : null;
    }
  }
}

function verifyCartOwnership(
  cart: Cart,
  userId: string | null,
  sessionId: string | undefined
): boolean {
  if (userId && cart.userId === userId) return true;
  if (!userId && sessionId && cart.sessionId === sessionId) return true;
  return false;
}

// ---- Actions ----

export async function addToCart(
  data: AddToCartInput
): Promise<ApiResponse<CartItem>> {
  return safeAction(async () => {
    const validated = AddToCartSchema.parse(data);
    const { productId, productType, quantity } = validated;

    // Validate product exists and is available
    const product = await getProductPrice(productId, productType);
    if (!product) {
      throw new Error("Produto não encontrado ou indisponível.");
    }

    const cart = await getOrCreateCart();

    // Upsert: if item exists, sum quantities
    const existing = await prisma.cartItem.findUnique({
      where: {
        cartId_productId_productType: { cartId: cart.id, productId, productType },
      },
    });

    if (existing) {
      return prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + quantity,
          unitPrice: product.preco, // refresh price
        },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        productType,
        quantity,
        unitPrice: product.preco,
      },
    });
  });
}

export async function getActiveCart(): Promise<ApiResponse<CartWithItems | null>> {
  return safeAction(async () => {
    return resolveActiveCart();
  });
}

export async function updateCartItemQuantity(
  data: UpdateCartItemInput
): Promise<ApiResponse<CartItem>> {
  return safeAction(async () => {
    const { itemId, quantity } = UpdateCartItemSchema.parse(data);
    const { userId } = await auth();
    const sessionId = await getSessionId();

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item) throw new Error("Item não encontrado.");
    if (!verifyCartOwnership(item.cart, userId, sessionId)) {
      throw new Error("Acesso negado.");
    }

    return prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  });
}

export async function removeCartItem(
  data: RemoveCartItemInput
): Promise<ApiResponse<CartItem>> {
  return safeAction(async () => {
    const { itemId } = RemoveCartItemSchema.parse(data);
    const { userId } = await auth();
    const sessionId = await getSessionId();

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item) throw new Error("Item não encontrado.");
    if (!verifyCartOwnership(item.cart, userId, sessionId)) {
      throw new Error("Acesso negado.");
    }

    return prisma.cartItem.delete({ where: { id: itemId } });
  });
}

export async function clearCart(): Promise<ApiResponse<void>> {
  return safeAction(async () => {
    const cart = await resolveActiveCart();
    if (!cart) return;

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  });
}

export async function getCartItemCount(): Promise<ApiResponse<number>> {
  return safeAction(async () => {
    const cart = await resolveActiveCart();
    if (!cart) return 0;

    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  });
}

/**
 * Client-callable merge: reads userId from auth and sessionId from cookie.
 * Called by CartContext when it detects user just logged in.
 */
export async function mergeCartOnLogin(): Promise<ApiResponse<void>> {
  return safeAction(async () => {
    const { userId } = await auth();
    const sessionId = await getSessionId();

    if (!userId || !sessionId) return;

    await mergeGuestCartInternal(sessionId, userId);
  });
}

export async function mergeGuestCart(
  sessionId: string,
  userId: string
): Promise<ApiResponse<void>> {
  return safeAction(async () => {
    await mergeGuestCartInternal(sessionId, userId);
  });
}

async function mergeGuestCartInternal(
  sessionId: string,
  userId: string
): Promise<void> {
  const guestCart = await prisma.cart.findFirst({
    where: { sessionId, status: "ACTIVE" },
    include: { items: true },
  });

  if (!guestCart || guestCart.items.length === 0) return;

  await prisma.$transaction(async (tx) => {
    let userCart = await tx.cart.findFirst({
      where: { userId, status: "ACTIVE" },
      include: { items: true },
    });

    if (!userCart) {
      userCart = await tx.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    for (const guestItem of guestCart.items) {
      const existingItem = userCart.items.find(
        (i) =>
          i.productId === guestItem.productId &&
          i.productType === guestItem.productType
      );

      if (existingItem) {
        await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + guestItem.quantity },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: guestItem.productId,
            productType: guestItem.productType,
            quantity: guestItem.quantity,
            unitPrice: guestItem.unitPrice,
          },
        });
      }
    }

    await tx.cart.update({
      where: { id: guestCart.id },
      data: { status: "MERGED" },
    });
  });
}
