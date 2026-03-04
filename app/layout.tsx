import type { Metadata, Viewport } from 'next'
import { Play } from 'next/font/google'

import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const play = Play({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-play',
})

export const metadata: Metadata = {
  title: 'Imagine AI - Create Anything With AI',
  description: 'Imagine AI - the ultimate creative platform with 90+ AI tools for generating images, videos, text, voice, and code. All models in one place.',
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
