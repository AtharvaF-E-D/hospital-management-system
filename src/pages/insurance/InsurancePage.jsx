import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Shield, FileText, Building, CheckCircle } from "lucide-react";

const claims = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1, claimId: `CLM-${String(100+i).padStart(4,"0")}`,
  patient: ["Rajesh K.", "Priya S.", "Amit P.", "Sneha S.", "Vikram R."][i%5],
  company: ["Star Health", "HDFC Ergo", "Max Bupa", "ICICI Lombard", "New India"][i%5],
  policyNo: `POL-${String(5000+i).padStart(6,"0")}`,
  amount: `₹${(Math.random()*200000+10000).toFixed(0)}`,
  submittedOn: `2026-06-${String(1+(i%28)).padStart(2,"0")}`,
  type: ["Cashless","Reimbursement"][i%2],
  status: ["pending","approved","rejected","processing"][i%4],
}));

const columns = [
  { key: "claimId", label: "Claim ID", width: "110px" },
  { key: "patient", label: "Patient", render: (v) => <span className="font-medium">{v}</span> },
  { key: "company", label: "Insurance Company" },
  { key: "policyNo", label: "Policy No." },
  { key: "amount", label: "Amount", width: "110px", align: "right" },
  { key: "type", label: "Type", width: "110px" },
  { key: "submittedOn", label: "Submitted", width: "110px" },
  { key: "status", label: "Status", width: "100px", render: (v) => <StatusBadge status={v} /> },
];

export default function InsurancePage() {
  return (
    <ModulePage title="Insurance" description="Manage insurance claims, companies, policies, and approvals."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Insurance" }]}
      stats={[
        { title: "Total Claims", value: "342", change: "+28 this month", icon: Shield },
        { title: "Pending", value: "45", change: "₹18L pending", icon: FileText },
        { title: "Companies", value: "12", change: "Active tie-ups", icon: Building },
        { title: "Approved", value: "280", change: "82% approval rate", icon: CheckCircle },
      ]}
      columns={columns} data={claims} addLabel="New Claim" searchPlaceholder="Search claims..."
    />
  );
}
