'use client'

import Link from 'next/link'
import { useCart } from '@/lib/CartContext'

export default function Navigation() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="relative">
              PokeStore
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#dc3545] rounded-full animate-pulse"></span>
            </span>
          </Link>
          <Link
            href="/cart"
            className="button bg-[#dc3545] hover:bg-[#dc3545]/90 text-white relative border border-[#dc3545]/20 shadow-lg shadow-[#dc3545]/10 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Корзина
            </span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#dc3545] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#dc3545]/20 animate-bounce">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
} 