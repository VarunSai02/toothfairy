import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";

export const metadata = {
  title: "Opportunities | Partner Portal",
  description: "AI-powered opportunities to grow your dental practice.",
};

export default async function OpportunitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Opportunities</h1>
        <p className="text-muted-foreground">
          Discover AI-powered recommendations to grow your practice and increase revenue.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">
                From current opportunities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Ready to contact
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>High-Priority Opportunities</CardTitle>
            <CardDescription>
              AI-recommended actions to maximize your practice growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">High Priority</Badge>
                    <p className="text-sm font-medium">Follow up with 5 Delta Dental patients</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    5 patients haven't responded to initial contact. Potential value: $6,250
                  </p>
                </div>
                <Button size="sm">Contact Now</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Medium Priority</Badge>
                    <p className="text-sm font-medium">Schedule appointments for Aetna patients</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    8 patients are ready to schedule. Potential value: $4,400
                  </p>
                </div>
                <Button size="sm" variant="outline">Schedule</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Low Priority</Badge>
                    <p className="text-sm font-medium">Review Cigna treatment plans</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    3 patients need treatment plan updates. Potential value: $1,800
                  </p>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>
              AI analysis of local market trends and opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Growing Demand</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Orthodontic treatments are trending up 23% in your area. Consider promoting Invisalign services.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Insurance Opportunity</h4>
                <p className="text-sm text-green-700 mt-1">
                  Guardian DentalGuard Preferred is expanding coverage in your region. 15 potential patients identified.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-900">Competitive Advantage</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Your practice has 15% higher patient satisfaction than local competitors. Leverage this in marketing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>
              Next steps to capitalize on identified opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Send follow-up emails to 5 Delta Dental patients</span>
                <Button size="sm" variant="outline" className="ml-auto">Execute</Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Update practice website with orthodontic services</span>
                <Button size="sm" variant="outline" className="ml-auto">Execute</Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Contact Guardian DentalGuard for partnership</span>
                <Button size="sm" variant="outline" className="ml-auto">Execute</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
