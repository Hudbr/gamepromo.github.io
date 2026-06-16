import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import prisma from '../../lib/prisma'

export default function NewsPage({ article }: any){
  if(!article) return <main className="container py-12">Notícia não encontrada</main>
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = `${SITE_URL}/news/${article.id}`
  const title = article.title
  const description = article.excerpt || ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: article.cover || `${SITE_URL}/og-image.png`,
    datePublished: article.publishedAt || null,
    author: { '@type': 'Person', name: 'GamePromo BR' },
    publisher: { '@type': 'Organization', name: 'GamePromo BR', logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` } },
    description
  }

  return (
    <main className="container py-12">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={article.cover || '/og-image.png'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <article>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-400">{article.category} • {article.publishedAt}</p>
        <div className="mt-4 card">
          <p>{article.excerpt}</p>
        </div>
      </article>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await prisma.news.findMany({ take: 50, select: { id: true } })
  const paths = items.map(i=>({ params: { id: String(i.id) } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id)
  const article = await prisma.news.findUnique({ where: { id } })
  if(!article) return { notFound: true }
  return { props: { article: JSON.parse(JSON.stringify(article)) }, revalidate: 60 }
}
