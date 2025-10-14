"use client";

import type { TreatmentPlanRecommendationOutput } from "@/ai/flows/treatment-plan-recommendation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, Code, DollarSign } from "lucide-react";

type RecommendationResultsProps = {
  results: TreatmentPlanRecommendationOutput;
};

export function RecommendationResults({ results }: RecommendationResultsProps) {
  const { recommendations, adaBillingCodes } = results;

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading font-headline">Analysis Results</h2>
        <p className="text-muted-foreground">
          Here are the AI-powered recommendations based on your treatment plan.
        </p>
      </div>

      <Separator />
      
      {recommendations && recommendations.length > 0 && (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center"><DollarSign className="mr-2 h-5 w-5 text-accent"/> Recommended Plans</h3>
            {recommendations.map((rec, index) => (
                <Card key={index} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle>{rec.planName}</CardTitle>
                        <CardDescription>{rec.summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-semibold mb-2">Cost Comparison:</h4>
                        <p className="text-sm text-muted-foreground">{rec.costComparison}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}

      {(!recommendations || recommendations.length === 0) && (
        <Card>
            <CardHeader>
                <CardTitle>No Plan Recommendations</CardTitle>
                <CardDescription>
                    Our AI could not find specific plan recommendations at this time. However, we have identified relevant billing codes for your procedures.
                </CardDescription>
            </CardHeader>
        </Card>
      )}

      {adaBillingCodes && adaBillingCodes.length > 0 && (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center"><Code className="mr-2 h-5 w-5 text-accent"/> Identified Billing Codes</h3>
            <Accordion type="single" collapsible className="w-full">
                {adaBillingCodes.map((code, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>
                           <div className="flex items-center gap-4">
                             <Badge variant="outline">{code.code}</Badge>
                             <span className="text-left">{code.description}</span>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <p className="text-sm text-muted-foreground px-4">
                                This ADA code corresponds to the procedure <span className="font-semibold text-foreground">{code.description.toLowerCase()}</span>. Use this code when discussing with your provider or insurance company to ensure accuracy.
                           </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      )}

    </div>
  );
}
