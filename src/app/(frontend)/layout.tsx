import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import React from 'react'
import { draftMode } from 'next/headers'

import { cn } from '@/utilities/ui'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { ScrollReveal } from '@/components/ScrollReveal'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { buildBrandStyle } from '@/utilities/brandTokens'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const siteSettings = await getCachedGlobal('site-settings', 0)()
  const brandStyle = buildBrandStyle(siteSettings)

  return (
    <html
      className={cn(inter.variable, spaceGrotesk.variable, 'h-full')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {brandStyle && <style id="fastora-brand-tokens">{brandStyle}</style>}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;clip-path:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Fastora — Digital Services & Social Media Agency',
    template: '%s | Fastora',
  },
  description:
    'Fastora is a digital services and social media agency built for speed and smart execution.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
