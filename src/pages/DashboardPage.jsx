import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Calendar, Activity, DollarSign, TrendingUp, Bed, Ambulance, Clock, ShieldCheck, HeartPulse, Stethoscope, Briefcase, FileText, Settings } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";

const chartDataExecutive = [
  { name: 'Jan', admissions: 120, discharges: 90 },
  { name: 'Feb', admissions: 150, discharges: 110 },
  { name: 'Mar', admissions: 180, discharges: 140 },
  { name: 'Apr', admissions: 140, discharges: 120 },
  { name: 'May', admissions: 190, discharges: 160 },
  { name: 'Jun', admissions: 220, discharges: 180 },
];

const chartDataFinance = [
  { name: 'Jan', revenue: 45000, expenses: 32000 },
  { name: 'Feb', revenue: 52000, expenses: 31000 },
  { name: 'Mar', revenue: 48000, expenses: 35000 },
  { name: 'Apr', revenue: 61000, expenses: 38000 },
  { name: 'May', revenue: 59000, expenses: 40000 },
  { name: 'Jun', revenue: 68000, expenses: 42000 },
];

const dashboardConfigs = {
  "/": {
    title: "Executive Dashboard",
    desc: "High-level overview of hospital activities and key metrics.",
    stats: [
      { title: "Total Patients", value: "1,245", change: "+12%", icon: Users },
      { title: "New Admissions", value: "48", change: "+4%", icon: UserPlus },
      { title: "Appointments Today", value: "156", change: "-2%", icon: Calendar },
      { title: "Active Cases", value: "32", change: "+1", icon: Activity },
    ],
    chartTitle: "Patient Admissions vs Discharges",
    chartType: "area",
    chartData: chartDataExecutive,
    activities: [
      { title: "New Admission", desc: "Ward 3, Bed 12", time: "10 mins ago", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
      { title: "Lab Results Ready", desc: "Patient UHID-10042", time: "25 mins ago", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
      { title: "Patient Discharged", desc: "Ward 1, Bed 04", time: "1 hour ago", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    ]
  },
  "/dashboard/clinical": {
    title: "Clinical Dashboard",
    desc: "Monitoring patient care, treatments, and medical staff.",
    stats: [
      { title: "Doctors on Duty", value: "45", change: "Full Staff", icon: Stethoscope },
      { title: "Critical Patients", value: "12", change: "-2", icon: HeartPulse },
      { title: "Surgeries Today", value: "8", change: "+1", icon: Activity },
      { title: "Avg. Consult Time", value: "14m", change: "-2m", icon: Clock },
    ],
    chartTitle: "Daily OPD vs IPD Volume",
    chartType: "bar",
    chartData: chartDataExecutive.map(d => ({ name: d.name, opd: d.admissions * 3, ipd: d.admissions })),
    activities: [
      { title: "Code Blue Drill", desc: "ICU Ward 2", time: "5 mins ago", color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
      { title: "Specialist Consult", desc: "Dr. Smith to ER", time: "15 mins ago", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
      { title: "Prescription Update", desc: "Patient #8821", time: "45 mins ago", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    ]
  },
  "/dashboard/finance": {
    title: "Finance Dashboard",
    desc: "Revenue, billing, expenses, and insurance claims.",
    stats: [
      { title: "Total Revenue", value: "$68,450", change: "+8.2%", icon: DollarSign },
      { title: "Pending Claims", value: "$12,400", change: "-5.1%", icon: FileText },
      { title: "Daily Expenses", value: "$14,200", change: "+1.2%", icon: TrendingUp },
      { title: "Unpaid Bills", value: "42", change: "-8", icon: Briefcase },
    ],
    chartTitle: "Monthly Revenue vs Expenses",
    chartType: "area_finance",
    chartData: chartDataFinance,
    activities: [
      { title: "Payment Received", desc: "Insurance Claim #5521", time: "20 mins ago", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
      { title: "Invoice Overdue", desc: "Patient UHID-9932", time: "1 hour ago", color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
      { title: "Payroll Processed", desc: "Nursing Staff", time: "3 hours ago", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
    ]
  },
  "/dashboard/operational": {
    title: "Operational Dashboard",
    desc: "Facilities, inventory, ambulances, and hospital resources.",
    stats: [
      { title: "Bed Occupancy", value: "84%", change: "+2%", icon: Bed },
      { title: "Ambulances Avail.", value: "5 / 8", change: "Normal", icon: Ambulance },
      { title: "Inventory Alerts", value: "3", change: "Low Stock", icon: Activity },
      { title: "Maintenance", value: "2", change: "Pending", icon: Settings },
    ],
    chartTitle: "Resource Utilization Trend",
    chartType: "line",
    chartData: chartDataExecutive.map(d => ({ name: d.name, beds: d.admissions / 2.5, staff: d.discharges / 2 })),
    activities: [
      { title: "Low Stock Alert", desc: "Surgical Masks", time: "10 mins ago", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30" },
      { title: "Ambulance Dispatched", desc: "Vehicle #4", time: "35 mins ago", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
      { title: "Maintenance Done", desc: "HVAC Ward 2", time: "2 hours ago", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    ]
  },
  "/dashboard/analytics": {
    title: "Analytics Dashboard",
    desc: "Advanced metrics, KPIs, and predictive insights.",
    stats: [
      { title: "Patient Satisfaction", value: "4.8/5", change: "+0.2", icon: ShieldCheck },
      { title: "Avg Wait Time", value: "18m", change: "-4m", icon: Clock },
      { title: "Readmission Rate", value: "4.2%", change: "-0.5%", icon: TrendingUp },
      { title: "Growth Target", value: "92%", change: "On Track", icon: Activity },
    ],
    chartTitle: "Patient Satisfaction Index",
    chartType: "line_analytics",
    chartData: chartDataExecutive.map(d => ({ name: d.name, score: (Math.random() * 20 + 80).toFixed(1) })),
    activities: [
      { title: "Weekly Report Generated", desc: "Performance Metrics", time: "1 hour ago", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
      { title: "Goal Surpassed", desc: "OPD Wait Time < 20m", time: "5 hours ago", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
      { title: "Data Sync Complete", desc: "Cloud Backup", time: "12 hours ago", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
    ]
  }
};

export default function DashboardPage() {
  const location = useLocation();
  const config = dashboardConfigs[location.pathname] || dashboardConfigs["/"];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{config.title}</h1>
        <p className="text-muted-foreground text-sm">{config.desc}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {config.stats.map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith("+");
          const isNegative = stat.change.startsWith("-");
          
          let colorClass = "text-muted-foreground";
          if (isPositive) colorClass = "text-green-600 dark:text-green-500";
          if (isNegative) colorClass = "text-red-600 dark:text-red-500";

          return (
            <Card key={i} className="rounded-xl shadow-sm border-muted">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs font-medium mt-1 ${colorClass}`}>
                  {stat.change} {stat.change.includes("%") || stat.change.includes("m") ? "from last month" : ""}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-5 shadow-sm rounded-xl border-muted flex flex-col">
          <CardHeader>
            <CardTitle>{config.chartTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {config.chartType === "area" && (
                <AreaChart data={config.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0077B6" stopOpacity={0.3} /><stop offset="95%" stopColor="#0077B6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="colorDischarges" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <Tooltip />
                  <Area type="monotone" dataKey="admissions" stroke="#0077B6" fillOpacity={1} fill="url(#colorAdmissions)" strokeWidth={2} />
                  <Area type="monotone" dataKey="discharges" stroke="#16a34a" fillOpacity={1} fill="url(#colorDischarges)" strokeWidth={2} />
                </AreaChart>
              )}
              {config.chartType === "area_finance" && (
                <AreaChart data={config.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                  </defs>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#16a34a" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
                </AreaChart>
              )}
              {config.chartType === "bar" && (
                <BarChart data={config.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <Tooltip />
                  <Bar dataKey="opd" fill="#0077B6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ipd" fill="#00B4D8" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
              {config.chartType === "line" && (
                <LineChart data={config.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <Tooltip />
                  <Line type="monotone" dataKey="beds" stroke="#0077B6" strokeWidth={3} />
                  <Line type="monotone" dataKey="staff" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
              )}
              {config.chartType === "line_analytics" && (
                <LineChart data={config.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 shadow-sm rounded-xl border-muted">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {config.activities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${activity.color}`}>
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-medium leading-none truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.desc}</p>
                  <p className="text-[10px] text-muted-foreground/80 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            
            {/* Pad to 5 items to keep height consistent */}
            {Array.from({ length: Math.max(0, 5 - config.activities.length) }).map((_, i) => (
              <div key={`pad-${i}`} className="flex items-start gap-3 opacity-40">
                <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gray-100 text-gray-500">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="h-3.5 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mt-1"></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
