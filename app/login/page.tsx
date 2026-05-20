'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, MessageSquare, Smartphone, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSendCode = () => {
    if (phone.length >= 11) {
      setIsCodeSent(true);
    }
  };

  const handleLogin = () => {
    if (agreeToTerms) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col px-6">
        <button
          onClick={() => router.back()}
          className="self-start mt-8 mb-8"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 flex flex-col justify-center pb-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white fill-current" />
            </div>
            <p className="text-gray-500 text-lg tracking-wider">QUICK COFFEE, PRODUCTIVE DAY</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">手机号码</label>
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-4 border border-gray-100">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">+86</span>
                <div className="w-px h-5 bg-gray-200" />
                <input
                  type="tel"
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                  maxLength={11}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-4 border border-gray-100">
                  <Check className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="6位验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                    maxLength={6}
                  />
                </div>
                <button
                  onClick={handleSendCode}
                  disabled={isCodeSent}
                  className={`px-4 py-4 rounded-2xl font-medium whitespace-nowrap ${
                    isCodeSent
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-blue-50 text-primary hover:bg-blue-100'
                  }`}
                >
                  {isCodeSent ? '60s' : '获取验证码'}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button
                onClick={() => setAgreeToTerms(!agreeToTerms)}
                className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 ${
                  agreeToTerms ? 'bg-primary border-primary' : 'border-gray-300'
                }`}
              >
                {agreeToTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <p className="text-sm text-gray-500">
                我已阅读并同意
                <span className="text-primary">《用户服务协议》</span>
                与
                <span className="text-primary">《隐私政策》</span>
              </p>
            </div>

            <button
              onClick={handleLogin}
              disabled={!agreeToTerms}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                agreeToTerms
                  ? 'bg-primary text-white hover:bg-blue-600 active:scale-98'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              立即登录
            </button>
          </div>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-400">其他登录方式</span>
              </div>
            </div>

            <div className="flex justify-center gap-8 mt-8">
              <button className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-7 h-7 text-green-500" />
                </div>
                <span className="text-sm text-gray-600">微信登录</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                  <Smartphone className="w-7 h-7 text-gray-700" />
                </div>
                <span className="text-sm text-gray-600">本机一键</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push('/')}
            className="mt-12 text-center text-gray-500 text-lg"
          >
            先去逛逛 (访客模式)
          </button>
        </div>
      </div>
    </div>
  );
}
