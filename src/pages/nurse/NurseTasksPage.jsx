import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Clock, Trash2, Calendar as CalendarIcon, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function NurseTasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Administer IV antibiotics for Pt 12 (Doe)", due: "10:00 AM", priority: "High", completed: false },
    { id: 2, title: "Change dressing for Pt 14 (Smith)", due: "11:00 AM", priority: "Medium", completed: false },
    { id: 3, title: "Check blood glucose for Pt 15 (Johnson)", due: "12:00 PM", priority: "Medium", completed: true },
    { id: 4, title: "Discharge instructions for Pt 10 (Davis)", due: "02:00 PM", priority: "Low", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Low': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-rose-600" /> Nursing Tasks
          </h1>
          <p className="text-sm text-slate-500">Manage your shift duties and patient care tasks.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200">
            <CalendarIcon className="mr-2 h-4 w-4" /> Today
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700">Add Task</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row justify-between items-center bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                Pending <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">{pendingTasks.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {pendingTasks.map(task => (
                  <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                    <Checkbox 
                      className="mt-1 h-5 w-5 rounded-full data-[state=checked]:bg-rose-600 border-slate-300"
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm mb-1">{task.title}</p>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-[10px] ${getPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </Badge>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" /> Due: {task.due}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {completedTasks.length > 0 && (
            <Card className="shadow-sm border-slate-200 opacity-75">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-sm font-bold text-slate-600 flex items-center gap-2">
                  Completed <Badge variant="secondary">{completedTasks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {completedTasks.map(task => (
                    <div key={task.id} className="p-4 flex items-center gap-4 bg-slate-50/50">
                      <Checkbox 
                        className="h-4 w-4 rounded-full"
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <p className="text-sm text-slate-500 line-through flex-1">{task.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="col-span-1 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-sm font-bold text-slate-700">Quick Add</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Task Description</label>
                <Input placeholder="E.g. Check IV pump..." />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full text-xs">High Pri</Button>
                <Button variant="outline" className="w-full text-xs">Routine</Button>
              </div>
              <Button className="w-full bg-rose-600 hover:bg-rose-700 mt-2">Save Task</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
