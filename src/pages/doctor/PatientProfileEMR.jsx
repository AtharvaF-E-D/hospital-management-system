import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  Activity,
  AlertTriangle,
  History,
  FileText,
  Pill,
  Thermometer,
  HeartPulse,
  Droplet,
  ChevronLeft,
  CalendarDays,
  Clock,
  Printer
} from "lucide-react";

export default function PatientProfileEMR() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Patient Data
  const patient = {
    id: id || "PT-001",
    name: "David Smith",
    age: 52,
    gender: "Male",
    dob: "1974-05-12",
    bloodGroup: "O+",
    phone: "+1 (555) 123-4567",
    email: "david.smith@example.com",
    address: "123 Main St, New York, NY 10001",
    primaryPhysician: "Dr. Sarah Johnson",
  };

  const vitals = [
    { date: "2026-07-01 09:30", bp: "130/85", hr: "78", temp: "98.6°F", rr: "16", spo2: "98%", bmi: "28.4" },
    { date: "2026-06-15 10:15", bp: "135/88", hr: "82", temp: "98.4°F", rr: "18", spo2: "97%", bmi: "28.5" },
    { date: "2026-05-10 14:20", bp: "140/90", hr: "80", temp: "98.8°F", rr: "16", spo2: "99%", bmi: "28.7" },
  ];

  const allergies = [
    { allergen: "Penicillin", reaction: "Hives", severity: "High" },
    { allergen: "Peanuts", reaction: "Anaphylaxis", severity: "Critical" },
  ];

  const history = [
    { condition: "Type 2 Diabetes", diagnosedDate: "2020-03-15", status: "Active" },
    { condition: "Hypertension", diagnosedDate: "2021-08-10", status: "Active" },
    { condition: "Appendicitis", diagnosedDate: "2015-11-20", status: "Resolved (Appendectomy)" },
  ];

  const medications = [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2020-03-20", status: "Active" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2021-08-15", status: "Active" },
  ];

  const labs = [
    { date: "2026-06-15", testName: "HbA1c", result: "7.2%", reference: "< 5.7%", status: "High" },
    { date: "2026-06-15", testName: "Lipid Panel (LDL)", result: "115 mg/dL", reference: "< 100 mg/dL", status: "High" },
    { date: "2026-05-10", testName: "CBC (Hemoglobin)", result: "14.5 g/dL", reference: "13.8 - 17.2 g/dL", status: "Normal" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => navigate('/doctor/patients')}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to Patients
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="text-teal-700 border-teal-200 hover:bg-teal-50">
            <Printer className="h-4 w-4 mr-2" /> Print Summary
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => navigate('/doctor/consultation')}>
            Start Consultation
          </Button>
        </div>
      </div>

      {/* Patient Overview Banner */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-teal-600 h-2 w-full" />
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center shrink-0">
                <User className="h-10 w-10 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><span className="font-semibold text-slate-900">{patient.id}</span></span>
                  <span>•</span>
                  <span>{patient.age} Yrs / {patient.gender}</span>
                  <span>•</span>
                  <span>DOB: {patient.dob}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">Blood: <Badge variant="secondary" className="bg-red-100 text-red-700">{patient.bloodGroup}</Badge></span>
                </div>
              </div>
            </div>
            
            {/* Quick Alerts */}
            {allergies.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 w-full md:w-auto shrink-0 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Allergies</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {allergies.map((a, i) => (
                      <Badge key={i} variant="outline" className="bg-white text-red-700 border-red-200 text-xs">
                        {a.allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 w-full flex-wrap justify-start h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-teal-700">Overview</TabsTrigger>
          <TabsTrigger value="vitals" className="data-[state=active]:bg-white data-[state=active]:text-teal-700">Vitals & Flowsheet</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-teal-700">Medical History</TabsTrigger>
          <TabsTrigger value="medications" className="data-[state=active]:bg-white data-[state=active]:text-teal-700">Medications</TabsTrigger>
          <TabsTrigger value="labs" className="data-[state=active]:bg-white data-[state=active]:text-teal-700">Lab Results</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-white data-[state=active]:text-teal-700">Clinical Timeline</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Vitals Summary widget */}
              <Card className="col-span-1 shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <Activity className="h-4 w-4" /> Latest Vitals
                  </CardTitle>
                  <CardDescription className="text-xs">Recorded on {vitals[0].date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><HeartPulse className="h-3 w-3 text-red-500"/> BP</p>
                      <p className="text-lg font-bold text-slate-900">{vitals[0].bp}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Activity className="h-3 w-3 text-orange-500"/> HR</p>
                      <p className="text-lg font-bold text-slate-900">{vitals[0].hr} <span className="text-xs font-normal text-slate-500">bpm</span></p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Thermometer className="h-3 w-3 text-blue-500"/> Temp</p>
                      <p className="text-lg font-bold text-slate-900">{vitals[0].temp}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Droplet className="h-3 w-3 text-teal-500"/> SpO2</p>
                      <p className="text-lg font-bold text-slate-900">{vitals[0].spo2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Conditions widget */}
              <Card className="col-span-1 shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <History className="h-4 w-4" /> Active Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.filter(h => h.status === 'Active').map((h, i) => (
                      <div key={i} className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="font-medium text-sm text-slate-900">{h.condition}</span>
                        <span className="text-xs text-slate-500">Since {h.diagnosedDate.split('-')[0]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Medications widget */}
              <Card className="col-span-1 shadow-sm border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                    <Pill className="h-4 w-4" /> Current Medications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {medications.map((m, i) => (
                      <div key={i} className="flex justify-between items-start p-2 rounded bg-slate-50 border border-slate-100">
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">{m.name} {m.dosage}</span>
                          <span className="text-xs text-slate-500">{m.frequency}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Read Only Billing Summary placeholder */}
            <Card className="shadow-sm border-slate-200 bg-slate-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                  <FileText className="h-4 w-4" /> Account & Insurance Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="text-slate-500 block mb-1">Primary Insurance</span>
                    <span className="font-medium text-slate-900 block">BlueCross BlueShield</span>
                    <span className="text-xs text-slate-500">Group: 123456789</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Account Balance</span>
                    <span className="font-medium text-slate-900 block">$45.00</span>
                    <span className="text-xs text-slate-500">Last payment: 2026-06-15</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Contact Info</span>
                    <span className="font-medium text-slate-900 block">{patient.phone}</span>
                    <span className="text-xs text-slate-500 block">{patient.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals" className="outline-none">
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Vitals Flowsheet</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>BP (mmHg)</TableHead>
                      <TableHead>HR (bpm)</TableHead>
                      <TableHead>Temp</TableHead>
                      <TableHead>RR</TableHead>
                      <TableHead>SpO2</TableHead>
                      <TableHead>BMI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vitals.map((v, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium whitespace-nowrap">{v.date}</TableCell>
                        <TableCell className={v.bp.startsWith('14') ? "text-red-600 font-bold" : ""}>{v.bp}</TableCell>
                        <TableCell>{v.hr}</TableCell>
                        <TableCell>{v.temp}</TableCell>
                        <TableCell>{v.rr}</TableCell>
                        <TableCell>{v.spo2}</TableCell>
                        <TableCell>{v.bmi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would go here, omitting for brevity but following same pattern */}
          <TabsContent value="history" className="outline-none">
            <Card className="shadow-sm border-slate-200"><CardContent className="p-10 text-center text-slate-500">Medical History Data</CardContent></Card>
          </TabsContent>
          <TabsContent value="medications" className="outline-none">
             <Card className="shadow-sm border-slate-200"><CardContent className="p-10 text-center text-slate-500">Medications Data</CardContent></Card>
          </TabsContent>
          <TabsContent value="labs" className="outline-none">
            <Card className="shadow-sm border-slate-200"><CardContent className="p-10 text-center text-slate-500">Lab Results Data</CardContent></Card>
          </TabsContent>
          <TabsContent value="timeline" className="outline-none">
             <Card className="shadow-sm border-slate-200"><CardContent className="p-10 text-center text-slate-500">Clinical Timeline Data</CardContent></Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
