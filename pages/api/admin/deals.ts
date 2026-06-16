import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../lib/prisma'

export default withApiAuthRequired(async function handler(req:any, res:any){
  try{
    if(req.method === 'GET'){
      const deals = await prisma.deal.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json({ deals })
    }

    if(req.method === 'POST'){
      const { title, genre, platform, price, originalPrice, discount, cover, affiliateLink } = req.body
      const created = await prisma.deal.create({ data: { title, genre, platform, price: Number(price), originalPrice: originalPrice?Number(originalPrice):undefined, discount: discount?Number(discount):undefined, cover: cover||null, affiliateLink: affiliateLink||null } })
      return res.status(201).json({ deal: created })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  }catch(err:any){
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
})
