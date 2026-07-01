import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Activity,
  FileText,
  AlertCircle,
  Users,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  // Mock data
  const stats = [
    { label: "Today's Patients", value: "24", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Lab Results", value: "5", icon: Activity, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Unread Messages", value: "12", icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Upcoming Surgeries", value: "2", icon: Calendar, color: "text-teal-600", bg: "bg-teal-100" },
  ];

  const appointments = [
    { id: 1, time: "09:00 AM", patient: "Sarah Johnson", type: "Follow-up", status: "Waiting", urgent: false },
    { id: 2, time: "09:30 AM", patient: "Michael Chen", type: "New Patient", status: "In Progress", urgent: false },
    { id: 3, time: "10:15 AM", patient: "Emily Davis", type: "Consultation", status: "Scheduled", urgent: true },
    { id: 4, time: "11:00 AM", patient: "Robert Wilson", type: "Post-op", status: "Scheduled", urgent: false },
  ];

  const tasks = [
    { id: 1, text: "Review MRI for David Smith", priority: "High" },
    { id: 2, text: "Sign discharge summary for Room 302", priority: "Medium" },
    { id: 3, text: "Call Dr. Adams regarding referral", priority: "Low" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Good Morning, Dr. Smith</h1>
          <p className="text-sm text-slate-500">Here's your schedule and tasks for today.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-teal-600 hover:bg-teal-700">
            Start Telemedicine
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-slate-200 shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-8">
        
        {/* Main Column - Appointments */}
        <div className="md:col-span-4 lg:col-span-5 space-y-6">
          <Card className="border-slate-200 shadow-sm col-span-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold">Today's Schedule</CardTitle>
                <CardDescription>You have 14 appointments today.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-teal-600" onClick={() => navigate('/doctor/appointments')}>
                View Calendar <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-20">
                        <span className="text-sm font-bold text-slate-900 block">{apt.time.split(' ')[0]}</span>
                        <span className="text-xs text-slate-500 font-medium">{apt.time.split(' ')[1]}</span>
                      </div>
                      <div className="h-10 w-px bg-slate-200" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{apt.patient}</p>
                          {apt.urgent && <Badge variant="destructive" className="h-5 text-[10px] px-1.5">Urgent</Badge>}
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {apt.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={
                        apt.status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        apt.status === "Waiting" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      }>
                        {apt.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="hidden sm:flex" onClick={() => navigate('/doctor/consultation')}>
                        Consult
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Column - Tasks & Alerts */}
        <div className="md:col-span-3 lg:col-span-3 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" /> Clinical Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-100">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{task.text}</p>
                      <p className={`text-xs ${task.priority === 'High' ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                        {task.priority} Priority
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="w-full mt-2 text-teal-600 h-8">View all tasks</Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-teal-600 to-teal-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">Weekly Performance</h3>
                  <p className="text-teal-100 text-sm mb-4">Patient satisfaction score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">4.8</span>
                    <span className="text-teal-200 text-sm mb-1">/ 5.0</span>
                  </div>
                </div>
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-teal-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
