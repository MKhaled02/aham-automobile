import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const deskStructure = (S: any) =>
  S.list()
    .title('AHAM Automobile')
    .items([
      S.listItem()
        .title('🚗 Fahrzeuge')
        .child(
          S.documentTypeList('fahrzeug')
            .title('Alle Fahrzeuge')
        ),
      
      S.divider(),
      
      S.listItem()
        .title('⚙️ Website Einstellungen')
        .child(
          S.document()
            .schemaType('einstellungen')
            .documentId('einstellungen')
        ),
      
      S.listItem()
        .title('📝 Seiteninhalte')
        .child(
          S.documentTypeList('seiteninhalt')
            .title('Seiteninhalte')
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'AHAM Automobile',

  projectId: '0v9orvow',
  dataset: 'autos',  // <-- GEÄNDERT!

  plugins: [
    structureTool({
      structure: deskStructure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,  // <-- NICHT MEHR AUSKOMMENTIERT!
  },
})