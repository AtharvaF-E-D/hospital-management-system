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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, Award, GraduationCap, Edit, Save, Trash2 } from "lucide-react";

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Jenkins",
    title: "Senior Cardiologist",
    department: "Cardiology",
    email: "sarah.jenkins@hospital.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Blvd, Suite 400, New York, NY 10001",
    bio: "Board-certified cardiologist with over 15 years of experience in diagnosing and treating complex cardiovascular conditions. Specializes in interventional cardiology and echocardiography.",
    education: "MD, Johns Hopkins University School of Medicine (2005)",
    certifications: ["American Board of Internal Medicine (Cardiovascular Disease)", "Advanced Cardiac Life Support (ACLS)"],
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, make an API call to save here
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <User className="h-6 w-6 text-indigo-600" /> My Profile
          </h1>
          <p className="text-sm text-slate-500">Manage your personal and professional information.</p>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="border-slate-200" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={profile.name} />
                  <AvatarFallback className="text-3xl bg-indigo-100 text-indigo-700">SJ</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">{profile.name}</h2>
              <p className="text-sm text-indigo-600 font-semibold mb-3">{profile.title}</p>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">{profile.department}</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-sm font-bold text-slate-700">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-slate-400 mt-1" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  {isEditing ? (
                    <Input value={profile.email} onChange={(e) => handleChange('email', e.target.value)} className="h-8 text-sm" />
                  ) : (
                    <p className="text-sm text-slate-700 font-medium">{profile.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-slate-400 mt-1" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                  {isEditing ? (
                    <Input value={profile.phone} onChange={(e) => handleChange('phone', e.target.value)} className="h-8 text-sm" />
                  ) : (
                    <p className="text-sm text-slate-700 font-medium">{profile.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-slate-400 mt-1" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Office Location</p>
                  {isEditing ? (
                    <Textarea value={profile.address} onChange={(e) => handleChange('address', e.target.value)} className="text-sm min-h-[60px]" />
                  ) : (
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{profile.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-500" />
              <CardTitle className="text-lg font-bold text-slate-800">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isEditing ? (
                <Textarea 
                  value={profile.bio} 
                  onChange={(e) => handleChange('bio', e.target.value)} 
                  className="min-h-[120px] text-sm leading-relaxed" 
                />
              ) : (
                <p className="text-slate-700 leading-relaxed">{profile.bio}</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg font-bold text-slate-800">Education & Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Medical Degree
                </h4>
                {isEditing ? (
                  <Input value={profile.education} onChange={(e) => handleChange('education', e.target.value)} className="text-sm" />
                ) : (
                  <p className="text-slate-600 pl-4">{profile.education}</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-600" /> Board Certifications
                </h4>
                {isEditing ? (
                  <div className="space-y-2 pl-4">
                    {profile.certifications.map((cert, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={cert} className="text-sm flex-1" readOnly />
                        <Button variant="outline" size="icon" className="text-red-500 shrink-0"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full border-dashed text-slate-500 mt-2">Add Certification</Button>
                  </div>
                ) : (
                  <ul className="space-y-2 pl-4">
                    {profile.certifications.map((cert, i) => (
                      <li key={i} className="text-slate-600 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1">•</span> {cert}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
