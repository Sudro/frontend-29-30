'use client'

import { useState } from 'react'
import { searchPokemon } from '@/lib/pokemonService'
import { Pokemon } from '@/types'

interface SearchBarProps {
  onSearch: (pokemons: Pokemon[]) => void
  onClear: () => void
}

export default function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) {
      onClear()
      return
    }

    setIsSearching(true)
    try {
      const results = await searchPokemon(query)
      onSearch(results)
    } catch (error) {
      console.error('Ошибка при поиске:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск покемонов..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-[#dc3545]"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="button-primary"
        >
          {isSearching ? 'Поиск...' : 'Найти'}
        </button>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              onClear()
            }}
            className="button-primary"
          >
            Сбросить
          </button>
        )}
      </div>
    </form>
  )
} 