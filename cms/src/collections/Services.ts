import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Digital', value: 'digital' },
        { label: 'Brend & sadržaj', value: 'brand' },
        { label: 'Rast', value: 'growth' },
      ],
    },
    { name: 'order', type: 'number' },
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroSubtitle', type: 'text' },
    { name: 'intro', type: 'richText' },
    {
      name: 'whatYouGet',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'forWhom', type: 'textarea' },
    {
      name: 'howWeWork',
      type: 'array',
      fields: [
        { name: 'stepTitle', type: 'text', required: true },
        { name: 'stepDescription', type: 'textarea' },
      ],
    },
    { name: 'ctaText', type: 'text' },
    seoField,
  ],
}
