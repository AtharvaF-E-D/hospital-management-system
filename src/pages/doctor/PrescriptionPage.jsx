import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Save,
  Printer,
  ChevronLeft,
  Search,
  Plus,
  Trash2,
  Pill,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function PrescriptionPage() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [currentMeds, setCurrentMeds] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    foodTiming: "after",
    refill: "0"
  });

  const handleAddMedication = () => {
    if (currentMeds.name) {
      setPrescriptions([...prescriptions, { ...currentMeds, id: Date.now().toString() }]);
      setCurrentMeds({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
        foodTiming: "after",
        refill: "0"
      });
    }
  };

  const removeMedication = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Pill className="h-6 w-6 text-teal-600" /> Electronic Prescription
            </h1>
            <p className="text-sm text-slate-500">David Smith (PT-001) • 52Y Male</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-700 border-slate-300">
            <Printer className="h-4 w-4 mr-2" /> Print / PDF
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" /> Sign & Issue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Medication Input */}
        <Card className="col-span-1 shadow-sm border-slate-200 h-fit">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold">Add Medication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="med-search">Search Medicine</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="med-search"
                  placeholder="e.g. Amoxicillin, Lisinopril..." 
                  className="pl-8"
                  value={currentMeds.name}
                  onChange={(e) => setCurrentMeds({...currentMeds, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Dosage</Label>
                <Input 
                  placeholder="e.g. 500mg" 
                  value={currentMeds.dosage}
                  onChange={(e) => setCurrentMeds({...currentMeds, dosage: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={currentMeds.frequency} onValueChange={(v) => setCurrentMeds({...currentMeds, frequency: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily (OD)">Once daily (OD)</SelectItem>
                    <SelectItem value="Twice daily (BD)">Twice daily (BD)</SelectItem>
                    <SelectItem value="Three times (TDS)">Three times (TDS)</SelectItem>
                    <SelectItem value="As needed (PRN)">As needed (PRN)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input 
                  placeholder="e.g. 5 days" 
                  value={currentMeds.duration}
                  onChange={(e) => setCurrentMeds({...currentMeds, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Food Timing</Label>
                <Select value={currentMeds.foodTiming} onValueChange={(v) => setCurrentMeds({...currentMeds, foodTiming: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Before Food</SelectItem>
                    <SelectItem value="after">After Food</SelectItem>
                    <SelectItem value="with">With Food</SelectItem>
                    <SelectItem value="any">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Refills</Label>
              <Select value={currentMeds.refill} onValueChange={(v) => setCurrentMeds({...currentMeds, refill: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">1 Refill</SelectItem>
                  <SelectItem value="2">2 Refills</SelectItem>
                  <SelectItem value="3">3 Refills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Special Instructions</Label>
              <Textarea 
                placeholder="Optional instructions for patient..." 
                className="resize-none h-20"
                value={currentMeds.instructions}
                onChange={(e) => setCurrentMeds({...currentMeds, instructions: e.target.value})}
              />
            </div>

            <Button className="w-full" variant="outline" onClick={handleAddMedication} disabled={!currentMeds.name}>
              <Plus className="h-4 w-4 mr-2" /> Add to Prescription
            </Button>
          </CardContent>
        </Card>

        {/* Prescription Preview */}
        <Card className="col-span-1 md:col-span-2 shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-800">Rx Summary</CardTitle>
              <CardDescription>Review and sign to complete</CardDescription>
            </div>
            <ShieldCheck className="h-6 w-6 text-teal-600 opacity-50" />
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            {prescriptions.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400">
                <Pill className="h-16 w-16 mb-4 opacity-20" />
                <p>No medications added yet.</p>
                <p className="text-sm">Use the form to add medicines to this Rx.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage/Freq</TableHead>
                      <TableHead>Duration/Timing</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptions.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="font-semibold text-slate-900">{p.name}</div>
                          {p.instructions && <div className="text-xs text-slate-500 mt-1">{p.instructions}</div>}
                          {p.refill !== "0" && <Badge variant="outline" className="text-[10px] mt-1 bg-amber-50">Refills: {p.refill}</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-slate-900">{p.dosage}</div>
                          <div className="text-xs text-slate-500">{p.frequency}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-slate-900">{p.duration}</div>
                          <div className="text-xs text-slate-500 capitalize">{p.foodTiming} Food</div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => removeMedication(p.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* Signature Placeholder */}
            {prescriptions.length > 0 && (
              <div className="mt-auto border-t border-slate-200 p-6 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    <p>Doctor: Dr. Sarah Smith</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 h-12 border-b-2 border-slate-300 border-dashed mb-2 flex items-end justify-center pb-1">
                      {/* Placeholder for actual digital signature component */}
                      <span className="text-teal-600/30 flex items-center gap-1 text-xs font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> Digital Signature Required
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Sign & Issue to finalize</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
