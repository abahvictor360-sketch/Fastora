import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlockType',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Client results',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Brands that move fast with us',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
