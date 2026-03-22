import { useApp } from "@/contexts/AppContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["hsl(45,95%,55%)", "hsl(210,90%,55%)", "hsl(150,70%,45%)", "hsl(0,72%,55%)", "hsl(25,90%,55%)"];

const Reports = () => {
  const { orders } = useApp();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const dayOrders = orders.filter((o) => new Date(o.timestamp).toDateString() === d.toDateString());
    return {
      label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
      revenue: dayOrders.reduce((s, o) => s + o.total, 0),
      orders: dayOrders.length,
    };
  });

  const itemMap: Record<string, { name: string; count: number; revenue: number }> = {};
  orders.forEach((o) => o.items.forEach((item) => {
    if (!itemMap[item.id]) itemMap[item.id] = { name: item.name, count: 0, revenue: 0 };
    itemMap[item.id].count += item.quantity;
    itemMap[item.id].revenue += item.price * item.quantity;
  }));
  const topItems = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const paymentData = (["cash", "upi", "card"] as const).map((method) => ({
    name: method.charAt(0).toUpperCase() + method.slice(1),
    value: orders.filter((o) => o.paymentMethod === method).length,
  }));

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "0.75rem",
    fontSize: 13,
    color: "hsl(var(--foreground))",
  };

  const statColors = ["text-vyellow", "text-vblue", "text-vorange"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}` },
          { label: "Total Orders", value: totalOrders.toString() },
          { label: "Avg Order Value", value: `₹${avgOrder}` },
        ].map((stat, i) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5 text-center">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 tabular-nums ${statColors[i]}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Top Selling Items</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topItems} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={paymentData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {paymentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Orders per Day</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="orders" fill="hsl(150,70%,45%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
