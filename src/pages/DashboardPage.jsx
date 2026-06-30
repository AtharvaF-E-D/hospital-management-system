import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Calendar, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Jan', admissions: 120, discharges: 90 },
  { name: 'Feb', admissions: 150, discharges: 110 },
  { name: 'Mar', admissions: 180, discharges: 140 },
  { name: 'Apr', admissions: 140, discharges: 120 },
  { name: 'May', admissions: 190, discharges: 160 },
  { name: 'Jun', admissions: 220, discharges: 180 },
];

export default function DashboardPage() {
  const stats = [
    { title: "Total Patients", value: "1,245", change: "+12%", icon: Users },
    { title: "New Admissions", value: "48", change: "+4%", icon: UserPlus },
    { title: "Appointments Today", value: "156", change: "-2%", icon: Calendar },
    { title: "Active Cases", value: "32", change: "+1", icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of hospital activities and metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith("+");
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
                <p className={`text-xs font-medium mt-1 ${isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-5 shadow-sm rounded-xl border-muted flex flex-col">
          <CardHeader>
            <CardTitle>Patient Admissions vs Discharges</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDischarges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <Tooltip />
                <Area type="monotone" dataKey="admissions" stroke="#2563eb" fillOpacity={1} fill="url(#colorAdmissions)" strokeWidth={2} />
                <Area type="monotone" dataKey="discharges" stroke="#16a34a" fillOpacity={1} fill="url(#colorDischarges)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 shadow-sm rounded-xl border-muted">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {[
              { title: "New Admission", desc: "Ward 3, Bed 12", time: "10 mins ago", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
              { title: "Lab Results Ready", desc: "Patient UHID-10042", time: "25 mins ago", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30" },
              { title: "Patient Discharged", desc: "Ward 1, Bed 04", time: "1 hour ago", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
              { title: "Surgery Completed", desc: "OT Room 2", time: "3 hours ago", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30" },
              { title: "Critical Alert", desc: "ICU Bed 08", time: "4 hours ago", color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
            ].map((activity, i) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
