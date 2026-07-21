'use client'
import Link from 'next/link'
import React from 'react'

import type { Header, SiteSetting } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  siteSettings: SiteSetting
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, siteSettings }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex items-center justify-between py-5">
        <Link href="/" className="shrink-0">
          <Logo
            loading="eager"
            priority="high"
            media={siteSettings?.logoLight}
            siteName={siteSettings?.siteName}
          />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
