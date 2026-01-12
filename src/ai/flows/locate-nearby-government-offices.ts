'use server';
/**
 * @fileOverview A flow that uses the googleMaps tool to find nearby government offices.
 *
 * - locateNearbyGovernmentOffices - A function that handles the retrieval of nearby government offices.
 * - LocateNearbyGovernmentOfficesInput - The input type for the locateNearbyGovernmentOffices function.
 * - LocateNearbyGovernmentOfficesOutput - The return type for the locateNearbyGovernmentOffices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocateNearbyGovernmentOfficesInputSchema = z.object({
  formType: z.string().describe('The type of government form the user is working with, e.g., Pan Card Application.'),
  userLocation: z.object({
    latitude: z.number().describe('The latitude of the user.'),
    longitude: z.number().describe('The longitude of the user.'),
  }).describe('The current location of the user.'),
});
export type LocateNearbyGovernmentOfficesInput = z.infer<typeof LocateNearbyGovernmentOfficesInputSchema>;

const LocateNearbyGovernmentOfficesOutputSchema = z.object({
  officeLocations: z.array(z.string()).describe('A list of nearby government office locations related to the form type.'),
});
export type LocateNearbyGovernmentOfficesOutput = z.infer<typeof LocateNearbyGovernmentOfficesOutputSchema>;

export async function locateNearbyGovernmentOffices(input: LocateNearbyGovernmentOfficesInput): Promise<LocateNearbyGovernmentOfficesOutput> {
  return locateNearbyGovernmentOfficesFlow(input);
}

const googleMaps = ai.defineTool({
  name: 'googleMaps',
  description: 'Finds nearby locations based on a query and user location.',
  inputSchema: z.object({
    query: z.string().describe('The search query, e.g., CSC centers, Aadhaar Kendras, or Municipal offices.'),
    latitude: z.number().describe('The latitude of the location to search near.'),
    longitude: z.number().describe('The longitude of the location to search near.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of nearby locations.'),
},
async (input) => {
    // Placeholder implementation - replace with actual googleMaps tool call
    // This tool should ideally call an external service or API to fetch the data
    return [
        `Mock Office 1 - ${input.query} near (${input.latitude}, ${input.longitude})`,
        `Mock Office 2 - ${input.query} near (${input.latitude}, ${input.longitude})`,
    ];
  }
);

const locateNearbyGovernmentOfficesPrompt = ai.definePrompt({
  name: 'locateNearbyGovernmentOfficesPrompt',
  tools: [googleMaps],
  input: {schema: LocateNearbyGovernmentOfficesInputSchema},
  output: {schema: LocateNearbyGovernmentOfficesOutputSchema},
  prompt: `You are an expert assistant helping users find nearby government offices related to the form they are working on.

  The user is working with a form of type: {{{formType}}}.
  Their current location is: Latitude: {{{userLocation.latitude}}}, Longitude: {{{userLocation.longitude}}}.

  Use the googleMaps tool to find nearby government offices related to the form type.  Pass the user's latitude and longitude to the tool.

  Return a list of office locations.
  `,
});

const locateNearbyGovernmentOfficesFlow = ai.defineFlow(
  {
    name: 'locateNearbyGovernmentOfficesFlow',
    inputSchema: LocateNearbyGovernmentOfficesInputSchema,
    outputSchema: LocateNearbyGovernmentOfficesOutputSchema,
  },
  async input => {
    const {output} = await locateNearbyGovernmentOfficesPrompt(input);
    return output!;
  }
);
