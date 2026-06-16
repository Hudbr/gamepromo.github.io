import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID || 'yourProjectId',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

export async function fetchFreeGames(){
  const query = `*[_type == "freeGame"]{_id,title,platform,cover,excerpt,expires}`
  return await client.fetch(query)
}

export async function fetchDeals(){
  const query = `*[_type == "deal"]{_id,title,genre,price,originalPrice,discount,platform,cover}`
  return await client.fetch(query)
}

export async function fetchNews(){
  const query = `*[_type == "news"]{_id,title,excerpt,category,publishedAt}`
  return await client.fetch(query)
}
