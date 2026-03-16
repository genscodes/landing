import type { Metadata, Viewport } from 'next'
import { Play } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import { RuGeoRedirect } from '@/components/ru-geo-redirect'
import './globals.css'

const play = Play({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-play',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://imag.gg'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Imagine AI',
  url: siteUrl,
  logo: `${siteUrl}/favicon.webp`,
}

export const metadata: Metadata = {
  title: 'Imagine AI — Create Anything With AI',
  description:
    'Imagine AI — the ultimate creative platform with 90+ AI tools for generating images, videos, text, voice, and code. All models in one place.',
  metadataBase: new URL(siteUrl),
  alternates: {
    languages: {
      en: '/',
      ru: '/?hl=ru',
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Imagine AI — Create Anything With AI',
    description:
      'Generate images, videos, and more with 90+ AI models on a single platform. Fast, powerful, and built for creators.',
    siteName: 'Imagine AI',
    images: [
      {
        url: '/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Imagine AI logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imagine AI — Create Anything With AI',
    description:
      'Generate images, videos, and more with 90+ AI models on a single platform. Fast, powerful, and built for creators.',
    images: ['/og-main.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.webp',
        type: 'image/webp',
      },
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    shortcut: [
      {
        url: '/favicon.webp',
        type: 'image/webp',
      },
    ],
    apple: [
      {
        url: '/favicon.webp',
        type: 'image/webp',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${play.variable} font-sans antialiased`}>
        <RuGeoRedirect />
        <LanguageProvider>{children}</LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}
