"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, ProductType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import {
  addToCart as addToCartAction,
  getActiveCart,
  updateCartItemQuantity as updateQtyAction,
  removeCartItem as removeItemAction,
  clearCart as clearCartAction,
  mergeCartOnLogin,
} from "@/actions/cart.actions";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  isLoading: boolean;
  addItem: (productId: string, productType: ProductType, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser();
  const [prevSignedIn, setPrevSignedIn] = useState<boolean | undefined>(undefined);

  const refreshCart = useCallback(async () => {
    const result = await getActiveCart();
    if (result.success && result.data) {
      setItems(result.data.items);
      setItemCount(
        result.data.items.reduce((sum, item) => sum + item.quantity, 0)
      );
    } else {
      setItems([]);
      setItemCount(0);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Merge guest cart on login
  useEffect(() => {
    if (prevSignedIn === false && isSignedIn === true) {
      mergeCartOnLogin().then(() => refreshCart());
    }
    setPrevSignedIn(isSignedIn);
  }, [isSignedIn, prevSignedIn, refreshCart]);

  const addItem = useCallback(
    async (productId: string, productType: ProductType, quantity = 1) => {
      setIsLoading(true);
      try {
        const result = await addToCartAction({ productId, productType, quantity });
        if (result.success) {
          await refreshCart();
          setIsOpen(true);
        } else {
          console.error(result.error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [refreshCart]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      // Optimistic update
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
      setItemCount((prev) => {
        const old = items.find((i) => i.id === itemId);
        return prev - (old?.quantity ?? 0) + quantity;
      });

      const result = await updateQtyAction({ itemId, quantity });
      if (!result.success) {
        await refreshCart(); // revert on error
      }
    },
    [items, refreshCart]
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      // Optimistic update
      const removed = items.find((i) => i.id === itemId);
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      setItemCount((prev) => prev - (removed?.quantity ?? 0));

      const result = await removeItemAction({ itemId });
      if (!result.success) {
        await refreshCart(); // revert on error
      }
    },
    [items, refreshCart]
  );

  const clearCart = useCallback(async () => {
    setItems([]);
    setItemCount(0);

    const result = await clearCartAction();
    if (!result.success) {
      await refreshCart();
    }
  }, [refreshCart]);

  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isOpen,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de <CartProvider>");
  }
  return context;
}
