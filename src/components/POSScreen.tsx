import { useState } from "react";
import { Search, Plus, Minus, Trash2, Receipt, CreditCard, Smartphone, Banknote } from "lucide-react";
import { categories } from "@/data/menuData";
import { useApp } from "@/contexts/AppContext";
import { InvoiceModal } from "./InvoiceModal";
import type { Order } from "@/data/menuData";

const POSScreen = () => {
  const { cart, addToCart, updateQuantity, clearCart, addOrder, menuItemsList } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "card">("cash");
  const [discount, setDiscount] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [customerName, setCustomerName] = useState("");

  const filtered = menuItemsList.filter((item) => {
    const catMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const gstAmount = Math.round(subtotal * 0.05);
  const discountAmount = Math.round((subtotal * discount) / 100);
  const total = subtotal + gstAmount - discountAmount;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      customerName: customerName.trim() || "Walk-in Customer",
      items: [...cart],
      subtotal,
      tax: gstAmount,
      discount: discountAmount,
      total,
      paymentMethod,
      status: "completed",
      timestamp: new Date(),
    };
    addOrder(order);
    setLastOrder(order);
    setShowInvoice(true);
    clearCart();
    setDiscount(0);
  };

  const paymentMethods = [
    { key: "cash" as const, icon: Banknote, label: "Cash" },
    { key: "upi" as const, icon: Smartphone, label: "UPI" },
    { key: "card" as const, icon: CreditCard, label: "Card" },
  ];

  return (
    <div className="flex h-screen">
      {/* Left: Menu Items */}
      <div className="flex-1 flex flex-col p-5 overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-xl font-bold text-foreground whitespace-nowrap">Billing</h1>
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-[0.97]
                ${selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 content-start pr-1">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              className="bg-card rounded-xl border border-border p-3 text-left hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 active:scale-[0.97] group animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 30, 300)}ms`, animationFillMode: "backwards" }}
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-2.5 bg-secondary">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground leading-tight truncate">{item.name}</p>
                  <p className="text-vyellow font-bold text-sm mt-1">₹{item.price}</p>
                </div>
                <span className={`w-3.5 h-3.5 rounded-sm border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${item.isVeg ? "border-vgreen" : "border-vred"}`}>
                  <span className={`block w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-vgreen" : "bg-vred"}`} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Cart Panel */}
      <div className="w-[380px] bg-card border-l border-border flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center justify-between px-5 border-b border-border">
          <div>
            <h2 className="font-bold text-foreground">Current Order</h2>
            <p className="text-xs text-muted-foreground">
              {cart.length} item{cart.length !== 1 ? "s" : ""} · {cart.reduce((s, i) => s + i.quantity, 0)} qty
            </p>
          </div>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-xs text-vred hover:underline font-medium">Clear</button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Receipt size={48} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium text-sm">No items yet</p>
              <p className="text-xs mt-1">Tap on menu items to add them here</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-secondary rounded-xl p-3 animate-scale-in">
                <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center hover:bg-vred/20 hover:border-vred/30 hover:text-vred transition-colors active:scale-95"
                  >
                    {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                  </button>
                  <span className="text-sm font-bold w-5 text-center tabular-nums">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <p className="text-sm font-bold text-vyellow w-14 text-right tabular-nums">₹{item.price * item.quantity}</p>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 bg-card">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground">Discount %</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-border text-center bg-background text-foreground tabular-nums"
                min={0} max={100}
              />
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">₹{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST (5%)</span><span className="tabular-nums">₹{gstAmount}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-vgreen"><span>Discount ({discount}%)</span><span className="tabular-nums">-₹{discountAmount}</span></div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-vyellow tabular-nums">₹{total}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.key}
                  onClick={() => setPaymentMethod(pm.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97]
                    ${paymentMethod === pm.key
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  <pm.icon size={16} />
                  {pm.label}
                </button>
              ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              Place Order — ₹{total}
            </button>
          </div>
        )}
      </div>

      {showInvoice && lastOrder && <InvoiceModal order={lastOrder} onClose={() => setShowInvoice(false)} />}
    </div>
  );
};

export default POSScreen;
