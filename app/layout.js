import './globals.css'

export const metadata = {
  title: 'Insight — Soluções em Tráfego Pago e Tecnologia',
  description:
    'Agência de marketing e produção de conteúdo. Unimos tráfego pago, produção de conteúdo e tecnologia para negócios crescerem com previsibilidade.',
  keywords:
    'tráfego pago, meta ads, google ads, gestão de anúncios, agência de marketing, produção de conteúdo, Insight, performance digital',
  openGraph: {
    title: 'Insight — Soluções em Tráfego Pago e Tecnologia',
    description:
      'Pronto pra crescer com previsibilidade? Conheça a Insight.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Google Tag Manager — TODO: substituir pelo GTM-ID da Insight */}
        {/*
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
        */}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
