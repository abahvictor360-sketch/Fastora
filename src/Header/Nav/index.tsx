'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-6">
      <ul className="hidden md:flex items-center gap-6">
        {navItems.map(({ link }, i) => (
          <li key={i}>
            <CMSLink
              {...link}
              appearance="inline"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            />
          </li>
        ))}
      </ul>
      <CMSLink
        type="custom"
        url="/contact"
        label="Start a project"
        appearance="default"
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      />
    </nav>
  )
}
