import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  TrendingUp,
  Users,
  Activity,
  FileText,
  Download,
  Calendar
} from "lucide-react";

export default function DoctorReportsPage() {
  const [period, setPeriod] = useState("this-month");

  const kpis = [
    { title: "Total Consultations", value: "342", trend: "+12%", up: true, icon: Users },
    { title: "New Patients", value: "45", trend: "+5%", up: true, icon: UserPlus => <Users className="h-4 w-4" /> },
    { title: "Avg. Consult Time", value: "18m", trend: "-2m", up: true, icon: Clock => <Activity className="h-4 w-4" /> },
    { title: "Revenue Generated", value: "$42.5k", trend: "+8%", up: true, icon: DollarSign => <TrendingUp className="h-4 w-4" /> },
  ];

  const commonDiagnoses = [
    { rank: 1, name: "Essential (primary) hypertension", code: "I10", count: 86, percentage: "25%" },
    { rank: 2, name: "Type 2 diabetes mellitus", code: "E11", count: 64, percentage: "18%" },
    { rank: 3, name: "Acute upper respiratory infection", code: "J06.9", count: 42, percentage: "12%" },
    { rank: 4, name: "Hyperlipidemia", code: "E78.5", count: 35, percentage: "10%" },
    { rank: 5, name: "Migraine", code: "G43", count: 21, percentage: "6%" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-teal-600" /> Clinical Reports
          </h1>
          <p className="text-sm text-slate-500">Analytics and performance metrics.</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px] bg-white">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-teal-700 border-teal-200 bg-white">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  {typeof kpi.icon === 'function' ? kpi.icon() : <kpi.icon className="h-5 w-5 text-slate-500" />}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`font-medium ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend}
                </span>
                <span className="text-slate-500 ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200 shadow-sm col-span-1">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
            <CardTitle className="text-base font-bold text-slate-800">Top Diagnoses</CardTitle>
            <CardDescription>Most frequent conditions treated</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-center">Rank</TableHead>
                  <TableHead>Condition (ICD-10)</TableHead>
                  <TableHead className="text-right">Cases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commonDiagnoses.map((d) => (
                  <TableRow key={d.rank}>
                    <TableCell className="text-center font-medium text-slate-500">{d.rank}</TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{d.name}</div>
                      <Badge variant="outline" className="text-[10px] mt-1 text-slate-500">{d.code}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-slate-900">{d.count}</div>
                      <div className="text-xs text-slate-500">{d.percentage}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm col-span-1">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
            <CardTitle className="text-base font-bold text-slate-800">Appointment Status</CardTitle>
            <CardDescription>Breakdown by attendance</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            {/* Fake Donut Chart via CSS / Tailwind */}
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-slate-100 mb-6"
                 style={{ background: 'conic-gradient(#0d9488 0% 75%, #f59e0b 75% 90%, #ef4444 90% 100%)' }}>
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center flex-col shadow-inner">
                <span className="text-3xl font-bold text-slate-900">342</span>
                <span className="text-xs text-slate-500 font-medium">Total</span>
              </div>
            </div>
            <div className="flex gap-6 w-full justify-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-1"><div className="w-3 h-3 rounded-full bg-teal-600"></div><span className="text-sm font-medium text-slate-700">Completed</span></div>
                <span className="text-lg font-bold">75%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-sm font-medium text-slate-700">Rescheduled</span></div>
                <span className="text-lg font-bold">15%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-sm font-medium text-slate-700">No-show</span></div>
                <span className="text-lg font-bold">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
