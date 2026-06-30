import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, AlertTriangle, Clock, Users, Zap, MoreHorizontal, Eye, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const emergencyPatients = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  caseId: `ER-${String(5000 + i).padStart(6, "0")}`,
  patient: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Vikram Reddy"][i % 5],
  age: 20 + (i % 50),
  triage: ["Critical", "Urgent", "Standard", "Non-Urgent"][i % 4],
  complaint: ["Chest pain", "Road accident", "Burn injury", "Seizure", "Breathing difficulty"][i % 5],
  doctor: ["Dr. Verma", "Dr. Iyer", "Dr. Kapoor"][i % 3],
  arrival: `${String(1 + (i % 12)).padStart(2, "0")}:${i % 2 === 0 ? "15" : "45"} ${i % 2 === 0 ? "AM" : "PM"}`,
  status: ["active", "stable", "critical", "discharged"][i % 4],
}));

const columns = [
  { key: "caseId", label: "Case ID", width: "120px" },
  {
    key: "patient",
    label: "Patient",
    render: (val, row) => (
      <div>
        <div className="font-medium text-[13px]">{val}</div>
        <div className="text-[11px] text-muted-foreground">Age: {row.age}</div>
      </div>
    ),
  },
  {
    key: "triage",
    label: "Triage",
    width: "100px",
    render: (val) => {
      const colors = {
        Critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        Urgent: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        Standard: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        "Non-Urgent": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      };
      return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${colors[val]}`}>
          {val}
        </span>
      );
    },
  },
  { key: "complaint", label: "Complaint" },
  { key: "doctor", label: "Attending Doctor" },
  { key: "arrival", label: "Arrival", width: "100px" },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function EmergencyPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Emergency Department"
        description="Manage emergency cases, triage, and critical care."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Emergency" },
        ]}
        actions={
          <Button size="sm" className="h-8 text-xs bg-red-600 hover:bg-red-700">
            <Plus className="h-3.5 w-3.5 mr-1" />
            New Emergency
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Cases" value="14" change="3 critical" icon={AlertTriangle} trend="down" />
        <StatCard title="Avg. Wait Time" value="8 min" change="-2 min vs avg" icon={Clock} />
        <StatCard title="Patients Today" value="32" change="+5 vs yesterday" icon={Users} />
        <StatCard title="Triage Level 1" value="3" change="Immediate attention" icon={Zap} trend="down" />
      </div>

      <DataTable
        columns={columns}
        data={emergencyPatients}
        searchable
        searchPlaceholder="Search emergency cases..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Case</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Update Triage</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
