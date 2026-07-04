import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  MessageSquare,
  ClipboardList,
  FileText,
  BarChart2,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { title: "Dashboard", path: "/doctor", icon: LayoutDashboard },
  {
    title: "Appointments",
    path: "/doctor/appointments",
    icon: Calendar,
    subItems: [
      { title: "Today's Schedule", path: "/doctor/appointments/today" },
      { title: "Calendar", path: "/doctor/appointments/calendar" },
      { title: "Waiting Queue", path: "/doctor/appointments/queue" },
    ],
  },
  {
    title: "Patients",
    path: "/doctor/patients",
    icon: Users,
    subItems: [
      { title: "Patient Search", path: "/doctor/patients/search" },
      { title: "My Patients", path: "/doctor/patients/list" },
    ],
  },
  {
    title: "Consultation",
    path: "/doctor/consultation",
    icon: Stethoscope,
    subItems: [
      { title: "Clinical Notes", path: "/doctor/consultation/notes" },
      { title: "Prescription", path: "/doctor/consultation/prescription" },
      { title: "Lab Orders", path: "/doctor/consultation/lab" },
      { title: "Radiology Orders", path: "/doctor/consultation/radiology" },
      { title: "Discharge Summary", path: "/doctor/consultation/discharge" },
      { title: "Certificates", path: "/doctor/consultation/certificates" },
      { title: "Referrals", path: "/doctor/consultation/referrals" },
      { title: "Telemedicine", path: "/doctor/consultation/telemedicine" },
    ],
  },
  { title: "Messages", path: "/doctor/messages", icon: MessageSquare },
  { title: "Tasks", path: "/doctor/tasks", icon: ClipboardList },
  { title: "Documents", path: "/doctor/documents", icon: FileText },
  { title: "Reports", path: "/doctor/reports", icon: BarChart2 },
  { title: "Profile", path: "/doctor/profile", icon: User },
  { title: "Settings", path: "/doctor/settings", icon: Settings },
];

export default function DoctorSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (path) => {
    setExpandedGroups((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isOpen ? 260 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full bg-surface border-r flex flex-col shadow-sm relative z-20"
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b shrink-0">
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-md">
            <Stethoscope size={20} />
          </div>
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="whitespace-nowrap"
              >
                <span className="font-bold text-lg text-foreground tracking-tight block">
                  Epic EMR
                </span>
                <span className="text-xs text-primary font-medium">
                  Doctor Portal
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/doctor" &&
                location.pathname.startsWith(item.path));
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedGroups[item.path];

            return (
              <div key={item.path} className="mb-1">
                {hasSubItems ? (
                  <button
                    onClick={() => {
                      if (!isOpen) toggleSidebar();
                      toggleGroup(item.path);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                      isActive
                        ? "bg-primary-light text-primary"
                        : "text-foreground hover:bg-muted hover:text-primary",
                    )}
                  >
                    <item.icon
                      size={20}
                      className={cn(
                        "shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    {isOpen && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            isExpanded ? "rotate-180" : "",
                          )}
                        />
                      </>
                    )}
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === "/doctor"}
                    className={({ isActive: isExactActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                        isExactActive
                          ? "bg-primary-light text-primary shadow-md"
                          : "text-foreground hover:bg-muted hover:text-primary",
                      )
                    }
                  >
                    <item.icon size={20} className="shrink-0" />
                    {isOpen && <span>{item.title}</span>}
                  </NavLink>
                )}

                {/* Sub Items */}
                <AnimatePresence>
                  {isOpen && hasSubItems && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-9 mt-1 space-y-1"
                    >
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive: isSubActive }) =>
                            cn(
                              "block px-3 py-2 rounded-md text-sm transition-colors",
                              isSubActive
                                ? "bg-primary-light text-primary font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            )
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-surface border rounded-full p-1 shadow-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-30"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </motion.aside>
  );
}
