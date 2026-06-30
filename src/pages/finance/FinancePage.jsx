import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const transactions = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, txnId: `TXN-${String(100+i).padStart(4,"0")}`,
  description: ["OPD Revenue", "Lab Income", "Pharmacy Sales", "Salary Expense", "Equipment Purchase", "Rent", "Utility Bills", "Insurance Received"][i%8],
  type: i % 3 === 0 ? "Expense" : "Income",
  category: ["Revenue", "Operating", "Capital", "Recurring"][i%4],
  amount: `₹${(Math.random()*100000+1000).toFixed(0)}`,
  date: `2026-06-${String(1+(i%28)).padStart(2,"0")}`,
  account: ["Cash", "Bank-HDFC", "Bank-SBI", "Petty Cash"][i%4],
  reference: `REF-${String(9000+i).padStart(6,"0")}`,
  status: ["completed","pending","active"][i%3],
}));

const columns = [
  { key: "txnId", label: "Txn ID", width: "100px" },
  { key: "description", label: "Description", render: (v) => <span className="font-medium">{v}</span> },
  { key: "type", label: "Type", width: "80px",
    render: (v) => <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${v === "Income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{v}</span>
  },
  { key: "category", label: "Category" },
  { key: "amount", label: "Amount", width: "110px", align: "right" },
  { key: "account", label: "Account" },
  { key: "date", label: "Date", width: "110px" },
  { key: "status", label: "Status", width: "100px", render: (v) => <StatusBadge status={v} /> },
];

export default function FinancePage() {
  return (
    <ModulePage title="Finance" description="Manage income, expenses, ledger, and financial reports."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Finance" }]}
      stats={[
        { title: "Revenue (Month)", value: "₹45.2L", change: "+18% vs last month", icon: TrendingUp },
        { title: "Expenses (Month)", value: "₹28.6L", change: "+5% vs last month", icon: TrendingDown, trend: "down" },
        { title: "Net Profit", value: "₹16.6L", change: "+32% margin", icon: DollarSign },
        { title: "Cash Balance", value: "₹8.4L", change: "Updated today", icon: Wallet },
      ]}
      columns={columns} data={transactions} addLabel="Add Entry" searchPlaceholder="Search transactions..."
    />
  );
}
