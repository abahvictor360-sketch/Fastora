import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Public contact endpoint. Validates and writes an Inquiry using the Payload
 * Local API with overrideAccess, so submissions are captured without exposing
 * the Inquiries collection to the public REST/GraphQL API. A hidden honeypot
 * field (`website`) silently absorbs bots.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot — real users never fill this hidden field.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const brief = typeof body.brief === 'string' ? body.brief.trim() : ''

  if (!name || !email || !brief) {
    return NextResponse.json(
      { error: 'Name, email, and a project brief are required.' },
      { status: 400 },
    )
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const company = typeof body.company === 'string' ? body.company.trim() : undefined
  const budgetRange = typeof body.budgetRange === 'string' ? body.budgetRange : undefined
  const timeline = typeof body.timeline === 'string' ? body.timeline : undefined
  const serviceNeededRaw = body.serviceNeeded
  const serviceNeeded =
    serviceNeededRaw !== undefined && serviceNeededRaw !== null && serviceNeededRaw !== ''
      ? Number(serviceNeededRaw)
      : undefined

  try {
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'inquiries',
      overrideAccess: true,
      data: {
        status: 'new',
        name,
        email,
        ...(company ? { company } : {}),
        ...(serviceNeeded && !Number.isNaN(serviceNeeded) ? { serviceNeeded } : {}),
        ...(budgetRange ? { budgetRange: budgetRange as never } : {}),
        ...(timeline ? { timeline: timeline as never } : {}),
        brief,
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong submitting your inquiry. Please try again.' },
      { status: 500 },
    )
  }
}
