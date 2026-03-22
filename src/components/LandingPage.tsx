import { Link } from "react-router-dom";
import {
  Flame, ShoppingCart, BarChart3, Users, Zap, Shield, ChevronRight,
  UtensilsCrossed, Smartphone, CreditCard, ArrowRight, Star
} from "lucide-react";

const features = [
  { icon: ShoppingCart, title: "Lightning-Fast Billing", desc: "Add items with one tap, calculate GST automatically, checkout in seconds.", color: "text-vyellow" },
  { icon: BarChart3, title: "Real-Time Analytics", desc: "Track revenue, top items, and trends with live dashboards and charts.", color: "text-vblue" },
  { icon: UtensilsCrossed, title: "Menu Management", desc: "Add, edit, and organize your entire menu with categories and images.", color: "text-vorange" },
  { icon: Users, title: "Role-Based Access", desc: "Separate Admin and Staff roles with controlled permissions.", color: "text-vgreen" },
  { icon: Smartphone, title: "Multi-Payment Support", desc: "Accept Cash, UPI, and Card payments seamlessly.", color: "text-vyellow" },
  { icon: Shield, title: "Secure & Reliable", desc: "Built for production with data integrity and session management.", color: "text-vred" },
];

const stats = [
  { value: "50K+", label: "Orders Processed", color: "text-vyellow" },
  { value: "500+", label: "Restaurants", color: "text-vblue" },
  { value: "99.8%", label: "Uptime", color: "text-vgreen" },
  { value: "< 2s", label: "Avg Billing Time", color: "text-vorange" },
];

const testimonials = [
  { name: "Rajesh Sharma", role: "Owner, Sharma's Chaat Corner", text: "RIPO transformed how we handle billing. What used to take 2 minutes per order now takes 10 seconds!", stars: 5 },
  { name: "Priya Nair", role: "Manager, Dosa Express", text: "The analytics dashboard helps me understand which items are selling best. Revenue is up 30% since we started.", stars: 5 },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Flame size={20} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">RIPO</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-opacity active:scale-[0.97]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Zap size={14} /> Built for Indian Fast Food Restaurants
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 animate-fade-in"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <span className="text-foreground">Bill Faster.</span>
            <br />
            <span className="text-gradient-yellow">Sell Smarter.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: "350ms", animationFillMode: "backwards" }}
          >
            RIPO is a blazing-fast POS billing system designed for Indian street food stalls, 
            fast food joints, and restaurants. Go from order to invoice in under 2 seconds.
          </p>

          <div
            className="flex items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "500ms", animationFillMode: "backwards" }}
          >
            <Link
              to="/signup"
              className="px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link
              to="/pos"
              className="px-8 py-3.5 bg-secondary text-secondary-foreground rounded-xl font-bold text-base hover:bg-secondary/80 transition-all active:scale-[0.97] border border-border"
            >
              Live Demo
            </Link>
          </div>

          {/* Hero Image - POS Preview */}
          <div
            className="mt-16 max-w-5xl mx-auto rounded-2xl border border-border overflow-hidden shadow-2xl glow-yellow animate-fade-in"
            style={{ animationDelay: "650ms", animationFillMode: "backwards" }}
          >
            <div className="bg-card p-1">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-vred" />
                <div className="w-3 h-3 rounded-full bg-vyellow" />
                <div className="w-3 h-3 rounded-full bg-vgreen" />
                <span className="ml-3 text-xs text-muted-foreground">RIPO — Billing / POS</span>
              </div>
              <div className="grid grid-cols-4 gap-3 p-4">
                {[
                  { name: "Vada Pav", price: "₹30", img: "/food/vada-pav.jpg" },
                  { name: "Samosa", price: "₹20", img: "/food/samosa.jpg" },
                  { name: "Veg Burger", price: "₹80", img: "/food/veg-burger.jpg" },
                  { name: "Masala Chai", price: "₹20", img: "/food/masala-chai.jpg" },
                ].map((item) => (
                  <div key={item.name} className="bg-secondary rounded-xl p-2.5">
                    <img src={item.img} alt={item.name} className="w-full aspect-square rounded-lg object-cover mb-2" />
                    <p className="text-xs font-medium text-foreground">{item.name}</p>
                    <p className="text-xs font-bold text-primary">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-6 border-y border-border/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "backwards" }}
            >
              <p className={`text-4xl font-black ${stat.color} tabular-nums`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
              Everything You Need to <span className="text-gradient-yellow">Run Your Restaurant</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From billing to analytics, RIPO covers every aspect of your fast food business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
              >
                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 ${feat.color} group-hover:scale-110 transition-transform`}>
                  <feat.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-foreground text-center mb-12">
            Loved by <span className="text-gradient-blue">Restaurant Owners</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-2xl p-6 animate-fade-in"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: "backwards" }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={16} className="text-vyellow fill-vyellow" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Ready to Speed Up Your Billing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join hundreds of Indian restaurants already using RIPO to bill faster and grow smarter.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25"
          >
            Get Started Free <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Flame size={14} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">RIPO</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 RIPO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
