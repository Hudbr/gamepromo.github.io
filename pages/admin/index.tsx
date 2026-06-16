import { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import prisma from '../../lib/prisma'

export default function Admin({ user, deals }: any){
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Painel Admin — GamePromo BR</h1>
      <p className="text-sm text-gray-400 mt-2">Conectado como <strong>{user?.email}</strong></p>

      <div className="mt-6">
        <a className="btn btn-primary" href="/api/auth/logout">Sair</a>
        <a className="ml-3 btn btn-outline" href="https://www.sanity.io">Abrir Sanity Studio</a>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Criar nova promoção</h2>
        <CreateDealForm />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Promoções (do banco)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {deals.map((d:any)=>(
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
      </section>
    </div>
  )
}

function CreateDealForm(){
  async function handleSubmit(e:any){
    e.preventDefault()
    const fd = new FormData(e.target)
    const body:any = Object.fromEntries(fd.entries())
    await fetch('/api/admin/deals',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    window.location.reload()
  }
  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-2 md:grid-cols-2">
      <input name="title" placeholder="Título" required />
      <input name="genre" placeholder="Gênero" />
      <input name="platform" placeholder="Plataforma" />
      <input name="cover" placeholder="URL da imagem de capa" />
      <input name="affiliateLink" placeholder="Link de afiliado" />
      <input name="price" placeholder="Preço" type="number" step="0.01" required />
      <input name="originalPrice" placeholder="Preço original" type="number" step="0.01" />
      <input name="discount" placeholder="Desconto %" type="number" />
      <div className="md:col-span-2">
        <button className="btn btn-primary" type="submit">Criar promoção</button>
      </div>
    </form>
  )
}

function DealCard({ deal }: any){
  async function handleDelete(){
    if(!confirm('Excluir promoção?')) return
    await fetch(`/api/admin/deals/${deal.id}`,{method:'DELETE'})
    window.location.reload()
  }
  async function handleEdit(){
    const title = prompt('Título', deal.title)
    if(title==null) return
    const body = {...deal, title}
    await fetch(`/api/admin/deals/${deal.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    window.location.reload()
  }
  return (
    <div className="card">
      <h3 className="font-semibold">{deal.title}</h3>
      <p className="text-sm text-gray-400">{deal.genre} — {deal.platform}</p>
      <p>R$ {deal.price}</p>
      <div className="mt-3">
        <button className="btn btn-outline mr-2" onClick={handleEdit}>Editar</button>
        <button className="btn" onClick={handleDelete}>Excluir</button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }
  const user = session.user
  const deals = await prisma.deal.findMany({ orderBy: { createdAt: 'desc' } })
  return { props: { user, deals } }
}
