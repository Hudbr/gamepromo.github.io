export default {
  name: 'freeGame',
  title: 'Free Game',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'platform', type: 'string', title: 'Plataforma' },
    { name: 'excerpt', type: 'text', title: 'Descrição curta' },
    { name: 'expires', type: 'datetime', title: 'Expira em' },
    { name: 'cover', type: 'image', title: 'Capa' }
  ]
}
