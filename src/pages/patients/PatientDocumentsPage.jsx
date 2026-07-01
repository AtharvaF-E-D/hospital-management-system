import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import GenericRecordModal from "@/components/common/GenericRecordModal";
import { useMockData } from "@/contexts/MockDataContext";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, FileText, Download, Eye, FileArchive, FileImage, FileBarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const documentsData = [
  { id: 1, patientName: "Michael Johnson", uhid: "EH-2026-8901", fileName: "Blood_Test_Report_May_2026.pdf", type: "Lab Report", size: "1.2 MB", uploadedBy: "Dr. Sarah Smith", uploadedOn: "2026-05-15", status: "Verified" },
  { id: 2, patientName: "Michael Johnson", uhid: "EH-2026-8901", fileName: "Chest_XRay_Scan.jpg", type: "Imaging", size: "4.5 MB", uploadedBy: "Radiology Dept", uploadedOn: "2026-05-12", status: "Verified" },
  { id: 3, patientName: "Sarah Connor", uhid: "EH-2026-8922", fileName: "Discharge_Summary.pdf", type: "Clinical Note", size: "0.8 MB", uploadedBy: "Dr. James Wilson", uploadedOn: "2026-04-20", status: "Verified" },
  { id: 4, patientName: "John Doe", uhid: "EH-2026-8805", fileName: "Insurance_Card_Copy.png", type: "Identity", size: "2.1 MB", uploadedBy: "Front Desk", uploadedOn: "2026-06-01", status: "Pending Verification" },
  { id: 5, patientName: "Emma Watson", uhid: "EH-2026-8711", fileName: "Surgical_Consent_Form.pdf", type: "Consent Form", size: "1.5 MB", uploadedBy: "Nurse Station 2", uploadedOn: "2026-06-10", status: "Verified" },
];

const typeIcon = (type) => {
  switch (type) {
    case "Lab Report":
      return <FileBarChart className="h-4 w-4 text-purple-600" />;
    case "Imaging":
      return <FileImage className="h-4 w-4 text-blue-600" />;
    case "Identity":
      return <FileText className="h-4 w-4 text-gray-600" />;
    default:
      return <FileText className="h-4 w-4 text-primary" />;
  }
};

const statusBadge = (status) => {
  if (status === "Verified") {
    return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>;
  }
  return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
};

const columns = [
  { key: "uhid", label: "UHID", width: "120px" },
  { key: "patientName", label: "Patient Name" },
  { 
    key: "fileName", 
    label: "Document Name", 
    render: (val, row) => (
      <div className="flex items-center gap-2">
        {typeIcon(row.type)}
        <span className="font-semibold text-primary cursor-pointer hover:underline">{val}</span>
      </div>
    ) 
  },
  { key: "type", label: "Document Type", render: (val) => <Badge variant="secondary">{val}</Badge> },
  { key: "size", label: "Size" },
  { key: "uploadedBy", label: "Uploaded By" },
  { key: "uploadedOn", label: "Date" },
  { key: "status", label: "Status", render: (val) => statusBadge(val) },
  { 
    key: "actions", 
    label: "", 
    width: "100px",
    render: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
      </div>
    )
  }
];

export default function PatientDocumentsPage() {
  const { getGenericRecords, addGenericRecord } = useMockData();
  const [modalOpen, setModalOpen] = useState(false);
  
  const mockData = getGenericRecords("patients_documents", () => documentsData);

  const handleSave = (data) => {
    addGenericRecord("patients_documents", data);
  };
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <PageHeader 
        title="Patient Documents" 
        description="Securely store and manage patient medical records, lab reports, and identity documents."
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: "Patients", path: "/patients" },
          { label: "Documents" }
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border bg-blue-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FileArchive className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Total Documents</p>
              <h3 className="text-2xl font-bold text-blue-700">12,450</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-purple-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <FileBarChart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">Lab Reports</p>
              <h3 className="text-2xl font-bold text-purple-700">8,204</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-orange-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <FileImage className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-900">Imaging Scans</p>
              <h3 className="text-2xl font-bold text-orange-700">3,142</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-green-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Clinical Notes</p>
              <h3 className="text-2xl font-bold text-green-700">1,104</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable 
        columns={columns} 
        data={mockData} 
        searchable 
        searchPlaceholder="Search by document name, patient, or type..."
      />
      
      <GenericRecordModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        columns={columns}
        title="Document"
      />
    </div>
  );
}
