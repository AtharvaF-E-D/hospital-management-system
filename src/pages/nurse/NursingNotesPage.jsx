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
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Plus, Calendar, Save, Trash2, Clock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NursingNotesPage() {
  const [patientId, setPatientId] = useState("PT-2023-045");
  const [notes, setNotes] = useState([
    {
      id: 1,
      type: "Shift Note",
      content: "Patient slept well through the night. Vitals stable. No complaints of pain. IV site clear, no redness or swelling.",
      time: "07:00 AM",
      date: "Today",
      author: "Nurse Emily"
    },
    {
      id: 2,
      type: "Progress Note",
      content: "Patient assisted with morning walk. Tolerated well. Ambulates with steady gait. Mild shortness of breath resolved after 5 mins of rest.",
      time: "09:30 AM",
      date: "Today",
      author: "Nurse Emily"
    }
  ]);

  const [noteType, setNoteType] = useState("Shift Note");
  const [noteContent, setNoteContent] = useState("");

  const handleSaveNote = () => {
    if (!noteContent.trim()) return;

    setNotes([
      {
        id: Date.now(),
        type: noteType,
        content: noteContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: "Today",
        author: "Nurse Emily (You)"
      },
      ...notes
    ]);
    
    setNoteContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const getNoteColor = (type) => {
    switch(type) {
      case 'Shift Note': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Progress Note': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Observation': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Incident': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-600" /> Nursing Notes
          </h1>
          <p className="text-sm text-slate-500">Document patient progress, shift summaries, and observations.</p>
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
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-lg text-emerald-700">
          JD
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight text-slate-900">John Doe</h2>
          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
            <span>{patientId}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>45 Yrs, Male</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="font-semibold text-emerald-600">Ward 3B, Bed 12</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Note */}
        <Card className="col-span-1 shadow-sm border-slate-200 h-fit sticky top-24">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Note
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Note Type</label>
              <Select value={noteType} onValueChange={setNoteType}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shift Note">Shift Note</SelectItem>
                  <SelectItem value="Progress Note">Progress Note</SelectItem>
                  <SelectItem value="Observation">Observation</SelectItem>
                  <SelectItem value="Patient Education">Patient Education</SelectItem>
                  <SelectItem value="Incident">Incident</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Content</label>
              <Textarea 
                placeholder="Enter detailed nursing observations..."
                className="h-48 resize-none text-sm bg-white"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleSaveNote}>
              <Save className="h-4 w-4 mr-2" /> Save Note
            </Button>
          </CardContent>
        </Card>

        {/* Notes Timeline */}
        <div className="col-span-1 lg:col-span-2">
          <Card className="shadow-sm border-slate-200 min-h-[500px]">
            <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-bold">Notes History</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-white cursor-pointer hover:bg-slate-50">All</Badge>
                <Badge variant="outline" className="bg-white text-slate-500 cursor-pointer hover:bg-slate-50">Shift Notes</Badge>
                <Badge variant="outline" className="bg-white text-slate-500 cursor-pointer hover:bg-slate-50">Progress</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {notes.map((note) => (
                  <div key={note.id} className="relative pl-6 pb-6 border-l-2 border-slate-100 last:border-0 last:pb-0">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-emerald-500" />
                    
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getNoteColor(note.type)}>{note.type}</Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                            <Clock className="h-3 w-3" /> {note.date} at {note.time}
                          </span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all" onClick={() => deleteNote(note.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        {note.content}
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3">
                        <User className="h-3 w-3" />
                        Signed electronically by {note.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
