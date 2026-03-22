import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Lock, Eye, EyeOff, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter username and password");
      return;
    }
    const success = login(username, password);
    if (success) {
      toast.success(`Welcome back, ${username}!`);
      const role = username.toLowerCase() === "admin" ? "admin" : "cashier";
      navigate(role === "admin" ? "/dashboard" : "/pos");
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleQuickFill = (role: "admin" | "cashier") => {
    setUsername(role);
    setPassword(role === "admin" ? "admin123" : "cashier123");
    toast.info(`Credentials filled for ${role}. Click Login to continue.`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Flame size={22} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">RIPO</span>
        </div>

        <h1 className="text-3xl font-black text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground text-sm mb-8">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-primary-foreground bg-gradient-to-r from-[hsl(var(--color-red))] to-[hsl(var(--color-orange))] hover:opacity-90 transition-opacity active:scale-[0.98] shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-3">Quick Fill Credentials</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickFill("admin")}
              className="py-3 rounded-xl bg-secondary border border-border text-foreground font-semibold text-sm hover:bg-secondary/80 transition-all active:scale-[0.97]"
            >
              Admin Demo
            </button>
            <button
              onClick={() => handleQuickFill("cashier")}
              className="py-3 rounded-xl bg-secondary border border-border text-foreground font-semibold text-sm hover:bg-secondary/80 transition-all active:scale-[0.97]"
            >
              Cashier Demo
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">Click a button above to fill credentials, then click Login</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
