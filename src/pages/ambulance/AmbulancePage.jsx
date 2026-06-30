import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Ambulance, Users, Wrench, MapPin } from "lucide-react";

const vehicles = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1, vehicleId: `AMB-${String(100+i).padStart(4,"0")}`,
  number: `MH-${12+i%5}-${String(1000+i*111).slice(0,4)}`,
  type: ["Basic", "Advanced", "ICU", "Neonatal"][i%4],
  driver: ["Ramesh K.", "Sunil P.", "Manoj D.", "Rahul S.", "Vijay M."][i%5],
  phone: `+91 96${String(i).padStart(8,"0")}`,
  lastService: `2026-05-${String(1+(i%28)).padStart(2,"0")}`,
  location: ["Downtown", "Central", "North Wing", "South Wing"][i%4],
  status: ["available","active","maintenance"][i%3],
}));

const columns = [
  { key: "vehicleId", label: "ID", width: "100px" },
  { key: "number", label: "Vehicle No.", render: (v) => <span className="font-medium">{v}</span> },
  { key: "type", label: "Type" },
  { key: "driver", label: "Driver" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "lastService", label: "Last Service", width: "120px" },
  { key: "status", label: "Status", width: "110px", render: (v) => <StatusBadge status={v} /> },
];

export default function AmbulancePage() {
  return (
    <ModulePage title="Ambulance" description="Manage ambulance fleet, drivers, bookings, and maintenance."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Ambulance" }]}
      stats={[
        { title: "Total Vehicles", value: "12", change: "8 active", icon: Ambulance },
        { title: "Active Drivers", value: "10", change: "2 on leave", icon: Users },
        { title: "Bookings Today", value: "6", change: "+2 vs yesterday", icon: MapPin },
        { title: "Due Maintenance", value: "2", change: "Next week", icon: Wrench },
      ]}
      columns={columns} data={vehicles} addLabel="Add Vehicle" searchPlaceholder="Search ambulances..."
    />
  );
}
