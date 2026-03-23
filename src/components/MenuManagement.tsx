import { useState } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { categories } from "@/data/menuData";
import { useApp } from "@/contexts/AppContext";
import { toast } from "sonner";

interface MenuFormData {
  name: string;
  price: string;
  category: string;
  isVeg: boolean;
  image: string;
}

const emptyForm: MenuFormData = { name: "", price: "", category: "Street Food Specials", isVeg: true, image: "/food/samosa.jpg" };

const foodImages = [
  "/food/vada-pav.jpg", "/food/pav-bhaji.jpg", "/food/pani-puri.jpg", "/food/samosa.jpg",
  "/food/veg-burger.jpg", "/food/pizza.jpg", "/food/masala-dosa.jpg", "/food/paneer-roll.jpg",
  "/food/masala-chai.jpg", "/food/cold-coffee.jpg", "/food/lassi.jpg", "/food/combo-meal.jpg",
];

const MenuManagement = () => {
  const { menuItemsList, addMenuItem, updateMenuItem, deleteMenuItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = menuItemsList.filter((item) => {
    const catMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: typeof menuItemsList[0]) => {
    setEditingId(item.id);
    setForm({ name: item.name, price: String(item.price), category: item.category, isVeg: item.isVeg, image: item.image });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price.trim() || Number(form.price) <= 0) {
      toast.error("Please fill in all fields correctly");
      return;
    }
    if (editingId) {
      updateMenuItem(editingId, { name: form.name, price: Number(form.price), category: form.category, isVeg: form.isVeg, image: form.image });
      toast.success(`"${form.name}" updated`);
    } else {
      addMenuItem({ name: form.name, price: Number(form.price), category: form.category, isVeg: form.isVeg, image: form.image });
      toast.success(`"${form.name}" added to menu`);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    deleteMenuItem(id);
    setDeleteConfirm(null);
    toast.success(`"${name}" removed from menu`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Menu Management</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">{menuItemsList.length} items across {categories.length - 1} categories</p>
        </div>
        <button onClick={openAdd} className="px-3 sm:px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.97] flex-shrink-0">
          <Plus size={18} /> <span className="hidden sm:inline">Add Item</span>
        </button>
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[150px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none transition-all text-sm" />
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 sm:px-4 py-2.5 rounded-xl bg-card border border-border text-xs sm:text-sm text-foreground focus:ring-2 focus:ring-primary/30 outline-none">
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Mobile card view */}
      <div className="block lg:hidden space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="bg-card rounded-xl border border-border p-3 flex items-center gap-3">
            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-vyellow text-sm tabular-nums">₹{item.price}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${item.isVeg ? "bg-vgreen/15 text-vgreen" : "bg-vred/15 text-vred"}`}>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {deleteConfirm === item.id ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleDelete(item.id, item.name)} className="px-2 py-1 rounded-lg bg-vred/20 text-vred text-xs font-medium">Yes</button>
                  <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 rounded-lg bg-secondary text-muted-foreground text-xs font-medium">No</button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-lg hover:bg-vred/10 text-muted-foreground hover:text-vred"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden">
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
                  {deleteConfirm === item.id ? (
                    <div className="inline-flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Delete?</span>
                      <button onClick={() => handleDelete(item.id, item.name)} className="px-2 py-1 rounded-lg bg-vred/20 text-vred text-xs font-medium hover:bg-vred/30 transition-colors">Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 rounded-lg bg-secondary text-muted-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">No</button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-lg hover:bg-vred/10 transition-colors text-muted-foreground hover:text-vred ml-1"><Trash2 size={15} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md max-h-[90vh] overflow-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-foreground">{editingId ? "Edit Item" : "Add New Item"}</h2>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors text-muted-foreground"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Item Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Paneer Tikka"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none transition-all text-sm" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Price (₹)</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="99"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none transition-all text-sm tabular-nums" min={1} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary/30 outline-none text-sm">
                      {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Type</label>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setForm({ ...form, isVeg: true })}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.isVeg ? "bg-vgreen/15 border-vgreen text-vgreen" : "bg-secondary border-border text-muted-foreground"}`}>
                      Veg
                    </button>
                    <button type="button" onClick={() => setForm({ ...form, isVeg: false })}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${!form.isVeg ? "bg-vred/15 border-vred text-vred" : "bg-secondary border-border text-muted-foreground"}`}>
                      Non-Veg
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1.5 block">Image</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {foodImages.map((img) => (
                      <button key={img} type="button" onClick={() => setForm({ ...form, image: img })}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${form.image === img ? "border-primary" : "border-transparent hover:border-border"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={handleSave}
                className="w-full mt-5 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
                {editingId ? "Save Changes" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;