import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Heart, Users, FileText, Clock } from "lucide-react";

const nursePatients = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  patientId: `NUR-${String(100 + i).padStart(4, "0")}`,
  patient: ["Rajesh K.", "Priya S.", "Amit P.", "Sneha S.", "Vikram R."][i % 5],
  ward: ["ICU", "General", "Private", "Pediatric", "Maternity"][i % 5],
  bed: `${["A","B","C"][i%3]}-${100+i}`,
  lastVitals: `BP:${120+(i%20)}/${70+(i%15)} T:${98+(i%3)}°F HR:${70+(i%20)}`,
  medication: ["Paracetamol", "Amoxicillin", "Omeprazole", "Metformin"][i % 4],
  nextDose: `${8+(i%12)}:00`,
  shift: ["Day", "Night", "Evening"][i % 3],
  status: ["stable", "critical", "active"][i % 3],
}));

const columns = [
  { key: "patientId", label: "ID", width: "100px" },
  { key: "patient", label: "Patient", render: (v) => <span className="font-medium">{v}</span> },
  { key: "ward", label: "Ward" },
  { key: "bed", label: "Bed", width: "70px" },
  { key: "lastVitals", label: "Last Vitals" },
  { key: "medication", label: "Current Medication" },
  { key: "nextDose", label: "Next Dose", width: "90px" },
  { key: "status", label: "Status", width: "90px", render: (v) => <StatusBadge status={v} /> },
];

export default function NurseStationPage() {
  return (
    <ModulePage
      title="Nurse Station"
      description="Monitor assigned patients, administer medications, and record vitals."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Nurse Station" }]}
      stats={[
        { title: "Assigned Patients", value: "24", change: "Across 4 wards", icon: Users },
        { title: "Pending Medications", value: "8", change: "3 overdue", icon: Heart, trend: "down" },
        { title: "Vitals Due", value: "6", change: "Next in 15 min", icon: Clock },
        { title: "Notes Today", value: "18", change: "+4 vs yesterday", icon: FileText },
      ]}
      columns={columns}
      data={nursePatients}
      addLabel="Add Note"
      searchPlaceholder="Search patients..."
    />
  );
}
