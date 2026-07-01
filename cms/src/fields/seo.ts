import type { Field } from 'payload'

export const seoFields: Field[] = [
  { name: 'metaTitle', type: 'text' },
  { name: 'metaDescription', type: 'textarea' },
]

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  fields: seoFields,
}
