const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  await prisma.deal.createMany({data:[
    {title:'Cyber Adventure',genre:'Ação',platform:'Steam',originalPrice:199.9,price:29.9,discount:85,cover:'https://via.placeholder.com/1200x630?text=Cyber+Adventure',affiliateLink:'https://loja.exemplo/affiliate/cyber'},
    {title:'Mystic Quest',genre:'RPG',platform:'Epic',originalPrice:149.9,price:39.9,discount:73,cover:'https://via.placeholder.com/1200x630?text=Mystic+Quest',affiliateLink:'https://loja.exemplo/affiliate/mystic'}
  ]})
  await prisma.freeGame.createMany({data:[{title:'Sky Realm',platform:'Epic',excerpt:'RPG de exploração',expires:new Date('2026-06-20')}]})
  await prisma.news.createMany({data:[{title:'Summer Sale começa amanhã',excerpt:'Grandes descontos na Steam e Epic.'}]})
}

main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect())
