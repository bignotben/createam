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
    // Expanded template fields — optional. Left empty, the 7 short services
    // are unaffected; the 3 key services (web-development, app-development,
    // seo-marketing) fill these in and get the richer /usluge/[slug] layout.
    {
      name: 'expertQuote',
      type: 'group',
      admin: { description: 'Expanded template only — leave empty for the short template.' },
      fields: [
        { name: 'text', type: 'textarea' },
        { name: 'attribution', type: 'text', defaultValue: 'Createam tim' },
      ],
    },
    { name: 'contextTitle', type: 'text' },
    { name: 'contextBody', type: 'richText' },
    { name: 'contextImage', type: 'upload', relationTo: 'media' },
    {
      name: 'differentiators',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'whatWeDo',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'proofTitle', type: 'text' },
    { name: 'proofBody', type: 'richText' },
    { name: 'proofImage', type: 'upload', relationTo: 'media' },
    {
      name: 'processSteps',
      type: 'array',
      fields: [
        { name: 'stepTitle', type: 'text', required: true },
        { name: 'stepDescription', type: 'textarea' },
        { name: 'stepImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea' },
      ],
    },
  ],
}
