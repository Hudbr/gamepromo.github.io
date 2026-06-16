export default {
  name: 'deal',
  title: 'Deal',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'genre', type: 'string', title: 'Gênero' },
    { name: 'platform', type: 'string', title: 'Plataforma' },
    { name: 'price', type: 'number', title: 'Preço' },
    { name: 'originalPrice', type: 'number', title: 'Preço original' },
    { name: 'discount', type: 'number', title: 'Desconto (%)' },
    { name: 'cover', type: 'image', title: 'Imagem de capa' },
    { name: 'affiliateLink', type: 'url', title: 'Link de Afiliado' }
  ]
}
