'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const PencilIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)

export const NavLink: React.FC<{
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
  exact?: boolean
  accent: string
  createHref?: string
  showManage?: boolean
}> = ({ href, label, icon, badge, exact, accent, createHref, showManage }) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname?.startsWith(href)

  return (
    <div
      className="fastora-nav-link"
      style={{ display: 'flex', alignItems: 'center', borderRadius: 8, background: isActive ? accent : 'transparent' }}
    >
      <Link
        href={href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 8px 9px 12px',
          flex: 1,
          minWidth: 0,
          textDecoration: 'none',
          color: isActive ? '#fff' : 'var(--theme-text)',
          fontSize: 14,
          fontWeight: isActive ? 600 : 500,
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
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
        {typeof badge === 'number' && badge > 0 && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '1px 7px',
              borderRadius: 999,
              background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--theme-elevation-150)',
              color: isActive ? '#fff' : accent,
              flexShrink: 0,
            }}
          >
            {badge}
          </span>
        )}
      </Link>

      {showManage && (
        <div className="fastora-nav-link__actions" style={{ display: 'flex', gap: 2, paddingRight: 6, flexShrink: 0 }}>
          <Link
            href={href}
            aria-label={`Manage ${label}`}
            title={`Manage ${label}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22,
              height: 22,
              borderRadius: 6,
              color: isActive ? 'rgba(255,255,255,0.85)' : 'var(--theme-elevation-500)',
            }}
          >
            <PencilIcon />
          </Link>
          {createHref && (
            <Link
              href={createHref}
              aria-label={`Add new ${label}`}
              title={`Add new ${label}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: 6,
                color: isActive ? 'rgba(255,255,255,0.85)' : 'var(--theme-elevation-500)',
              }}
            >
              <PlusIcon />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
