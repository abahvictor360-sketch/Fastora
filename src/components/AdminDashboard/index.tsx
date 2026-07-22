import React from 'react'
import Link from 'next/link'

import { getDashboardData } from '@/utilities/getDashboardData'
import { AreaChart, BarStat, DonutChart, ProgressRing, ACCENT, MUTED } from './charts'

const BG = '#0E0C0A'
const CARD = '#17140F'
const BORDER = '#2A2620'
const TEXT = '#ECEAE4'

const cardStyle: React.CSSProperties = {
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  padding: 24,
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const QUICK_ACTIONS = [
  { label: 'Add New Page', href: '/admin/collections/pages/create', icon: '📄' },
  { label: 'Write an Insight', href: '/admin/collections/posts/create', icon: '✍️' },
  { label: 'Add a Service', href: '/admin/collections/services/create', icon: '⚙️' },
  { label: 'Add Case Study', href: '/admin/collections/case-studies/create', icon: '📈' },
]

const Dashboard: React.FC = async () => {
  const data = await getDashboardData()
  const { counts } = data

  const postsPublishedPct = counts.posts ? Math.round((counts.postsPublished / counts.posts) * 100) : 0
  const servicesFeaturedPct = counts.services
    ? Math.round((counts.servicesFeatured / counts.services) * 100)
    : 0
  const caseStudiesFeaturedPct = counts.caseStudies
    ? Math.round((counts.caseStudiesFeatured / counts.caseStudies) * 100)
    : 0
  const inquiriesResolvedPct = counts.inquiries
    ? Math.round((counts.inquiriesClosed / counts.inquiries) * 100)
    : 0

  return (
    <div style={{ background: BG, minHeight: '100%', padding: '32px', color: TEXT }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>Fastora Dashboard</h1>
          <p style={{ color: MUTED, marginTop: 6, fontSize: 14 }}>
            A real-time snapshot of your site&apos;s content — no fake numbers, this is what&apos;s
            actually in your CMS.
          </p>
        </div>

        {/* Quick actions row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              style={{ ...cardStyle, display: 'block', textDecoration: 'none', color: TEXT }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'rgba(200,100,47,0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}
                >
                  {action.icon}
                </span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{action.label}</span>
              </div>
              <p style={{ color: MUTED, fontSize: 12.5, marginTop: 10, marginBottom: 0 }}>
                Jump straight into a blank draft.
              </p>
            </Link>
          ))}
        </div>

        {/* Chart row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Content published (6 months)</h2>
              <span style={{ fontSize: 12, color: MUTED }}>Pages + Insights + Services + Work</span>
            </div>
            <div style={{ marginTop: 16 }}>
              <AreaChart data={data.contentByMonth} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Content by type</h2>
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <BarStat
                items={[
                  { label: 'Services', value: counts.services },
                  { label: 'Work', value: counts.caseStudies },
                  { label: 'Insights', value: counts.posts },
                  { label: 'Testimonials', value: counts.testimonials },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Metric rings + inquiries row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
          >
            {[
              { title: 'Pages', value: counts.pages, href: '/admin/collections/pages' },
              { title: 'Insights', value: counts.posts, href: '/admin/collections/posts' },
              { title: 'Media Files', value: counts.media, href: '/admin/collections/media' },
              { title: 'Categories', value: counts.categories, href: '/admin/collections/categories' },
            ].map((card) => (
              <div key={card.title} style={cardStyle}>
                <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>{card.title}</p>
                <p style={{ fontSize: 28, fontWeight: 700, margin: '6px 0 14px' }}>{card.value}</p>
                <Link
                  href={card.href}
                  style={{ fontSize: 12.5, color: ACCENT, textDecoration: 'none', fontWeight: 600 }}
                >
                  View all →
                </Link>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Inquiries</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 16 }}>
              <DonutChart
                centerLabel={String(counts.inquiries)}
                centerSublabel="total"
                segments={[
                  { label: 'New', value: counts.inquiriesNew, color: '#C8642F' },
                  { label: 'Contacted', value: counts.inquiriesContacted, color: '#E3A05E' },
                  { label: 'Closed', value: counts.inquiriesClosed, color: '#3A3630' },
                ]}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'New', value: counts.inquiriesNew, color: '#C8642F' },
                  { label: 'Contacted', value: counts.inquiriesContacted, color: '#E3A05E' },
                  { label: 'Closed', value: counts.inquiriesClosed, color: '#3A3630' },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: row.color,
                        display: 'inline-block',
                      }}
                    />
                    <span style={{ color: MUTED }}>{row.label}</span>
                    <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/admin/collections/inquiries"
              style={{
                display: 'block',
                marginTop: 16,
                fontSize: 12.5,
                color: ACCENT,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              View all inquiries →
            </Link>
          </div>
        </div>

        {/* Health rings + recent activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 20px' }}>Content health</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: 16,
              }}
            >
              {[
                { label: 'Insights published', pct: postsPublishedPct },
                { label: 'Services featured', pct: servicesFeaturedPct },
                { label: 'Work featured', pct: caseStudiesFeaturedPct },
                { label: 'Inquiries resolved', pct: inquiriesResolvedPct },
              ].map((m) => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <ProgressRing percent={m.pct} label={`${m.pct}%`} size={72} />
                  <span style={{ fontSize: 12, color: MUTED, textAlign: 'center' }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px' }}>Recently updated</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {data.recentActivity.length === 0 && (
                <p style={{ color: MUTED, fontSize: 13 }}>Nothing yet — start creating content.</p>
              )}
              {data.recentActivity.map((item) => (
                <Link
                  key={`${item.collectionLabel}-${item.id}`}
                  href={item.href}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: `1px solid ${BORDER}`,
                    textDecoration: 'none',
                    color: TEXT,
                  }}
                >
                  <span style={{ fontSize: 13.5 }}>
                    <span style={{ color: ACCENT, fontWeight: 600 }}>{item.collectionLabel}</span>{' '}
                    {item.title}
                  </span>
                  <span style={{ fontSize: 12, color: MUTED, whiteSpace: 'nowrap' }}>
                    {timeAgo(item.updatedAt)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
