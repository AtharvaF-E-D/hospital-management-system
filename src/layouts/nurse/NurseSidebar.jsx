import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Bed,
  Users,
  Search,
  Activity,
  Pill,
  FileText,
  ClipboardList,
  Edit,
  CheckSquare,
  LogIn,
  LogOut,
  ClipboardCheck,
  AlertTriangle,
  MessageSquare,
  Files,
  BarChart2,
  User,
  Settings,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/nurse" },
  { icon: Clock, label: "My Shift", href: "/nurse/shift" },
  { icon: Bed, label: "Ward Dashboard", href: "/nurse/ward" },
];

const patientCareItems = [
  { icon: Users, label: "Assigned Patients", href: "/nurse/patients" },
  { icon: Search, label: "Patient Search", href: "/nurse/patients/search" },
  { icon: Activity, label: "Vitals", href: "/nurse/vitals" },
  { icon: Pill, label: "Medication (MAR)", href: "/nurse/medication" },
  { icon: FileText, label: "Doctor Orders", href: "/nurse/orders" },
  { icon: ClipboardList, label: "Care Plans", href: "/nurse/care-plans" },
  { icon: Edit, label: "Nursing Notes", href: "/nurse/notes" },
  { icon: CheckSquare, label: "Daily Assessment", href: "/nurse/assessment" },
];

const bedManagementItems = [
  { icon: Bed, label: "Bed Management", href: "/nurse/beds" },
  { icon: LogIn, label: "Admissions", href: "/nurse/admissions" },
  { icon: LogOut, label: "Transfers", href: "/nurse/transfers" },
  {
    icon: ClipboardCheck,
    label: "Discharge Checklist",
    href: "/nurse/discharge",
  },
];

const alertsAndCommsItems = [
  { icon: AlertTriangle, label: "Emergency Alerts", href: "/nurse/alerts" },
  { icon: CheckSquare, label: "Tasks", href: "/nurse/tasks" },
  { icon: MessageSquare, label: "Messages", href: "/nurse/messages" },
  { icon: Files, label: "Documents", href: "/nurse/documents" },
];

const miscItems = [
  { icon: BarChart2, label: "Reports", href: "/nurse/reports" },
  { icon: User, label: "Profile", href: "/nurse/profile" },
  { icon: Settings, label: "Settings", href: "/nurse/settings" },
];

export default function NurseSidebar() {
  return (
    <div className="w-64 bg-surface border-r flex flex-col text-foreground h-full transition-all duration-300 z-20">
      <div className="h-16 flex items-center px-6 border-b shrink-0">
        <Activity className="h-6 w-6 text-primary mr-2" />
        <span className="font-bold text-lg text-foreground tracking-tight block">Nurse Portal</span>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-3">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          <div className="space-y-1">
            <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Patient Care
            </h4>
            {patientCareItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          <div className="space-y-1">
            <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Bed Management
            </h4>
            {bedManagementItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          <div className="space-y-1">
            <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Alerts & Comms
            </h4>
            {alertsAndCommsItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          <div className="space-y-1 pb-4">
            <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Account
            </h4>
            {miscItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>
        </nav>
      </ScrollArea>
    </div>
  );
}

function NavItem({ item }) {
  return (
    <NavLink
      to={item.href}
      end={item.href === "/nurse"}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? "bg-primary-light text-primary"
            : "text-foreground hover:bg-muted hover:text-primary"
        }`
      }
    >
      <item.icon className="h-4 w-4 mr-3 shrink-0" />
      {item.label}
    </NavLink>
  );
}
