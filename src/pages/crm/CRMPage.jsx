import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { UserPlus, MessageSquare, Target, ThumbsUp } from "lucide-react";

const leads = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1, leadId: `CRM-${String(100+i).padStart(4,"0")}`,
  name: ["Rahul S.", "Neha G.", "Arun M.", "Kavita D.", "Suresh P."][i%5],
  source: ["Website", "Referral", "Walk-in", "Social Media", "Campaign"][i%5],
  interest: ["Health Checkup", "Surgery", "Consultation", "Lab Test", "Dental"][i%5],
  assignedTo: ["Ravi K.", "Anjali S.", "Deepak S."][i%3],
  phone: `+91 94${String(i).padStart(8,"0")}`,
  date: `2026-06-${String(1+(i%28)).padStart(2,"0")}`,
  followUp: `2026-07-${String(1+(i%28)).padStart(2,"0")}`,
  status: ["active","pending","completed","cancelled"][i%4],
}));

const columns = [
  { key: "leadId", label: "ID", width: "100px" },
  { key: "name", label: "Name", render: (v) => <span className="font-medium">{v}</span> },
  { key: "source", label: "Source" },
  { key: "interest", label: "Interest" },
  { key: "assignedTo", label: "Assigned To" },
  { key: "phone", label: "Phone" },
  { key: "followUp", label: "Follow Up", width: "110px" },
  { key: "status", label: "Status", width: "100px", render: (v) => <StatusBadge status={v} /> },
];

export default function CRMPage() {
  return (
    <ModulePage title="CRM" description="Manage leads, patient relationships, campaigns, and feedback."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "CRM" }]}
      stats={[
        { title: "Total Leads", value: "456", change: "+32 this month", icon: UserPlus },
        { title: "Active Follow-ups", value: "28", change: "12 today", icon: MessageSquare },
        { title: "Conversion Rate", value: "34%", change: "+5% vs last month", icon: Target },
        { title: "Satisfaction", value: "4.5/5", change: "+0.2 this quarter", icon: ThumbsUp },
      ]}
      columns={columns} data={leads} addLabel="Add Lead" searchPlaceholder="Search leads..."
    />
  );
}
