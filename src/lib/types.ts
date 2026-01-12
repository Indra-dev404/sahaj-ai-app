import type { AnalyzePaperworkOutput } from "@/ai/flows/analyze-paperwork";

export type Language = 'EN' | 'HI' | 'BN' | 'MR' | 'TA';

export const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'EN', name: 'English' },
  { code: 'HI', name: 'हिन्दी' }, // Hindi
  { code: 'BN', name: 'বাংলা' }, // Bengali
  { code: 'MR', name: 'मराठी' }, // Marathi
  { code: 'TA', name: 'தமிழ்' }, // Tamil
];

export type AnalysisResult = AnalyzePaperworkOutput;

export type AnalysisState = 'idle' | 'loading' | 'success' | 'error';
