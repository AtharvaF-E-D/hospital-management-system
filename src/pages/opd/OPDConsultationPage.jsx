import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, FileText, Pill, Save, Plus, Printer, Trash2 } from "lucide-react";

export default function OPDConsultationPage() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, drug: "Amoxicillin", dose: "500mg", freq: "1-0-1", duration: "5 days", instructions: "After meals" }
  ]);

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { id: Date.now(), drug: "", dose: "", freq: "", duration: "", instructions: "" }]);
  };

  const removePrescription = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="OPD Consultation Workspace" 
          description="Doctor's clinical interface for active patient visits."
          breadcrumbs={[
            { label: "Dashboard", path: "/" },
            { label: "OPD", path: "/opd" },
            { label: "Consultation" }
          ]}
        />
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white"><Printer className="h-4 w-4 mr-2" /> Print Rx</Button>
          <Button className="bg-primary hover:bg-primary-hover text-white"><Save className="h-4 w-4 mr-2" /> Save Consult</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Patient Context */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="bg-primary/5 pb-4 border-b">
              <CardTitle className="text-base">Current Patient</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Emma Thompson</h3>
                <p className="text-sm text-muted-foreground">UHID: EH-2026-9042</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">32 Yrs</Badge>
                  <Badge variant="outline">Female</Badge>
                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">O-</Badge>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Chief Complaint (Triage)</p>
                  <p className="text-sm font-medium">Severe headache, mild fever since 2 days.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-2 rounded-md">
                  <div><span className="text-muted-foreground text-xs block">Temp</span><span className="font-semibold text-red-600">101.2°F</span></div>
                  <div><span className="text-muted-foreground text-xs block">BP</span><span className="font-semibold">118/75</span></div>
                  <div><span className="text-muted-foreground text-xs block">Pulse</span><span className="font-semibold text-orange-600">92 bpm</span></div>
                  <div><span className="text-muted-foreground text-xs block">SpO2</span><span className="font-semibold">98%</span></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm text-muted-foreground">Previous Visits</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="text-sm border-l-2 border-primary pl-3">
                <p className="font-medium">12 May 2026</p>
                <p className="text-muted-foreground text-xs mt-1">Diagnosis: Acute Bronchitis</p>
              </div>
              <div className="text-sm border-l-2 border-muted pl-3">
                <p className="font-medium text-muted-foreground">05 Jan 2026</p>
                <p className="text-muted-foreground text-xs mt-1">Diagnosis: Viral Fever</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Clinical Notes & Rx */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          <Card className="shadow-sm border-border rounded-xl">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="hpi" className="font-semibold">History of Present Illness (HPI)</Label>
                <textarea 
                  id="hpi"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y" 
                  placeholder="Type patient history here..."
                  defaultValue="Patient complains of throbbing headache on the right side for the past 48 hours. Accompanied by mild fever (101.2F recorded at triage). No nausea, vomiting, or photophobia."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exam" className="font-semibold">Objective / Examination</Label>
                <textarea 
                  id="exam"
                  className="w-full min-h-[80px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y" 
                  placeholder="Record physical examination findings..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis" className="font-semibold">Clinical Diagnosis (ICD-10)</Label>
                <div className="relative">
                  <Input id="diagnosis" placeholder="Search diagnosis code or name..." defaultValue="Migraine without aura (G43.0)" className="font-medium" />
                  <div className="absolute right-2 top-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">G43.0</div>
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="shadow-sm border-border rounded-xl border-t-4 border-t-primary">
            <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2"><Pill className="h-4 w-4 text-primary" /> Prescription (Rx)</CardTitle>
              <Button size="sm" variant="outline" onClick={addPrescription}><Plus className="h-3.5 w-3.5 mr-1" /> Add Drug</Button>
            </CardHeader>
            <CardContent className="pt-6">
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/20">
                    <tr>
                      <th className="px-3 py-2 font-medium rounded-tl-md">Drug Name</th>
                      <th className="px-3 py-2 font-medium">Dosage</th>
                      <th className="px-3 py-2 font-medium">Frequency</th>
                      <th className="px-3 py-2 font-medium">Duration</th>
                      <th className="px-3 py-2 font-medium">Instructions</th>
                      <th className="px-3 py-2 font-medium rounded-tr-md"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((p, index) => (
                      <tr key={p.id} className="border-b last:border-0 group">
                        <td className="py-3 px-2">
                          <Input className="h-8 shadow-none" defaultValue={p.drug} placeholder="e.g. Paracetamol" />
                        </td>
                        <td className="py-3 px-2 w-[120px]">
                          <Input className="h-8 shadow-none" defaultValue={p.dose} placeholder="500mg" />
                        </td>
                        <td className="py-3 px-2 w-[120px]">
                          <select className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary shadow-none">
                            <option value="1-0-1">1-0-1 (BD)</option>
                            <option value="1-1-1">1-1-1 (TDS)</option>
                            <option value="1-0-0">1-0-0 (OD)</option>
                            <option value="0-0-1">0-0-1 (HS)</option>
                            <option value="SOS">SOS</option>
                          </select>
                        </td>
                        <td className="py-3 px-2 w-[100px]">
                          <Input className="h-8 shadow-none" defaultValue={p.duration} placeholder="3 days" />
                        </td>
                        <td className="py-3 px-2">
                          <Input className="h-8 shadow-none" defaultValue={p.instructions} placeholder="After meals" />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removePrescription(p.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="advice" className="font-semibold text-sm">General Advice / Follow-up</Label>
                <textarea 
                  id="advice"
                  className="w-full min-h-[60px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" 
                  placeholder="Rest, hydration, follow up after 3 days if symptoms persist."
                />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
