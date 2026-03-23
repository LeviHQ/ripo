export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "cash" | "upi" | "card";
  status: "completed" | "pending" | "cancelled";
  timestamp: Date;
}

export const categories = [
  "All",
  "Street Food Specials",
  "Snacks & Chaat",
  "Main Fast Food",
  "Beverages",
  "Combos",
];

export const menuItems: MenuItem[] = [
  // Street Food Specials
  { id: "sf1", name: "Vada Pav", price: 30, category: "Street Food Specials", image: "/food/vada-pav.jpg", isVeg: true },
  { id: "sf2", name: "Pav Bhaji", price: 80, category: "Street Food Specials", image: "/food/pav-bhaji.jpg", isVeg: true },
  { id: "sf3", name: "Pani Puri", price: 40, category: "Street Food Specials", image: "/food/pani-puri.jpg", isVeg: true },
  { id: "sf4", name: "Bhel Puri", price: 35, category: "Street Food Specials", image: "/food/pani-puri.jpg", isVeg: true },
  { id: "sf5", name: "Dahi Puri", price: 45, category: "Street Food Specials", image: "/food/pani-puri.jpg", isVeg: true },
  { id: "sf6", name: "Samosa", price: 20, category: "Street Food Specials", image: "/food/samosa.jpg", isVeg: true },

  // Snacks & Chaat
  { id: "sc1", name: "Aloo Tikki", price: 35, category: "Snacks & Chaat", image: "/food/samosa.jpg", isVeg: true },
  { id: "sc2", name: "Ragda Pattice", price: 50, category: "Snacks & Chaat", image: "/food/pav-bhaji.jpg", isVeg: true },
  { id: "sc3", name: "Sev Puri", price: 40, category: "Snacks & Chaat", image: "/food/pani-puri.jpg", isVeg: true },
  { id: "sc4", name: "Papdi Chaat", price: 45, category: "Snacks & Chaat", image: "/food/pani-puri.jpg", isVeg: true },

  // Main Fast Food
  { id: "mf1", name: "Veg Burger", price: 80, category: "Main Fast Food", image: "/food/veg-burger.jpg", isVeg: true },
  { id: "mf2", name: "Cheese Burger", price: 110, category: "Main Fast Food", image: "/food/veg-burger.jpg", isVeg: true },
  { id: "mf3", name: "Veg Pizza", price: 150, category: "Main Fast Food", image: "/food/pizza.jpg", isVeg: true },
  { id: "mf4", name: "Margherita Pizza", price: 180, category: "Main Fast Food", image: "/food/pizza.jpg", isVeg: true },
  { id: "mf5", name: "Masala Dosa", price: 70, category: "Main Fast Food", image: "/food/masala-dosa.jpg", isVeg: true },
  { id: "mf6", name: "Paneer Roll", price: 90, category: "Main Fast Food", image: "/food/paneer-roll.jpg", isVeg: true },
  { id: "mf7", name: "Frankie", price: 75, category: "Main Fast Food", image: "/food/paneer-roll.jpg", isVeg: true },

  // Beverages
  { id: "bv1", name: "Masala Chai", price: 20, category: "Beverages", image: "/food/masala-chai.jpg", isVeg: true },
  { id: "bv2", name: "Cold Coffee", price: 60, category: "Beverages", image: "/food/cold-coffee.jpg", isVeg: true },
  { id: "bv3", name: "Sweet Lassi", price: 50, category: "Beverages", image: "/food/lassi.jpg", isVeg: true },
  { id: "bv4", name: "Salted Lassi", price: 45, category: "Beverages", image: "/food/lassi.jpg", isVeg: true },
  { id: "bv5", name: "Soft Drinks", price: 40, category: "Beverages", image: "/food/cold-coffee.jpg", isVeg: true },
  { id: "bv6", name: "Fresh Lime Soda", price: 35, category: "Beverages", image: "/food/lassi.jpg", isVeg: true },

  // Combos
  { id: "cb1", name: "Burger + Fries + Coke", price: 199, category: "Combos", image: "/food/combo-meal.jpg", isVeg: true },
  { id: "cb2", name: "Pav Bhaji + Drink", price: 120, category: "Combos", image: "/food/pav-bhaji.jpg", isVeg: true },
  { id: "cb3", name: "Pizza + Cold Drink", price: 220, category: "Combos", image: "/food/pizza.jpg", isVeg: true },
];
