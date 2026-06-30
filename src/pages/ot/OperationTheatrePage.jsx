import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Scissors, Calendar, Users, Clock } from "lucide-react";

const otSchedule = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, otId: `OT-${String(100+i).padStart(4,"0")}`,
  patient: ["Rajesh K.", "Priya S.", "Amit P.", "Sneha S.", "Vikram R."][i%5],
  surgeon: ["Dr. Kapoor", "Dr. Shah", "Dr. Verma", "Dr. Mehta"][i%4],
  procedure: ["Appendectomy", "CABG", "Knee Replacement", "Cataract Surgery", "Hernia Repair"][i%5],
  otRoom: `OT-${(i%4)+1}`,
  date: `2026-06-${String(1+(i%28)).padStart(2,"0")}`,
  time: `${8+(i%8)}:00`,
  duration: `${1+(i%3)}h`,
  anesthetist: ["Dr. Nair", "Dr. Desai", "Dr. Joshi"][i%3],
  status: ["active","completed","pending","cancelled"][i%4],
}));

const columns = [
  { key: "otId", label: "OT ID", width: "90px" },
  { key: "patient", label: "Patient", render: (v) => <span className="font-medium">{v}</span> },
  { key: "surgeon", label: "Surgeon" },
  { key: "procedure", label: "Procedure" },
  { key: "otRoom", label: "OT Room", width: "80px" },
  { key: "date", label: "Date", width: "110px" },
  { key: "time", label: "Time", width: "70px" },
  { key: "duration", label: "Duration", width: "80px" },
  { key: "status", label: "Status", width: "100px", render: (v) => <StatusBadge status={v} /> },
];

export default function OperationTheatrePage() {
  return (
    <ModulePage title="Operation Theatre" description="Manage OT schedules, surgeons, and operation notes."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Operation Theatre" }]}
      stats={[
        { title: "Scheduled Today", value: "8", change: "3 completed", icon: Calendar },
        { title: "OT Rooms", value: "4", change: "2 occupied", icon: Scissors },
        { title: "Surgeons On-Duty", value: "6", change: "Available now", icon: Users },
        { title: "Avg. Duration", value: "2.5h", change: "-15min vs avg", icon: Clock },
      ]}
      columns={columns} data={otSchedule} addLabel="Schedule OT" searchPlaceholder="Search operations..."
    />
  );
}
