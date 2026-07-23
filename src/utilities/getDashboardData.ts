import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type MonthBucket = { label: string; count: number }

export interface DashboardData {
  counts: {
    pages: number
    posts: number
    postsPublished: number
    services: number
    servicesFeatured: number
    caseStudies: number
    caseStudiesFeatured: number
    testimonials: number
    inquiries: number
    inquiriesNew: number
    inquiriesContacted: number
    inquiriesClosed: number
    media: number
    categories: number
    users: number
  }
  contentByMonth: MonthBucket[]
  recentActivity: Array<{
    id: number | string
    title: string
    collectionLabel: string
    href: string
    updatedAt: string
  }>
}

const monthLabel = (d: Date) => d.toLocaleDateString('en-US', { month: 'short' })

export async function getDashboardData(): Promise<DashboardData> {
  const payload = await getPayload({ config: configPromise })

  const [
    pages,
    posts,
    postsPublished,
    services,
    servicesFeatured,
    caseStudies,
    caseStudiesFeatured,
    testimonials,
    inquiries,
    inquiriesNew,
    inquiriesContacted,
    inquiriesClosed,
    media,
    categories,
    users,
  ] = await Promise.all([
    payload.count({ collection: 'pages' }),
    payload.count({ collection: 'posts' }),
    payload.count({ collection: 'posts', where: { _status: { equals: 'published' } } }),
    payload.count({ collection: 'services' }),
    payload.count({ collection: 'services', where: { featuredOnHome: { equals: true } } }),
    payload.count({ collection: 'case-studies' }),
    payload.count({ collection: 'case-studies', where: { featuredOnHome: { equals: true } } }),
    payload.count({ collection: 'testimonials' }),
    payload.count({ collection: 'inquiries' }),
    payload.count({ collection: 'inquiries', where: { status: { equals: 'new' } } }),
    payload.count({ collection: 'inquiries', where: { status: { equals: 'contacted' } } }),
    payload.count({ collection: 'inquiries', where: { status: { equals: 'closed' } } }),
    payload.count({ collection: 'media' }),
    payload.count({ collection: 'categories' }),
    payload.count({ collection: 'users' }),
  ])

  // Real content-creation timeline: every Page/Post/Service/Case Study createdAt,
  // bucketed by month, for the last 6 months.
  const since = new Date()
  since.setMonth(since.getMonth() - 5)
  since.setDate(1)
  since.setHours(0, 0, 0, 0)

  const [recentPages, recentPosts, recentServices, recentCaseStudies] = await Promise.all([
    payload.find({
      collection: 'pages',
      limit: 200,
      pagination: false,
      where: { createdAt: { greater_than_equal: since.toISOString() } },
      select: { createdAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 200,
      pagination: false,
      where: { createdAt: { greater_than_equal: since.toISOString() } },
      select: { createdAt: true },
    }),
    payload.find({
      collection: 'services',
      limit: 200,
      pagination: false,
      where: { createdAt: { greater_than_equal: since.toISOString() } },
      select: { createdAt: true },
    }),
    payload.find({
      collection: 'case-studies',
      limit: 200,
      pagination: false,
      where: { createdAt: { greater_than_equal: since.toISOString() } },
      select: { createdAt: true },
    }),
  ])

  const buckets: MonthBucket[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    buckets.push({ label: monthLabel(d), count: 0 })
  }

  const allDocs = [
    ...recentPages.docs,
    ...recentPosts.docs,
    ...recentServices.docs,
    ...recentCaseStudies.docs,
  ]

  for (const doc of allDocs) {
    const created = new Date(doc.createdAt as string)
    const idx = buckets.findIndex((b) => b.label === monthLabel(created))
    if (idx !== -1) buckets[idx].count += 1
  }

  // Recent activity feed across content collections, most-recently-updated first.
  const [latestPages, latestPosts, latestServices, latestCaseStudies] = await Promise.all([
    payload.find({
      collection: 'pages',
      limit: 3,
      sort: '-updatedAt',
      select: { title: true, slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-updatedAt',
      select: { title: true, slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'services',
      limit: 3,
      sort: '-updatedAt',
      select: { title: true, slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'case-studies',
      limit: 3,
      sort: '-updatedAt',
      select: { title: true, slug: true, updatedAt: true },
    }),
  ])

  const recentActivity = [
    ...latestPages.docs.map((d) => ({
      id: d.id,
      title: d.title,
      collectionLabel: 'Page',
      href: `/admin/collections/pages/${d.id}`,
      updatedAt: d.updatedAt as string,
    })),
    ...latestPosts.docs.map((d) => ({
      id: d.id,
      title: d.title,
      collectionLabel: 'Insight',
      href: `/admin/collections/posts/${d.id}`,
      updatedAt: d.updatedAt as string,
    })),
    ...latestServices.docs.map((d) => ({
      id: d.id,
      title: d.title,
      collectionLabel: 'Service',
      href: `/admin/collections/services/${d.id}`,
      updatedAt: d.updatedAt as string,
    })),
    ...latestCaseStudies.docs.map((d) => ({
      id: d.id,
      title: d.title,
      collectionLabel: 'Case Studies',
      href: `/admin/collections/case-studies/${d.id}`,
      updatedAt: d.updatedAt as string,
    })),
  ]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4)

  return {
    counts: {
      pages: pages.totalDocs,
      posts: posts.totalDocs,
      postsPublished: postsPublished.totalDocs,
      services: services.totalDocs,
      servicesFeatured: servicesFeatured.totalDocs,
      caseStudies: caseStudies.totalDocs,
      caseStudiesFeatured: caseStudiesFeatured.totalDocs,
      testimonials: testimonials.totalDocs,
      inquiries: inquiries.totalDocs,
      inquiriesNew: inquiriesNew.totalDocs,
      inquiriesContacted: inquiriesContacted.totalDocs,
      inquiriesClosed: inquiriesClosed.totalDocs,
      media: media.totalDocs,
      categories: categories.totalDocs,
      users: users.totalDocs,
    },
    contentByMonth: buckets,
    recentActivity,
  }
}
