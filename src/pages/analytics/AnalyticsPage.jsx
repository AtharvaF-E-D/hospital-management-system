import PageHeader from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/DataDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as LineChartIcon, TrendingUp, Users, DollarSign, Activity, BarChart3 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpis = [
  { title: "Revenue (MTD)", value: "₹45.2L", change: "+18% vs last month", icon: DollarSign },
  { title: "Patient Footfall", value: "3,456", change: "+12% this month", icon: Users },
  { title: "Bed Occupancy", value: "78%", change: "+5% vs last week", icon: Activity },
  { title: "Avg. Wait Time", value: "12 min", change: "-3 min vs avg", icon: TrendingUp },
];

const departmentMetrics = [
  { dept: "Cardiology", revenue: "₹8.2L", patients: 245, satisfaction: "4.8/5" },
  { dept: "Orthopedics", revenue: "₹6.5L", patients: 189, satisfaction: "4.6/5" },
  { dept: "Neurology", revenue: "₹5.8L", patients: 156, satisfaction: "4.7/5" },
  { dept: "Pediatrics", revenue: "₹4.2L", patients: 312, satisfaction: "4.9/5" },
  { dept: "ENT", revenue: "₹3.8L", patients: 198, satisfaction: "4.5/5" },
  { dept: "Dermatology", revenue: "₹3.2L", patients: 223, satisfaction: "4.4/5" },
];

const revenueData = [
  { name: 'Jan', revenue: 40000 },
  { name: 'Feb', revenue: 30000 },
  { name: 'Mar', revenue: 50000 },
  { name: 'Apr', revenue: 45000 },
  { name: 'May', revenue: 60000 },
  { name: 'Jun', revenue: 55000 },
];

const patientData = [
  { name: 'Jan', patients: 1200 },
  { name: 'Feb', patients: 1100 },
  { name: 'Mar', patients: 1400 },
  { name: 'Apr', patients: 1350 },
  { name: 'May', patients: 1600 },
  { name: 'Jun', patients: 1500 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Analytics" description="Key performance indicators and business intelligence."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Analytics" }]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => <StatCard key={i} {...kpi} />)}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm rounded-xl border-border">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><LineChartIcon className="h-4 w-4" />Revenue Trend</CardTitle></CardHeader>
          <CardContent className="h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0077B6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0077B6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#0077B6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl border-border">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" />Patient Footfall</CardTitle></CardHeader>
          <CardContent className="h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="patients" fill="#00B4D8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm rounded-xl border-muted">
        <CardHeader><CardTitle className="text-base">Department Metrics</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50">
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">Department</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase">Revenue</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase">Patients</th>
                <th className="px-3 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase">Satisfaction</th>
              </tr></thead>
              <tbody>
                {departmentMetrics.map((d, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-3 py-2 font-medium">{d.dept}</td>
                    <td className="px-3 py-2 text-right">{d.revenue}</td>
                    <td className="px-3 py-2 text-right">{d.patients}</td>
                    <td className="px-3 py-2 text-right text-green-600 font-medium">{d.satisfaction}</td>
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
