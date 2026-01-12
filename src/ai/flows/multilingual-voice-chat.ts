'use server';
/**
 * @fileOverview A multilingual voice-first chat flow.
 *
 * - multilingualVoiceChat - A function that handles the multilingual voice chat process.
 * - MultilingualVoiceChatInput - The input type for the multilingualVoiceChat function.
 * - MultilingualVoiceChatOutput - The return type for the multilingualVoiceChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const MultilingualVoiceChatInputSchema = z.object({
  query: z.string().describe('The user query in their native language.'),
  language: z.enum(['en', 'hi', 'bn', 'mr', 'ta']).describe('The language of the user query.'),
  formAnalysis: z.string().describe('The JSON analysis of the form to provide context.'),
});
export type MultilingualVoiceChatInput = z.infer<typeof MultilingualVoiceChatInputSchema>;

const MultilingualVoiceChatOutputSchema = z.object({
  responseText: z.string().describe('The response text from the AI in the user specified language.'),
  responseAudio: z.string().describe('The audio data of the AI response in WAV format.'),
});
export type MultilingualVoiceChatOutput = z.infer<typeof MultilingualVoiceChatOutputSchema>;

export async function multilingualVoiceChat(input: MultilingualVoiceChatInput): Promise<MultilingualVoiceChatOutput> {
  return multilingualVoiceChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'multilingualVoiceChatPrompt',
  input: {schema: MultilingualVoiceChatInputSchema},
  output: {schema: z.string().describe('The response text from the AI in the user specified language.')},
  prompt: `You are a helpful AI assistant that specializes in explaining government paperwork in simple terms.
  You are able to respond in English, Hindi, Bengali, Marathi, and Tamil.
  The user will provide a question about a form, and you should answer it based on the analysis of the form.
  The analysis of the form is as follows:
  {{{formAnalysis}}}
  The user\'s question is:
  {{{query}}}
  Respond in the language specified by the user.
  The language is: {{{language}}}`,
});

const multilingualVoiceChatFlow = ai.defineFlow(
  {
    name: 'multilingualVoiceChatFlow',
    inputSchema: MultilingualVoiceChatInputSchema,
    outputSchema: MultilingualVoiceChatOutputSchema,
  },
  async input => {
    const {output: responseText} = await prompt(input);

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // TODO: make voice configurable and language-specific
          },
        },
      },
      prompt: responseText!,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const responseAudio = 'data:audio/wav;base64,' + (await toWav(audioBuffer));
    return {responseText: responseText!, responseAudio};
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
