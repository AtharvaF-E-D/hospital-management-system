import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Pill, CheckCircle2, XCircle, AlertCircle, Clock, Save, FileSignature } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export default function MedicationPage() {
  const [patientId, setPatientId] = useState("PT-2023-045");
  const [medications, setMedications] = useState([
    { id: 1, name: "Amoxicillin", dose: "500mg", route: "PO", freq: "TID", time: "08:00 AM", status: "PENDING" },
    { id: 2, name: "Ibuprofen", dose: "400mg", route: "PO", freq: "PRN", time: "As needed", status: "PENDING" },
    { id: 3, name: "Normal Saline", dose: "1000ml", route: "IV", freq: "Continuous", time: "Started", status: "ADMINISTERED", givenAt: "06:00 AM", by: "Nurse John" },
  ]);

  const [selectedMed, setSelectedMed] = useState(null);
  const [actionType, setActionType] = useState(""); // ADMINISTER or SKIP
  const [remarks, setRemarks] = useState("");
  const [signature, setSignature] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openActionDialog = (med, type) => {
    setSelectedMed(med);
    setActionType(type);
    setRemarks("");
    setSignature("");
    setIsDialogOpen(true);
  };

  const handleAction = () => {
    if (!signature.trim()) return;

    setMedications(medications.map(med => {
      if (med.id === selectedMed.id) {
        return {
          ...med,
          status: actionType === 'ADMINISTER' ? 'ADMINISTERED' : 'SKIPPED',
          givenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          by: signature,
          remarks: remarks
        };
      }
      return med;
    }));
    
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Pill className="h-6 w-6 text-indigo-600" /> Medication Admin Record (MAR)
          </h1>
          <p className="text-sm text-slate-500">View schedule and administer patient medications.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search Patient ID..." 
              className="pl-9 bg-white"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-slate-200">Load</Button>
        </div>
      </div>

      {/* Patient Context */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-lg text-indigo-700">
            JD
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight text-slate-900">John Doe</h2>
            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
              <span>{patientId}</span>
              <span>45 Yrs, Male</span>
              <span className="font-semibold text-indigo-600">Ward 3B, Bed 12</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            Allergy: Penicillin
          </Badge>
          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
            Fall Risk
          </Badge>
        </div>
      </div>

      {/* MAR Table */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">Scheduled Medications</CardTitle>
          <Button variant="outline" size="sm" className="bg-white">
            <Search className="h-4 w-4 mr-2" /> Scan Barcode
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Medication</th>
                  <th className="px-6 py-4">Dose / Route</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medications.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 text-base">{med.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{med.dose}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{med.route}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Clock className="h-3.5 w-3.5 text-indigo-500" />
                        {med.time}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{med.freq}</p>
                    </td>
                    <td className="px-6 py-4">
                      {med.status === 'PENDING' && <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>}
                      {med.status === 'ADMINISTERED' && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Administered</Badge>}
                      {med.status === 'SKIPPED' && <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Skipped</Badge>}
                    </td>
                    <td className="px-6 py-4">
                      {med.status !== 'PENDING' ? (
                        <div className="text-xs text-slate-500">
                          <p>At {med.givenAt} by {med.by}</p>
                          {med.remarks && <p className="italic mt-0.5">"{med.remarks}"</p>}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {med.status === 'PENDING' ? (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => openActionDialog(med, 'SKIP')}>
                            Skip
                          </Button>
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => openActionDialog(med, 'ADMINISTER')}>
                            Administer
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600" disabled>
                          <CheckCircle2 className="h-4 w-4 mr-2" /> Done
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === 'ADMINISTER' ? <Pill className="h-5 w-5 text-indigo-600" /> : <AlertCircle className="h-5 w-5 text-red-600" />}
              {actionType === 'ADMINISTER' ? 'Administer Medication' : 'Skip Medication'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'ADMINISTER' ? 'Confirm administration details below.' : 'Please provide a reason for skipping.'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMed && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
              <p className="font-bold text-slate-900">{selectedMed.name}</p>
              <p className="text-sm text-slate-600">{selectedMed.dose} - {selectedMed.route} - {selectedMed.time}</p>
            </div>
          )}

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <label htmlFor="remarks" className="text-sm font-medium">
                {actionType === 'SKIP' ? 'Reason (Required)' : 'Remarks (Optional)'}
              </label>
              <Textarea 
                id="remarks" 
                placeholder={actionType === 'SKIP' ? "Patient refused..." : "E.g. Taken with food"}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="signature" className="text-sm font-medium flex items-center gap-2">
                <FileSignature className="h-4 w-4" /> Digital Signature (PIN/Name)
              </label>
              <Input 
                id="signature" 
                placeholder="Type your name or PIN"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              className={actionType === 'ADMINISTER' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'}
              onClick={handleAction}
              disabled={!signature.trim() || (actionType === 'SKIP' && !remarks.trim())}
            >
              Confirm {actionType === 'ADMINISTER' ? 'Administration' : 'Skip'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
