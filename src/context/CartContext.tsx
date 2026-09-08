import React, { createContext, useContext, useEffect, useState } from "react";
import { products, Product } from "../data/products";
type CartItem = { product: Product; qty: number };
type CartState = {
  items: CartItem[];
  saved: Product[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string, qty?: number) => void;
};
const CartContext = createContext<CartState | undefined>(undefined);
const quantity = (n: number) =>
  Number.isFinite(n) ? Math.max(1, Math.min(99, Math.floor(n))) : 1;
function read(key: string): unknown[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.slice(0, 100) : [];
  } catch {
    return [];
  }
}
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    read("bw_cart")
      .flatMap((value: any) => {
        const product = products.find((p) => p.id === value?.product?.id);
        return product ? [{ product, qty: quantity(value.qty) }] : [];
      })
      .filter(
        (i, n, a) => a.findIndex((x) => x.product.id === i.product.id) === n,
      ),
  );
  const [saved, setSaved] = useState<Product[]>(() =>
    read("bw_saved").flatMap((value: any) => {
      const p = products.find((p) => p.id === value?.id);
      return p ? [p] : [];
    }),
  );
  useEffect(() => {
    try {
      localStorage.setItem("bw_cart", JSON.stringify(items));
    } catch {}
  }, [items]);
  useEffect(() => {
    try {
      localStorage.setItem("bw_saved", JSON.stringify(saved));
    } catch {}
  }, [saved]);
  const add = (p: Product, qty = 1) => {
    const product = products.find((x) => x.id === p.id);
    if (!product) return;
    setItems((prev) =>
      prev.some((i) => i.product.id === p.id)
        ? prev.map((i) =>
            i.product.id === p.id
              ? { product, qty: quantity(i.qty + quantity(qty)) }
              : i,
          )
        : [...prev, { product, qty: quantity(qty) }],
    );
  };
  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  const saveForLater = (id: string) => {
    const item = items.find((i) => i.product.id === id);
    if (item) {
      setSaved((prev) => [item.product, ...prev.filter((p) => p.id !== id)]);
      remove(id);
    }
  };
  const moveToCart = (id: string, qty = 1) => {
    const p = saved.find((p) => p.id === id);
    if (p) {
      add(p, qty);
      setSaved((prev) => prev.filter((p) => p.id !== id));
    }
  };
  return (
    <CartContext.Provider
      value={{
        items,
        saved,
        add,
        remove,
        updateQty: (id, qty) =>
          setItems((prev) =>
            prev.map((i) =>
              i.product.id === id ? { ...i, qty: quantity(qty) } : i,
            ),
          ),
        clear: () => setItems([]),
        saveForLater,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw Error("Cart provider missing");
  return value;
}
