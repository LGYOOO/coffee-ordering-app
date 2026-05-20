import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return `¥${price.toFixed(2)}`;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function generatePickupCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const number = Math.floor(Math.random() * 900) + 100;
  return `${letter}-${number}`;
}
