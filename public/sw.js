const CACHE_NAME = 'gamepromo-v1'
const ASSETS = [
  '/',
  '/favicon.ico',
  '/styles/globals.css'
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k) })
    ))
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  // cache-first for navigation and static assets
  if (event.request.method !== 'GET') return
  if (url.pathname.startsWith('/api/')){
    // network-first for API, fallback to cache
    event.respondWith(
      fetch(event.request).then(res => {
        const cloned = res.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned))
        return res
      }).catch(()=>caches.match(event.request))
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(res => {
      try{ if (event.request.destination === 'document' || event.request.destination === 'script' || event.request.destination === 'style'){
        const cloned = res.clone(); caches.open(CACHE_NAME).then(c=>c.put(event.request, cloned))
      }}catch(e){}
      return res
    })).catch(()=>caches.match('/'))
  )
})
