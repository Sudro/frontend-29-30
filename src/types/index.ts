export interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
}

export interface Pokemon {
  id: number
  name: string
  image: string
  price: number
  inStock: boolean
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
} 