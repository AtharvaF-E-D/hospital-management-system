import { Button } from "@/components/ui/button";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import { Plus, Receipt, DollarSign, CreditCard, Percent, MoreHorizontal, Eye, Printer } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const invoices = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  invoiceNo: `INV-${String(7000 + i).padStart(6, "0")}`,
  patient: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Vikram Reddy"][i % 5],
  department: ["OPD", "IPD", "Emergency", "Lab", "Pharmacy"][i % 5],
  amount: (Math.random() * 50000 + 500).toFixed(2),
  discount: (Math.random() * 10).toFixed(1),
  tax: (Math.random() * 18).toFixed(1),
  netAmount: (Math.random() * 50000 + 500).toFixed(2),
  date: `2026-06-${String(1 + (i % 28)).padStart(2, "0")}`,
  paymentMode: ["Cash", "Card", "UPI", "Insurance", "Online"][i % 5],
  status: ["paid", "unpaid", "pending", "paid"][i % 4],
}));

const columns = [
  { key: "invoiceNo", label: "Invoice No.", width: "130px" },
  { key: "patient", label: "Patient", render: (val) => <span className="font-medium">{val}</span> },
  { key: "department", label: "Department" },
  { key: "amount", label: "Amount (₹)", align: "right", width: "110px" },
  { key: "discount", label: "Disc %", align: "right", width: "80px" },
  { key: "netAmount", label: "Net (₹)", align: "right", width: "110px", render: (val) => <span className="font-semibold">₹{parseFloat(val).toLocaleString()}</span> },
  { key: "paymentMode", label: "Mode", width: "100px" },
  { key: "date", label: "Date", width: "110px" },
  { key: "status", label: "Status", width: "90px", render: (val) => <StatusBadge status={val} /> },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Billing & Invoices" description="Manage invoices, payments, refunds, and financial transactions."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Billing" }]}
        actions={<Button size="sm" className="h-8 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />New Invoice</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Revenue Today" value="₹3,45,800" change="+22% vs yesterday" icon={DollarSign} />
        <StatCard title="Invoices Today" value="48" change="+6 pending" icon={Receipt} />
        <StatCard title="Payments Received" value="₹2,89,500" change="84% collection" icon={CreditCard} />
        <StatCard title="Outstanding" value="₹56,300" change="12 invoices" icon={Percent} trend="down" />
      </div>
      <DataTable columns={columns} data={invoices} searchable selectable searchPlaceholder="Search invoices..."
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Invoice</DropdownMenuItem>
              <DropdownMenuItem><Printer className="h-3.5 w-3.5 mr-2" />Print</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />
    </div>
  );
}
