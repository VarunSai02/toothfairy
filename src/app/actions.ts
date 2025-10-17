"use server";

import { revalidatePath } from "next/cache";
import { generatePlanRecommendations } from "@/lib/ai-service";

export async function getPlanRecommendations(
  prevState: { data?: any; error?: string },
  formData: FormData
): Promise<{ data?: any; error?: string }> {
  try {
    const treatmentPlan = formData.get("treatmentPlan") as string;
    const insurancePlanDetails = formData.get("insurancePlanDetails") as string;
    const followUpQuestions = formData.get("followUpQuestions") as string;

    // Extract user information from the form
    const userInfo = {
      dentalNeeds: treatmentPlan,
      currentInsurance: insurancePlanDetails || 'none',
      preferences: followUpQuestions ? [followUpQuestions] : []
    };

    const result = await generatePlanRecommendations(userInfo);
    revalidatePath("/plan-recommender");
    return { data: result };
  } catch (error) {
    console.error("Error getting plan recommendations:", error);
    return { error: "Failed to get recommendations. Please check your input and try again." };
  }
}

export async function getFreeVisitCodes(
  prevState: { data?: any; error?: string },
  formData: FormData
): Promise<{ data?: any; error?: string }> {
  try {
    const planDetails = formData.get("planDetails") as string;
    const providerDetails = formData.get("providerDetails") as string;
    const userSymptoms = formData.get("userSymptoms") as string;

    // Placeholder response for free visit qualification
    const qualificationDetails = `Based on your ${planDetails} plan with ${providerDetails}, your symptoms "${userSymptoms}" may qualify for preventive care coverage. Most dental plans cover routine cleanings and basic checkups at 100% with no deductible.`;
    
    const billingCodes = "D0120, D1110, D0150"; // Common preventive codes

    return { 
      data: { 
        qualificationDetails,
        billingCodes 
      } 
    };
  } catch (error) {
    console.error("Error checking qualification:", error);
    return { error: "Failed to check qualification. Please try again." };
  }
}
