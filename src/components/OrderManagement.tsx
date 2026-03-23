import { useState } from "react";
import { Search, Eye, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const OrderManagement = () => {
  const { orders } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selected = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="p-6 space-y-5">
      <h1 className="text-2xl font-bold text-foreground">Order Management</h1>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" placeholder="Search order ID..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none text-sm" />
        </div>
        <div className="flex gap-2">
          {["all", "completed", "pending", "cancelled"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-sm font-medium capitalize transition-all active:scale-[0.97]
                ${statusFilter === s ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-card border border-border text-muted-foreground hover:bg-secondary"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Order ID</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Items</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Total</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Payment</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Time</th>
                <th className="text-right py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}
                  className={`border-t border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer ${selectedOrderId === order.id ? "bg-primary/5" : ""}`}
                  onClick={() => setSelectedOrderId(order.id)}>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{order.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{order.customerName}</td>
                  <td className="py-3 px-4">{order.items.length}</td>
                  <td className="py-3 px-4 font-bold text-vyellow tabular-nums">₹{order.total}</td>
                  <td className="py-3 px-4 capitalize text-xs">{order.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${order.status === "completed" ? "bg-vgreen/15 text-vgreen" : order.status === "pending" ? "bg-vyellow/15 text-vyellow" : "bg-vred/15 text-vred"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{new Date(order.timestamp).toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-muted-foreground text-sm">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="w-80 bg-card rounded-xl border border-border p-5 space-y-4 animate-slide-in-right flex-shrink-0 self-start">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-sm">Order {selected.id}</h3>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Customer</span>
              <span className="font-medium text-foreground">{selected.customerName}</span>
              <button onClick={() => setSelectedOrderId(null)} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"><X size={14} /></button>
            </div>
            <div className="space-y-2">
              {selected.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name} ×{item.quantity}</span>
                  <span className="font-medium tabular-nums">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">₹{selected.subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GST</span><span className="tabular-nums">₹{selected.tax}</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border"><span>Total</span><span className="text-vyellow tabular-nums">₹{selected.total}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
