'use server';

/**
 * @fileOverview Analyzes paperwork, extracts key information, simplifies complex terms, and provides actionable insights in multiple languages.
 *
 * - analyzePaperwork - A function that handles the paperwork analysis process.
 * - AnalyzePaperworkInput - The input type for the analyzePaperwork function.
 * - AnalyzePaperworkOutput - The return type for the analyzePaperwork function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePaperworkInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      'A document (PDF or image) as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  language: z
    .enum(['EN', 'HI', 'BN', 'MR', 'TA'])
    .describe('The language to translate the simplified explanation to.'),
});
export type AnalyzePaperworkInput = z.infer<typeof AnalyzePaperworkInputSchema>;

const AnalyzePaperworkOutputSchema = z.object({
  fieldNames: z.array(z.string()).describe('The names of the fields in the document.'),
  originalTerms: z.array(z.string()).describe('The original terms used in the document.'),
  simplifiedExplanations:
    z.array(z.string()).describe('Simplified explanations of the original terms, translated to the target language.'),
  requiredActions: z.array(z.string()).describe('The actions the user needs to take based on the document.'),
  verifiedResources: z.array(z.string()).describe('Links to verified government portals and filing resources.'),
});
export type AnalyzePaperworkOutput = z.infer<typeof AnalyzePaperworkOutputSchema>;

export async function analyzePaperwork(
  input: AnalyzePaperworkInput
): Promise<AnalyzePaperworkOutput> {
  return analyzePaperworkFlow(input);
}

const analyzePaperworkPrompt = ai.definePrompt({
  name: 'analyzePaperworkPrompt',
  input: {schema: AnalyzePaperworkInputSchema},
  output: {schema: AnalyzePaperworkOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing government paperwork and simplifying complex legal terms for citizens.

  Analyze the provided document and extract the following information:
  - Field Names: Identify all the fields present in the document.
  - Original Terms: List the original, complex terms used in the document.
  - Simplified Explanations: Provide simplified explanations for each of the original terms in {{{language}}}, making them easy to understand for the average citizen.
  - Required Actions: Determine the actions the user needs to take based on the document's requirements.

  After analyzing the document, use the googleSearch tool to find verified government portals and filing resources related to the document.

  Here is the document: {{media url=documentDataUri}}

  Ensure that the simplified explanations are translated to the language specified in the input.
`,
});

const analyzePaperworkFlow = ai.defineFlow(
  {
    name: 'analyzePaperworkFlow',
    inputSchema: AnalyzePaperworkInputSchema,
    outputSchema: AnalyzePaperworkOutputSchema,
  },
  async input => {
    const {output} = await analyzePaperworkPrompt(input);
    return output!;
  }
);
