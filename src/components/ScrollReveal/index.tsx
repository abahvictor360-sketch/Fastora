'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Mivon-inspired scroll motion engine.
 *
 * Mounted once in the frontend layout. It drives three effects from plain
 * HTML data-attributes, so server components can opt in without shipping any
 * client code of their own:
 *
 *   [data-reveal]        reveal-on-enter (fade / up / left / right / scale / mask)
 *   [data-reveal-group]  auto-stagger every [data-reveal] descendant
 *   [data-count]         count-up numbers when the element enters the viewport
 *
 * All motion is disabled for users who prefer reduced motion.
 */
export const ScrollReveal = () => {
  // This component lives in the persistent layout. Re-run on every route change
  // so newly mounted [data-reveal] elements get observed — otherwise they'd stay
  // hidden (opacity:0) after client-side navigation.
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // ---- stagger: assign incremental delays inside a group ------------
    const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]')
    groups.forEach((group) => {
      const step = Number(group.dataset.revealGroup) || 90
      const items = group.querySelectorAll<HTMLElement>('[data-reveal]')
      items.forEach((item, i) => {
        if (!item.style.getPropertyValue('--reveal-delay')) {
          item.style.setProperty('--reveal-delay', `${i * step}ms`)
        }
      })
    })

    // ---- reveal observer ---------------------------------------------
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    revealTargets.forEach((el) => revealObserver.observe(el))

    // ---- count-up observer -------------------------------------------
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const countTargets = document.querySelectorAll<HTMLElement>('[data-count]')
    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = Number(el.dataset.count) || 0
          const suffix = el.dataset.countSuffix ?? ''
          const duration = 1400
          let startTime: number | null = null

          const tick = (now: number) => {
            if (startTime === null) startTime = now
            const progress = Math.min((now - startTime) / duration, 1)
            el.textContent = `${Math.round(easeOut(progress) * target)}${suffix}`
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.unobserve(el)
        })
      },
      { threshold: 0.4 },
    )
    countTargets.forEach((el) => countObserver.observe(el))

    return () => {
      revealObserver.disconnect()
      countObserver.disconnect()
    }
  }, [pathname])

  return null
}
