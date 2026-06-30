import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, Bed, Users, Clock, Activity, MoreHorizontal, Eye, Edit, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const admissions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  admissionId: `IPD-${String(4000 + i).padStart(6, "0")}`,
  patient: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Vikram Reddy"][i % 5],
  doctor: ["Dr. Verma", "Dr. Iyer", "Dr. Kapoor", "Dr. Rao", "Dr. Shah"][i % 5],
  ward: ["General", "ICU", "Private", "Semi-Private", "Pediatric"][i % 5],
  bed: `${["A", "B", "C"][i % 3]}-${101 + i}`,
  admissionDate: `2026-06-${String(1 + (i % 20)).padStart(2, "0")}`,
  diagnosis: ["Pneumonia", "Fracture", "Heart failure", "Post-surgery", "Dengue"][i % 5],
  condition: ["stable", "critical", "active"][i % 3],
  status: ["admitted", "discharged", "active"][i % 3],
}));

const columns = [
  { key: "admissionId", label: "Admission ID", width: "130px" },
  {
    key: "patient",
    label: "Patient",
    render: (val) => <span className="font-medium">{val}</span>,
  },
  { key: "doctor", label: "Attending Doctor" },
  { key: "ward", label: "Ward" },
  { key: "bed", label: "Bed", width: "80px" },
  { key: "admissionDate", label: "Admitted On", width: "120px" },
  { key: "diagnosis", label: "Diagnosis" },
  {
    key: "condition",
    label: "Condition",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function IPDPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="IPD - Inpatient Department"
        description="Manage admissions, beds, wards, and discharge."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "IPD" },
        ]}
        actions={
          <Button size="sm" className="h-8 text-xs">
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Admission
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Admissions" value="142" change="+6 today" icon={Bed} />
        <StatCard title="ICU Patients" value="18" change="2 critical" icon={Activity} trend="down" />
        <StatCard title="Available Beds" value="34" change="out of 200" icon={Users} />
        <StatCard title="Avg. Stay" value="4.2 days" change="-0.3 vs last month" icon={Clock} />
      </div>

      <DataTable
        columns={columns}
        data={admissions}
        searchable
        selectable
        searchPlaceholder="Search by patient, admission ID, ward..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Update Treatment</DropdownMenuItem>
              <DropdownMenuItem><FileText className="h-3.5 w-3.5 mr-2" />Discharge Summary</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
