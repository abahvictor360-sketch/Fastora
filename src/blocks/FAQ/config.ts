import type { Block } from 'payload'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'FAQ',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Questions, answered directly',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      admin: {
        description:
          'Written in direct question-and-answer format so AI search engines (ChatGPT, Perplexity, Google AI Overviews) can cite them.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
