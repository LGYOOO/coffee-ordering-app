'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Zap, MessageSquare, CreditCard, Wallet, Check, Clock, MapPin, Navigation, Ticket, Calculator } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice, generateId, generatePickupCode } from '@/lib/utils';

export default function PaymentPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'wechat' | 'alipay' | 'balance'>('wechat');
  const { cart, currentStore, addOrder, clearCart, user } = useAppStore();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = 15;
  const total = Math.max(0, subtotal - discount);

  const handlePay = () => {
    const order = {
      id: generateId(),
      userId: user?.id || '',
      storeId: currentStore.id,
      status: 'ready' as const,
      pickupCode: generatePickupCode(),
      createdAt: new Date(),
      total,
      items: cart,
      storeName: '极速咖啡 (陆家嘴金融中心店)',
    };
    addOrder(order);
    clearCart();
    router.push('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <header className="px-4 pt-8 pb-4 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">支付结账</h1>
        </header>

        <div className="px-4 mb-4">
          <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary font-medium">
                办公极速通道已开启。下单后将为您优先排单，请在预计时间内到达门店。
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">极速咖啡 (陆家嘴金融中心店)</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  上海市浦东新区陆家嘴环路1000号1层
                </p>
              </div>
              <button className="text-primary text-sm font-medium flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                导航
              </button>
            </div>
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">预计取餐时间</span>
              </div>
              <button className="text-primary text-sm font-medium flex items-center gap-1">
                现在下单，预计 10:45 可取
                <span>›</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">订单详情</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">中杯 / 冰 / 无糖</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm">{formatPrice(item.product.price)}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-gray-900">优惠券</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 font-medium">-¥10.00</span>
                <span className="text-gray-400">›</span>
              </div>
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">积分抵扣 (500)</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-12 h-6 bg-gray-200 rounded-full relative">
                  <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 shadow transition-transform" />
                </button>
                <span className="text-gray-400">可抵 ¥5.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">支付方式</h3>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedMethod('wechat')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">微信支付</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'wechat' ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {selectedMethod === 'wechat' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
              <button
                onClick={() => setSelectedMethod('alipay')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">支付宝</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'alipay' ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {selectedMethod === 'alipay' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
              <button
                onClick={() => setSelectedMethod('balance')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-gray-900">账户余额</span>
                    <p className="text-xs text-gray-400">可用 ¥128.50</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === 'balance' ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {selectedMethod === 'balance' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">订单备注</span>
            <button className="text-gray-400 text-sm">无特殊要求 ›</button>
          </div>
        </div>

        <div className="px-4 mb-4 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500">已优惠</span>
            <span className="text-orange-500 font-medium">¥{discount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">合计</span>
            <span className="text-2xl font-bold text-gray-900">¥{total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-400 text-right mt-1">下单预计增加 35 积分</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-md mx-auto p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-900">¥{total.toFixed(2)}</p>
          </div>
          <button
            onClick={handlePay}
            className="flex-1 bg-primary hover:bg-blue-600 text-white rounded-2xl py-4 font-bold text-lg active:scale-98 transition-transform"
          >
            一键支付并预约
          </button>
        </div>
      </div>
    </div>
  );
}
