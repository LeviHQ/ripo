import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem, CartItem, Order, menuItems as defaultMenuItems } from "@/data/menuData";

interface AppContextType {
  cart: CartItem[];
  orders: Order[];
  menuItemsList: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, data: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateDummyOrders = (items: MenuItem[]): Order[] => {
  const orders: Order[] = [];
  const now = new Date();
  for (let i = 0; i < 28; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - Math.floor(Math.random() * 7));
    d.setHours(9 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));
    const numItems = 1 + Math.floor(Math.random() * 4);
    const cartItems: CartItem[] = [];
    const usedIds = new Set<number>();
    for (let j = 0; j < numItems; j++) {
      let idx: number;
      do { idx = Math.floor(Math.random() * items.length); } while (usedIds.has(idx));
      usedIds.add(idx);
      cartItems.push({ ...items[idx], quantity: 1 + Math.floor(Math.random() * 3) });
    }
    const subtotal = cartItems.reduce((s, item) => s + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.05);
    orders.push({
      id: `ORD-${(1000 + i).toString()}`,
      items: cartItems, subtotal, tax, discount: 0, total: subtotal + tax,
      paymentMethod: (["cash", "upi", "card"] as const)[Math.floor(Math.random() * 3)],
      status: Math.random() > 0.15 ? "completed" : "pending",
      timestamp: d,
    });
  }
  return orders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>(defaultMenuItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => generateDummyOrders(defaultMenuItems));

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

  const addMenuItem = (data: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = { ...data, id: `item-${Date.now()}` };
    setMenuItemsList((prev) => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, data: Partial<MenuItem>) => {
    setMenuItemsList((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItemsList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider value={{ cart, orders, menuItemsList, addToCart, removeFromCart, updateQuantity, clearCart, addOrder, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
