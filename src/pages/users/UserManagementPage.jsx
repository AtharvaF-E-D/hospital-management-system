import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Lock, Users, Shield, Clock } from "lucide-react";

const users = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, userId: `USR-${String(100+i).padStart(4,"0")}`,
  name: ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Sneha Singh", "Dr. Verma", "Nurse Kavita", "Admin Ravi", "Lab Tech Arun"][i%8],
  email: ["rajesh@epic.com","priya@epic.com","amit@epic.com","sneha@epic.com","verma@epic.com","kavita@epic.com","ravi@epic.com","arun@epic.com"][i%8],
  role: ["Super Admin","Doctor","Nurse","Receptionist","Lab Technician","Pharmacist","HR","Accountant"][i%8],
  department: ["Admin","Cardiology","Nursing","Front Office","Laboratory","Pharmacy","HR","Finance"][i%8],
  lastLogin: `2026-06-${String(1+(i%28)).padStart(2,"0")} ${8+(i%12)}:${i%2===0?"00":"30"}`,
  sessions: Math.floor(Math.random()*5)+1,
  status: i%8===0 ? "inactive" : "active",
}));

const columns = [
  { key: "userId", label: "ID", width: "100px" },
  { key: "name", label: "User", render: (v, r) => (
    <div><div className="font-medium text-[13px]">{v}</div><div className="text-[11px] text-muted-foreground">{r.email}</div></div>
  )},
  { key: "role", label: "Role",
    render: (v) => <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold bg-primary/10 text-primary">{v}</span>
  },
  { key: "department", label: "Department" },
  { key: "lastLogin", label: "Last Login", width: "160px" },
  { key: "sessions", label: "Sessions", width: "80px", align: "center" },
  { key: "status", label: "Status", width: "90px", render: (v) => <StatusBadge status={v} /> },
];

export default function UserManagementPage() {
  return (
    <ModulePage title="User Management" description="Manage users, roles, permissions, and access control."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "User Management" }]}
      stats={[
        { title: "Total Users", value: "186", change: "+8 this month", icon: Users },
        { title: "Active Roles", value: "12", change: "20 permissions", icon: Shield },
        { title: "Active Sessions", value: "45", change: "Right now", icon: Lock },
        { title: "Login Today", value: "128", change: "+12% vs yesterday", icon: Clock },
      ]}
      columns={columns} data={users} addLabel="Add User" searchPlaceholder="Search users..."
    />
  );
}
