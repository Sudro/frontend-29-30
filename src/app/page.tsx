import { getPokemons } from '@/lib/pokemonService'
import ProductListWrapper from '@/components/ProductListWrapper'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function generateStaticParams() {
  return [{}]
}

export default async function Home() {
  const initialPokemons = await getPokemons(20)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gradient">
          PokeStore
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
          Добро пожаловать в мир покемонов! Здесь вы можете найти и приобрести своих любимых покемонов.
        </p>
      </div>
      <ProductListWrapper initialPokemons={initialPokemons} />
    </main>
  )
} 