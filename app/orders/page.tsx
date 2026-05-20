'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin, Navigation, RefreshCw, Zap } from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const { orders } = useAppStore();

  const activeOrder = orders.find(o => o.status === 'ready');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <header className="px-4 pt-8 pb-4">
          <h1 className="text-xl font-bold text-gray-900 text-center">我的订单</h1>
        </header>

        <div className="flex border-b border-gray-100 mx-4 mb-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'active'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500'
            }`}
          >
            进行中
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500'
            }`}
          >
            历史订单
          </button>
        </div>

        {activeTab === 'active' && activeOrder ? (
          <div className="px-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-gray-900">{activeOrder.storeName}</span>
                </div>
                <span className="text-sm text-primary bg-blue-50 px-3 py-1 rounded-full font-medium">
                  待取餐
                </span>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 text-center mb-4">
                <p className="text-sm text-gray-500 mb-1">取餐码</p>
                <p className="text-5xl font-bold text-primary mb-4">{activeOrder.pickupCode}</p>
                <div className="flex justify-center">
                  <svg className="w-24 h-24" viewBox="0 0 100 100">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <rect
                        key={i}
                        x={(i % 5) * 20}
                        y={Math.floor(i / 5) * 20}
                        width="16"
                        height="16"
                        fill="#1E88E5"
                        opacity={Math.random() > 0.3 ? 1 : 0.2}
                      />
                    ))}
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-sm text-gray-500">预计取餐</p>
                  <p className="font-semibold text-gray-900">约 5 分钟后</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">距离门店</p>
                  <p className="font-semibold text-gray-900">150m</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Navigation className="w-4 h-4" />
                  开始导航
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-full py-3 text-sm font-medium hover:bg-blue-600">
                  <RefreshCw className="w-4 h-4" />
                  再来一单
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-500 text-lg font-medium">暂无进行中订单</p>
            <p className="text-gray-400 text-sm mt-1">快去下单一杯咖啡吧</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-500 text-lg font-medium">暂无历史订单</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
