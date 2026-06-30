import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Scan, FileText, Image, Clock } from "lucide-react";

const orders = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1, orderId: `RAD-${String(100+i).padStart(4,"0")}`,
  patient: ["Rajesh K.", "Priya S.", "Amit P.", "Sneha S.", "Vikram R."][i%5],
  test: ["X-Ray Chest", "CT Scan Brain", "MRI Knee", "Ultrasound Abdomen", "Mammography"][i%5],
  doctor: ["Dr. Verma", "Dr. Iyer", "Dr. Kapoor"][i%3],
  date: `2026-06-${String(1+(i%28)).padStart(2,"0")}`,
  priority: ["Routine","Urgent","STAT"][i%3],
  status: ["pending","processing","completed"][i%3],
}));

const columns = [
  { key: "orderId", label: "Order ID", width: "110px" },
  { key: "patient", label: "Patient", render: (v) => <span className="font-medium">{v}</span> },
  { key: "test", label: "Imaging Test" },
  { key: "doctor", label: "Ordered By" },
  { key: "date", label: "Date", width: "110px" },
  { key: "priority", label: "Priority", width: "90px" },
  { key: "status", label: "Status", width: "100px", render: (v) => <StatusBadge status={v} /> },
];

export default function RadiologyPage() {
  return (
    <ModulePage title="Radiology" description="Manage imaging orders, processing, and reports."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Radiology" }]}
      stats={[
        { title: "Orders Today", value: "32", change: "+6 vs yesterday", icon: Scan },
        { title: "Pending", value: "8", change: "2 urgent", icon: Clock },
        { title: "Completed", value: "24", change: "75% complete", icon: Image },
        { title: "Reports Ready", value: "20", change: "+3 this hour", icon: FileText },
      ]}
      columns={columns} data={orders} addLabel="New Order" searchPlaceholder="Search radiology orders..."
    />
  );
}
