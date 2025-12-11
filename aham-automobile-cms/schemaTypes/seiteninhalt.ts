// schemas/seiteninhalt.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seiteninhalt',
  title: 'Seiteninhalt',
  type: 'document',
  
  fields: [
    defineField({
      name: 'seite',
      title: 'Seite',
      type: 'string',
      options: {
        list: [
          { title: 'Startseite - Hero', value: 'hero' },
          { title: 'Über uns', value: 'ueber-uns' },
          { title: 'Kontakt', value: 'kontakt' },
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'ueberschrift',
      title: 'Überschrift',
      type: 'string'
    }),

    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }]  // Rich Text Editor
    }),

    defineField({
      name: 'bild',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true }
    })
  ],

  preview: {
    select: {
      title: 'seite',
      subtitle: 'ueberschrift'
    }
  }
})