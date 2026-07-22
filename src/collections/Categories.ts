import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticatedNotDemo } from '../access/authenticatedNotDemo'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticatedNotDemo,
    delete: authenticatedNotDemo,
    read: anyone,
    update: authenticatedNotDemo,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
  ],
}
