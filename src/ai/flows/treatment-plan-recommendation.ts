// This is a server-side file.
'use server';

/**
 * @fileOverview Recommends suitable insurance plans and provides cost comparisons using GenAI based on user-submitted dental treatment plans.
 *
 * - treatmentPlanRecommendation - A function that takes dental treatment plan input and returns insurance plan recommendations with cost comparisons.
 * - TreatmentPlanRecommendationInput - The input type for the treatmentPlanRecommendation function.
 * - TreatmentPlanRecommendationOutput - The return type for the treatmentPlanRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TreatmentPlanRecommendationInputSchema = z.object({
  treatmentPlan: z.string().describe('A detailed description of the dental treatment plan.'),
  insurancePlanDetails: z.string().optional().describe('Details of the user current insurance plan if any'),
  followUpQuestions: z.string().optional().describe('Any specific questions or concerns the user has about their plan.'),
});
export type TreatmentPlanRecommendationInput = z.infer<typeof TreatmentPlanRecommendationInputSchema>;

const TreatmentPlanRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      planName: z.string().describe('The name of the recommended insurance plan.'),
      costComparison: z.string().describe('A comparison of costs under different plans.'),
      summary: z.string().describe('A summary of the plan benefits')
    })
  ).describe('A list of recommended insurance plans with cost comparisons.'),
  adaBillingCodes: z.array(
    z.object({
      code: z.string().describe('ADA billing code'),
      description: z.string().describe('Description of the code')
    })
  ).optional().describe('A list of matching ADA billing codes for the treatment plan.')
});
export type TreatmentPlanRecommendationOutput = z.infer<typeof TreatmentPlanRecommendationOutputSchema>;

export async function treatmentPlanRecommendation(input: TreatmentPlanRecommendationInput): Promise<TreatmentPlanRecommendationOutput> {
  return treatmentPlanRecommendationFlow(input);
}

const treatmentPlanRecommendationPrompt = ai.definePrompt({
  name: 'treatmentPlanRecommendationPrompt',
  input: {schema: TreatmentPlanRecommendationInputSchema},
  output: {schema: TreatmentPlanRecommendationOutputSchema},
  prompt: `You are a dental insurance expert. Given a user's dental treatment plan, insurance plan details and any follow up questions, you will recommend suitable insurance plans and provide cost comparisons.  You will also identify relevant ADA billing codes.

Treatment Plan: {{{treatmentPlan}}}
Insurance Plan Details: {{{insurancePlanDetails}}}
Follow-up Questions: {{{followUpQuestions}}}

Provide recommendations with cost comparisons and matching ADA billing codes in JSON format. Return an empty list of recommendations if no suitable plan is found.
`,
});

const treatmentPlanRecommendationFlow = ai.defineFlow(
  {
    name: 'treatmentPlanRecommendationFlow',
    inputSchema: TreatmentPlanRecommendationInputSchema,
    outputSchema: TreatmentPlanRecommendationOutputSchema,
  },
  async input => {
    const {output} = await treatmentPlanRecommendationPrompt(input);
    return output!;
  }
);
