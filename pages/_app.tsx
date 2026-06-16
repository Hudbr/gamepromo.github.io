import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/sw.js').catch(()=>{})
    }
  },[])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GamePromo BR — Ofertas e jogos grátis para PC</title>
        <meta name="description" content="GamePromo BR: acompanhe jogos grátis, promoções e descontos para PC (Steam, Epic). Notícias e alertas de ofertas." />
        <meta property="og:title" content="GamePromo BR — Ofertas e jogos grátis para PC" />
        <meta property="og:description" content="Acompanhe jogos grátis, promoções e descontos para PC. Cadastre-se para alertas e ofertas." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GamePromo BR",
          "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          "potentialAction": { "@type": "SearchAction", "target": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/promocoes?q={search_term_string}`, "query-input": 'required name=search_term_string' }
        }) }} />

        {/* Google Analytics (gtag) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });` }} />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
