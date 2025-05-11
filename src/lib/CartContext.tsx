'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Pokemon } from '@/types'

interface CartItem extends Pokemon {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (pokemon: Pokemon) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (pokemon: Pokemon) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === pokemon.id)
      if (existingItem) {
        return currentItems.map(item =>
          item.id === pokemon.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentItems, { ...pokemon, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 