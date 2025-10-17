"use client";

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
import { Check, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

type RecommendationResultsProps = {
  results: {
    recommendations: Array<{
      plan: string;
      reason: string;
      monthlyCost: string;
      coverage: string;
      pros: string[];
      cons: string[];
    }>;
  };
};

export function RecommendationResults({ results }: RecommendationResultsProps) {
  const { recommendations } = results;

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-heading font-headline">AI Recommendations</h2>
        <p className="text-muted-foreground">
          Here are the personalized dental insurance plan recommendations based on your needs.
        </p>
      </div>

      <Separator />
      
      {recommendations && recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-accent"/> 
            Recommended Plans
          </h3>
          
          {recommendations.map((rec, index) => (
            <Card key={index} className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {rec.plan}
                  <Badge variant="outline" className="ml-2">
                    {rec.monthlyCost}
                  </Badge>
                </CardTitle>
                <CardDescription>{rec.reason}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Coverage Highlights
                  </h4>
                  <p className="text-sm text-muted-foreground">{rec.coverage}</p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center text-green-600">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Pros
                    </h4>
                    <ul className="space-y-1">
                      {rec.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="text-sm text-muted-foreground flex items-start">
                          <Check className="mr-2 h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center text-red-600">
                      <TrendingDown className="mr-2 h-4 w-4" />
                      Considerations
                    </h4>
                    <ul className="space-y-1">
                      {rec.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2 h-3 w-3 text-red-500 mt-0.5 flex-shrink-0">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {(!recommendations || recommendations.length === 0) && (
        <Card>
          <CardHeader>
            <CardTitle>No Recommendations Available</CardTitle>
            <CardDescription>
              We couldn't generate specific recommendations at this time. Please try providing more details about your dental needs.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
