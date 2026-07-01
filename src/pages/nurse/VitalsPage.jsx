import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Plus, Search, Calendar, Save, Trash2, Heart, Wind, Thermometer, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VitalsPage() {
  const [patientId, setPatientId] = useState("PT-2023-045");
  const [vitalsHistory, setVitalsHistory] = useState([
    { id: 1, time: "Today, 08:00 AM", bp: "120/80", hr: "72", temp: "98.6", rr: "16", spo2: "98", pain: "2", by: "Nurse Emily" },
    { id: 2, time: "Yesterday, 08:00 PM", bp: "122/82", hr: "75", temp: "99.1", rr: "18", spo2: "97", pain: "4", by: "Nurse John" },
  ]);

  const [formData, setFormData] = useState({
    bp: "",
    hr: "",
    temp: "",
    rr: "",
    spo2: "",
    pain: "",
    weight: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.bp && !formData.hr && !formData.temp) return;
    
    setVitalsHistory([
      {
        id: Date.now(),
        time: "Just now",
        bp: formData.bp || "-",
        hr: formData.hr || "-",
        temp: formData.temp || "-",
        rr: formData.rr || "-",
        spo2: formData.spo2 || "-",
        pain: formData.pain || "-",
        by: "Nurse Emily (You)"
      },
      ...vitalsHistory
    ]);
    
    setFormData({ bp: "", hr: "", temp: "", rr: "", spo2: "", pain: "", weight: "", notes: "" });
  };

  const deleteRecord = (id) => {
    setVitalsHistory(vitalsHistory.filter(v => v.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Activity className="h-6 w-6 text-rose-500" /> Patient Vitals
          </h1>
          <p className="text-sm text-slate-500">Record and monitor patient vital signs.</p>
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

      {/* Patient Context Header */}
      <div className="bg-slate-900 rounded-xl p-4 flex items-center justify-between text-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-bold text-lg text-slate-300">
            JD
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">John Doe</h2>
            <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
              <span>{patientId}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span>45 Yrs, Male</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="text-rose-400">Ward 3B, Bed 12</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-center divide-x divide-slate-800">
          <div className="pr-6">
            <span className="block text-xs text-slate-500 uppercase">Code Status</span>
            <span className="font-bold text-emerald-400">FULL CODE</span>
          </div>
          <div className="pl-6 pr-6">
            <span className="block text-xs text-slate-500 uppercase">Allergies</span>
            <span className="font-bold text-rose-400">Penicillin</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Record Vitals Form */}
        <Card className="col-span-1 lg:col-span-1 shadow-sm border-slate-200 h-fit sticky top-24">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold flex items-center justify-between">
              <span>Record New Vitals</span>
              <Badge variant="outline" className="bg-white text-slate-500 font-normal">
                <Calendar className="h-3 w-3 mr-1" /> {new Date().toLocaleDateString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1">
                  <Activity className="h-3 w-3 text-rose-500" /> Blood Pressure
                </label>
                <div className="relative">
                  <Input name="bp" placeholder="120/80" value={formData.bp} onChange={handleChange} className="pr-10 font-medium" />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mmHg</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1">
                  <Heart className="h-3 w-3 text-rose-500" /> Heart Rate
                </label>
                <div className="relative">
                  <Input name="hr" placeholder="72" value={formData.hr} onChange={handleChange} className="pr-10 font-medium" />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">bpm</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1">
                  <Thermometer className="h-3 w-3 text-amber-500" /> Temperature
                </label>
                <div className="relative">
                  <Input name="temp" placeholder="98.6" value={formData.temp} onChange={handleChange} className="pr-8 font-medium" />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">°F</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1">
                  <Wind className="h-3 w-3 text-blue-500" /> Resp Rate
                </label>
                <div className="relative">
                  <Input name="rr" placeholder="16" value={formData.rr} onChange={handleChange} className="pr-8 font-medium" />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">/min</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1">
                  <Droplets className="h-3 w-3 text-indigo-500" /> SpO2
                </label>
                <div className="relative">
                  <Input name="spo2" placeholder="98" value={formData.spo2} onChange={handleChange} className="pr-8 font-medium" />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase">Pain Scale</label>
                <div className="relative">
                  <Input name="pain" placeholder="0-10" value={formData.pain} onChange={handleChange} className="font-medium" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">Nursing Notes (Optional)</label>
              <Textarea 
                name="notes" 
                placeholder="Patient resting comfortably..." 
                value={formData.notes} 
                onChange={handleChange}
                className="resize-none h-20"
              />
            </div>

            <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> Save Vitals Record
            </Button>
          </CardContent>
        </Card>

        {/* Vitals History & Trends */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold">Vitals History</CardTitle>
              <Badge variant="secondary" className="bg-slate-100">{vitalsHistory.length} Records</Badge>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Date / Time</th>
                      <th className="px-4 py-3">BP</th>
                      <th className="px-4 py-3">HR</th>
                      <th className="px-4 py-3">Temp</th>
                      <th className="px-4 py-3">RR</th>
                      <th className="px-4 py-3">SpO2</th>
                      <th className="px-4 py-3">Recorded By</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vitalsHistory.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-3 whitespace-nowrap text-slate-900 font-medium">{record.time}</td>
                        <td className="px-4 py-3 text-rose-600 font-semibold">{record.bp}</td>
                        <td className="px-4 py-3">{record.hr}</td>
                        <td className="px-4 py-3">{record.temp}°</td>
                        <td className="px-4 py-3">{record.rr}</td>
                        <td className="px-4 py-3 text-indigo-600 font-semibold">{record.spo2}%</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{record.by}</td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteRecord(record.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {vitalsHistory.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                          No vitals recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for Graph */}
          <Card className="shadow-sm border-slate-200 bg-slate-50/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-48 text-slate-400">
              <Activity className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-sm font-medium text-slate-500">Vitals Trend Graph</p>
              <p className="text-xs mt-1">Implement charting library (e.g. Recharts) to visualize BP and HR over time.</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
