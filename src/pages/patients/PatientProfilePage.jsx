import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, FileText, Heart, Plus, FileEdit, Printer, Download, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const vitalsData = [
  { time: '08:00', bpSystolic: 120, bpDiastolic: 80, hr: 72 },
  { time: '12:00', bpSystolic: 122, bpDiastolic: 82, hr: 75 },
  { time: '16:00', bpSystolic: 118, bpDiastolic: 79, hr: 71 },
  { time: '20:00', bpSystolic: 125, bpDiastolic: 85, hr: 78 },
  { time: '00:00', bpSystolic: 119, bpDiastolic: 78, hr: 68 },
];

const timelineData = [
  { id: 1, date: "Today, 10:30 AM", title: "Dr. Smith - Cardiology Consult", desc: "Patient reported mild chest pain. ECG performed.", type: "consult" },
  { id: 2, date: "Yesterday, 02:15 PM", title: "Lab Results Ready", desc: "Complete Blood Count (CBC) and Lipid Profile uploaded.", type: "lab" },
  { id: 3, date: "Oct 12, 2026", title: "Prescription Updated", desc: "Added Atorvastatin 20mg.", type: "med" },
  { id: 4, date: "Sep 05, 2026", title: "Initial Registration", desc: "Patient enrolled in the system.", type: "system" },
];

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Patient Profile" 
          description="View comprehensive medical history and current status."
          breadcrumbs={[
            { label: "Dashboard", path: "/" },
            { label: "Patients", path: "/patients" },
            { label: "Profile" }
          ]}
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-white"><Printer className="h-4 w-4 mr-2" /> Print</Button>
          <Button variant="outline" size="sm" className="bg-white"><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Record</Button>
        </div>
      </div>

      {/* Patient Header Card */}
      <Card className="shadow-sm border-border rounded-xl bg-white overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/10 to-primary/5 border-b relative">
           <div className="absolute -bottom-10 left-6 h-20 w-20 bg-white rounded-full p-1 shadow-sm border">
             <div className="h-full w-full bg-muted rounded-full flex items-center justify-center overflow-hidden">
               <User className="h-10 w-10 text-muted-foreground" />
             </div>
           </div>
        </div>
        <div className="pt-12 pb-6 px-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Michael Johnson</h2>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active IPD</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              UHID: <span className="font-medium text-foreground">EH-2026-8901</span>
              <span>•</span>
              45 Yrs, Male
              <span>•</span>
              DOB: 12 May 1981
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Blood Group</p>
              <p className="font-semibold text-red-600 flex items-center gap-1"><DropletIcon className="h-3.5 w-3.5" /> O+</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Height / Weight</p>
              <p className="font-semibold text-sm">178 cm / 82 kg</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Primary Doctor</p>
              <p className="font-semibold text-sm text-primary">Dr. Sarah Smith</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Custom Tabs */}
      <div className="flex items-center gap-1 border-b pb-0 mt-2">
        {["overview", "history", "vitals", "documents"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab 
                ? "border-primary text-primary" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab === "history" ? "Medical History" : tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {activeTab === "overview" && (
            <>
              {/* Vitals Quick Chart */}
              <Card className="shadow-sm border-border rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                  <CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4" /> Vitals Monitor (Last 24h)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vitalsData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" name="Systolic BP" dataKey="bpSystolic" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" name="Diastolic BP" dataKey="bpDiastolic" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" name="Heart Rate" dataKey="hr" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="shadow-sm border-border rounded-xl">
                <CardHeader className="border-b">
                  <CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Clinical Timeline</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-2">
                  <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">
                    {timelineData.map((item, index) => (
                      <div key={item.id} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
                          item.type === 'consult' ? 'bg-blue-500' :
                          item.type === 'lab' ? 'bg-purple-500' :
                          item.type === 'med' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-muted-foreground">{item.date}</span>
                          <h4 className="text-sm font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "history" && (
            <Card className="shadow-sm border-border rounded-xl">
              <CardHeader className="border-b flex flex-row items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Detailed Medical History</CardTitle>
                <Button variant="outline" size="sm"><FileEdit className="h-3.5 w-3.5 mr-2" /> Edit</Button>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Past Medical History (PMH)</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Hypertension (Diagnosed 2018)</li>
                    <li>Type 2 Diabetes Mellitus (Diagnosed 2020)</li>
                    <li>Appendectomy (2010)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Family History</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Father: Coronary Artery Disease</li>
                    <li>Mother: Healthy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Social History</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Non-smoker</li>
                    <li>Occasional alcohol consumption</li>
                    <li>Sedentary lifestyle</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Column (Sidebar-like) */}
        <div className="flex flex-col gap-6">
          
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm">Risk Factors & Alerts</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-2">
              <div className="bg-red-50 text-red-700 text-xs font-semibold px-3 py-2 rounded-md border border-red-100 flex items-center gap-2">
                <AlertCircleIcon className="h-4 w-4" /> Penicillin Allergy (Severe)
              </div>
              <div className="bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-2 rounded-md border border-orange-100 flex items-center gap-2">
                <Heart className="h-4 w-4" /> High Cardiac Risk
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Current Medication</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { name: "Lisinopril 10mg", dosage: "1 tablet daily", time: "Morning" },
                { name: "Metformin 500mg", dosage: "1 tablet twice daily", time: "After Meals" },
                { name: "Atorvastatin 20mg", dosage: "1 tablet daily", time: "Night" }
              ].map((med, i) => (
                <div key={i} className="flex justify-between items-start border-b last:border-0 pb-2 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-primary">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.dosage}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-normal">{med.time}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm">Insurance Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provider</span>
                <span className="font-medium">Blue Cross</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Policy No.</span>
                <span className="font-medium">POL-9876543</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Validity</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

// Inline icons for missing ones
function DropletIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    </svg>
  );
}
function AlertCircleIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
