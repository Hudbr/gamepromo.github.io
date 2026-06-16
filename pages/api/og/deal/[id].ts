import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export default function handler(req: Request) {
  try {
    const url = new URL(req.url)
    const title = url.searchParams.get('title') || 'GamePromo BR'
    const subtitle = url.searchParams.get('subtitle') || 'Promoção imperdível'
    const price = url.searchParams.get('price') || ''

    return new ImageResponse(
      (
        <div style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(180deg, #020313 0%, #081123 100%)',
          color: 'white',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: '#00b3ff' }} />
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7ae3ff' }}>GamePromo BR</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px' }}>
            <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 0.95 }}>{title}</div>
            <div style={{ fontSize: 28, color: '#cfeffd' }}>{subtitle}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#0ff0d8' }}>{price}</span>
            <span style={{ fontSize: 24, color: '#8fbfe5' }}>Ofertas e games grátis para PC</span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  } catch (error) {
    return new Response('Failed to generate image', { status: 500 })
  }
}
