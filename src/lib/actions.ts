'use server';

import { analyzePaperwork as analyzePaperworkFlow, AnalyzePaperworkInput } from '@/ai/flows/analyze-paperwork';
import { locateNearbyGovernmentOffices as locateNearbyGovernmentOfficesFlow, LocateNearbyGovernmentOfficesInput } from '@/ai/flows/locate-nearby-government-offices';
import { multilingualVoiceChat as multilingualVoiceChatFlow, MultilingualVoiceChatInput } from '@/ai/flows/multilingual-voice-chat';

export async function analyzePaperwork(input: AnalyzePaperworkInput) {
    // Here we could add validation, logging, etc. before calling the flow.
    return await analyzePaperworkFlow(input);
}

export async function locateNearbyGovernmentOffices(input: LocateNearbyGovernmentOfficesInput) {
    return await locateNearbyGovernmentOfficesFlow(input);
}

export async function getChatResponse(input: MultilingualVoiceChatInput) {
    return await multilingualVoiceChatFlow(input);
}
