import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const url = getServerSideURL()

  const [pages, posts, services, caseStudies] = await Promise.all([
    payload.find({
      collection: 'pages',
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'services',
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'case-studies',
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${url}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${url}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${url}/case-studies`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${url}/insights`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${url}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${url}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const pageRoutes: MetadataRoute.Sitemap = pages.docs
    .filter((page) => !['home'].includes(page.slug || ''))
    .map((page) => ({
      url: `${url}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  const postRoutes: MetadataRoute.Sitemap = posts.docs.map((post) => ({
    url: `${url}/insights/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = services.docs.map((service) => ({
    url: `${url}/services/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.docs.map((study) => ({
    url: `${url}/case-studies/${study.slug}`,
    lastModified: study.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...postRoutes, ...pageRoutes]
}
