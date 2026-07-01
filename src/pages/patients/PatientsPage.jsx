import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { useMockData } from "@/contexts/MockDataContext";
import { Plus, Users, UserPlus, UserCheck, Activity, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Replaced hardcoded array with context state
const columns = [
  { key: "uhid", label: "UHID", width: "120px" },
  {
    key: "name",
    label: "Patient Name",
    render: (val, row) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
          {val.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <div className="font-medium text-[13px]">{val}</div>
          <div className="text-[11px] text-muted-foreground">{row.gender}, {row.age}y</div>
        </div>
      </div>
    ),
  },
  { key: "phone", label: "Phone" },
  { key: "bloodGroup", label: "Blood Group", width: "100px" },
  { key: "doctor", label: "Assigned Doctor" },
  { key: "lastVisit", label: "Last Visit", width: "120px" },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function PatientsPage() {
  const navigate = useNavigate();
  const { patients, deletePatient } = useMockData();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Patient Management"
        description="Manage all registered patients and their records."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Patient Management" },
        ]}
        actions={
          <Button size="sm" className="h-8 text-xs" onClick={() => navigate("/patients/register")}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Patient
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value="12,845" change="+124 this month" icon={Users} />
        <StatCard title="New Registrations" value="48" change="+12% vs last week" icon={UserPlus} />
        <StatCard title="Active Patients" value="3,256" change="+5% this month" icon={UserCheck} />
        <StatCard title="Admitted" value="142" change="-3 today" icon={Activity} trend="down" />
      </div>

      <DataTable
        columns={columns}
        data={patients}
        searchable
        selectable
        searchPlaceholder="Search patients by name, UHID, phone..."
        bulkActions={[
          { label: "Export", icon: null, onClick: (ids) => console.log("Export", ids) },
          { label: "Delete", icon: Trash2, onClick: (ids) => console.log("Delete", ids), variant: "destructive" },
        ]}
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/patients/medical-history")}><Eye className="h-3.5 w-3.5 mr-2" />View Profile</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => deletePatient(row.id)}><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
