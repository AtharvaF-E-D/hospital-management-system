import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList, Plus, Trash2, Calendar as CalendarIcon, Clock, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review Lab Results for David Smith", priority: "High", due: "Today, 2:00 PM", completed: false, category: "Clinical" },
    { id: 2, title: "Sign discharge summary for Sarah Johnson", priority: "Medium", due: "Today, 5:00 PM", completed: false, category: "Administrative" },
    { id: 3, title: "Follow up call with Mrs. Davis", priority: "Low", due: "Tomorrow", completed: false, category: "Patient Care" },
    { id: 4, title: "Complete weekly departmental report", priority: "Medium", due: "Friday", completed: true, category: "Administrative" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newCategory, setNewCategory] = useState("Clinical");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      {
        id: Date.now(),
        title: newTask,
        priority: newPriority,
        due: "Today",
        completed: false,
        category: newCategory
      },
      ...tasks
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Low': return 'text-teal-600 bg-teal-50 border-teal-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col pb-6">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-teal-600" /> My Tasks
          </h1>
          <p className="text-sm text-slate-500">Manage your daily clinical and administrative tasks.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-center px-2 border-r border-slate-200">
            <span className="block text-2xl font-bold text-teal-600">{pendingTasks.length}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Pending</span>
          </div>
          <div className="text-center px-2">
            <span className="block text-2xl font-bold text-slate-400">{completedTasks.length}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Done</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Add Task Panel */}
        <Card className="col-span-1 shadow-sm border-slate-200 h-fit">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Task Description</label>
              <Input 
                placeholder="What needs to be done?" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Priority</label>
              <Select value={newPriority} onValueChange={setNewPriority}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clinical">Clinical</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                  <SelectItem value="Patient Care">Patient Care</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-2" onClick={handleAddTask}>
              Create Task
            </Button>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6 overflow-hidden">
          
          <Card className="shadow-sm border-slate-200 flex-1 flex flex-col min-h-[300px]">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                Pending Tasks <Badge className="ml-2 bg-teal-100 text-teal-700 hover:bg-teal-100 border-teal-200">{pendingTasks.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0 bg-slate-50/50">
              {pendingTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <ClipboardList className="h-12 w-12 mb-3 opacity-20" />
                  <p>All caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingTasks.map(task => (
                    <div key={task.id} className="p-4 bg-white hover:bg-slate-50 transition-colors group flex items-start gap-4">
                      <Checkbox 
                        className="mt-1 h-5 w-5 rounded-full border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm mb-1">{task.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-[10px] ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600">
                            {task.category}
                          </Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto">
                            <Clock className="h-3 w-3" /> {task.due}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all shrink-0" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Tasks - Collapsible or fixed smaller height */}
          {completedTasks.length > 0 && (
            <Card className="shadow-sm border-slate-200 shrink-0 max-h-[250px] flex flex-col">
              <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50">
                <CardTitle className="text-sm font-bold text-slate-600">
                  Completed Recently ({completedTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto p-0">
                <div className="divide-y divide-slate-100">
                  {completedTasks.map(task => (
                    <div key={task.id} className="p-3 bg-slate-50/50 flex items-center gap-4 opacity-75">
                      <Checkbox 
                        className="h-4 w-4 rounded-full border-slate-300 data-[state=checked]:bg-slate-400 data-[state=checked]:border-slate-400"
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <p className="text-sm text-slate-500 line-through flex-1 truncate">{task.title}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
