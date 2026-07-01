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
import {
  Save,
  Printer,
  ChevronLeft,
  Search,
  Plus,
  Trash2,
  TestTube,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function LabOrderPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({
    testName: "",
    sampleType: "Blood",
    priority: "Routine",
    instructions: "",
  });

  const availableTests = [
    { name: "Complete Blood Count (CBC)", type: "Blood" },
    { name: "Comprehensive Metabolic Panel (CMP)", type: "Blood" },
    { name: "Lipid Panel", type: "Blood" },
    { name: "HbA1c", type: "Blood" },
    { name: "Urinalysis", type: "Urine" },
    { name: "Thyroid Stimulating Hormone (TSH)", type: "Blood" },
    { name: "Urine Culture", type: "Urine" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddOrder = (testName, sampleType) => {
    setOrders([...orders, { 
      id: Date.now().toString(), 
      testName: testName || currentOrder.testName, 
      sampleType: sampleType || currentOrder.sampleType,
      priority: currentOrder.priority,
      instructions: currentOrder.instructions
    }]);
    setCurrentOrder({
      testName: "",
      sampleType: "Blood",
      priority: "Routine",
      instructions: "",
    });
    setSearchQuery("");
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
              <TestTube className="h-6 w-6 text-teal-600" /> Laboratory Order
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
        {/* Test Search & Input */}
        <Card className="col-span-1 shadow-sm border-slate-200 h-fit">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold">Add Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2 relative">
              <Label htmlFor="test-search">Search Test Directory</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="test-search"
                  placeholder="e.g. CBC, HbA1c..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Fake Search Results Dropdown */}
              {searchQuery.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {availableTests.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((test, idx) => (
                    <div 
                      key={idx} 
                      className="px-3 py-2 hover:bg-teal-50 cursor-pointer text-sm flex justify-between items-center border-b border-slate-100 last:border-0"
                      onClick={() => handleAddOrder(test.name, test.type)}
                    >
                      <span className="font-medium text-slate-700">{test.name}</span>
                      <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-500">{test.type}</Badge>
                    </div>
                  ))}
                  {availableTests.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                     <div className="px-3 py-4 text-center text-sm text-slate-500">No tests found</div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-medium mb-3 text-slate-700">Custom Test Entry</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Test Name</Label>
                  <Input 
                    value={currentOrder.testName}
                    onChange={(e) => setCurrentOrder({...currentOrder, testName: e.target.value})}
                    placeholder="Enter test name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sample Type</Label>
                    <Select value={currentOrder.sampleType} onValueChange={(v) => setCurrentOrder({...currentOrder, sampleType: v})}>
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Blood">Blood</SelectItem>
                        <SelectItem value="Urine">Urine</SelectItem>
                        <SelectItem value="Stool">Stool</SelectItem>
                        <SelectItem value="Swab">Swab</SelectItem>
                        <SelectItem value="Tissue">Tissue</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
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
                </div>

                <div className="space-y-2">
                  <Label>Clinical Notes / Instructions</Label>
                  <Textarea 
                    placeholder="Provide reason for test, special prep, or instructions for lab..." 
                    className="resize-none h-20"
                    value={currentOrder.instructions}
                    onChange={(e) => setCurrentOrder({...currentOrder, instructions: e.target.value})}
                  />
                </div>

                <Button className="w-full" variant="outline" onClick={() => handleAddOrder()} disabled={!currentOrder.testName}>
                  <Plus className="h-4 w-4 mr-2" /> Add to Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="col-span-1 md:col-span-2 shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-800">Order Summary</CardTitle>
              <CardDescription>Review selected tests before signing</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            {orders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400">
                <TestTube className="h-16 w-16 mb-4 opacity-20" />
                <p>No tests ordered yet.</p>
                <p className="text-sm mt-1">Search or enter a test manually on the left.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-4">
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="p-3 border border-slate-200 rounded-lg flex items-start justify-between bg-white shadow-sm hover:border-teal-200 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{o.testName}</h4>
                          <Badge variant={o.priority === 'STAT' ? 'destructive' : o.priority === 'Urgent' ? 'default' : 'secondary'} 
                                 className={o.priority === 'Urgent' ? 'bg-amber-500' : ''}>
                            {o.priority}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><TestTube className="h-3 w-3" /> Sample: {o.sampleType}</span>
                        </div>
                        {o.instructions && (
                          <div className="mt-2 text-sm text-slate-700 bg-slate-50 p-2 rounded">
                            <span className="font-medium text-slate-500 text-xs block mb-1">Notes:</span>
                            {o.instructions}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600 hover:bg-red-50 -mt-1 -mr-1 shrink-0" onClick={() => removeOrder(o.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Signature Placeholder */}
            {orders.length > 0 && (
              <div className="mt-auto border-t border-slate-200 p-6 bg-slate-50">
                <div className="flex items-center gap-2 mb-4 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>Patient requires fasting for 12 hours before sample collection.</p>
                </div>
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
