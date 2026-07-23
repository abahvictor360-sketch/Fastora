import React from 'react'

import type { HeroData } from '@/heros/types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<HeroData, 'richText'> & {
      children?: never
      richText?: HeroData['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div className="container pt-32 pb-8 md:pt-40" data-reveal="up">
      <div className="max-w-[48rem] [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:tracking-tight md:[&_h1]:text-6xl [&_p]:mt-6 [&_p]:text-lg [&_p]:text-muted-foreground">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
