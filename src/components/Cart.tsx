'use client'

import { useCart } from '@/lib/CartContext'
import { useState } from 'react'
import Link from 'next/link'

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true)
    setShowNotification(true)
    
    setTimeout(() => {
      clearCart()
      setIsPlacingOrder(false)
      setShowNotification(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Корзина пуста</h1>
          <Link href="/" className="button-primary">
            Вернуться к покупкам
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-500 mb-8">Корзина</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 rounded-lg p-4 flex items-center justify-between border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold text-white capitalize">{item.name}</h3>
                <p className="text-slate-400">Количество: {item.quantity}</p>
                <p className="text-[#dc3545] font-bold">P$ {item.price.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-white">Итого:</span>
          <span className="text-2xl font-bold text-white">P$ {total.toLocaleString()}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full button-primary"
        >
          {isPlacingOrder ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </div>

      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-lg text-center animate-fade-in-up border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">Заказ оформлен!</h2>
            <p className="text-slate-400">Спасибо за покупку!</p>
          </div>
        </div>
      )}
    </div>
  )
} 