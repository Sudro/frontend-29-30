'use client'

import { useState } from 'react'
import { Pokemon } from '@/types'
import ProductList from './ProductList'
import SearchBar from './SearchBar'

interface ProductListWrapperProps {
  initialPokemons: Pokemon[]
}

export default function ProductListWrapper({ initialPokemons }: ProductListWrapperProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons)

  const handleSearch = (searchResults: Pokemon[]) => {
    setPokemons(searchResults)
  }

  const handleClear = () => {
    setPokemons(initialPokemons)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      <ProductList pokemons={pokemons} />
    </>
  )
} 