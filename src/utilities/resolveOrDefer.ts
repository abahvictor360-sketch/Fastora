import { connection } from 'next/server'

/**
 * Runs a content fetch, and when the API is unreachable rather than empty,
 * takes the page out of prerendering instead of letting the failure escape.
 *
 * This is the third answer to the problem the query wrappers below used to
 * choose between, both of whose options were wrong:
 *
 *  - `safely(..., null)` swallowed the failure, and null in a detail page
 *    means notFound() — so a blip on the API host turned into a cached 404 on
 *    a page that exists. /about, /terms-of-use and /cookie-policy all
 *    disappeared this way and came back on their own minutes later.
 *  - letting it throw kept "missing" and "unreachable" apart, but during a
 *    production build an escaping error is fatal: "Export encountered an error
 *    on /(frontend)/[slug]/page: /about, exiting the build". A 500 the API
 *    served for a few seconds meant no deploy at all.
 *
 * `connection()` says what is actually true — we don't know yet. It stops
 * prerendering at this point, so the route renders on the first real request
 * instead, by which time the API is almost always answering again, and is
 * cached from there like any other page. Nothing is baked in as a 404, and
 * the build survives.
 *
 * At request time `connection()` resolves immediately, so the retry below is
 * the second and final attempt; if that also fails the error propagates and
 * the visitor gets an error page, rather than a 404 that would tell crawlers
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
