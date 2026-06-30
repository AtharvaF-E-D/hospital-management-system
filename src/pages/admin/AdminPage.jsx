import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Building, MapPin, Bed, Stethoscope, Receipt, Globe, FileText, Shield, Key, Server, Link2 } from "lucide-react";

const adminSections = [
  { title: "Hospital Settings", desc: "General hospital configuration", icon: Settings, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  { title: "Departments", desc: "Manage departments and sections", icon: Building, color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
  { title: "Branches", desc: "Multi-branch management", icon: MapPin, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30" },
  { title: "Rooms & Beds", desc: "Room allocation and bed management", icon: Bed, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/30" },
  { title: "Services & Charges", desc: "Service catalog and pricing", icon: Receipt, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/30" },
  { title: "Specializations", desc: "Medical specializations", icon: Stethoscope, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/30" },
  { title: "Localization", desc: "Languages, currencies, taxes", icon: Globe, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30" },
  { title: "Templates", desc: "Email, SMS, notification templates", icon: FileText, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30" },
  { title: "Audit Logs", desc: "System activity and audit trail", icon: Shield, color: "text-red-600 bg-red-50 dark:bg-red-950/30" },
  { title: "API Keys", desc: "Third-party API key management", icon: Key, color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/30" },
  { title: "System Logs", desc: "Server logs and error tracking", icon: Server, color: "text-gray-600 bg-gray-50 dark:bg-gray-800/30" },
  { title: "Integrations", desc: "Third-party integrations", icon: Link2, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30" },
];

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Administration" description="Hospital settings, departments, branches, and system configuration."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Administration" }]}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {adminSections.map((section, i) => {
          const Icon = section.icon;
          return (
            <Card key={i} className="shadow-sm cursor-pointer hover:shadow-md transition-all rounded-xl border-muted group">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${section.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{section.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{section.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
