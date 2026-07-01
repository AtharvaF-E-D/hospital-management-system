import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart2, Download, Printer, Filter, Calendar, Activity, Pill, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NurseReportsPage() {
  const reportCards = [
    {
      title: "Medication Admin Report",
      description: "Summary of medications administered, missed, and skipped during the shift.",
      icon: Pill,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      metrics: {
        administered: 45,
        skipped: 2,
        missed: 0
      }
    },
    {
      title: "Vitals Summary Report",
      description: "Trend analysis of patient vitals across Ward 3B.",
      icon: Activity,
      color: "text-rose-600",
      bg: "bg-rose-100",
      metrics: {
        recorded: 120,
        critical: 3,
        pending: 12
      }
    },
    {
      title: "Shift Handover Report",
      description: "Detailed summary of patient statuses, pending tasks, and critical observations for handover.",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      metrics: {
        patients: 24,
        admissions: 2,
        discharges: 1
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-teal-600" /> Nursing Reports
          </h1>
          <p className="text-sm text-slate-500">Generate and view clinical and operational reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-[150px] bg-white border-slate-200">
              <Calendar className="mr-2 h-4 w-4 text-slate-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today (Shift 1)</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-200">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((report, idx) => (
          <Card key={idx} className="shadow-sm border-slate-200 flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${report.bg}`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg font-bold mt-4">{report.title}</CardTitle>
              <CardDescription className="text-sm">{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col">
              <div className="grid grid-cols-3 gap-2 mb-6">
                {Object.entries(report.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="block text-xl font-bold text-slate-700">{value}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-500">{key}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-auto bg-slate-900 hover:bg-slate-800 text-white">
                Generate Full Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-lg font-bold">Recent Generated Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Report Name</th>
                  <th className="px-6 py-4">Generated By</th>
                  <th className="px-6 py-4">Date / Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Night Shift Handover - Ward 3B", author: "Nurse John", date: "Today, 08:00 AM", status: "Completed" },
                  { name: "Daily Vitals Summary", author: "System Auto", date: "Today, 06:00 AM", status: "Completed" },
                  { name: "Medication Exception Report", author: "Nurse Emily", date: "Yesterday, 04:00 PM", status: "Completed" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                    <td className="px-6 py-4 text-slate-600">{row.author}</td>
                    <td className="px-6 py-4 text-slate-600">{row.date}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {row.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
