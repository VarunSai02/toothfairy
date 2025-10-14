'use server';
/**
 * @fileOverview Generates billing codes for a free dental visit based on user plan and provider data.
 *
 * - generateFreeVisitBillingCodes - A function that generates billing codes for a free dental visit.
 * - FreeVisitBillingCodeInput - The input type for the generateFreeVisitBillingCodes function.
 * - FreeVisitBillingCodeOutput - The return type for the generateFreeVisitBillingCodes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FreeVisitBillingCodeInputSchema = z.object({
  planDetails: z
    .string()
    .describe('Details of the user dental insurance plan.'),
  providerDetails: z
    .string()
    .describe('Details of the preferred dental provider.'),
  userSymptoms: z
    .string()
    .describe('Description of the user dental symptoms and needs.'),
});
export type FreeVisitBillingCodeInput = z.infer<typeof FreeVisitBillingCodeInputSchema>;

const FreeVisitBillingCodeOutputSchema = z.object({
  billingCodes: z
    .string()
    .describe(
      'A comma separated list of possible ADA billing codes that could be used for the free dental visit based on the users plan, provider and symptoms.'
    ),
  qualificationDetails: z
    .string()
    .describe(
      'An explanation of whether the user qualifies for a free dental visit based on their plan and symptoms.'
    ),
});
export type FreeVisitBillingCodeOutput = z.infer<typeof FreeVisitBillingCodeOutputSchema>;

export async function generateFreeVisitBillingCodes(
  input: FreeVisitBillingCodeInput
): Promise<FreeVisitBillingCodeOutput> {
  return freeVisitBillingCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'freeVisitBillingCodePrompt',
  input: {schema: FreeVisitBillingCodeInputSchema},
  output: {schema: FreeVisitBillingCodeOutputSchema},
  prompt: `You are an expert dental billing code generator.

You will use information about the patient's dental plan, provider, and symptoms to determine which billing codes should be used for a free dental visit.

Based on the information below, generate a comma separated list of billing codes that are most likely to be applicable, and a short explanation of whether the user qualifies for a free dental visit.

Patient Plan Details: {{{planDetails}}}

Provider Details: {{{providerDetails}}}

Patient Symptoms: {{{userSymptoms}}}`,
});

const freeVisitBillingCodeFlow = ai.defineFlow(
  {
    name: 'freeVisitBillingCodeFlow',
    inputSchema: FreeVisitBillingCodeInputSchema,
    outputSchema: FreeVisitBillingCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
