'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ACCENT = '#C8642F'
const MUTED = '#8A8790'
const TEXT = '#ECEAE4'

export const NavLink: React.FC<{
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
  exact?: boolean
}> = ({ href, label, icon, badge, exact }) => {
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
        color: isActive ? '#fff' : TEXT,
        background: isActive ? ACCENT : 'transparent',
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
            background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(200,100,47,0.18)',
            color: isActive ? '#fff' : ACCENT,
          }}
        >
          {badge}
        </span>
      )}
    </Link>
  )
}
