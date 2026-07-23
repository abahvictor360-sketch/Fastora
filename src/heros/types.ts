import type { Page } from '@/payload-types'

/** Shared shape passed to hero variant components, assembled from Pages' flat heroType/heroRichText/heroLinks/heroMedia fields by RenderHero. */
export type HeroData = {
  links?: Page['heroLinks']
  media?: Page['heroMedia']
  richText?: Page['heroRichText']
  type?: Page['heroType']
}
