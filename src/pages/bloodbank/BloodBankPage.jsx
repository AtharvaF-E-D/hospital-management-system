import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Droplet, Users, Package, Activity } from "lucide-react";

const donors = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, donorId: `BD-${String(100+i).padStart(4,"0")}`,
  name: ["Rahul S.", "Neha G.", "Arun M.", "Kavita D.", "Suresh P."][i%5],
  bloodGroup: ["A+","B+","O+","AB+","A-","B-","O-","AB-"][i%8],
  lastDonation: `2026-0${1+(i%6)}-${String(1+(i%28)).padStart(2,"0")}`,
  phone: `+91 97${String(i).padStart(8,"0")}`,
  units: Math.floor(Math.random()*10)+1,
  status: ["available","active","inactive"][i%3],
}));

const columns = [
  { key: "donorId", label: "ID", width: "90px" },
  { key: "name", label: "Donor", render: (v) => <span className="font-medium">{v}</span> },
  { key: "bloodGroup", label: "Blood Group", width: "100px",
    render: (v) => <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">{v}</span>
  },
  { key: "lastDonation", label: "Last Donation", width: "120px" },
  { key: "phone", label: "Phone" },
  { key: "units", label: "Units", width: "70px", align: "right" },
  { key: "status", label: "Status", width: "90px", render: (v) => <StatusBadge status={v} /> },
];

export default function BloodBankPage() {
  return (
    <ModulePage title="Blood Bank" description="Manage blood donors, stock, and compatibility."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Blood Bank" }]}
      stats={[
        { title: "Total Donors", value: "456", change: "+12 this month", icon: Users },
        { title: "Blood Units", value: "234", change: "Across 8 groups", icon: Droplet },
        { title: "Available", value: "198", change: "85% in stock", icon: Package },
        { title: "Issued Today", value: "6", change: "+2 vs yesterday", icon: Activity },
      ]}
      columns={columns} data={donors} addLabel="Add Donor" searchPlaceholder="Search donors..."
    />
  );
}
