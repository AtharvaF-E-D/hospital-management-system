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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Save,
  Printer,
  ChevronLeft,
  Search,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function RadiologyOrderPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({
    modality: "",
    bodyPart: "",
    priority: "Routine",
    withContrast: false,
    clinicalNotes: "",
  });

  const modalities = [
    "X-Ray",
    "Ultrasound",
    "CT Scan",
    "MRI",
    "PET Scan",
    "Mammography",
    "Fluoroscopy"
  ];

  const bodyParts = [
    "Chest", "Abdomen", "Pelvis", "Head", "Neck", "Spine", "Upper Extremity", "Lower Extremity", "Whole Body"
  ];

  const handleAddOrder = () => {
    if (currentOrder.modality && currentOrder.bodyPart) {
      setOrders([...orders, { ...currentOrder, id: Date.now().toString() }]);
      setCurrentOrder({
        modality: "",
        bodyPart: "",
        priority: "Routine",
        withContrast: false,
        clinicalNotes: "",
      });
    }
  };

  const removeOrder = (id) => {
    setOrders(orders.filter(o => o.id !== id));
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
              <ImageIcon className="h-6 w-6 text-teal-600" /> Radiology Order
            </h1>
            <p className="text-sm text-slate-500">David Smith (PT-001) • 52Y Male</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-700 border-slate-300">
            <Printer className="h-4 w-4 mr-2" /> Print Requisition
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" /> Sign & Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Input Form */}
        <Card className="col-span-1 shadow-sm border-slate-200 h-fit">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold">New Imaging Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Modality</Label>
              <Select value={currentOrder.modality} onValueChange={(v) => setCurrentOrder({...currentOrder, modality: v})}>
                <SelectTrigger><SelectValue placeholder="Select Modality" /></SelectTrigger>
                <SelectContent>
                  {modalities.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Body Part / Region</Label>
              <Select value={currentOrder.bodyPart} onValueChange={(v) => setCurrentOrder({...currentOrder, bodyPart: v})}>
                <SelectTrigger><SelectValue placeholder="Select Body Part" /></SelectTrigger>
                <SelectContent>
                  {bodyParts.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={currentOrder.priority} onValueChange={(v) => setCurrentOrder({...currentOrder, priority: v})}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Routine">Routine</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="STAT">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Checkbox 
                id="contrast" 
                checked={currentOrder.withContrast} 
                onCheckedChange={(c) => setCurrentOrder({...currentOrder, withContrast: c})}
              />
              <Label htmlFor="contrast" className="font-normal cursor-pointer">Require Contrast</Label>
            </div>

            <div className="space-y-2">
              <Label>Clinical Notes / Indications</Label>
              <Textarea 
                placeholder="Brief history, clinical suspicion, ICD codes..." 
                className="resize-none h-24"
                value={currentOrder.clinicalNotes}
                onChange={(e) => setCurrentOrder({...currentOrder, clinicalNotes: e.target.value})}
              />
            </div>

            <Button className="w-full" variant="outline" onClick={handleAddOrder} disabled={!currentOrder.modality || !currentOrder.bodyPart}>
              <Plus className="h-4 w-4 mr-2" /> Add to Order
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="col-span-1 md:col-span-2 shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-800">Order Summary</CardTitle>
              <CardDescription>Review requested imaging</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            {orders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400">
                <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
                <p>No imaging ordered yet.</p>
                <p className="text-sm mt-1">Use the form on the left to add requests.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="p-4 border border-slate-200 rounded-lg flex flex-col gap-3 bg-white shadow-sm hover:border-teal-200 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 text-lg">{o.modality} - {o.bodyPart}</h4>
                            <Badge variant={o.priority === 'STAT' ? 'destructive' : o.priority === 'Urgent' ? 'default' : 'secondary'} 
                                  className={o.priority === 'Urgent' ? 'bg-amber-500' : ''}>
                              {o.priority}
                            </Badge>
                            {o.withContrast && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">w/ Contrast</Badge>}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50 -mt-2 -mr-2" onClick={() => removeOrder(o.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {o.clinicalNotes && (
                        <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">
                          <span className="font-semibold text-slate-900 text-xs block mb-1 uppercase tracking-wider">Clinical Indications:</span>
                          {o.clinicalNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Safety & Signature Placeholder */}
            {orders.length > 0 && (
              <div className="mt-auto border-t border-slate-200 bg-slate-50">
                
                {orders.some(o => o.withContrast) && (
                  <div className="px-6 py-3 border-b border-slate-200 bg-blue-50/50 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold">Contrast Requested</p>
                      <p className="text-blue-700/80">Please ensure patient's eGFR is documented and &gt; 30 mL/min/1.73m² prior to administration. Check for contrast allergies.</p>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      <p>Ordering Physician: Dr. Sarah Smith</p>
                      <p>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-48 h-12 border-b-2 border-slate-300 border-dashed mb-2 flex items-end justify-center pb-1">
                        <span className="text-teal-600/30 flex items-center gap-1 text-xs font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> Digital Signature Required
                        </span>
                      </div>
                    </div>
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
