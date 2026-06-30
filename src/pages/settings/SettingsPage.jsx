import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog, Palette, Shield, Globe, Database, Bell, Link2, HardDrive } from "lucide-react";

const settingsSections = [
  { id: "general", title: "General", desc: "Hospital name, logo, contact, and basic configuration", icon: Cog },
  { id: "branding", title: "Branding", desc: "Logo, favicon, colors, and brand customization", icon: Palette },
  { id: "security", title: "Security", desc: "Password policies, 2FA, session management", icon: Shield },
  { id: "localization", title: "Localization", desc: "Language, timezone, date format, currency", icon: Globe },
  { id: "backup", title: "Backup", desc: "Automated backups, restore, and data management", icon: Database },
  { id: "notifications", title: "Notifications", desc: "Email, SMS, push notification preferences", icon: Bell },
  { id: "integrations", title: "Integrations", desc: "Third-party services and API connections", icon: Link2 },
  { id: "storage", title: "Storage", desc: "File storage configuration and media management", icon: HardDrive },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" description="Application settings and configuration."
        breadcrumbs={[{ label: "Dashboard", path: "/" }, { label: "Settings" }]}
      />

      {/* General Settings Form */}
      <Card className="shadow-sm rounded-xl border-muted">
        <CardHeader><CardTitle className="text-base">General Settings</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="hospitalName" className="text-sm">Hospital Name</Label>
              <Input id="hospitalName" defaultValue="EpicHealth Hospital" className="h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Contact Email</Label>
              <Input id="email" defaultValue="admin@epichealth.com" className="h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">Phone</Label>
              <Input id="phone" defaultValue="+91 22 1234 5678" className="h-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm">Timezone</Label>
              <Input id="timezone" defaultValue="Asia/Kolkata (IST)" className="h-9" />
            </div>
          </div>
          <Button size="sm" className="mt-4 h-8 text-xs">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {settingsSections.map((section, i) => {
          const Icon = section.icon;
          return (
            <Card key={i} className="shadow-sm cursor-pointer hover:shadow-md transition-all rounded-xl border-muted group">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{section.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{section.desc}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
