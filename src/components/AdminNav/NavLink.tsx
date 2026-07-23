'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NavLink: React.FC<{
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
  exact?: boolean
  accent: string
}> = ({ href, label, icon, badge, exact, accent }) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname?.startsWith(href)

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 8,
        textDecoration: 'none',
        color: isActive ? '#fff' : 'var(--theme-text)',
        background: isActive ? accent : 'transparent',
        fontSize: 13.5,
        fontWeight: isActive ? 600 : 500,
        transition: 'background 0.15s ease',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          width: 18,
          height: 18,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isActive ? 1 : 0.75,
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {typeof badge === 'number' && badge > 0 && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '1px 7px',
            borderRadius: 999,
            background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--theme-elevation-150)',
            color: isActive ? '#fff' : accent,
          }}
        >
          {badge}
        </span>
      )}
    </Link>
  )
}
