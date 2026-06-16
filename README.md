# GamePromo BR

Site estático de promoções e jogos grátis para PC — scaffold inicial.

Como usar:

- Abra `index.html` no navegador.
- Editar `assets/js/app.js` para ajustar listas e dados.
- Painel simples: dados de `deals` salvos em `localStorage`.

Próximos passos sugeridos:
- Integrar API de promoções (Steam/Epic).
- Implementar backend para painel admin.
- Adicionar Google Analytics e meta tags no head.

## Migração para Next.js + Tailwind + Prisma (SQLite) + Sanity + Auth0

Este repositório agora inclui um scaffold inicial para migrar para Next.js com:

- Frontend Next.js com Tailwind CSS
- Conteúdo gerenciado pelo Sanity (CMS)
- Autenticação via Auth0 (integração client-side/SSR)
- Banco local SQLite com Prisma para assinantes e dados adicionais

Passos rápidos:

1. Instale dependências:

```bash
npm install
```

2. Configure variáveis de ambiente — copie `.env.example` para `.env` e preencha.

3. Gere e migre o banco Prisma:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

4. Rodar em desenvolvimento:

```bash
npm run dev
```

5. Sanity: criar projeto Sanity e definir schemas para `freeGame`, `deal`, `news`. Depois, publique conteúdo e atualize `SANITY_PROJECT_ID`.

Observações:

- O painel administrativo pode ser feito usando o Sanity Studio (recomendado) ou um painel custom com Auth0.
- Integração completa exige criação de contas e chaves (Sanity/Auth0). Veja documentação oficial de cada serviço.
 
## SEO, Analytics e sitemap

- Preencha `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_GA_ID` em `.env` (ou no painel do host).
- O projeto inclui meta tags OG e JSON-LD básicas em `pages/_app.tsx`.
- Google Analytics (GA4) é carregado quando `NEXT_PUBLIC_GA_ID` estiver definido.
- Sitemap dinâmico disponível em `/sitemap.xml` (gera a partir das `deals` no banco).
- `robots.txt` já está em `public/robots.txt`.

Recomendações de deploy:
- Use Vercel ou Netlify para SSR/ISR fáceis; habilite variáveis de ambiente no painel.
- Configure CDN (Cloudflare) para otimizar imagens e cache.
 - O projeto agora gera imagens OG dinâmicas via `GET /api/og/deal/[id]?title=...&subtitle=...&price=...` usando `@vercel/og`.
 - As imagens são renderizadas como PNG estilo social preview 1200x630 para melhor compartilhamento.
