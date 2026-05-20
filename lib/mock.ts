import { Product, Store, User, Coupon } from './types';

export const mockUser: User = {
  id: '1',
  name: '咖啡爱好者',
  phone: '138****8888',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  points: 500,
};

export const mockStores: Store[] = [
  {
    id: '1',
    name: '静安嘉里中心店',
    address: '上海市静安区南京西路1515号',
    distance: 280,
  },
  {
    id: '2',
    name: '陆家嘴金融中心店',
    address: '上海市浦东新区陆家嘴环路1000号',
    distance: 150,
  },
  {
    id: '3',
    name: '中关村壹号店',
    address: '北京市海淀区北清路81号',
    distance: 500,
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '生椰拿铁',
    description: '椰香浓郁，清甜不腻',
    price: 22,
    image: 'https://images.unsplash.com/photo-1572442388796-12a543988262?w=300&h=300&fit=crop',
    category: '推荐',
  },
  {
    id: '2',
    name: '燕麦澳白',
    description: '低脂健康，口感丝滑',
    price: 26,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop',
    category: '推荐',
  },
  {
    id: '3',
    name: '经典美式',
    description: '经典口味，醇香浓郁',
    price: 18,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    category: '经典',
  },
  {
    id: '4',
    name: '香草拿铁',
    description: '香草风味，甜蜜享受',
    price: 24,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47264a9?w=300&h=300&fit=crop',
    category: '风味',
  },
  {
    id: '5',
    name: '冰摩卡',
    description: '巧克力与咖啡的完美融合',
    price: 28,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop',
    category: '风味',
  },
];

export const mockCoupons: Coupon[] = [
  {
    id: '1',
    name: '新用户专享',
    discount: 12,
    minAmount: 30,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: '满减优惠',
    discount: 10,
    minAmount: 50,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
];
