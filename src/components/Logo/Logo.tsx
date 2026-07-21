import clsx from 'clsx'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  media?: MediaType | number | null
  siteName?: string | null
  /** Text color of the fallback wordmark, used before a logo is uploaded in /admin. */
  variant?: 'light' | 'dark'
}

export const Logo: React.FC<Props> = ({
  className,
  loading = 'lazy',
  priority = 'low',
  media,
  siteName,
  variant = 'light',
}) => {
  if (media && typeof media === 'object') {
    return (
      <Media
        resource={media}
        htmlElement={null}
        imgClassName={clsx('h-8 w-auto object-contain', className)}
        loading={loading}
        priority={priority === 'high'}
      />
    )
  }

  return (
    <span
      className={clsx(
        'font-display text-xl font-semibold tracking-tight',
        variant === 'dark' ? 'text-white' : 'text-foreground',
        className,
      )}
    >
      {siteName || 'Fastora'}
    </span>
  )
}
