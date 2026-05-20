'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Clock, MapPin, Plus, Minus, Ticket, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { cart, currentStore, updateCartItem, removeFromCart, clearCart } = useAppStore();
  const [selectedTime, setSelectedTime] = useState('现在');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = 12;
  const total = Math.max(0, subtotal - discount);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
            <div className="w-12 h-12 text-gray-300">☕</div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">购物车是空的</h2>
          <p className="text-gray-500 text-center mb-8">去挑选一杯心仪的咖啡吧</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg"
          >
            去选购
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-40">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <header className="px-4 pt-8 pb-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">待点清单</h1>
          <button onClick={() => clearCart()} className="text-sm text-gray-500">
            清空
          </button>
        </header>

        <div className="px-4 mb-4">
          <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-900">预计取餐时间</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-medium text-sm">{selectedTime} · 09:45 左右可取</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">高峰期</span>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{currentStore.name}</p>
              <p className="text-sm text-gray-500">{currentStore.address}</p>
            </div>
            <button className="text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">所选商品 ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
            <button className="text-gray-400 text-sm">清空购物车</button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">大杯</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">少糖</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">少冰</span>
                    </div>
                    <div className="flex items-center justify-between">
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
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItem(item.id, { quantity: item.quantity + 1 })}
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-blue-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mb-4">
          <button className="w-full bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-red-500" />
              <span className="font-medium text-gray-900">可用优惠券</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-medium">已选 -¥{discount}</span>
              <span className="text-gray-400">›</span>
            </div>
          </button>
        </div>

        <div className="px-4 mb-4">
          <button className="w-full bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
            <span className="text-gray-900 font-medium">订单备注</span>
            <span className="text-gray-400 text-sm">无要求 ›</span>
          </button>
        </div>

        <div className="px-4 mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">商品小计</span>
            <span className="text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">优惠立减</span>
            <span className="text-red-500">-¥{discount}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">合计金额</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="px-4 mb-4">
          <p className="text-xs text-gray-400 text-center">
            请确认门店无误，下单后不支持跨店取餐
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(total)}</p>
            <p className="text-xs text-gray-400">已优惠 ¥{discount} · 共 {cart.reduce((s, i) => s + i.quantity, 0)} 件</p>
          </div>
          <button
            onClick={() => router.push('/payment')}
            className="flex-1 bg-primary hover:bg-blue-600 text-white rounded-2xl py-4 font-bold text-lg active:scale-98 transition-transform"
          >
            去结算
          </button>
        </div>
      </div>
    </div>
  );
}
