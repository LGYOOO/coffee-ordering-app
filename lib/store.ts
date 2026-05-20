import { create } from 'zustand';
import { User, Store, Product, CartItem, Order } from './types';
import { mockUser, mockStores, mockProducts } from './mock';

interface AppState {
  user: User | null;
  cart: CartItem[];
  currentStore: Store;
  orders: Order[];
  products: Product[];
  selectedCouponId: string | null;
  isCartOpen: boolean;
  
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCurrentStore: (store: Store) => void;
  addOrder: (order: Order) => void;
  setSelectedCoupon: (couponId: string | null) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  cart: [],
  currentStore: mockStores[0],
  orders: [
    {
      id: '1',
      userId: '1',
      storeId: '2',
      status: 'ready',
      pickupCode: 'B-042',
      createdAt: new Date(),
      total: 61,
      items: [],
      storeName: '极速咖啡-金融街店',
    },
  ],
  products: mockProducts,
  selectedCouponId: null,
  isCartOpen: false,

  setUser: (user) => set({ user }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  updateCartItem: (id, updates) => set((state) => ({
    cart: state.cart.map((item) => item.id === id ? { ...item, ...updates } : item),
  })),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),
  clearCart: () => set({ cart: [] }),
  setCurrentStore: (store) => set({ currentStore: store }),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  setSelectedCoupon: (couponId) => set({ selectedCouponId: couponId }),
  setIsCartOpen: (open) => set({ isCartOpen: open }),
}));
