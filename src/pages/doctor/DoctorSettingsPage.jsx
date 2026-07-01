import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, Bell, Lock, Shield, Smartphone, Globe, Moon, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DoctorSettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    newAppointments: true,
    labResults: true,
    systemUpdates: false
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "15",
  });

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    timezone: "America/New_York"
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // API call to save settings
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-slate-600" /> Settings
          </h1>
          <p className="text-sm text-slate-500">Configure your account preferences and security.</p>
        </div>
        <div>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Preferences
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Navigation / Categories */}
        <div className="md:col-span-1 space-y-2">
          <Button variant="ghost" className="w-full justify-start bg-slate-100 text-slate-900 font-semibold">
            <Bell className="mr-3 h-5 w-5 text-indigo-500" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50">
            <Shield className="mr-3 h-5 w-5 text-emerald-500" /> Security & Privacy
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-50">
            <Globe className="mr-3 h-5 w-5 text-blue-500" /> Display & Localization
          </Button>
        </div>

        {/* Right Col: Settings Forms */}
        <div className="md:col-span-2 space-y-6">
          
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-500" /> Notification Preferences
              </CardTitle>
              <CardDescription>Choose how and when you want to be alerted.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Delivery Methods</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Email Alerts</p>
                    <p className="text-sm text-slate-500">Receive notifications via your registered email.</p>
                  </div>
                  <Switch checked={notifications.emailAlerts} onCheckedChange={() => toggleNotification('emailAlerts')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">SMS / Text Alerts</p>
                    <p className="text-sm text-slate-500">Receive critical alerts on your mobile phone.</p>
                  </div>
                  <Switch checked={notifications.smsAlerts} onCheckedChange={() => toggleNotification('smsAlerts')} />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Events</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">New Appointments</p>
                    <p className="text-sm text-slate-500">Notify me when a patient books a new slot.</p>
                  </div>
                  <Switch checked={notifications.newAppointments} onCheckedChange={() => toggleNotification('newAppointments')} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Lab Results Ready</p>
                    <p className="text-sm text-slate-500">Alert me when a patient's lab report is uploaded.</p>
                  </div>
                  <Switch checked={notifications.labResults} onCheckedChange={() => toggleNotification('labResults')} />
                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" /> Security
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-slate-500" /> Two-Factor Authentication (2FA)
                  </p>
                  <p className="text-sm text-slate-500 mt-1">Enhance security by requiring an OTP during login.</p>
                </div>
                <Switch checked={security.twoFactor} onCheckedChange={(val) => setSecurity(p => ({...p, twoFactor: val}))} />
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-slate-900 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-slate-500" /> Auto-Lock Session
                  </label>
                  <p className="text-sm text-slate-500 mb-2">Automatically lock screen after inactivity.</p>
                  <Select value={security.sessionTimeout} onValueChange={(val) => setSecurity(p => ({...p, sessionTimeout: val}))}>
                    <SelectTrigger className="w-full max-w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="never">Never (Not Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" /> Display & Localization
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-medium text-slate-900">Theme Preference</label>
                  <Select value={preferences.theme} onValueChange={(val) => setPreferences(p => ({...p, theme: val}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-medium text-slate-900">Language</label>
                  <Select value={preferences.language} onValueChange={(val) => setPreferences(p => ({...p, language: val}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="font-medium text-slate-900">Timezone</label>
                  <Select value={preferences.timezone} onValueChange={(val) => setPreferences(p => ({...p, timezone: val}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
