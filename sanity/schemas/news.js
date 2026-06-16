export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'excerpt', type: 'text', title: 'Resumo' },
    { name: 'category', type: 'string', title: 'Categoria' },
    { name: 'publishedAt', type: 'datetime', title: 'Data' }
  ]
}
