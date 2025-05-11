'use client'

import { Pokemon } from '@/types'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'

interface ProductListProps {
  pokemons: Pokemon[]
}

export default function ProductList({ pokemons: initialPokemons }: ProductListProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)

  useEffect(() => {
    setPokemons(initialPokemons)
  }, [initialPokemons])

  if (!pokemons.length) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">Покемоны не найдены</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <ProductCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
} 