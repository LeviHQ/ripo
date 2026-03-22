import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, UtensilsCrossed, ClipboardList, BarChart3, ChevronLeft, ChevronRight, Flame, LogOut } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ShoppingCart, label: "Billing / POS", path: "/pos" },
  { icon: UtensilsCrossed, label: "Menu", path: "/menu" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
];

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? "w-[68px]" : "w-60"} bg-sidebar flex flex-col transition-all duration-300 ease-out flex-shrink-0 border-r border-sidebar-border`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Flame size={20} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-base font-bold text-foreground tracking-tight">RIPO</h1>
              <p className="text-[10px] text-sidebar-foreground leading-none">Fast Food POS</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-vred transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </Link>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-12 flex items-center justify-center border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
