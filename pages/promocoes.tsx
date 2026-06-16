import { useEffect, useState } from 'react'
import prisma from '../lib/prisma'
import Link from 'next/link'

export default function Promocoes({ initial }: any){
  const [items,setItems] = useState<any[]>(initial.items || [])
  const [page,setPage] = useState(1)
  const [total,setTotal] = useState(initial.total || 0)
  const [q,setQ] = useState('')
  const [genre,setGenre] = useState('')
  const [price,setPrice] = useState('')
  const limit = 9

  useEffect(()=>{if(page!==1 || q || genre || price) fetchList()},[page, q, genre, price])

  async function fetchList(){
    const params = new URLSearchParams({ page:String(page), limit:String(limit) })
    if(q) params.set('q',q)
    if(genre) params.set('genre',genre)
    if(price) params.set('priceRange',price)
    const res = await fetch('/api/deals?'+params.toString())
    const data = await res.json()
    setItems(data.items || [])
    setTotal(data.total || 0)
  }

  function pages(){
    return Math.max(1, Math.ceil(total/limit))
  }

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold text-accent">Promoções</h1>
      <div className="mt-4 flex gap-2 flex-wrap">
        <input placeholder="Pesquisar" value={q} onChange={e=>{setQ(e.target.value);setPage(1)}} />
        <select value={genre} onChange={e=>{setGenre(e.target.value);setPage(1)}}>
          <option value="">Todos gêneros</option>
          <option value="Ação">Ação</option>
          <option value="RPG">RPG</option>
          <option value="Puzzle">Puzzle</option>
        </select>
        <select value={price} onChange={e=>{setPrice(e.target.value);setPage(1)}}>
          <option value="">Qualquer preço</option>
          <option value="0-20">Até R$20</option>
          <option value="20-50">R$20–50</option>
          <option value="50+">Acima de R$50</option>
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-6">
        {items.map(it=> (
          <article key={it.id} className="card">
            <h3 className="font-semibold"><Link href={`/deal/${it.id}`}><a>{it.title}</a></Link></h3>
            <p className="text-sm text-gray-400">{it.genre} • {it.platform}</p>
            <p className="mt-2"><strong>R$ {it.price}</strong> <span className="text-sm text-gray-400">de R$ {it.originalPrice||'-'}</span></p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button className="btn btn-outline" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page<=1}>Anterior</button>
        <div>Page {page} / {pages()}</div>
        <button className="btn btn-outline" onClick={()=>setPage(p=>Math.min(pages(),p+1))} disabled={page>=pages()}>Próximo</button>
      </div>
    </main>
  )
}

export async function getStaticProps(){
  // pre-render first page for performance (ISR)
  const take = 9
  const items = await prisma.deal.findMany({ orderBy: { createdAt: 'desc' }, take })
  const total = await prisma.deal.count()
  return { props: { initial: { items: JSON.parse(JSON.stringify(items)), total } }, revalidate: 60 }
}
