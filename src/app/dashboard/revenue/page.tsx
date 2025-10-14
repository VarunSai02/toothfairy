import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: "Revenue | Partner Portal",
  description: "Detailed revenue analytics for your dental practice.",
};

export default async function RevenuePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Revenue Analytics</h1>
        <p className="text-muted-foreground">
          Track your practice's financial performance and growth metrics.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Patient Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,247</div>
              <p className="text-xs text-muted-foreground">
                +5.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insurance Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">
                +1.8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Insurance Provider</CardTitle>
            <CardDescription>
              Breakdown of revenue by dental insurance plans.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Delta Dental PPO</p>
                  <p className="text-xs text-muted-foreground">45 patients</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$18,450</p>
                  <p className="text-xs text-muted-foreground">40.8%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Aetna Dental PPO</p>
                  <p className="text-xs text-muted-foreground">32 patients</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$12,800</p>
                  <p className="text-xs text-muted-foreground">28.3%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Cigna Dental PPO</p>
                  <p className="text-xs text-muted-foreground">28 patients</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$9,800</p>
                  <p className="text-xs text-muted-foreground">21.7%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">MetLife PDP Plus</p>
                  <p className="text-xs text-muted-foreground">15 patients</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$4,181.89</p>
                  <p className="text-xs text-muted-foreground">9.2%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>
              Revenue performance over the last 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">January 2024</span>
                <span className="text-sm font-medium">$38,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">February 2024</span>
                <span className="text-sm font-medium">$41,200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">March 2024</span>
                <span className="text-sm font-medium">$39,800</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">April 2024</span>
                <span className="text-sm font-medium">$42,100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">May 2024</span>
                <span className="text-sm font-medium">$37,650</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">June 2024</span>
                <span className="text-sm font-medium">$45,231.89</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
