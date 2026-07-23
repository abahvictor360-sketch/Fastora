import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { NavLink } from './NavLink'
import { iconStroke } from './icons'

const icons = {
  dashboard: iconStroke(<><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>),
  pages: iconStroke(<><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v3h3" /><path d="M9 12h6M9 16h6" /></>),
  posts: iconStroke(<><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h4" /></>),
  services: iconStroke(<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>),
  work: iconStroke(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  testimonials: iconStroke(<><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1-5.7a8.4 8.4 0 0 1-1-4A8.38 8.38 0 0 1 11.5 2h.5a8.4 8.4 0 0 1 9 9z" /></>),
  inquiries: iconStroke(<><path d="M4 4h16v14H8l-4 4z" /></>),
  media: iconStroke(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5-9 9" /></>),
  categories: iconStroke(<><path d="M3 6h18M3 12h18M3 18h9" /></>),
  users: iconStroke(<><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3 3-5 7-5s7 2 7 5" /><circle cx="18" cy="8" r="2.4" /><path d="M16 14.5c2.7.4 5 2.2 5 5.5" /></>),
  settings: iconStroke(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.7.7 1.2 1.5 1.4h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>),
}

export default async function Nav() {
  const payload = await getPayload({ config: configPromise })

  const [pages, posts, services, caseStudies, testimonials, inquiriesNew, media, categories, users, siteSettings] =
    await Promise.all([
      payload.count({ collection: 'pages' }),
      payload.count({ collection: 'posts' }),
      payload.count({ collection: 'services' }),
      payload.count({ collection: 'case-studies' }),
      payload.count({ collection: 'testimonials' }),
      payload.count({ collection: 'inquiries', where: { status: { equals: 'new' } } }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'categories' }),
      payload.count({ collection: 'users' }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

  // Same brand accent the public site uses (Site Settings → Brand → Accent
  // color), so the admin never drifts out of sync with it.
  const accent = siteSettings?.accentColor?.trim() || '#C8642F'

  const items = [
    { href: '/admin', label: 'Dashboard', icon: icons.dashboard, exact: true },
    { href: '/admin/collections/pages', label: 'Pages', icon: icons.pages, badge: pages.totalDocs },
    { href: '/admin/collections/posts', label: 'Insights', icon: icons.posts, badge: posts.totalDocs },
    { href: '/admin/collections/services', label: 'Services', icon: icons.services, badge: services.totalDocs },
    { href: '/admin/collections/case-studies', label: 'Work', icon: icons.work, badge: caseStudies.totalDocs },
    {
      href: '/admin/collections/testimonials',
      label: 'Testimonials',
      icon: icons.testimonials,
      badge: testimonials.totalDocs,
    },
    {
      href: '/admin/collections/inquiries',
      label: 'Inquiries',
      icon: icons.inquiries,
      badge: inquiriesNew.totalDocs,
    },
    { href: '/admin/collections/media', label: 'Media Files', icon: icons.media, badge: media.totalDocs },
    {
      href: '/admin/collections/categories',
      label: 'Categories',
      icon: icons.categories,
      badge: categories.totalDocs,
    },
    { href: '/admin/collections/users', label: 'Users', icon: icons.users, badge: users.totalDocs },
    { href: '/admin/globals/site-settings', label: 'Site Settings', icon: icons.settings },
  ]

  return (
    <>
      {/* Overrides the static fallback in custom.scss with the real Site
          Settings accent, so every "Save"/"Publish" button and link across
          the whole admin — not just this Nav — matches the live site. */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `:root{--fastora-accent:${accent};--fastora-accent-hover:${accent};}`,
        }}
      />
      <nav
        style={{
          background: 'var(--theme-elevation-50)',
          borderRight: '1px solid var(--theme-border-color)',
          width: 248,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 14px',
          boxSizing: 'border-box',
          color: 'var(--theme-text)',
          fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
      <Link
        href="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '4px 8px 20px',
          textDecoration: 'none',
          color: 'var(--theme-text)',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect width="28" height="28" rx="7" fill={accent} />
          <path d="M9 7.5h10v3.2h-6.5v3.1H18v3.1h-5.5V21H9V7.5Z" fill="#101014" />
        </svg>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }}>Fastora</span>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {items.map((item) => (
          <NavLink key={item.href} accent={accent} {...item} />
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--theme-border-color)', paddingTop: 12, marginTop: 12 }}>
        <a
          href="/admin/logout"
          style={{
            display: 'block',
            padding: '9px 12px',
            fontSize: 13,
            color: 'var(--theme-elevation-500)',
            textDecoration: 'none',
          }}
        >
          Log out
        </a>
      </div>
      </nav>
    </>
  )
}
