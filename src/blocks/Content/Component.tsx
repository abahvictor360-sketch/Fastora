import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { background = 'default', columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const isDark = background === 'dark'
  const isCard = background === 'card'

  const grid = (
    <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { enableLink, link, richText, size } = col

          return (
            <div
              className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                'md:col-span-2': size !== 'full',
              })}
              key={index}
            >
              {richText && (
                <RichText
                  data={richText}
                  enableGutter={false}
                  className={isDark ? 'prose-invert' : undefined}
                />
              )}

              {enableLink && <CMSLink {...link} />}
            </div>
          )
        })}
    </div>
  )

  if (isDark) {
    return (
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 md:py-24" data-reveal="up">
          {grid}
        </div>
      </section>
    )
  }

  if (isCard) {
    return (
      <div className="container my-16">
        <div
          className="rounded-[2rem] border border-border bg-card p-8 md:p-14"
          data-reveal="up"
        >
          {grid}
        </div>
      </div>
    )
  }

  return <div className="container my-16">{grid}</div>
}
