import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, Calendar, Clock, CheckCircle, XCircle, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const appointments = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  appointmentId: `APT-${String(2000 + i).padStart(6, "0")}`,
  patient: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Vikram Reddy"][i % 5],
  doctor: ["Dr. Verma", "Dr. Iyer", "Dr. Kapoor", "Dr. Rao", "Dr. Shah"][i % 5],
  department: ["Cardiology", "Orthopedics", "Neurology", "ENT", "Dermatology"][i % 5],
  date: `2026-06-${String(1 + (i % 28)).padStart(2, "0")}`,
  time: `${9 + (i % 8)}:${i % 2 === 0 ? "00" : "30"}`,
  type: ["Consultation", "Follow Up", "Emergency", "Telemedicine"][i % 4],
  status: ["pending", "completed", "cancelled", "active"][i % 4],
}));

const columns = [
  { key: "appointmentId", label: "Apt. ID", width: "130px" },
  { key: "patient", label: "Patient" },
  { key: "doctor", label: "Doctor" },
  { key: "department", label: "Department" },
  { key: "date", label: "Date", width: "110px" },
  { key: "time", label: "Time", width: "80px" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Appointments"
        description="Manage and schedule patient appointments."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Appointments" },
        ]}
        actions={
          <Button size="sm" className="h-8 text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Appointment
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Appointments" value="56" change="+8 vs yesterday" icon={Calendar} />
        <StatCard title="Pending" value="12" change="4 urgent" icon={Clock} />
        <StatCard title="Completed" value="38" change="+15% this week" icon={CheckCircle} />
        <StatCard title="Cancelled" value="6" change="-2 vs last week" icon={XCircle} trend="down" />
      </div>

      <DataTable
        columns={columns}
        data={appointments}
        searchable
        selectable
        searchPlaceholder="Search by patient, doctor, apt ID..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Reschedule</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive"><XCircle className="h-3.5 w-3.5 mr-2" />Cancel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
