import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Package, TrendingDown, Truck, AlertTriangle } from "lucide-react";

const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, code: `INV-${String(100+i).padStart(4,"0")}`,
  name: ["Surgical Gloves", "Syringes 5ml", "IV Sets", "Cotton Rolls", "Bandages", "Face Masks", "Stethoscope", "BP Monitor"][i%8],
  category: ["Consumable", "Equipment", "Surgical", "General"][i%4],
  vendor: ["MedSupply Co", "HealthGear", "SurgiTech", "CarePlus"][i%4],
  stock: Math.floor(Math.random()*500)+10,
  reorderLevel: 50,
  unit: ["Box", "Pack", "Piece", "Roll"][i%4],
  lastPurchase: `2026-06-${String(1+(i%28)).padStart(2,"0")}`,
  status: Math.floor(Math.random()*500)+10 < 50 ? "inactive" : "active",
}));

const columns = [
  { key: "code", label: "Code", width: "100px" },
  { key: "name", label: "Product", render: (v) => <span className="font-medium">{v}</span> },
  { key: "category", label: "Category" },
  { key: "vendor", label: "Vendor" },
  { key: "stock", label: "Stock", width: "80px", align: "right", render: (v) => <span className={v < 50 ? "text-red-600 font-semibold" : ""}>{v}</span> },
  { key: "reorderLevel", label: "Reorder", width: "80px", align: "right" },
  { key: "unit", label: "Unit", width: "70px" },
  { key: "lastPurchase", label: "Last Purchase", width: "120px" },
  { key: "status", label: "Status", width: "90px", render: (v) => <StatusBadge status={v} /> },
];

export default function InventoryPage() {
  return (
    <ModulePage title="Inventory" description="Manage products, stock levels, purchase orders, and vendors."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Inventory" }]}
      stats={[
        { title: "Total Products", value: "1,245", change: "+18 this month", icon: Package },
        { title: "Low Stock Items", value: "23", change: "Needs reorder", icon: AlertTriangle, trend: "down" },
        { title: "Pending Orders", value: "8", change: "₹2.4L value", icon: Truck },
        { title: "Stock Value", value: "₹18.5L", change: "+5% this month", icon: TrendingDown },
      ]}
      columns={columns} data={products} addLabel="Add Product" searchPlaceholder="Search inventory..."
    />
  );
}
