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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Save,
  Mic,
  Paperclip,
  Clock,
  Sparkles,
  ChevronLeft,
  FileText,
  Activity,
  History,
  Info
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function ConsultationPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("soap");

  // Form state
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    history: "",
    examination: "",
    assessment: "",
    plan: "",
    diagnosis: "",
    advice: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Clinical Consultation
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>
            </h1>
            <p className="text-sm text-slate-500">David Smith (PT-001) • 52Y Male</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-slate-700 border-slate-300">
            Save Draft
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" /> Complete & Sign
          </Button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Side: Patient Context (Fixed width) */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="p-4 pb-2 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-teal-600" /> Today's Vitals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">BP</span>
                <span className="font-semibold text-slate-900">130/85</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">HR</span>
                <span className="font-semibold text-slate-900">78 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Temp</span>
                <span className="font-semibold text-slate-900">98.6°F</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Wt</span>
                <span className="font-semibold text-slate-900">82 kg</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="p-4 pb-2 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-600">
                <Info className="h-4 w-4 text-red-600" /> Critical Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3 space-y-3">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Allergies</span>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Penicillin</Badge>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Active Conditions</span>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="font-normal">Hypertension</Badge>
                  <Badge variant="secondary" className="font-normal">Type 2 Diabetes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 flex-1 min-h-[200px]">
            <CardHeader className="p-4 pb-2 border-b border-slate-100">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <History className="h-4 w-4 text-teal-600" /> Previous Visit
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-3 text-sm text-slate-600">
              <p className="text-xs text-slate-400 mb-1">2026-06-15</p>
              <p className="line-clamp-4">Patient presented with mild headaches. BP was elevated. Adjusted Lisinopril dosage. Recommended low sodium diet.</p>
              <Button variant="link" className="px-0 h-auto text-teal-600 mt-2 text-xs">View full note</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Consultation Form */}
        <div className="flex-1 flex flex-col bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-4 pt-2 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <TabsList className="bg-transparent border-0 h-10 p-0 space-x-6 justify-start">
                <TabsTrigger value="soap" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 rounded-none px-1 pb-2">
                  SOAP Notes
                </TabsTrigger>
                <TabsTrigger value="diagnosis" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 rounded-none px-1 pb-2">
                  Diagnosis & Plan
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 rounded-none px-1 pb-2">
                  Quick Orders
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2 pb-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`h-8 ${isRecording ? 'border-red-200 bg-red-50 text-red-600 animate-pulse' : 'text-slate-600'}`}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className="h-4 w-4 mr-1.5" /> {isRecording ? "Recording..." : "Dictate"}
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                  <Sparkles className="h-4 w-4 mr-1.5" /> AI Assist
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 custom-scrollbar">
              <TabsContent value="soap" className="m-0 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chiefComplaint" className="font-semibold text-slate-800 text-base">Chief Complaint / Subjective</Label>
                    <Textarea 
                      id="chiefComplaint"
                      name="chiefComplaint"
                      placeholder="Patient's symptoms, duration, severity..."
                      value={formData.chiefComplaint}
                      onChange={handleChange}
                      className="min-h-[100px] resize-y bg-white focus-visible:ring-teal-500 border-slate-200 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="history" className="font-semibold text-slate-800 text-base">History of Present Illness</Label>
                    <Textarea 
                      id="history"
                      name="history"
                      placeholder="Detailed history, medications taken, alleviating factors..."
                      value={formData.history}
                      onChange={handleChange}
                      className="min-h-[100px] resize-y bg-white focus-visible:ring-teal-500 border-slate-200 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="examination" className="font-semibold text-slate-800 text-base">Objective / Examination</Label>
                    <Textarea 
                      id="examination"
                      name="examination"
                      placeholder="Physical findings, general appearance, system-wise exam..."
                      value={formData.examination}
                      onChange={handleChange}
                      className="min-h-[120px] resize-y bg-white focus-visible:ring-teal-500 border-slate-200 shadow-sm"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="diagnosis" className="m-0 space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis" className="font-semibold text-slate-800 text-base">Assessment / Diagnosis</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Search ICD-10 codes or diagnosis..." 
                        className="pl-9 bg-white border-slate-200 mb-2 h-10 shadow-sm"
                      />
                    </div>
                    <Textarea 
                      id="assessment"
                      name="assessment"
                      placeholder="Clinical assessment, differential diagnosis..."
                      value={formData.assessment}
                      onChange={handleChange}
                      className="min-h-[100px] resize-y bg-white focus-visible:ring-teal-500 border-slate-200 shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan" className="font-semibold text-slate-800 text-base">Treatment Plan</Label>
                    <Textarea 
                      id="plan"
                      name="plan"
                      placeholder="Medication changes, lifestyle advice, referrals..."
                      value={formData.plan}
                      onChange={handleChange}
                      className="min-h-[120px] resize-y bg-white focus-visible:ring-teal-500 border-slate-200 shadow-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="advice" className="font-semibold text-slate-800 text-base">Patient Instructions / Advice</Label>
                    <Textarea 
                      id="advice"
                      name="advice"
                      placeholder="Specific instructions printed for the patient..."
                      value={formData.advice}
                      onChange={handleChange}
                      className="min-h-[80px] resize-y bg-white focus-visible:ring-teal-500 border-slate-200 shadow-sm"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="m-0">
                <div className="text-center py-12 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium text-slate-700">Quick Orders Panel</p>
                  <p className="mb-6">Use the sidebar or quick links below to create orders.</p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" className="text-teal-700 border-teal-200" onClick={() => navigate('/doctor/consultation/prescription')}>
                      + Prescription
                    </Button>
                    <Button variant="outline" className="text-teal-700 border-teal-200" onClick={() => navigate('/doctor/consultation/lab')}>
                      + Lab Order
                    </Button>
                    <Button variant="outline" className="text-teal-700 border-teal-200" onClick={() => navigate('/doctor/consultation/radiology')}>
                      + Radiology Order
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
            
            <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center">
              <Button variant="ghost" size="sm" className="text-slate-500">
                <Paperclip className="h-4 w-4 mr-2" /> Add Attachment
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab('diagnosis')} className={activeTab === 'diagnosis' ? 'hidden' : ''}>
                  Next: Diagnosis
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
