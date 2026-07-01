import type { CollectionConfig } from 'payload'

import { seoField } from '@/fields/seo'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'year', 'featured'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'client', type: 'text', required: true },
    {
      name: 'servicesUsed',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    { name: 'year', type: 'text' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Web dizajn', value: 'web-design' },
        { label: 'WordPress', value: 'wordpress' },
        { label: 'App', value: 'app' },
        { label: 'Brend & sadržaj', value: 'brand-content' },
        { label: 'SEO & Marketing', value: 'seo-marketing' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'problem', type: 'richText' },
    { name: 'approach', type: 'richText' },
    { name: 'result', type: 'richText' },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'quote',
      type: 'group',
      fields: [
        { name: 'text', type: 'textarea' },
        { name: 'author', type: 'text' },
      ],
    },
    seoField,
  ],
}
