import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import prisma from '../../../../lib/prisma'

export default withApiAuthRequired(async function handler(req:any, res:any){
  const { id } = req.query
  try{
    if(req.method === 'PUT'){
      const { title, genre, platform, price, originalPrice, discount, cover, affiliateLink } = req.body
      const updated = await prisma.deal.update({ where: { id: Number(id) }, data: { title, genre, platform, price: Number(price), originalPrice: originalPrice?Number(originalPrice):undefined, discount: discount?Number(discount):undefined, cover: cover||null, affiliateLink: affiliateLink||null } })
      return res.status(200).json({ deal: updated })
    }
    if(req.method === 'DELETE'){
      await prisma.deal.delete({ where: { id: Number(id) } })
      return res.status(204).end()
    }
    return res.status(405).json({ error: 'Method not allowed' })
  }catch(err:any){
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
})
