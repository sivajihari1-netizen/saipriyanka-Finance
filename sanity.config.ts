import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Finance Intelligence CMS',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            S.listItem()
              .title('📝 Blog Articles')
              .child(S.documentTypeList('article').title('All Articles')),
            S.listItem()
              .title('📊 IPO Analysis')
              .child(S.documentTypeList('ipoAnalysis').title('IPO Reports')),
            S.listItem()
              .title('⚖️ Regulatory Insights')
              .child(S.documentTypeList('regulatoryInsight').title('Regulatory Posts')),
            S.listItem()
              .title('📚 Research Library')
              .child(S.documentTypeList('researchItem').title('Research & PDFs')),
            S.divider(),
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
