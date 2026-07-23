import type { Block } from 'payload'

export const AudienceGrid: Block = {
  slug: 'audienceGrid',
  interfaceName: 'AudienceGridBlock',
  labels: {
    singular: 'Audience Grid',
    plural: 'Audience Grid Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Who we serve',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Who we work with',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
