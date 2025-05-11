'use client'

import { useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { Pokemon } from '@/types'

interface ProductCardProps {
  pokemon: Pokemon
}

export default function ProductCard({ pokemon }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!pokemon.inStock) return
    setIsAdding(true)
    await addToCart(pokemon)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-full object-contain p-4"
        />
        {!pokemon.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2 capitalize">{pokemon.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#dc3545]">
            {pokemon.price.toLocaleString()} P$
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!pokemon.inStock || isAdding}
            className={`button-primary transition-all duration-300 ${
              !pokemon.inStock 
                ? 'opacity-50 cursor-not-allowed bg-slate-700 hover:bg-slate-700' 
                : isAdding 
                  ? 'opacity-50 cursor-not-allowed scale-95' 
                  : 'hover:scale-105'
            }`}
          >
            {!pokemon.inStock ? 'Нет в наличии' : isAdding ? 'Добавлено!' : 'В корзину'}
          </button>
        </div>
      </div>
    </div>
  )
} 