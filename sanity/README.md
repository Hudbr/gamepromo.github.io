Sanity Studio instructions:

1. Instale o CLI e crie um projeto (se ainda não tiver):

```bash
npm install -g @sanity/cli
sanity init --dataset production
```

2. Copie os schemas nesta pasta para o seu `studio/schemas` e registre no `schema.js`.
3. Atualize `SANITY_PROJECT_ID` e `SANITY_DATASET` em `.env`.
4. Rode o studio localmente:

```bash
cd studio
npm install
npm run start
```

Depois de publicar conteúdo, o site Next.js já buscará os documentos via `lib/sanity.js`.
