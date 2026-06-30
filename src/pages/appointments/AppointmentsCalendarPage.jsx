import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, User, Clock, MapPin, X } from "lucide-react";

const daysInMonth = 30; // Mock 30 days for demo
const startingDayOfWeek = 2; // Tuesday

const mockAppointments = [
  { id: 1, date: 5, time: "09:00 AM", patient: "Alice Cooper", doctor: "Dr. Smith", type: "Consultation" },
  { id: 2, date: 5, time: "11:30 AM", patient: "Bob Marley", doctor: "Dr. Smith", type: "Follow-up" },
  { id: 3, date: 12, time: "02:00 PM", patient: "Charlie Brown", doctor: "Dr. Adams", type: "Checkup" },
  { id: 4, date: 18, time: "10:15 AM", patient: "David Bowie", doctor: "Dr. House", type: "Surgery" },
  { id: 5, date: 22, time: "04:45 PM", patient: "Eve Smith", doctor: "Dr. Smith", type: "Consultation" },
];

export default function AppointmentsCalendarPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const openDrawer = (date = null) => {
    setSelectedDate(date);
    setDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Appointments Calendar" 
          description="Manage hospital appointments and doctor schedules."
          breadcrumbs={[
            { label: "Dashboard", path: "/" },
            { label: "Appointments", path: "/appointments" },
            { label: "Calendar" }
          ]}
        />
        <Button onClick={() => openDrawer()}><Plus className="h-4 w-4 mr-2" /> Book Appointment</Button>
      </div>

      <Card className="shadow-sm border-border rounded-xl flex-1 flex flex-col overflow-hidden bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">June 2026</h2>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Month</Button>
            <Button variant="ghost" size="sm">Week</Button>
            <Button variant="ghost" size="sm">Day</Button>
          </div>
        </div>
        
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b bg-muted/20">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider border-r last:border-0">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNum = i - startingDayOfWeek + 1;
              const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
              const isToday = dayNum === 15; // mock today
              
              const dayAppointments = mockAppointments.filter(a => a.date === dayNum);
              
              return (
                <div 
                  key={i} 
                  className={`min-h-[120px] p-2 border-b border-r last:border-r-0 relative group transition-colors ${
                    !isCurrentMonth ? "bg-muted/30 text-muted-foreground" : "hover:bg-muted/10 cursor-pointer"
                  } ${(i+1)%7 === 0 ? 'border-r-0' : ''}`}
                  onClick={() => isCurrentMonth && openDrawer(dayNum)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                      isToday ? "bg-primary text-primary-foreground" : ""
                    }`}>
                      {isCurrentMonth ? dayNum : ""}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                    {isCurrentMonth && dayAppointments.map(apt => (
                      <div key={apt.id} className="text-[10px] px-1.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100 truncate cursor-pointer hover:bg-blue-100" title={`${apt.time} - ${apt.patient}`}>
                        <span className="font-semibold">{apt.time}</span> {apt.patient}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Book Appointment Drawer (Mock using fixed positioned div since Sheet component might not be fully configured) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-background h-full shadow-2xl animate-in slide-in-from-right flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">Book Appointment</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDate ? `For June ${selectedDate}, 2026` : "Schedule a new patient visit."}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}><X className="h-4 w-4" /></Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Patient Search</label>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input type="text" className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search by name, UHID, or phone..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Doctor</label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Dr. Sarah Smith</option>
                  <option>Dr. James Adams</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input type="date" className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" defaultValue={selectedDate ? `2026-06-${String(selectedDate).padStart(2,'0')}` : ''} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <input type="time" className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes / Reason</label>
                <textarea className="w-full h-20 rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Brief description of the visit reason..."></textarea>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end gap-2 bg-muted/10">
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
              <Button>Confirm Booking</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
