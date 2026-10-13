export type Category = 'All' | 'Exotic' | 'Tropical' | 'Berries' | 'Citrus' | 'Organic Baskets' | 'Seasonal';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit: string; // e.g. "kg", "pack", "bunch", "basket"
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string; // e.g. "Best Seller", "Organic", "New Harvest"
  description: string;
  origin: string;
  nutrition: {
    calories: string;
    vitamins: string[];
    fiber: string;
    sugar: string;
  };
  inStock: boolean;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Order Placed' | 'Harvesting' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: {
    fullName: string;
    address: string;
    city: string;
    phone: string;
    notes?: string;
  };
  deliverySlot: string;
}
