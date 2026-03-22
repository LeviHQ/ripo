import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { menuItems, categories } from "@/data/menuData";

const MenuManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = menuItems.filter((item) => {
    const catMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
          <p className="text-sm text-muted-foreground">{menuItems.length} items across {categories.length - 1} categories</p>
        </div>
        <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.97]">
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none transition-all text-sm" />
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:ring-2 focus:ring-primary/30 outline-none">
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Item</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Category</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Price</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Type</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{item.category}</td>
                <td className="py-3 px-4 font-bold text-vyellow tabular-nums">₹{item.price}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.isVeg ? "bg-vgreen/15 text-vgreen" : "bg-vred/15 text-vred"}`}>
                    {item.isVeg ? "Veg" : "Non-Veg"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Pencil size={15} /></button>
                  <button className="p-1.5 rounded-lg hover:bg-vred/10 transition-colors text-muted-foreground hover:text-vred ml-1"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManagement;
