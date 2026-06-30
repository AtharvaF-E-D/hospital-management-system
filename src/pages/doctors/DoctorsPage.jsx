import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, UserCheck, Clock, Award, Star, MoreHorizontal, Eye, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const doctors = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  empId: `DOC-${String(100 + i).padStart(4, "0")}`,
  name: ["Dr. Rajesh Verma", "Dr. Anita Iyer", "Dr. Sunil Kapoor", "Dr. Meera Rao", "Dr. Vikram Shah", "Dr. Priya Nair", "Dr. Arun Mehta", "Dr. Kavita Desai"][i % 8],
  specialization: ["Cardiology", "Orthopedics", "Neurology", "ENT", "Dermatology", "Pediatrics", "Gynecology", "General Medicine"][i % 8],
  department: ["Cardiology", "Orthopedics", "Neurology", "ENT", "Dermatology", "Pediatrics", "Gynecology", "General Medicine"][i % 8],
  qualification: ["MBBS, MD", "MBBS, MS", "MBBS, DM", "MBBS, DNB"][i % 4],
  experience: `${5 + (i % 25)} yrs`,
  phone: `+91 98${String(i).padStart(8, "0")}`,
  consultationFee: `₹${[500, 800, 1000, 1500, 2000][i % 5]}`,
  status: i % 8 === 0 ? "inactive" : "active",
}));

const columns = [
  { key: "empId", label: "ID", width: "100px" },
  {
    key: "name", label: "Doctor", render: (val, row) => (
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[11px] font-bold text-blue-700 dark:text-blue-300 shrink-0">
          {val.replace("Dr. ", "").split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <div className="font-medium text-[13px]">{val}</div>
          <div className="text-[11px] text-muted-foreground">{row.qualification}</div>
        </div>
      </div>
    ),
  },
  { key: "specialization", label: "Specialization" },
  { key: "department", label: "Department" },
  { key: "experience", label: "Exp.", width: "70px" },
  { key: "consultationFee", label: "Fee", width: "80px" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", width: "90px", render: (val) => <StatusBadge status={val} /> },
];

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Doctors" description="Manage doctor profiles, schedules, and availability."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Doctors" }]}
        actions={<Button size="sm" className="h-8 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Doctor</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Doctors" value="86" change="+2 this month" icon={UserCheck} />
        <StatCard title="Available Today" value="62" change="72% available" icon={Clock} />
        <StatCard title="Specializations" value="18" change="Across 12 depts" icon={Award} />
        <StatCard title="Avg. Rating" value="4.6" change="+0.2 this quarter" icon={Star} />
      </div>
      <DataTable columns={columns} data={doctors} searchable selectable searchPlaceholder="Search doctors..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Profile</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
