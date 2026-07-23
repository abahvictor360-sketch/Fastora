import React from 'react'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { NavLink } from './NavLink'
import { icons } from './icons'

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
  const accent = siteSettings?.accentColor?.trim() || '#2B7FD6'

  const items = [
    { href: '/admin', label: 'Dashboard', icon: icons.dashboard, exact: true },
    { href: '/admin/collections/pages', label: 'Pages', icon: icons.pages, badge: pages.totalDocs },
    { href: '/admin/collections/posts', label: 'Insights', icon: icons.posts, badge: posts.totalDocs },
    { href: '/admin/collections/services', label: 'Services', icon: icons.services, badge: services.totalDocs },
    { href: '/admin/collections/case-studies', label: 'Case Studies', icon: icons.work, badge: caseStudies.totalDocs },
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
          padding: '4px 8px 20px',
          textDecoration: 'none',
          color: 'var(--theme-text)',
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em' }}>Fastora</span>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {items.map((item) => (
          <NavLink key={item.href} accent={accent} {...item} />
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--theme-border-color)', paddingTop: 12, marginTop: 12 }}>
        {/* Payload admin logout route (not a Next page) — intentional full navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
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
