import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticatedNotDemo = (args: AccessArgs<User>) => boolean

/**
 * Same as `authenticated`, but excludes the `demo` role. Use this for
 * create/update/delete on content collections so a shared demo login can
 * browse the admin panel without being able to change or destroy anything.
 */
export const authenticatedNotDemo: isAuthenticatedNotDemo = ({ req: { user } }) => {
  return Boolean(user) && user?.role !== 'demo'
}
