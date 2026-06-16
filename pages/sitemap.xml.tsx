import { GetServerSideProps } from 'next'
import prisma from '../lib/prisma'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function buildSitemap(posts:any[]){
  const urls = posts.map(p=>`
    <url>
      <loc>${SITE_URL}/promocoes</loc>
      <changefreq>hourly</changefreq>
      <priority>0.8</priority>
    </url>
  `)
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${SITE_URL}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${SITE_URL}/promocoes</loc>
      <changefreq>hourly</changefreq>
      <priority>0.9</priority>
    </url>
    ${urls.join('\n')}
  </urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const deals = await prisma.deal.findMany({ take: 100, orderBy: { createdAt: 'desc' } })
  const xml = buildSitemap(deals)
  res.setHeader('Content-Type', 'application/xml')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function SiteMap() { return null }
