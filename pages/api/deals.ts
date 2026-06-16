import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    const { page = '1', limit = '12', genre, priceRange, q } = req.query
    const take = Math.min(100, Number(limit) || 12)
    const skip = (Math.max(1, Number(page) || 1) - 1) * take

    const where: any = {}
    if(genre) where.genre = String(genre)
    if(q) where.title = { contains: String(q), mode: 'insensitive' }
    if(priceRange){
      const pr = String(priceRange)
      if(pr === '0-20') where.price = { lte: 20 }
      else if(pr === '20-50') where.price = { gte: 20, lte: 50 }
      else if(pr === '50+') where.price = { gte: 50 }
    }

    const [items, total] = await Promise.all([
      prisma.deal.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take }),
      prisma.deal.count({ where })
    ])

    // Cache for short time CDN-friendly
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=120')
    return res.status(200).json({ items, total, page: Number(page) || 1, limit: take })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: 'internal' })
  }
}
