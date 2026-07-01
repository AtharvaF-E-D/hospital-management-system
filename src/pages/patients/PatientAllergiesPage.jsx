import React from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, ShieldAlert, AlertCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const allergiesData = [
  { id: 1, patientName: "Michael Johnson", uhid: "EH-2026-8901", allergen: "Penicillin", category: "Medication", severity: "Severe", reaction: "Anaphylaxis", identifiedOn: "2018-05-12", status: "Active" },
  { id: 2, patientName: "Sarah Connor", uhid: "EH-2026-8922", allergen: "Peanuts", category: "Food", severity: "Severe", reaction: "Swelling, Difficulty Breathing", identifiedOn: "2010-02-14", status: "Active" },
  { id: 3, patientName: "John Doe", uhid: "EH-2026-8805", allergen: "Latex", category: "Environment", severity: "Moderate", reaction: "Skin Rash", identifiedOn: "2021-08-22", status: "Active" },
  { id: 4, patientName: "Emma Watson", uhid: "EH-2026-8711", allergen: "Aspirin", category: "Medication", severity: "Mild", reaction: "Stomach Upset", identifiedOn: "2022-11-05", status: "Active" },
  { id: 5, patientName: "David Smith", uhid: "EH-2026-8600", allergen: "Dust Mites", category: "Environment", severity: "Moderate", reaction: "Sneezing, Runny Nose", identifiedOn: "2015-04-10", status: "Active" },
];

const severityBadge = (severity) => {
  switch (severity) {
    case "Severe":
      return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Severe</Badge>;
    case "Moderate":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Moderate</Badge>;
    case "Mild":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Mild</Badge>;
    default:
      return <Badge variant="outline">{severity}</Badge>;
  }
};

const categoryBadge = (category) => {
  switch (category) {
    case "Medication":
      return <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">Medication</Badge>;
    case "Food":
      return <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200">Food</Badge>;
    case "Environment":
      return <Badge variant="outline" className="text-purple-700 bg-purple-50 border-purple-200">Environment</Badge>;
    default:
      return <Badge variant="outline">{category}</Badge>;
  }
};

const columns = [
  { key: "uhid", label: "UHID", width: "120px" },
  { key: "patientName", label: "Patient Name" },
  { key: "allergen", label: "Allergen", render: (val) => <span className="font-semibold">{val}</span> },
  { key: "category", label: "Category", render: (val) => categoryBadge(val) },
  { key: "severity", label: "Severity", render: (val) => severityBadge(val) },
  { key: "reaction", label: "Reaction" },
  { key: "status", label: "Status", render: (val) => <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{val}</Badge> },
];

export default function PatientAllergiesPage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <PageHeader 
        title="Patient Allergies" 
        description="Monitor and manage patient allergies and adverse reactions."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Patients", path: "/patients" },
          { label: "Allergies" }
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Allergy Record
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-border bg-red-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">Severe Allergies</p>
              <h3 className="text-2xl font-bold text-red-700">142</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-blue-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Medication Allergies</p>
              <h3 className="text-2xl font-bold text-blue-700">328</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-green-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Food Allergies</p>
              <h3 className="text-2xl font-bold text-green-700">215</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable 
        columns={columns} 
        data={allergiesData} 
        searchable 
        searchPlaceholder="Search by UHID, patient name, or allergen..."
      />
    </div>
  );
}
