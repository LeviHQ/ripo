import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem, CartItem, Order, menuItems as allMenuItems } from "@/data/menuData";

interface AppContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateDummyOrders = (): Order[] => {
  const orders: Order[] = [];
  const now = new Date();

  for (let i = 0; i < 28; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - Math.floor(Math.random() * 7));
    d.setHours(9 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));

    const numItems = 1 + Math.floor(Math.random() * 4);
    const items: CartItem[] = [];
    const usedIds = new Set<number>();
    for (let j = 0; j < numItems; j++) {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * allMenuItems.length);
      } while (usedIds.has(idx));
      usedIds.add(idx);
      items.push({ ...allMenuItems[idx], quantity: 1 + Math.floor(Math.random() * 3) });
    }

    const subtotal = items.reduce((s, item) => s + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    orders.push({
      id: `ORD-${(1000 + i).toString()}`,
      items,
      subtotal,
      tax,
      discount: 0,
      total,
      paymentMethod: (["cash", "upi", "card"] as const)[Math.floor(Math.random() * 3)],
      status: Math.random() > 0.15 ? "completed" : "pending",
      timestamp: d,
    });
  }

  return orders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(generateDummyOrders);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => setCart((prev) => prev.filter((i) => i.id !== itemId));

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(itemId);
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);
  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);

  return (
    <AppContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateQuantity, clearCart, addOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
