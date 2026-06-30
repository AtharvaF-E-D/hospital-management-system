import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, TestTube, FlaskConical, FileText, Clock, MoreHorizontal, Eye, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const labOrders = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  orderId: `LAB-${String(6000 + i).padStart(6, "0")}`,
  patient: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Vikram Reddy"][i % 5],
  test: ["CBC", "LFT", "KFT", "Lipid Profile", "Thyroid Panel", "HbA1c", "Urine R/M", "Blood Sugar"][i % 8],
  doctor: ["Dr. Verma", "Dr. Iyer", "Dr. Kapoor", "Dr. Rao"][i % 4],
  sampleType: ["Blood", "Urine", "Serum", "Plasma"][i % 4],
  priority: ["Routine", "Urgent", "STAT"][i % 3],
  date: `2026-06-${String(1 + (i % 28)).padStart(2, "0")}`,
  status: ["pending", "collected", "processing", "completed"][i % 4],
}));

const columns = [
  { key: "orderId", label: "Order ID", width: "130px" },
  { key: "patient", label: "Patient", render: (val) => <span className="font-medium">{val}</span> },
  { key: "test", label: "Test Name" },
  { key: "doctor", label: "Ordered By" },
  { key: "sampleType", label: "Sample", width: "90px" },
  {
    key: "priority",
    label: "Priority",
    width: "90px",
    render: (val) => {
      const colors = { Routine: "bg-blue-100 text-blue-800", Urgent: "bg-orange-100 text-orange-800", STAT: "bg-red-100 text-red-800" };
      return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${colors[val]}`}>{val}</span>;
    },
  },
  { key: "date", label: "Date", width: "110px" },
  { key: "status", label: "Status", width: "100px", render: (val) => <StatusBadge status={val} /> },
];

export default function LaboratoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Laboratory"
        description="Manage lab orders, sample collection, processing, and reports."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Laboratory" }]}
        actions={<Button size="sm" className="h-8 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />New Lab Order</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders Today" value="124" change="+18 vs yesterday" icon={TestTube} />
        <StatCard title="Pending Collection" value="15" change="3 STAT" icon={FlaskConical} trend="down" />
        <StatCard title="Processing" value="28" change="Avg TAT: 2.5h" icon={Clock} />
        <StatCard title="Reports Generated" value="81" change="+12% this week" icon={FileText} />
      </div>
      <DataTable columns={columns} data={labOrders} searchable selectable searchPlaceholder="Search lab orders..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Report</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Update Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
