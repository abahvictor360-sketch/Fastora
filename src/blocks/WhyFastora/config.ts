import type { Block } from 'payload'

export const WhyFastora: Block = {
  slug: 'whyFastora',
  interfaceName: 'WhyFastoraBlock',
  labels: {
    singular: 'Why Fastora',
    plural: 'Why Fastora Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Why Fastora',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Engineered speed, not chaotic speed',
    },
    {
      name: 'points',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'stat',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "48hr" or "3x"' },
        },
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
