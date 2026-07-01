import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bed, Users, Search, MoreVertical, LogIn, LogOut, ArrowRightLeft, Brush } from "lucide-react";

export default function BedManagementPage() {
  const [filter, setFilter] = useState("All");

  const [beds, setBeds] = useState([
    { id: "3B-01", room: "301", type: "General", status: "Occupied", patient: "John Doe", admDate: "2023-10-25" },
    { id: "3B-02", room: "301", type: "General", status: "Available", patient: null, admDate: null },
    { id: "3B-03", room: "302", type: "Semi-Private", status: "Occupied", patient: "Sarah Smith", admDate: "2023-10-26" },
    { id: "3B-04", room: "302", type: "Semi-Private", status: "Cleaning", patient: null, admDate: null },
    { id: "3B-05", room: "303", type: "Private", status: "Occupied", patient: "Mike Johnson", admDate: "2023-10-27" },
    { id: "3B-06", room: "304", type: "ICU Stepdown", status: "Available", patient: null, admDate: null },
    { id: "3B-07", room: "304", type: "ICU Stepdown", status: "Occupied", patient: "Emma Davis", admDate: "2023-10-28" },
    { id: "3B-08", room: "305", type: "General", status: "Reserved", patient: "Incoming Transfer", admDate: null },
  ]);

  const filteredBeds = beds.filter(bed => filter === "All" || bed.status === filter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Occupied': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cleaning': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Reserved': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Occupied': return <Users className="h-4 w-4 text-rose-500" />;
      case 'Available': return <Bed className="h-4 w-4 text-emerald-500" />;
      case 'Cleaning': return <Brush className="h-4 w-4 text-amber-500" />;
      case 'Reserved': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Bed className="h-4 w-4" />;
    }
  };

  const summary = {
    total: beds.length,
    occupied: beds.filter(b => b.status === "Occupied").length,
    available: beds.filter(b => b.status === "Available").length,
    cleaning: beds.filter(b => b.status === "Cleaning").length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Bed className="h-6 w-6 text-indigo-600" /> Bed Management
          </h1>
          <p className="text-sm text-slate-500">Monitor and manage Ward 3B bed allocations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200">
            <LogIn className="mr-2 h-4 w-4" /> Admit
          </Button>
          <Button variant="outline" className="border-slate-200">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Transfer
          </Button>
          <Button variant="outline" className="border-slate-200 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
            <LogOut className="mr-2 h-4 w-4" /> Discharge
          </Button>
        </div>
      </div>

      {/* Ward Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 text-white border-none shadow-sm cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => setFilter("All")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Beds</p>
              <h3 className="text-2xl font-bold">{summary.total}</h3>
            </div>
            <Bed className="h-8 w-8 text-slate-700" />
          </CardContent>
        </Card>
        
        <Card className="bg-rose-50 border-rose-100 shadow-sm cursor-pointer hover:bg-rose-100 transition-colors" onClick={() => setFilter("Occupied")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-rose-600/80 text-xs font-semibold uppercase tracking-wider mb-1">Occupied</p>
              <h3 className="text-2xl font-bold text-rose-700">{summary.occupied}</h3>
            </div>
            <Users className="h-8 w-8 text-rose-200" />
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-50 border-emerald-100 shadow-sm cursor-pointer hover:bg-emerald-100 transition-colors" onClick={() => setFilter("Available")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-emerald-600/80 text-xs font-semibold uppercase tracking-wider mb-1">Available</p>
              <h3 className="text-2xl font-bold text-emerald-700">{summary.available}</h3>
            </div>
            <Bed className="h-8 w-8 text-emerald-200" />
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-100 shadow-sm cursor-pointer hover:bg-amber-100 transition-colors" onClick={() => setFilter("Cleaning")}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-amber-600/80 text-xs font-semibold uppercase tracking-wider mb-1">Cleaning</p>
              <h3 className="text-2xl font-bold text-amber-700">{summary.cleaning}</h3>
            </div>
            <Brush className="h-8 w-8 text-amber-200" />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar px-2">
          <Badge variant={filter === 'All' ? 'default' : 'outline'} className={filter === 'All' ? 'bg-slate-900' : 'cursor-pointer'} onClick={() => setFilter("All")}>All</Badge>
          <Badge variant={filter === 'Occupied' ? 'default' : 'outline'} className={filter === 'Occupied' ? 'bg-rose-600' : 'cursor-pointer'} onClick={() => setFilter("Occupied")}>Occupied</Badge>
          <Badge variant={filter === 'Available' ? 'default' : 'outline'} className={filter === 'Available' ? 'bg-emerald-600' : 'cursor-pointer'} onClick={() => setFilter("Available")}>Available</Badge>
          <Badge variant={filter === 'Cleaning' ? 'default' : 'outline'} className={filter === 'Cleaning' ? 'bg-amber-600' : 'cursor-pointer'} onClick={() => setFilter("Cleaning")}>Cleaning</Badge>
          <Badge variant={filter === 'Reserved' ? 'default' : 'outline'} className={filter === 'Reserved' ? 'bg-blue-600' : 'cursor-pointer'} onClick={() => setFilter("Reserved")}>Reserved</Badge>
        </div>
        <div className="relative w-64 hidden md:block mr-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Search room or patient..." className="pl-9 h-9 bg-slate-50 border-slate-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBeds.map(bed => (
          <Card key={bed.id} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg">{bed.id}</span>
                <span className="text-xs font-semibold text-slate-500">Room {bed.room}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4 pb-5 flex flex-col items-center text-center relative">
              <Badge variant="outline" className={`absolute top-2 right-2 text-[10px] uppercase font-bold tracking-wider ${getStatusColor(bed.status)} border-none`}>
                {bed.status}
              </Badge>
              
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-3 border border-slate-100">
                {bed.status === 'Occupied' ? (
                  <Users className="h-8 w-8 text-rose-500" />
                ) : bed.status === 'Cleaning' ? (
                  <Brush className="h-8 w-8 text-amber-500" />
                ) : bed.status === 'Reserved' ? (
                  <Bed className="h-8 w-8 text-blue-500" />
                ) : (
                  <Bed className="h-8 w-8 text-emerald-500" />
                )}
              </div>

              {bed.patient ? (
                <>
                  <p className="font-bold text-slate-900 truncate w-full">{bed.patient}</p>
                  <p className="text-xs text-slate-500 mt-1">Admitted: {bed.admDate}</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-400">Empty Bed</p>
                  <p className="text-xs text-slate-400 mt-1">{bed.type}</p>
                </>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 w-full flex justify-center gap-2">
                {bed.status === 'Occupied' && (
                  <>
                    <Button variant="outline" size="sm" className="h-8 text-xs flex-1 border-slate-200">Vitals</Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs flex-1 border-slate-200">Notes</Button>
                  </>
                )}
                {bed.status === 'Available' && (
                  <Button size="sm" className="h-8 text-xs w-full bg-emerald-600 hover:bg-emerald-700">Assign Patient</Button>
                )}
                {bed.status === 'Cleaning' && (
                  <Button size="sm" variant="outline" className="h-8 text-xs w-full border-amber-200 text-amber-700 hover:bg-amber-50">Mark Clean</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
