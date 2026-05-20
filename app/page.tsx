'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Zap, Plus, Coffee, ShoppingBag } from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAppStore } from '@/lib/store';
import { formatPrice, generateId } from '@/lib/utils';
import { CartItem } from '@/lib/types';

export default function HomePage() {
  const { currentStore, products, user, cart, addToCart, setIsCartOpen } = useAppStore();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleAddToCart = (product: typeof products[0]) => {
    const item: CartItem = {
      id: generateId(),
      product,
      quantity: 1,
      size: 'medium',
      sugar: 'normal',
      ice: 'normal',
    };
    addToCart(item);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1000);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <header className="px-4 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            {user && (
              <div className="relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-primary font-medium">离你最近</p>
                <h2 className="text-lg font-semibold text-gray-900">{currentStore.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  距离 {currentStore.distance}m · 预计 5 分钟后取餐
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Clock className="w-4 h-4" />
                现在取餐
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border border-gray-100 rounded-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                <Clock className="w-4 h-4" />
                预约时间
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/cart" className="bg-primary rounded-2xl p-5 text-white hover:opacity-90 transition-opacity">
              <h3 className="text-2xl font-bold mb-2">现在<br/>下单</h3>
              <p className="text-sm text-primary-100 mb-3">Go For Coffee</p>
              <div className="flex items-center gap-1">
                <Coffee className="w-16 h-16 opacity-20" />
              </div>
              <div className="mt-2 text-sm font-medium">立即出发 →</div>
            </Link>
            <div className="bg-gray-100 rounded-2xl p-5">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">预约<br/>点单</h3>
              <p className="text-sm text-gray-500 mb-3">Save Your Time</p>
              <div className="flex items-center gap-1">
                <Zap className="w-16 h-16 text-gray-300" />
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">灵活选择</div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">今日推荐</h2>
              <span className="bg-blue-100 text-primary text-xs font-medium px-2 py-0.5 rounded-full">NEW</span>
            </div>
            <button className="text-sm text-gray-500 font-medium">查看全部</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-40 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative mb-3">
                  <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    {addedProductId === product.id ? (
                      <span className="text-lg">✓</span>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.description}</p>
                <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">最近订单制作中</p>
              <p className="text-xs text-gray-500">1份 拿铁 (热/标准糖/全脂奶)</p>
            </div>
            <p className="text-sm text-gray-500">预计 3mi</p>
          </div>
        </div>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-primary hover:bg-blue-600 text-white rounded-2xl py-4 px-6 flex items-center justify-between shadow-xl transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">
                    已选 {cartCount} 件
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">
                  {formatPrice(cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0))}
                </p>
                <span className="text-lg">→</span>
              </div>
            </button>
          </div>
        </div>
      )}

      <BottomNav />

      {cartCount > 0 && (
        <CartDrawer />
      )}
    </div>
  );
}

function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartItem, clearCart } = useAppStore();
  
  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">待点清单</h3>
              <button
                onClick={() => clearCart()}
                className="text-sm text-gray-500"
              >
                清空购物车
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">大杯</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">少糖</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">少冰</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-primary">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateCartItem(item.id, { quantity: item.quantity - 1 });
                          } else {
                            removeFromCart(item.id);
                          }
                        }}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}
                        className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">可用优惠券</span>
              <button className="flex items-center gap-1 text-primary font-medium text-sm">
                已选 ¥12
                <span>›</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">订单备注</span>
              <button className="text-gray-400 text-sm">无要求 ›</button>
            </div>
            <div className="pt-2 border-t border-gray-100 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">商品小计</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">优惠立减</span>
                <span className="text-red-500">-¥12</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-gray-900">合计金额</span>
                <span className="text-xl font-bold text-primary">{formatPrice(Math.max(0, total - 12))}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-b-3xl">
            <Link
              href="/payment"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-primary hover:bg-blue-600 text-white rounded-2xl py-4 flex items-center justify-between px-6 transition-colors"
            >
              <div>
                <p className="font-bold text-lg">总计 {formatPrice(Math.max(0, total - 12))}</p>
                <p className="text-xs text-primary-100">已优惠 ¥12 · 共 {cart.reduce((s, i) => s + i.quantity, 0)} 件</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">去结算</span>
                <span>›</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
