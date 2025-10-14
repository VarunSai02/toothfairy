"use server";

import { revalidatePath } from "next/cache";
import { generateHomepageVideo, HomepageVideoOutput } from "@/ai/flows/homepage-video-generation";
import {
  treatmentPlanRecommendation,
  TreatmentPlanRecommendationInput,
  TreatmentPlanRecommendationOutput,
} from "@/ai/flows/treatment-plan-recommendation";
import {
  generateFreeVisitBillingCodes,
  FreeVisitBillingCodeInput,
  FreeVisitBillingCodeOutput,
} from "@/ai/flows/free-visit-billing-code-generation";

export async function createHomepageVideo(): Promise<
  { data?: HomepageVideoOutput; error?: string }
> {
  try {
    const result = await generateHomepageVideo();
    revalidatePath("/");
    return { data: result };
  } catch (error) {
    console.error("Error generating homepage video:", error);
    return { error: "Failed to generate video. Please try again later." };
  }
}

export async function getPlanRecommendations(
  input: TreatmentPlanRecommendationInput
): Promise<{ data?: TreatmentPlanRecommendationOutput; error?: string }> {
  try {
    const result = await treatmentPlanRecommendation(input);
    return { data: result };
  } catch (error) {
    console.error("Error getting plan recommendations:", error);
    return { error: "Failed to get recommendations. Please check your input and try again." };
  }
}

export async function getFreeVisitCodes(
  input: FreeVisitBillingCodeInput
): Promise<{ data?: FreeVisitBillingCodeOutput; error?: string }> {
  try {
    const result = await generateFreeVisitBillingCodes(input);
    return { data: result };
  } catch (error) {
    console.error("Error getting free visit codes:", error);
    return { error: "Failed to generate billing codes. Please try again." };
  }
}
