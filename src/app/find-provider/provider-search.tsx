"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DENTAL_PLANS, DENTAL_PROVIDERS } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { Building, CreditCard, ExternalLink, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// Mock data
const MOCK_PROVIDERS = [
  { name: "Bright Smiles Dental", address: "123 Main St, Anytown, USA", plan: "Delta Dental PPO", financing: "Care Credit" },
  { name: "Downtown Dentistry", address: "456 Oak Ave, Anytown, USA", plan: "Aetna Dental PPO", financing: "LendingClub" },
  { name: "Family Care Dental", address: "789 Pine Ln, Anytown, USA", plan: "Cigna Dental PPO", financing: "None" },
  { name: "Gentle Dental Center", address: "101 Maple Rd, Anytown, USA", plan: "MetLife PDP Plus", financing: "Care Credit" },
  { name: "City Center Orthodontics", address: "212 Birch Blvd, Anytown, USA", plan: "Guardian DentalGuard Preferred", financing: "None" },
];

export function ProviderSearch() {
  const [results, setResults] = useState(MOCK_PROVIDERS);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would filter based on form values
    setResults(MOCK_PROVIDERS);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="provider-name">Provider Name or Location</Label>
                <Input id="provider-name" placeholder="e.g., Aspen Dental or Anytown" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance-plan">Insurance Plan</Label>
                <Select>
                  <SelectTrigger id="insurance-plan">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {DENTAL_PLANS.map((plan) => (
                      <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Financing Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="care-credit" />
                  <Label htmlFor="care-credit" className="font-normal">Care Credit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lending-club" />
                  <Label htmlFor="lending-club" className="font-normal">LendingClub</Label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-heading">Search Results</h2>
          {results.length > 0 ? (
            results.map((provider, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5 text-muted-foreground" /> {provider.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-1"><MapPin className="h-4 w-4" /> {provider.address}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm"><span className="font-semibold">Accepts:</span> {provider.plan}</div>
                  <div className="text-sm flex items-center gap-2"><CreditCard className="h-4 w-4 text-muted-foreground"/> <span className="font-semibold">Financing:</span> {provider.financing}</div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" asChild>
                        <Link href="#">View Details <ExternalLink className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    No providers found. Try adjusting your search filters.
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
