'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Zap, User, Gift, Settings, Heart, MapPin, Ticket, Clock, ChevronRight, MessageSquare, Coffee } from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAppStore } from '@/lib/store';

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAppStore();

  const menuItems = [
    { icon: Ticket, label: '我的优惠券', value: '5张可用' },
    { icon: Gift, label: '积分商城', value: `${user?.points || 0}积分` },
    { icon: Heart, label: '我的收藏', value: '' },
    { icon: Coffee, label: '咖啡钱包', value: '' },
    { icon: MapPin, label: '我的地址', value: '' },
    { icon: MessageSquare, label: '帮助反馈', value: '' },
    { icon: Settings, label: '设置', value: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="bg-gradient-to-b from-primary to-blue-600 px-4 pt-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white">我的</h1>
            <button className="text-white/80">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}
                alt="用户头像"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-white/30 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{user?.name || '咖啡爱好者'}</h2>
              <p className="text-white/70 text-sm">手机账号 · {user?.phone || '138****8888'}</p>
            </div>
            <button className="text-white/80">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 -mt-8 mb-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Ticket className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-500">优惠券</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{user?.points || 0}</p>
                <p className="text-xs text-gray-500">积分</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Coffee className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500">杯咖啡</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">收藏</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-gradient-to-r from-primary to-blue-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6" />
                <span className="font-bold text-lg">极速会员</span>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">开通会员</span>
            </div>
            <p className="text-white/80 text-sm">每月享受专属优惠，首杯立减6元起</p>
          </div>
        </div>

        <div className="px-4">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-gray-500 text-sm">{item.value}</span>}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4 mt-6">
          <button
            onClick={() => router.push('/login')}
            className="w-full text-center text-gray-400 text-sm py-4"
          >
            退出登录
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
