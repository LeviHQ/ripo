import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, UtensilsCrossed, ClipboardList, BarChart3, ChevronLeft, ChevronRight, Flame, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const allNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", adminOnly: true },
  { icon: ShoppingCart, label: "Billing / POS", path: "/pos", adminOnly: false },
  { icon: UtensilsCrossed, label: "Menu", path: "/menu", adminOnly: true },
  { icon: ClipboardList, label: "Orders", path: "/orders", adminOnly: false },
  { icon: BarChart3, label: "Reports", path: "/reports", adminOnly: true },
];

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { role, logout, isAdmin, username } = useAuth();

  if (!role) return <Navigate to="/login" replace />;

  const navItems = allNavItems.filter((item) => isAdmin || !item.adminOnly);

  const handleLogout = () => {
    logout();
  };

  const sidebarContent = (
    <>
      <div className="h-16 flex items-center gap-2.5 px-4 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <Flame size={20} className="text-primary-foreground" />
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="animate-fade-in">
            <h1 className="text-base font-bold text-foreground tracking-tight">RIPO</h1>
            <p className="text-[10px] text-sidebar-foreground leading-none capitalize">{username} · {role}</p>
          </div>
        )}
        {mobileOpen && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive
                  ? "bg-primary/15 text-primary font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {(!collapsed || mobileOpen) && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-2">
        <Link
          to="/login"
          onClick={() => { handleLogout(); setMobileOpen(false); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-vred transition-all"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {(!collapsed || mobileOpen) && <span className="text-sm">Logout</span>}
        </Link>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex h-12 items-center justify-center border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 z-40 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Flame size={16} className="text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">RIPO</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar flex flex-col animate-fade-in z-10">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={`${collapsed ? "w-[68px]" : "w-60"} bg-sidebar hidden lg:flex flex-col transition-all duration-300 ease-out flex-shrink-0 border-r border-sidebar-border`}>
        {sidebarContent}
      </aside>

      <main className="flex-1 overflow-auto bg-background pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;