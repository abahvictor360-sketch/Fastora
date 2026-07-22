import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const siteSettings = await getCachedGlobal('site-settings', 0)()
  const brandStyle = buildBrandStyle(siteSettings)
  const url = getServerSideURL()

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}/#organization`,
    name: siteSettings?.siteName || 'Fastora',
    description: siteSettings?.tagline,
    url,
    ...(siteSettings?.contactEmail ? { email: siteSettings.contactEmail } : {}),
    ...(siteSettings?.contactPhone ? { telephone: siteSettings.contactPhone } : {}),
    ...(siteSettings?.address ? { address: siteSettings.address } : {}),
    sameAs: (siteSettings?.socialLinks || []).map((social) => social.url).filter(Boolean),
  }

  return (
    <html
      className={cn(geistSans.variable, geistMono.variable, 'h-full')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {brandStyle && <style id="fastora-brand-tokens">{brandStyle}</style>}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
