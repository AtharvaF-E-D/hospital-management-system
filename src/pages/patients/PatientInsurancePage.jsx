import React from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const insuranceData = [
  { id: 1, patientName: "Michael Johnson", uhid: "EH-2026-8901", provider: "Blue Cross Blue Shield", policyNo: "POL-9876543", type: "Comprehensive", coverage: "$500,000", expiry: "2027-12-31", status: "Active" },
  { id: 2, patientName: "Sarah Connor", uhid: "EH-2026-8922", provider: "Aetna", policyNo: "AET-554421", type: "Basic Health", coverage: "$100,000", expiry: "2026-08-15", status: "Active" },
  { id: 3, patientName: "John Doe", uhid: "EH-2026-8805", provider: "UnitedHealthcare", policyNo: "UHC-998822", type: "Premium", coverage: "$1,000,000", expiry: "2025-11-30", status: "Expired" },
  { id: 4, patientName: "Emma Watson", uhid: "EH-2026-8711", provider: "Cigna", policyNo: "CIG-334455", type: "Dental & Vision", coverage: "$50,000", expiry: "2028-05-20", status: "Active" },
  { id: 5, patientName: "David Smith", uhid: "EH-2026-8600", provider: "Medicare", policyNo: "MED-112233", type: "Senior Care", coverage: "Unlimited", expiry: "2030-01-01", status: "Active" },
];

const statusBadge = (status) => {
  switch (status) {
    case "Active":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
    case "Expired":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Expired</Badge>;
    case "Pending Verification":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const columns = [
  { key: "uhid", label: "UHID", width: "120px" },
  { key: "patientName", label: "Patient Name" },
  { key: "provider", label: "Insurance Provider", render: (val) => <span className="font-semibold text-primary">{val}</span> },
  { key: "policyNo", label: "Policy Number" },
  { key: "type", label: "Plan Type" },
  { key: "coverage", label: "Coverage Limit" },
  { key: "expiry", label: "Expiry Date" },
  { key: "status", label: "Status", render: (val) => statusBadge(val) },
];

export default function PatientInsurancePage() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <PageHeader 
        title="Patient Insurance Records" 
        description="Manage patient insurance policies, coverage details, and claims."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Patients", path: "/patients" },
          { label: "Insurance" }
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Policy
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-border bg-green-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Active Policies</p>
              <h3 className="text-2xl font-bold text-green-700">845</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-red-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">Expired Policies</p>
              <h3 className="text-2xl font-bold text-red-700">12</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-blue-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Total Claims Processed</p>
              <h3 className="text-2xl font-bold text-blue-700">$2.4M</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable 
        columns={columns} 
        data={insuranceData} 
        searchable 
        searchPlaceholder="Search by UHID, patient name, provider, or policy number..."
      />
    </div>
  );
}
