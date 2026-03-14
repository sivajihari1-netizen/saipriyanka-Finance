import { format, parseISO } from 'date-fns';

export function formatDate(dateStr: string): string {
  try { return format(parseISO(dateStr), 'MMM yyyy'); }
  catch { return dateStr; }
}

export function formatDateFull(dateStr: string): string {
  try { return format(parseISO(dateStr), 'd MMMM yyyy'); }
  catch { return dateStr; }
}

export const CATEGORY_EMOJI: Record<string, string> = {
  'Market Analysis':     '📊',
  'Finance Simplified':  '💡',
  'Capital Markets':     '🏦',
  'Regulatory Analysis': '⚖️',
};

export const RESEARCH_TYPE_COLOR: Record<string, string> = {
  framework: '#1A7A4A',
  research:  '#2E86C1',
  guide:     '#8E44AD',
  analysis:  '#C0392B',
};

export const RESEARCH_TYPE_LABEL: Record<string, string> = {
  framework: 'Framework',
  research:  'Research Note',
  guide:     'Guide',
  analysis:  'Analysis Report',
};

export const RECOMMENDATION_STYLE: Record<string, { bg: string; color: string }> = {
  'Subscribe':              { bg: '#E8F5E9', color: '#1B5E20' },
  'Subscribe — Long-term':  { bg: '#FFF8E1', color: '#E65100' },
  'Avoid':                  { bg: '#FFEBEE', color: '#B71C1C' },
  'Neutral':                { bg: '#F3F4F6', color: '#374151' },
};
