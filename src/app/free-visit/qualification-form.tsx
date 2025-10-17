"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { getFreeVisitCodes } from "@/app/actions";
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
import { DENTAL_PLANS, DENTAL_PROVIDERS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, startTransition } from "react";

const formSchema = z.object({
  planDetails: z.string().min(1, "Please select your insurance plan."),
  providerDetails: z.string().min(1, "Please select your provider."),
  userSymptoms: z.string().min(10, "Please describe your symptoms (at least 10 characters)."),
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
          Checking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Check Qualification
        </>
      )}
    </Button>
  );
}

export function QualificationForm() {
  const [state, formAction] = useActionState(getFreeVisitCodes, initialState);
  const { toast } = useToast();
  const errorShownRef = useRef<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userSymptoms: "" },
  });

  // Handle errors with useEffect to avoid render-time side effects
  useEffect(() => {
    if (state.error && state.error !== errorShownRef.current) {
      errorShownRef.current = state.error;
      toast({
        variant: "destructive",
        title: "Qualification Check Failed",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => {
            const formData = new FormData();
            formData.append('planDetails', data.planDetails);
            formData.append('providerDetails', data.providerDetails);
            formData.append('userSymptoms', data.userSymptoms);
            
            // Call the action inside startTransition
            startTransition(() => {
              formAction(formData);
            });
          })}>
            <CardHeader>
              <CardTitle>Qualification Details</CardTitle>
              <CardDescription>
                This tool helps determine if you might qualify for a free visit based on common promotional or preventative care plans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="planDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Insurance Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your dental plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DENTAL_PLANS.map((plan) => (
                          <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="providerDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Preferred Provider</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your dental provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DENTAL_PROVIDERS.map((provider) => (
                          <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userSymptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms or Reason for Visit</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Toothache in upper left', 'Routine checkup and cleaning', 'Chipped tooth'"
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

      {state.data && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Qualification Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground">{state.data.qualificationDetails}</p>
                <Separator />
                <div>
                    <h3 className="font-semibold">Suggested Billing Codes:</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {state.data.billingCodes.split(',').map(code => code.trim()).map((code, index) => (
                            <Badge key={index} variant="secondary">{code}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Disclaimer: This is an AI-generated estimate. Final qualification and billing are determined by your provider and insurance company.
                </p>
            </CardFooter>
        </Card>
      )}
    </div>
  );
}
