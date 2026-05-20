export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  points: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distance: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: 'small' | 'medium' | 'large';
  sugar: 'none' | 'less' | 'normal' | 'more';
  ice: 'none' | 'less' | 'normal' | 'more';
}

export interface Order {
  id: string;
  userId: string;
  storeId: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  pickupCode: string;
  createdAt: Date;
  total: number;
  items: CartItem[];
  storeName: string;
}

export interface Coupon {
  id: string;
  name: string;
  discount: number;
  minAmount: number;
  expiresAt: Date;
}
