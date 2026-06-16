import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import prisma from '../../lib/prisma'

export default function DealPage({ deal }: any){
  if(!deal) return <main className="container py-12">Promoção não encontrada</main>
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = `${SITE_URL}/deal/${deal.id}`
  const title = `${deal.title} — Oferta` 
  const description = `${deal.genre || ''} • ${deal.platform || ''} — De R$ ${deal.originalPrice || '-'} por R$ ${deal.price}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.title,
    image: deal.cover || `${SITE_URL}/og-image.png`,
    description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: String(deal.price),
      url
    }
  }

  return (
    <main className="container py-12">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${SITE_URL}/api/og/deal/${deal.id}?title=${encodeURIComponent(deal.title)}&subtitle=${encodeURIComponent(`${deal.platform || ''} • ${deal.genre || ''}`)}&price=${encodeURIComponent(`R$ ${deal.price}`)}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <article>
        <h1 className="text-3xl font-bold">{deal.title}</h1>
        <p className="text-gray-400">{deal.genre} • {deal.platform}</p>
        <div className="mt-4 card">
          {deal.cover && <img src={deal.cover} alt={deal.title} style={{width:'100%',borderRadius:8}} />}
          <p className="text-lg mt-3">Preço: R$ {deal.price} <small className="text-sm text-gray-400">de R$ {deal.originalPrice || '-'}</small></p>
          <p className="mt-2">Desconto: {deal.discount || 0}%</p>
          <div className="mt-4 flex gap-2">
            <a className="btn btn-primary" href={deal.affiliateLink || '#'} target="_blank" rel="noopener noreferrer">Resgatar Agora</a>
            <a className="btn btn-outline" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Compartilhar</a>
            <a className="btn btn-ghost" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n' + url)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </article>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const deals = await prisma.deal.findMany({ take: 50, select: { id: true } })
  const paths = deals.map(d=>({ params: { id: String(d.id) } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id)
  const deal = await prisma.deal.findUnique({ where: { id } })
  if(!deal) return { notFound: true }
  return { props: { deal: JSON.parse(JSON.stringify(deal)) }, revalidate: 60 }
}
