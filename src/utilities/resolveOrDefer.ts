import { connection } from 'next/server'

/**
 * Runs a content fetch, and when the API is unreachable rather than empty,
 * takes the page out of prerendering instead of letting the failure escape.
 *
 * The site is statically generated against a Laravel backend on shared
 * hosting, which occasionally answers a burst of build-time requests with a
 * 500 and then serves the very same paths fine seconds later. Two things used
 * to happen when it did, both wrong:
 *
 *  - the error escaped a page body and killed the whole build ("Export
 *    encountered an error on /(frontend)/[slug]/page: /consultation"), so a
 *    blip on the API meant no deploy at all
 *  - or `safely(..., null)` swallowed it, the page read the null as "no such
 *    document" and called `notFound()`, baking a 404 for a page that exists
 *
 * `connection()` gives the third answer, which is the accurate one: we don't
 * know yet. It stops prerendering at this point, so the route is rendered on
 * the first real request instead — by which time the API is almost always
 * answering again — and cached from there like any other page.
 *
 * At request time `connection()` resolves immediately, so the retry below is
 * the second and final attempt; if that also fails the error propagates and
 * the request gets an error page, rather than a 404 that would tell crawlers
 * the page is gone.
 */
export async function resolveOrDefer<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.warn('[fastora] content fetch failed, deferring page to request time:', error)

    // Prerendering stops here; everything below runs only on a real request.
    await connection()

    return await fn()
  }
}
