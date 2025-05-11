import { Pokemon, PokemonListResponse } from '@/types'

const BASE_URL = 'https://pokeapi.co/api/v2'

function calculatePrice(pokemon: any): number {
  const baseStats = pokemon.stats.reduce((sum: number, stat: any) => sum + stat.base_stat, 0)
  const rarity = pokemon.rarity || 1
  const evolutionStage = pokemon.evolution_chain?.chain?.evolves_to?.length || 0

  const basePrice = Math.floor((baseStats * rarity * (evolutionStage + 1)) / 5)
  
  return Math.max(Math.round(basePrice / 100) * 100, 1000)
}

export async function getPokemonList(limit: number = 100, offset: number = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  return response.json()
}

export async function getPokemon(identifier: string | number): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${identifier}`)
    const data = await response.json()
    const species = await fetch(data.species.url).then(res => res.json())
    
    const image = data.sprites.other['official-artwork']?.front_default ||
                 data.sprites.front_default ||
                 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'

    const price = calculatePrice({
      ...data,
      rarity: Math.ceil(Math.random() * 5),
      evolution_chain: species.evolution_chain
    })

    return {
      id: data.id,
      name: data.name,
      image,
      price,
      inStock: Math.random() > 0.2
    }
  } catch (error) {
    console.error('Error fetching pokemon:', error)
    return null
  }
}

export async function searchPokemon(query: string): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=1000`)
    const data = await response.json()
    
    const filteredPokemons = data.results.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 40)

    const pokemons = await Promise.all(
      filteredPokemons.map(async (pokemon: { name: string; url: string }) => {
        try {
          const response = await fetch(pokemon.url)
          const data = await response.json()
          console.log(`Загружен покемон при поиске: ${data.name}, ID: ${data.id}`)

          const price = Math.floor(Math.random() * 900) + 100

          const inStock = Math.random() > 0.3

          return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default || 
                   data.sprites.front_default || 
                   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            price,
            inStock
          }
        } catch (error) {
          console.error(`Ошибка при загрузке покемона ${pokemon.name}:`, error)
          return {
            id: 0,
            name: pokemon.name,
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            price: 100,
            inStock: false
          }
        }
      })
    )

    return pokemons
  } catch (error) {
    console.error('Error searching pokemon:', error)
    return []
  }
}

export async function getPokemons(limit: number = 20): Promise<Pokemon[]> {
  try {
    console.log('Начинаем загрузку списка покемонов...')
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
    const data = await response.json()
    console.log(`Получено ${data.results.length} покемонов`)

    const pokemons = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        try {
          const response = await fetch(pokemon.url)
          const data = await response.json()
          console.log(`Загружен покемон: ${data.name}, ID: ${data.id}`)

          const price = Math.floor(Math.random() * 900) + 100

          const inStock = Math.random() > 0.3

          return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default || 
                   data.sprites.front_default || 
                   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            price,
            inStock
          }
        } catch (error) {
          console.error(`Ошибка при загрузке покемона ${pokemon.name}:`, error)
          return {
            id: 0,
            name: pokemon.name,
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            price: 100,
            inStock: false
          }
        }
      })
    )

    console.log('Список покемонов успешно загружен')
    return pokemons
  } catch (error) {
    console.error('Критическая ошибка при загрузке списка покемонов:', error)
    return []
  }
} 