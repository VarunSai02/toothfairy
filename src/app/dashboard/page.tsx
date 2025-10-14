import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, DollarSign, Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "Dashboard | Partner Portal",
  description: "Overview of your partnership with Tooth Fairy.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Opportunities
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 New</div>
            <p className="text-xs text-muted-foreground">
              View recommended actions
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Matches</CardTitle>
            <CardDescription>
              An overview of patients recently matched to your practice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Matched Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Potential Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#PAT-3065</TableCell>
                  <TableCell>Delta Dental PPO</TableCell>
                  <TableCell>
                    <Badge variant="outline">Contacted</Badge>
                  </TableCell>
                  <TableCell>2023-06-23</TableCell>
                  <TableCell className="text-right">$1,250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#PAT-2049</TableCell>
                  <TableCell>Aetna Dental PPO</TableCell>
                  <TableCell>
                    <Badge>Scheduled</Badge>
                  </TableCell>
                  <TableCell>2023-06-24</TableCell>
                  <TableCell className="text-right">$550.00</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell className="font-medium">#PAT-1987</TableCell>
                  <TableCell>Cigna Dental PPO</TableCell>
                  <TableCell>
                    <Badge>Completed</Badge>
                  </TableCell>
                  <TableCell>2023-06-20</TableCell>
                  <TableCell className="text-right">$850.00</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell className="font-medium">#PAT-1152</TableCell>
                  <TableCell>MetLife PDP Plus</TableCell>
                  <TableCell>
                    <Badge variant="destructive">No Show</Badge>
                  </TableCell>
                  <TableCell>2023-06-19</TableCell>
                  <TableCell className="text-right">$300.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
