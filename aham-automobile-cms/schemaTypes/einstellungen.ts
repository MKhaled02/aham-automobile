// schemas/einstellungen.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'einstellungen',
  title: 'Website Einstellungen',
  type: 'document',

  fields: [
    defineField({
      name: 'firmenname',
      title: 'Firmenname',
      type: 'string',
      initialValue: 'AHAM Automobile'
    }),

    defineField({
      name: 'telefon',
      title: 'Telefonnummer',
      type: 'string'
    }),

    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string'
    }),

    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'object',
      fields: [
        { name: 'strasse', title: 'Straße & Nr.', type: 'string' },
        { name: 'plz', title: 'PLZ', type: 'string' },
        { name: 'ort', title: 'Ort', type: 'string' }
      ]
    }),

    defineField({
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'tage', title: 'Tage', type: 'string', placeholder: 'Mo - Fr' },
            { name: 'zeiten', title: 'Zeiten', type: 'string', placeholder: '10:00 - 18:00' }
          ]
        }
      ]
    }),

    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Embed URL',
      type: 'url'
    }),

    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'whatsapp', title: 'WhatsApp Nummer', type: 'string' }
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Website Einstellungen'
      }
    }
  }
})