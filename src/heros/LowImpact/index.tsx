import React from 'react'

import type { HeroData } from '@/heros/types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<HeroData, 'richText'> & {
      children?: never
      richText?: HeroData['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = (props) => {
  const { children, richText } = props
  const media = 'media' in props ? props.media : undefined
  const hasImage = media && typeof media === 'object'

  if (hasImage) {
    return (
      <div className="relative min-h-[28rem] overflow-hidden bg-primary md:min-h-[34rem]" data-reveal="up">
        <Media resource={media} fill imgClassName="object-cover" priority />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/10" />
        <div className="container relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-[48rem] [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:tracking-tight [&_h1]:text-primary-foreground md:[&_h1]:text-6xl [&_p]:mt-6 [&_p]:text-lg [&_p]:text-primary-foreground/70">
            {children || (richText && <RichText data={richText} enableGutter={false} />)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container pt-32 pb-8 md:pt-40" data-reveal="up">
      <div className="max-w-[48rem] [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:tracking-tight md:[&_h1]:text-6xl [&_p]:mt-6 [&_p]:text-lg [&_p]:text-muted-foreground">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
