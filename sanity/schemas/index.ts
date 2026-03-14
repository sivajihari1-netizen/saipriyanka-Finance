import { articleSchema }          from './article';
import { ipoAnalysisSchema }       from './ipoAnalysis';
import { regulatoryInsightSchema } from './regulatoryInsight';
import { researchItemSchema }      from './researchItem';
import { siteSettingsSchema }      from './siteSettings';

export const schemaTypes = [
  articleSchema,
  ipoAnalysisSchema,
  regulatoryInsightSchema,
  researchItemSchema,
  siteSettingsSchema,
];
