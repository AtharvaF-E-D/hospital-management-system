import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  Pill, 
  AlertTriangle,
  Clock,
  Bed,
  CheckCircle2,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NurseDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: "Assigned Patients", value: "8", icon: Users, color: "text-blue-600", bg: "bg-blue-100", route: "/nurse/patients" },
    { title: "Critical Patients", value: "2", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100", route: "/nurse/alerts" },
    { title: "Medications Due", value: "5", icon: Pill, color: "text-amber-600", bg: "bg-amber-100", route: "/nurse/medication" },
    { title: "Vitals Due", value: "12", icon: Activity, color: "text-purple-600", bg: "bg-purple-100", route: "/nurse/vitals" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Ward 3B - Shift 1</h1>
          <p className="text-sm text-slate-500 mt-1">Current Shift: 08:00 AM - 04:00 PM</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50" onClick={() => navigate("/nurse/alerts")}>
            <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Protocol
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => navigate("/nurse/shift")}>
            <Clock className="mr-2 h-4 w-4" /> Handover Shift
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow border-slate-200" onClick={() => navigate(stat.route)}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Pending Tasks</CardTitle>
            <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50" onClick={() => navigate("/nurse/tasks")}>View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { time: "10:00 AM", task: "Administer IV Antibiotics", patient: "Room 302 - Bed A", priority: "High" },
                { time: "10:30 AM", task: "Check Blood Glucose", patient: "Room 305 - Bed B", priority: "Medium" },
                { time: "11:00 AM", task: "Change Wound Dressing", patient: "Room 301 - Bed A", priority: "Medium" },
                { time: "11:15 AM", task: "Collect Blood Sample", patient: "Room 304 - Bed C", priority: "High" },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-slate-400 w-16">{item.time}</div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.task}</p>
                      <p className="text-sm text-slate-500">{item.patient}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'} className={item.priority === 'High' ? 'bg-rose-500' : ''}>
                      {item.priority}
                    </Badge>
                    <Button variant="outline" size="sm" className="h-8 border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Done
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Ward Status */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col justify-center items-center gap-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700" onClick={() => navigate("/nurse/vitals")}>
                <Activity className="h-5 w-5 text-rose-500" /> Vitals
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center items-center gap-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700" onClick={() => navigate("/nurse/medication")}>
                <Pill className="h-5 w-5 text-indigo-500" /> MAR
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center items-center gap-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700" onClick={() => navigate("/nurse/notes")}>
                <FileText className="h-5 w-5 text-emerald-500" /> Notes
              </Button>
              <Button variant="outline" className="h-20 flex flex-col justify-center items-center gap-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700" onClick={() => navigate("/nurse/admissions")}>
                <Bed className="h-5 w-5 text-amber-500" /> Admit
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-slate-900 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                <Bed className="h-5 w-5 text-rose-400" /> Ward 3B Status
              </CardTitle>
              <CardDescription className="text-slate-400">Current occupancy overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Occupied</span>
                    <span className="font-bold">24 / 30</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-rose-400">2</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Available</span>
                  </div>
                  <div className="text-center border-l border-r border-slate-800">
                    <span className="block text-xl font-bold text-amber-400">3</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Cleaning</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-blue-400">1</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Reserved</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
