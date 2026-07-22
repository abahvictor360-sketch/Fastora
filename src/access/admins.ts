import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAdmin = (args: AccessArgs<User>) => boolean

/**
 * Grants access only to users with the `admin` role. Content collections stay
 * open to any authenticated user (admin or editor); this guards higher-trust
 * actions like managing other users. Add more roles to the Users `role` field
 * and extend the checks here as the team grows.
 */
export const admins: isAdmin = ({ req: { user } }) => {
  return user?.role === 'admin'
}
