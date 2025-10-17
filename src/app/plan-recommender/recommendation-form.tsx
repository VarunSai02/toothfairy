"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { getPlanRecommendations } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RecommendationResults } from "./recommendation-results";
import { useEffect, useRef } from "react";

const initialState = {
  data: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function RecommendationForm() {
  const [state, formAction] = useActionState(getPlanRecommendations, initialState);
  const { toast } = useToast();
  const errorShownRef = useRef<string | null>(null);

  // Handle errors with useEffect to avoid render-time side effects
  useEffect(() => {
    if (state.error && state.error !== errorShownRef.current) {
      errorShownRef.current = state.error;
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div>
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Dental Plan Details</CardTitle>
            <CardDescription>
              Provide as much detail as possible for the most accurate AI recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="treatmentPlan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Treatment Plan Description
              </label>
              <Textarea
                id="treatmentPlan"
                name="treatmentPlan"
                placeholder="e.g., 'Need a crown on tooth #14, a filling for a cavity on tooth #3, and a routine cleaning...'"
                className="min-h-[150px]"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="insurancePlanDetails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Current Insurance Plan (Optional)
              </label>
              <Input
                id="insurancePlanDetails"
                name="insurancePlanDetails"
                placeholder="e.g., 'Delta Dental PPO'"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="followUpQuestions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Specific Questions (Optional)
              </label>
              <Textarea
                id="followUpQuestions"
                name="followUpQuestions"
                placeholder="e.g., 'What is my out-of-pocket maximum? Is orthodontics covered?'"
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      {state.data && <RecommendationResults results={state.data} />}
    </div>
  );
}
