import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Building, Phone, Mail, AlertCircle } from "lucide-react";

const visitors = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, visitorId: `VIS-${String(100+i).padStart(4,"0")}`,
  name: ["Rahul Sharma", "Neha Gupta", "Arun Mehta", "Kavita Desai", "Suresh Patel"][i%5],
  purpose: ["Patient Visit", "Meeting", "Vendor", "Delivery", "Interview"][i%5],
  visitingTo: ["Dr. Verma", "Admin Office", "Pharmacy", "HR Dept", "Ward 3"][i%5],
  phone: `+91 93${String(i).padStart(8,"0")}`,
  idType: ["Aadhaar", "PAN", "Driving License", "Passport"][i%4],
  inTime: `${9+(i%8)}:${i%2===0?"00":"30"}`,
  outTime: i%3===0 ? "—" : `${10+(i%7)}:${i%2===0?"30":"00"}`,
  status: i%3===0 ? "active" : "completed",
}));

const columns = [
  { key: "visitorId", label: "ID", width: "100px" },
  { key: "name", label: "Visitor", render: (v) => <span className="font-medium">{v}</span> },
  { key: "purpose", label: "Purpose" },
  { key: "visitingTo", label: "Visiting" },
  { key: "phone", label: "Phone" },
  { key: "inTime", label: "In", width: "70px" },
  { key: "outTime", label: "Out", width: "70px" },
  { key: "status", label: "Status", width: "100px", render: (v) => <StatusBadge status={v} /> },
];

export default function FrontOfficePage() {
  return (
    <ModulePage title="Front Office" description="Manage visitors, reception, phone calls, and complaints."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Front Office" }]}
      stats={[
        { title: "Visitors Today", value: "45", change: "+8 vs yesterday", icon: Building },
        { title: "Phone Calls", value: "128", change: "32 missed", icon: Phone },
        { title: "Mails/Postal", value: "12", change: "3 pending", icon: Mail },
        { title: "Complaints", value: "4", change: "1 unresolved", icon: AlertCircle, trend: "down" },
      ]}
      columns={columns} data={visitors} addLabel="Add Visitor" searchPlaceholder="Search visitors..."
    />
  );
}
