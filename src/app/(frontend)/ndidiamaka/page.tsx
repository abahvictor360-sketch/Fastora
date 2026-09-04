import type { Metadata } from 'next'
import React from 'react'

import { TeamMemberProfile, teamMemberMetadata } from '@/components/TeamMemberProfile'

const SLUG = 'ndidiamaka'

export const metadata: Metadata = teamMemberMetadata(SLUG)

export default function Page() {
  return <TeamMemberProfile slug={SLUG} />
}
