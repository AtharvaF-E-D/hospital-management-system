import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Download, TrendingUp, Users, DollarSign, TestTube } from "lucide-react";

const reportCategories = [
  { title: "Clinical Reports", desc: "Patient visits, diagnoses, treatment outcomes", icon: Users, count: 24, color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600" },
  { title: "Financial Reports", desc: "Revenue, expenses, P&L statements", icon: DollarSign, count: 18, color: "bg-green-50 dark:bg-green-950/30 text-green-600" },
  { title: "Lab Reports", desc: "Test results, turnaround times, quality metrics", icon: TestTube, count: 12, color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600" },
  { title: "Inventory Reports", desc: "Stock levels, consumption, expiry tracking", icon: BarChart3, count: 8, color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600" },
  { title: "Audit Reports", desc: "System logs, access logs, compliance reports", icon: FileText, count: 6, color: "bg-red-50 dark:bg-red-950/30 text-red-600" },
  { title: "Custom Reports", desc: "Build custom reports with filters and parameters", icon: TrendingUp, count: 3, color: "bg-teal-50 dark:bg-teal-950/30 text-teal-600" },
];

const recentReports = [
  { name: "Monthly Revenue Report", date: "Jun 2026", size: "2.4 MB" },
  { name: "Patient Census Q2", date: "Jun 2026", size: "1.8 MB" },
  { name: "Lab TAT Analysis", date: "Jun 2026", size: "856 KB" },
  { name: "Stock Audit Report", date: "Jun 2026", size: "3.2 MB" },
  { name: "Employee Attendance", date: "Jun 2026", size: "1.1 MB" },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Reports" description="Generate and download operational, clinical, and financial reports."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Reports" }]}
        actions={<Button size="sm" className="h-8 text-xs"><FileText className="h-3.5 w-3.5 mr-1" />Custom Report</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Card key={i} className="shadow-sm cursor-pointer hover:shadow-md transition-shadow rounded-xl border-muted">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.desc}</p>
                    <p className="text-xs text-primary font-medium mt-2">{cat.count} reports available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-sm rounded-xl border-muted">
        <CardHeader><CardTitle className="text-base">Recent Reports</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs"><Download className="h-3.5 w-3.5 mr-1" />Download</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
