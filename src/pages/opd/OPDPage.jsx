import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Stethoscope, Users, FileText, Activity, MoreHorizontal, Eye, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const visits = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  visitId: `OPD-${String(3000 + i).padStart(6, "0")}`,
  patient: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Vikram Reddy"][i % 5],
  doctor: ["Dr. Verma", "Dr. Iyer", "Dr. Kapoor", "Dr. Rao", "Dr. Shah"][i % 5],
  department: ["Cardiology", "Orthopedics", "Neurology", "ENT", "Dermatology"][i % 5],
  complaint: ["Chest pain", "Knee pain", "Headache", "Ear infection", "Skin rash"][i % 5],
  date: `2026-06-${String(1 + (i % 28)).padStart(2, "0")}`,
  vitals: `BP: ${120 + (i % 20)}/${70 + (i % 15)} | Temp: ${98 + (i % 3)}°F`,
  status: ["active", "completed", "pending"][i % 3],
  billing: ["paid", "unpaid", "pending"][i % 3],
}));

const columns = [
  { key: "visitId", label: "Visit ID", width: "130px" },
  {
    key: "patient",
    label: "Patient",
    render: (val) => <span className="font-medium">{val}</span>,
  },
  { key: "doctor", label: "Doctor" },
  { key: "department", label: "Department" },
  { key: "complaint", label: "Chief Complaint" },
  { key: "date", label: "Date", width: "110px" },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
  {
    key: "billing",
    label: "Billing",
    width: "90px",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function OPDPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="OPD - Outpatient Department"
        description="Manage outpatient visits, consultations, and prescriptions."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "OPD" },
        ]}
        actions={
          <Button size="sm" className="h-8 text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Visit
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Visits" value="78" change="+12 vs yesterday" icon={Stethoscope} />
        <StatCard title="Patients Waiting" value="14" change="Avg 12 min wait" icon={Users} />
        <StatCard title="Prescriptions" value="62" change="+8% this week" icon={FileText} />
        <StatCard title="Revenue Today" value="₹1,24,500" change="+18% vs yesterday" icon={Activity} />
      </div>

      <DataTable
        columns={columns}
        data={visits}
        searchable
        selectable
        searchPlaceholder="Search by patient, visit ID, doctor..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Visit</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Add Prescription</DropdownMenuItem>
              <DropdownMenuItem><FileText className="h-3.5 w-3.5 mr-2" />Clinical Notes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
