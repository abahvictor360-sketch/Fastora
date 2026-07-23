import type { Block } from 'payload'

export const OurProcess: Block = {
  slug: 'ourProcess',
  interfaceName: 'OurProcessBlock',
  labels: {
    singular: 'Our Process',
    plural: 'Our Process Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our process',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'How we work with you',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
