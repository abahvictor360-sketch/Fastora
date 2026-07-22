import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const url = getServerSideURL()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/next', '/login'],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  }
}
