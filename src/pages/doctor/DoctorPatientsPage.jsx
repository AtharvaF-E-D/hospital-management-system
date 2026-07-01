import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  MoreVertical,
  Activity,
  User,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DoctorPatientsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock patient queue
  const queue = [
    { id: "Q01", patient: "Sarah Johnson", age: "45", gender: "F", waitTime: "15 mins", reason: "Follow-up", status: "Next" },
    { id: "Q02", patient: "Michael Chen", age: "32", gender: "M", waitTime: "30 mins", reason: "New Patient", status: "Waiting" },
    { id: "Q03", patient: "Emily Davis", age: "28", gender: "F", waitTime: "45 mins", reason: "Consultation", status: "Waiting" },
  ];

  // Mock my patients list
  const myPatients = [
    { id: "PT-001", name: "David Smith", age: 52, gender: "M", lastVisit: "2026-06-15", nextVisit: "2026-07-05", condition: "Hypertension" },
    { id: "PT-002", name: "Lisa Wong", age: 34, gender: "F", lastVisit: "2026-06-20", nextVisit: "None", condition: "Asthma" },
    { id: "PT-003", name: "James Wilson", age: 61, gender: "M", lastVisit: "2026-05-10", nextVisit: "2026-07-12", condition: "Type 2 Diabetes" },
    { id: "PT-004", name: "Maria Garcia", age: 41, gender: "F", lastVisit: "2026-06-01", nextVisit: "None", condition: "Migraine" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Patients</h1>
          <p className="text-sm text-slate-500">Manage your patient list and current queue.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Active Queue */}
        <Card className="border-slate-200 shadow-sm md:col-span-1 h-fit">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" /> Waiting Queue
              </CardTitle>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">3 Waiting</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {queue.map((q, idx) => (
                <div key={q.id} className={`p-4 transition-colors hover:bg-slate-50 ${idx === 0 ? 'bg-amber-50/50' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">{q.patient}</h4>
                      <p className="text-xs text-slate-500">{q.age}Y • {q.gender} • {q.id}</p>
                    </div>
                    <Badge variant={q.status === 'Next' ? 'default' : 'outline'} className={q.status === 'Next' ? 'bg-teal-600' : ''}>
                      {q.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-xs">{q.reason}</span>
                    <span className="text-amber-600 font-medium text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {q.waitTime}
                    </span>
                  </div>
                  <Button 
                    className="w-full mt-3 h-8 bg-white border border-teal-600 text-teal-700 hover:bg-teal-50"
                    onClick={() => navigate(`/doctor/patients/profile/${q.id}`)}
                  >
                    Open Chart
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Patients Directory */}
        <Card className="border-slate-200 shadow-sm md:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-teal-600" /> My Patients Directory
                </CardTitle>
                <CardDescription>All patients registered under your care.</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name, ID..."
                    className="pl-8 w-full sm:w-[250px] h-9 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                  <Filter className="h-4 w-4 text-slate-500" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50 border-y border-slate-200">
                <TableRow>
                  <TableHead className="font-semibold text-slate-900">Patient ID</TableHead>
                  <TableHead className="font-semibold text-slate-900">Name</TableHead>
                  <TableHead className="font-semibold text-slate-900">Age/Gender</TableHead>
                  <TableHead className="font-semibold text-slate-900">Primary Condition</TableHead>
                  <TableHead className="font-semibold text-slate-900">Last Visit</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myPatients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())).map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/doctor/patients/profile/${patient.id}`)}>
                    <TableCell className="font-medium text-teal-700">{patient.id}</TableCell>
                    <TableCell className="font-semibold text-slate-900">{patient.name}</TableCell>
                    <TableCell>{patient.age}Y / {patient.gender}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 text-slate-600 font-normal">
                        {patient.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500">{patient.lastVisit}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/doctor/patients/profile/${patient.id}`); }}>
                            View EMR Chart
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate('/doctor/consultation'); }}>
                            Start Consultation
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                            Book Appointment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {myPatients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <div className="py-12 text-center text-slate-500">
                No patients found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
