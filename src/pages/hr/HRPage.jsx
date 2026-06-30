import ModulePage from "@/components/common/ModulePage";
import { StatusBadge } from "@/components/common/DataDisplay";
import { Briefcase, Users, Calendar, DollarSign } from "lucide-react";

const employees = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, empId: `EMP-${String(100+i).padStart(4,"0")}`,
  name: ["Ravi Kumar", "Anjali Sharma", "Deepak Singh", "Nisha Patel", "Arun Gupta", "Pooja Desai", "Manoj Mehta", "Kavita Nair"][i%8],
  department: ["Admin", "Nursing", "Lab", "Pharmacy", "Housekeeping", "Security", "IT", "Finance"][i%8],
  designation: ["Manager", "Staff Nurse", "Technician", "Pharmacist", "Executive", "Guard", "Engineer", "Accountant"][i%8],
  joinDate: `2024-0${1+(i%9)}-${String(1+(i%28)).padStart(2,"0")}`,
  phone: `+91 95${String(i).padStart(8,"0")}`,
  salary: `₹${(Math.random()*80000+20000).toFixed(0)}`,
  attendance: `${85+Math.floor(Math.random()*15)}%`,
  status: i % 10 === 0 ? "inactive" : "active",
}));

const columns = [
  { key: "empId", label: "ID", width: "100px" },
  { key: "name", label: "Employee", render: (v, r) => (
    <div><div className="font-medium text-[13px]">{v}</div><div className="text-[11px] text-muted-foreground">{r.designation}</div></div>
  )},
  { key: "department", label: "Department" },
  { key: "joinDate", label: "Join Date", width: "110px" },
  { key: "phone", label: "Phone" },
  { key: "salary", label: "Salary", width: "100px", align: "right" },
  { key: "attendance", label: "Attendance", width: "100px", align: "center" },
  { key: "status", label: "Status", width: "90px", render: (v) => <StatusBadge status={v} /> },
];

export default function HRPage() {
  return (
    <ModulePage title="Human Resources" description="Manage employees, attendance, payroll, and leaves."
      breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "HR" }]}
      stats={[
        { title: "Total Employees", value: "248", change: "+6 this month", icon: Users },
        { title: "Present Today", value: "218", change: "88% attendance", icon: Calendar },
        { title: "On Leave", value: "14", change: "6 planned", icon: Briefcase },
        { title: "Payroll (Month)", value: "₹42.8L", change: "+3% vs last month", icon: DollarSign },
      ]}
      columns={columns} data={employees} addLabel="Add Employee" searchPlaceholder="Search employees..."
    />
  );
}
