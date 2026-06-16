import type { GetStaticProps } from 'next'
import { fetchFreeGames, fetchDeals, fetchNews } from '../lib/sanity'

export default function Home({ freeGames = [], deals = [], news = [] }){
  return (
    <main>
      <section className="container py-12">
        <h1 className="text-4xl font-extrabold text-accent">GamePromo BR</h1>
        <p className="text-gray-400 mt-2">Ofertas, grátis e notícias para gamers</p>
      </section>

      <section className="container">
        <h2 className="text-2xl font-bold">Jogos Grátis Agora</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
          {freeGames.map((g: any)=> (
            <article key={g._id} className="card">
              <div className="h-40 bg-gray-800 mb-2" style={{backgroundImage:`url(${g.cover?.asset?.url || '/placeholder.png'})`,backgroundSize:'cover'}}></div>
              <h3 className="font-semibold">{g.title}</h3>
              <p className="text-sm text-gray-400">{g.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mt-10">
        <h2 className="text-2xl font-bold">Melhores Promoções</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
          {deals.map((d:any)=> (
            <article key={d._id} className="card">
              <div className="h-40 bg-gray-800 mb-2" style={{backgroundImage:`url(${d.cover?.asset?.url || '/placeholder.png'})`,backgroundSize:'cover'}}></div>
              <h3 className="font-semibold">{d.title}</h3>
              <p className="text-sm text-gray-400">{d.platform} — {d.genre}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mt-10 mb-16">
        <h2 className="text-2xl font-bold">Últimas Notícias</h2>
        <div className="mt-4">
          {news.map((n:any)=> (
            <article key={n._id} className="card mb-4">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-400">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ()=>{
  const freeGames = await fetchFreeGames().catch(()=>[])
  const deals = await fetchDeals().catch(()=>[])
  const news = await fetchNews().catch(()=>[])
  return {props:{freeGames,deals,news},revalidate:60}
}
