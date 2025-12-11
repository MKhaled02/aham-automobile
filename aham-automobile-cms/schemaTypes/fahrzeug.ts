// schemas/fahrzeug.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fahrzeug',
  title: 'Fahrzeug',
  type: 'document',
  
  // Gruppen für bessere Übersicht im Dashboard
  groups: [
    { name: 'basis', title: 'Basisdaten', default: true },
    { name: 'details', title: 'Details' },
    { name: 'medien', title: 'Bilder' },
    { name: 'status', title: 'Status & Preis' },
  ],

  fields: [
    // ============ BASISDATEN ============
    defineField({
      name: 'marke',
      title: 'Marke',
      type: 'string',
      group: 'basis',
      validation: Rule => Rule.required().error('Marke ist erforderlich'),
      options: {
        list: [
          'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Opel',
          'Ford', 'Peugeot', 'Renault', 'Skoda', 'Seat', 'Toyota',
          'Hyundai', 'Kia', 'Mazda', 'Nissan', 'Honda', 'Volvo',
          'Porsche', 'Mini', 'Fiat', 'Citroën', 'Dacia', 'Sonstige'
        ]
      }
    }),

    defineField({
      name: 'modell',
      title: 'Modell',
      type: 'string',
      group: 'basis',
      validation: Rule => Rule.required().error('Modell ist erforderlich'),
      placeholder: 'z.B. A4 Avant, Golf 8, C-Klasse'
    }),

    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      group: 'basis',
      description: 'Wird automatisch generiert. Das ist der Teil der URL: /fahrzeuge/[slug]',
      options: {
        source: (doc) => `${doc.marke}-${doc.modell}-${doc.baujahr}`,
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/ä/g, 'ae')
          .replace(/ö/g, 'oe')
          .replace(/ü/g, 'ue')
          .replace(/ß/g, 'ss')
          .slice(0, 96)
      },
      validation: Rule => Rule.required().error('URL-Slug ist erforderlich')
    }),

    defineField({
      name: 'baujahr',
      title: 'Erstzulassung / Baujahr',
      type: 'number',
      group: 'basis',
      validation: Rule => Rule.required().min(1990).max(new Date().getFullYear() + 1),
      initialValue: new Date().getFullYear()
    }),

    // ============ DETAILS ============
    defineField({
      name: 'kilometerstand',
      title: 'Kilometerstand',
      type: 'number',
      group: 'details',
      validation: Rule => Rule.required().min(0),
      description: 'Nur die Zahl eingeben, z.B. 45000'
    }),

    defineField({
      name: 'kraftstoff',
      title: 'Kraftstoff',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Benzin', value: 'benzin' },
          { title: 'Diesel', value: 'diesel' },
          { title: 'Elektro', value: 'elektro' },
          { title: 'Hybrid (Benzin)', value: 'hybrid-benzin' },
          { title: 'Hybrid (Diesel)', value: 'hybrid-diesel' },
          { title: 'Plug-in-Hybrid', value: 'plugin-hybrid' },
          { title: 'Erdgas (CNG)', value: 'erdgas' },
          { title: 'Autogas (LPG)', value: 'autogas' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'getriebe',
      title: 'Getriebe',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Automatik', value: 'automatik' },
          { title: 'Schaltgetriebe', value: 'schaltung' },
          { title: 'Halbautomatik', value: 'halbautomatik' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'leistungPS',
      title: 'Leistung (PS)',
      type: 'number',
      group: 'details',
      validation: Rule => Rule.min(1).max(2000)
    }),

    defineField({
      name: 'leistungKW',
      title: 'Leistung (kW)',
      type: 'number',
      group: 'details',
      description: 'Optional - wird oft automatisch berechnet',
      readOnly: false
    }),

    defineField({
      name: 'hubraum',
      title: 'Hubraum (ccm)',
      type: 'number',
      group: 'details',
      description: 'z.B. 1968 für 2.0 Liter'
    }),

    defineField({
      name: 'farbe',
      title: 'Außenfarbe',
      type: 'string',
      group: 'details'
    }),

    defineField({
      name: 'tupielen',
      title: 'Anzahl Türen',
      type: 'number',
      group: 'details',
      options: {
        list: [2, 3, 4, 5]
      }
    }),

    defineField({
      name: 'fahrzeugtyp',
      title: 'Fahrzeugtyp',
      type: 'string',
      group: 'details',
      options: {
        list: [
          'Limousine', 'Kombi', 'SUV', 'Kleinwagen', 'Kompaktklasse',
          'Cabrio', 'Coupé', 'Van', 'Transporter', 'Pick-up'
        ]
      }
    }),

    defineField({
      name: 'ausstattung',
      title: 'Ausstattung',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'z.B. Navi, Leder, Sitzheizung, LED-Scheinwerfer'
    }),

    defineField({
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
      group: 'details',
      rows: 6,
      description: 'Freitext für zusätzliche Infos zum Fahrzeug'
    }),

    // ============ BILDER ============
    defineField({
      name: 'hauptbild',
      title: 'Hauptbild',
      type: 'image',
      group: 'medien',
      description: 'Das Bild, das in der Übersicht angezeigt wird',
      options: {
        hotspot: true  // Ermöglicht Fokuspunkt-Auswahl
      },
      validation: Rule => Rule.required().error('Ein Hauptbild ist erforderlich')
    }),

    defineField({
      name: 'galerie',
      title: 'Weitere Bilder',
      type: 'array',
      group: 'medien',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      options: {
        layout: 'grid'
      },
      description: 'Alle weiteren Bilder des Fahrzeugs'
    }),

    // ============ STATUS & PREIS ============
    defineField({
      name: 'preis',
      title: 'Preis (€)',
      type: 'number',
      group: 'status',
      validation: Rule => Rule.required().min(0),
      description: 'Verkaufspreis in Euro (nur Zahl, z.B. 24900)'
    }),

    defineField({
      name: 'preisArt',
      title: 'Preisart',
      type: 'string',
      group: 'status',
      options: {
        list: [
          { title: 'Festpreis', value: 'festpreis' },
          { title: 'Verhandlungsbasis', value: 'vb' },
          { title: 'Preis auf Anfrage', value: 'aufAnfrage' }
        ]
      },
      initialValue: 'festpreis'
    }),

    defineField({
      name: 'mwst',
      title: 'MwSt. ausweisbar',
      type: 'boolean',
      group: 'status',
      initialValue: true,
      description: 'Haken setzen wenn MwSt. ausgewiesen werden kann'
    }),

    defineField({
      name: 'status',
      title: 'Verkaufsstatus',
      type: 'string',
      group: 'status',
      options: {
        list: [
          { title: '🟢 Verfügbar', value: 'verfuegbar' },
          { title: '🟡 Reserviert', value: 'reserviert' },
          { title: '🔴 Verkauft', value: 'verkauft' }
        ],
        layout: 'radio'
      },
      initialValue: 'verfuegbar',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'badge',
      title: 'Besonderes Label',
      type: 'string',
      group: 'status',
      description: 'Optional: Wird als Badge auf dem Bild angezeigt',
      options: {
        list: [
          { title: 'Neu eingetroffen', value: 'neu' },
          { title: 'Top Angebot', value: 'top' },
          { title: 'Reduziert', value: 'reduziert' },
          { title: 'Mit Garantie', value: 'garantie' },
          { title: 'Tüv Neu', value: 'tuev' },
        ]
      }
    }),
  ],

  // Preview im Dashboard
  preview: {
    select: {
      title: 'modell',
      marke: 'marke',
      baujahr: 'baujahr',
      preis: 'preis',
      status: 'status',
      media: 'hauptbild'
    },
    prepare({ title, marke, baujahr, preis, status, media }: { title: string; marke: string; baujahr: number; preis: number; status: 'verfuegbar' | 'reserviert' | 'verkauft'; media: any }) {
      const statusEmoji = {
        verfuegbar: '🟢',
        reserviert: '🟡',
        verkauft: '🔴'
      }
      return {
        title: `${marke} ${title}`,
        subtitle: `${baujahr} • ${preis?.toLocaleString('de-DE')}€ ${statusEmoji[status] || ''}`,
        media
      }
    }
  },

  // Sortierung im Dashboard
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'neuesteZuerst',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Preis aufsteigend',
      name: 'preisAuf',
      by: [{ field: 'preis', direction: 'asc' }]
    },
    {
      title: 'Preis absteigend',
      name: 'preisAb',
      by: [{ field: 'preis', direction: 'desc' }]
    }
  ]
})