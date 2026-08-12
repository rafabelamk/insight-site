# Site da Insight

Clonado e adaptado a partir do template original (Next.js), com a identidade visual da Insight (preto + verde-limão, logo do olho).

## Como rodar localmente
```
npm install
npm run dev
```
Abra http://localhost:3000

## Como publicar (Vercel — mais simples)
1. Crie um repositório no GitHub e suba esta pasta.
2. Entre em vercel.com, conecte o repositório e clique em Deploy.
3. Pronto — a Vercel detecta que é Next.js automaticamente.

## O QUE FALTA VOCÊ PREENCHER (procure por "TODO" no código)

1. **WhatsApp** — em `app/page.js`, linha ~6, troque o número no link `WA` pelo WhatsApp real da Insight.
2. **Instagram** — troquei os links para `@1sightmkt` (baseado no handle que aparece nas suas imagens). Confirme se está certo, e se o LinkedIn da Insight existe, adicione o link (está com `#` por enquanto).
3. **Logos de clientes** — `public/logos/otica-rio-branco.png` e `public/logos/terra-milia.png` são placeholders com texto. Troque pelos logos reais da Ótica Rio Branco e da Terra Milia (o logo da Orsegups já está certo, veio do repositório original).
4. **Depoimentos** — a seção de depoimentos está com textos placeholder `[Adicione aqui...]`. Troque por depoimentos reais de clientes (não inventei nenhum, pois depoimento fabricado em nome de cliente real não é legítimo).
5. **Estatísticas do hero** (seção STATS) — os números atuais são genéricos. Se você tiver números reais (anos de operação, clientes atendidos, budget gerido), me envie e eu atualizo.
6. **Google Tag Manager** — desativei o GTM da Rafaela (estava com o ID dela). Se a Insight tiver um GTM próprio, me avise o ID e eu reativo.

## O que foi removido (era pessoal da Rafaela Geiger, dona do site original)
- Seção "Especialistas" (rede de influenciadores/infoprodutores dela)
- Seção "Certificação" (certificado pessoal dela)
- Foto de perfil, bio pessoal, links de Instagram/LinkedIn pessoais
- Nome dela na navbar, footer e meta tags

## Paleta usada (extraída dos seus prints)
- Preto: `#0c0c0c`
- Verde-limão: `#adf01b`
- Fonte: Inter (mesma do site original)
