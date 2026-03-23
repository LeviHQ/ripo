import { IndianRupee, ShoppingBag, TrendingUp, BarChart3, ArrowUpRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { orders } = useApp();

  const today = new Date();
  const todayOrders = orders.filter((o) => new Date(o.timestamp).toDateString() === today.toDateString());
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const avgOrder = todayOrders.length > 0 ? Math.round(todayRevenue / todayOrders.length) : 0;

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayOrders = orders.filter((o) => new Date(o.timestamp).toDateString() === d.toDateString());
    return {
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      revenue: dayOrders.reduce((s, o) => s + o.total, 0),
      orders: dayOrders.length,
    };
  });

  const itemCounts: Record<string, { name: string; count: number; revenue: number }> = {};
  orders.forEach((o) =>
    o.items.forEach((item) => {
      if (!itemCounts[item.id]) itemCounts[item.id] = { name: item.name, count: 0, revenue: 0 };
      itemCounts[item.id].count += item.quantity;
      itemCounts[item.id].revenue += item.price * item.quantity;
    })
  );
  const topItems = Object.values(itemCounts).sort((a, b) => b.count - a.count).slice(0, 5);

  const stats = [
    { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, change: "+12%", color: "text-vyellow" },
    { label: "Orders Today", value: todayOrders.length.toString(), icon: ShoppingBag, change: "+8%", color: "text-vblue" },
    { label: "Avg Order Value", value: `₹${avgOrder}`, icon: TrendingUp, change: "+5%", color: "text-vgreen" },
    { label: "Total Orders", value: orders.length.toString(), icon: BarChart3, change: "", color: "text-vorange" },
  ];

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "0.75rem",
    fontSize: 13,
    color: "hsl(var(--foreground))",
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          {today.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-5 hover:border-border/80 transition-all animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</p>
            {stat.change && (
              <span className="text-xs text-vgreen flex items-center gap-0.5 mt-1 font-medium">
                <ArrowUpRight size={12} />
                {stat.change} from yesterday
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
          <h3 className="font-semibold text-foreground mb-4">Revenue Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`₹${value}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
          <h3 className="font-semibold text-foreground mb-4">Top Selling Items</h3>
          <div className="space-y-3">
            {topItems.map((item, i) => {
              const colors = ["text-vyellow", "text-vblue", "text-vgreen", "text-vorange", "text-vred"];
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full bg-secondary ${colors[i]} text-xs font-bold flex items-center justify-center flex-shrink-0`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.count} sold</p>
                  </div>
                  <span className="text-sm font-bold text-foreground tabular-nums">₹{item.revenue}</span>
                </div>
              );
            })}
            {topItems.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No sales data yet</p>}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border border-border p-5 animate-fade-in" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
        <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No orders yet. Start billing from the POS screen!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Customer</th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Items</th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Total</th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Payment</th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Time</th>
                  <th className="text-left py-2.5 px-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{order.id}</td>
                    <td className="py-2.5 px-3">{order.items.length} items</td>
                    <td className="py-2.5 px-3 font-bold text-vyellow tabular-nums">₹{order.total}</td>
                    <td className="py-2.5 px-3 capitalize">{order.paymentMethod}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {new Date(order.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.status === "completed" ? "bg-vgreen/15 text-vgreen" : "bg-vyellow/15 text-vyellow"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
