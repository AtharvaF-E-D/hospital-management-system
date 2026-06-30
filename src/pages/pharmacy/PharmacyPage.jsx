import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, Pill, Package, AlertTriangle, TrendingUp, MoreHorizontal, Eye, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const medicines = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  code: `MED-${String(100 + i).padStart(4, "0")}`,
  name: ["Paracetamol 500mg", "Amoxicillin 250mg", "Metformin 500mg", "Omeprazole 20mg", "Atorvastatin 10mg", "Ciprofloxacin 500mg", "Cetirizine 10mg", "Ranitidine 150mg"][i % 8],
  category: ["Analgesic", "Antibiotic", "Antidiabetic", "Antacid", "Statin", "Antibiotic", "Antihistamine", "Antacid"][i % 8],
  manufacturer: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Zydus"][i % 5],
  stock: Math.floor(Math.random() * 500) + 10,
  unit: "Tabs",
  mrp: (Math.random() * 200 + 10).toFixed(2),
  expiry: `2027-${String(1 + (i % 12)).padStart(2, "0")}-01`,
  status: i % 10 === 0 ? "inactive" : "active",
}));

const columns = [
  { key: "code", label: "Code", width: "100px" },
  { key: "name", label: "Medicine Name", render: (val) => <span className="font-medium">{val}</span> },
  { key: "category", label: "Category" },
  { key: "manufacturer", label: "Manufacturer" },
  { key: "stock", label: "Stock", width: "80px", align: "right", render: (val) => <span className={val < 50 ? "text-red-600 font-semibold" : ""}>{val}</span> },
  { key: "unit", label: "Unit", width: "60px" },
  { key: "mrp", label: "MRP (₹)", width: "90px", align: "right" },
  { key: "expiry", label: "Expiry", width: "110px" },
  { key: "status", label: "Status", width: "90px", render: (val) => <StatusBadge status={val} /> },
];

export default function PharmacyPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Pharmacy" description="Manage medicine inventory, sales, and purchases."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Pharmacy" }]}
        actions={<Button size="sm" className="h-8 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Medicine</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Medicines" value="2,456" change="+32 this month" icon={Pill} />
        <StatCard title="In Stock" value="2,180" change="89% availability" icon={Package} />
        <StatCard title="Low Stock" value="48" change="Needs reorder" icon={AlertTriangle} trend="down" />
        <StatCard title="Sales Today" value="₹45,230" change="+15% vs yesterday" icon={TrendingUp} />
      </div>
      <DataTable columns={columns} data={medicines} searchable selectable searchPlaceholder="Search medicines..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
              <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
