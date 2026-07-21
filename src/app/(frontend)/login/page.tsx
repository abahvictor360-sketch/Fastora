import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to the Fastora dashboard.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* ambient accent glow, matching the hero */}
      <div
        className="animate-float pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(200,100,47,0.28), transparent 62%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="container relative z-10 flex min-h-[80vh] items-center justify-center py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center" data-reveal="up">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground">
                F
              </span>
              Fastora
            </Link>
            <h1 className="mt-6 text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-primary-foreground/60">
              Sign in to manage your website.
            </p>
          </div>

          <div
            data-reveal="up"
            className="rounded-3xl border border-primary-foreground/10 bg-card/60 p-8 backdrop-blur"
          >
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-xs text-primary-foreground/40">
            Protected area. Authorized administrators only.
          </p>
        </div>
      </div>
    </section>
  )
}
