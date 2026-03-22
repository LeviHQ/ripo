import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame, Eye, EyeOff, ShieldCheck, Users } from "lucide-react";

interface AuthPageProps {
  mode: "login" | "signup";
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"admin" | "staff">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: just navigate to dashboard
    navigate("/dashboard");
  };

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-card" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Flame size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">RIPO</h1>
              <p className="text-xs text-muted-foreground">Fast Food Billing System</p>
            </div>
          </div>

          <h2 className="text-4xl font-black text-foreground leading-tight mb-4">
            Bill in <span className="text-gradient-yellow">Seconds</span>,
            <br />Not Minutes.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            The fastest POS system built specifically for Indian fast food restaurants,
            street food stalls, and quick-service joints.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { img: "/food/vada-pav.jpg", name: "Vada Pav" },
              { img: "/food/pizza.jpg", name: "Pizza" },
              { img: "/food/samosa.jpg", name: "Samosa" },
              { img: "/food/masala-chai.jpg", name: "Chai" },
            ].map((item, i) => (
              <div
                key={item.name}
                className="bg-secondary/50 rounded-xl p-2 flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${400 + i * 100}ms`, animationFillMode: "backwards" }}
              >
                <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Flame size={20} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">RIPO</span>
          </div>

          <h2 className="text-2xl font-black text-foreground mb-1">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            {isLogin ? "Login to your RIPO dashboard" : "Get started with RIPO for your restaurant"}
          </p>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 block">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-[0.97]
                  ${role === "admin"
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-secondary border-border text-muted-foreground hover:border-muted-foreground/30"
                  }`}
              >
                <ShieldCheck size={22} />
                <div className="text-left">
                  <p className="text-sm font-bold">Admin</p>
                  <p className="text-[11px] opacity-70">Full access</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole("staff")}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-[0.97]
                  ${role === "staff"
                    ? "bg-accent/10 border-accent text-accent"
                    : "bg-secondary border-border text-muted-foreground hover:border-muted-foreground/30"
                  }`}
              >
                <Users size={22} />
                <div className="text-left">
                  <p className="text-sm font-bold">Staff</p>
                  <p className="text-[11px] opacity-70">Billing only</p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rajesh Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@restaurant.com"
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="text-primary font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
