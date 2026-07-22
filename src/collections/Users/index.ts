import type { CollectionConfig } from 'payload'

import { admins } from '../../access/admins'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Any authenticated user (admin or editor) can reach the admin panel and
    // read the team list, but only admins can create, edit, or remove users.
    admin: authenticated,
    create: admins,
    delete: admins,
    read: authenticated,
    update: admins,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Demo (read-only)', value: 'demo' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Admins manage everything including team members. Editors manage content. Demo accounts can browse every collection but cannot create, edit, or delete anything — safe to share. Add more roles here as needed.',
      },
      // Only admins can change roles; a user cannot escalate their own role.
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  timestamps: true,
  versions: false,
}
