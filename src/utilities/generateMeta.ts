import type { Metadata } from 'next'

import type { Media, Page, Post, Service, CaseStudy, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return undefined
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Service> | Partial<CaseStudy> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title + ' | Fastora' : 'Fastora'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    // `absolute` bypasses the root layout's `%s | Fastora` title template —
    // without it Next appends the template on top of the suffix we already
    // added above, producing "Page | Fastora | Fastora".
    title: { absolute: title },
  }
}
