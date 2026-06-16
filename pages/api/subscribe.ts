import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const { email } = req.body
  if(!email) return res.status(400).json({error:'email required'})
  try{
    const sub = await prisma.subscriber.create({data:{email}})
    res.status(201).json({ok:true,subscriber:sub})
  }catch(err){
    res.status(500).json({error:'failed'})
  }
}
