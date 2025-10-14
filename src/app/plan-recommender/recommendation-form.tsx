"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RecommendationResults } from "./recommendation-results";

const formSchema = z.object({
  treatmentPlan: z
    .string()
    .min(50, "Please provide a detailed treatment plan (at least 50 characters)."),
  insurancePlanDetails: z.string().optional(),
  followUpQuestions: z.string().optional(),
});

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
  const [state, formAction] = useFormState(getPlanRecommendations, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treatmentPlan: "",
      insurancePlanDetails: "",
      followUpQuestions: "",
    },
  });

  if (state.error) {
     toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.error,
    })
  }

  return (
    <div>
      <Card>
        <Form {...form}>
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Dental Plan Details</CardTitle>
              <CardDescription>
                Provide as much detail as possible for the most accurate AI recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="treatmentPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treatment Plan Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Need a crown on tooth #14, a filling for a cavity on tooth #3, and a routine cleaning...'"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insurancePlanDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Insurance Plan (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Delta Dental PPO'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="followUpQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Questions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'What is my out-of-pocket maximum? Is orthodontics covered?'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {state.data && <RecommendationResults results={state.data} />}
    </div>
  );
}
