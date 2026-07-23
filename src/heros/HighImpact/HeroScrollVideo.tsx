'use client'

import React, { useEffect, useRef } from 'react'

import type { Media as MediaType } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type Props = {
  resource: MediaType
}

/**
 * Scroll-scrubbed hero video: instead of autoplaying, the video's
 * currentTime is driven directly by scroll position while its sticky
 * wrapper is pinned in view, so scrolling down plays it forward (and
 * scrolling back up reverses it) rather than on a timer.
 */
export const HeroScrollVideo: React.FC<Props> = ({ resource }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const track = trackRef.current
    if (!video || !track) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let duration = 0
    let ticking = false

    const onLoadedMetadata = () => {
      duration = video.duration || 0
    }
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    if (video.readyState >= 1) duration = video.duration || 0

    if (prefersReducedMotion) {
      // Respect the user's motion preference: play through normally instead.
      video.muted = true
      video.loop = true
      video.play().catch(() => {})
      return () => video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }

    const updateFromScroll = () => {
      ticking = false
      if (!duration) return

      const rect = track.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      if (scrollableDistance <= 0) return

      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)
      const targetTime = progress * duration

      if (Number.isFinite(targetTime) && Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateFromScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateFromScroll()

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div ref={trackRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div
          className="container relative z-10"
          data-reveal="scale"
        >
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-primary-foreground/10 shadow-2xl">
            <video
              ref={videoRef}
              className="block w-full"
              muted
              playsInline
              preload="auto"
              aria-label={resource.alt || 'Fastora product preview'}
            >
              <source src={getMediaUrl(`/media/${resource.filename}`)} type={resource.mimeType || 'video/mp4'} />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
