This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Variáveis de Ambiente

Este projeto requer as seguintes variáveis de ambiente para funcionar:

### Obrigatórias:
- `IG_SESSIONID` - Session ID do Instagram (obtido dos cookies do navegador)
- `IG_CSRFTOKEN` - CSRF Token do Instagram (obtido dos cookies do navegador)

### Opcionais:
- `IG_USER_AGENT` - User Agent customizado (se não fornecido, será usado um valor padrão)

### Como obter os valores:
1. Abra o Instagram no navegador
2. Abra as Ferramentas de Desenvolvedor (F12)
3. Vá para a aba "Application" ou "Armazenamento"
4. Procure por "Cookies" > `https://www.instagram.com`
5. Encontre os cookies:
   - `sessionid` → use como `IG_SESSIONID`
   - `csrftoken` → use como `IG_CSRFTOKEN`

### Configuração Local:
Crie um arquivo `.env.local` na raiz do projeto:
```
IG_SESSIONID=seu_session_id_aqui
IG_CSRFTOKEN=seu_csrf_token_aqui
IG_USER_AGENT=opcional_user_agent
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Configurando Variáveis de Ambiente na Vercel:

1. Acesse o painel do seu projeto na Vercel
2. Vá em **Settings** > **Environment Variables**
3. Adicione as seguintes variáveis:
   - `IG_SESSIONID` - Cole o valor do cookie `sessionid` do Instagram
   - `IG_CSRFTOKEN` - Cole o valor do cookie `csrftoken` do Instagram
   - `IG_USER_AGENT` (opcional) - User Agent customizado
4. Selecione os ambientes onde as variáveis devem estar disponíveis (Production, Preview, Development)
5. Clique em **Save**
6. Faça um novo deploy para que as variáveis sejam aplicadas

**Importante:** As variáveis de ambiente precisam ser configuradas manualmente na Vercel, pois arquivos `.env.local` não são enviados para o repositório por questões de segurança.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
