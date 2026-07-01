import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { sidebarMenuConfig } from "@/config/sidebarMenu";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { StatCard, StatusBadge } from "@/components/common/DataDisplay";
import GenericRecordModal from "@/components/common/GenericRecordModal";
import { useMockData } from "@/contexts/MockDataContext";
import { Button } from "@/components/ui/button";
import { Plus, BarChart2, Activity, FileText, CheckCircle, MoreHorizontal, Eye, Edit, Trash2, Settings, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Generate generic mock data for the table
const generateMockData = (moduleName) => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    recordId: `${moduleName.substring(0, 3).toUpperCase()}-${String(1000 + i).padStart(4, "0")}`,
    name: `Test Record ${i + 1}`,
    date: `2026-06-${String(1 + (i % 28)).padStart(2, "0")}`,
    status: ["active", "pending", "completed"][i % 3],
    amount: `$${(Math.random() * 500).toFixed(2)}`,
    assignedTo: ["John Doe", "Jane Smith", "Mike Johnson"][i % 3],
  }));
};

const genericColumns = [
  { key: "recordId", label: "Record ID", width: "120px" },
  { key: "name", label: "Description" },
  { key: "date", label: "Date", width: "120px" },
  { key: "assignedTo", label: "Assigned To" },
  { key: "amount", label: "Value / Amount" },
  {
    key: "status",
    label: "Status",
    width: "100px",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function DynamicSubModulePage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { getGenericRecords, addGenericRecord, updateGenericRecord, deleteGenericRecord } = useMockData();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Find the current module and sub-module from the config
  let currentModule = null;
  let currentSubModule = null;

  for (const module of sidebarMenuConfig) {
    if (module.children) {
      const match = module.children.find(child => child.path === currentPath);
      if (match) {
        currentModule = module;
        currentSubModule = match;
        break;
      }
    } else if (module.path === currentPath) {
      currentModule = module;
      currentSubModule = { label: "Overview", path: currentPath };
      break;
    }
  }

  // Fallbacks if not found
  const moduleLabel = currentModule?.label || "Module";
  const subModuleLabel = currentSubModule?.label || "Page";
  
  const collectionKey = `dynamic_${currentPath.replace(/\//g, "_")}`;
  const mockData = getGenericRecords(collectionKey, () => generateMockData(moduleLabel));

  const handleSave = (data) => {
    if (editingRecord) {
      updateGenericRecord(collectionKey, editingRecord.id, data);
    } else {
      addGenericRecord(collectionKey, data);
    }
    setEditingRecord(null);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      deleteGenericRecord(collectionKey, id);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10 w-full">
      <PageHeader
        title={`${subModuleLabel}`}
        description={`Manage and view all records related to ${subModuleLabel.toLowerCase()} in the ${moduleLabel} module.`}
        breadcrumbs={[
          { label: "Dashboard", path: "/" },
          { label: moduleLabel, path: currentModule?.path || "#" },
          { label: subModuleLabel },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs bg-white">
              <Settings className="h-3.5 w-3.5 mr-1" />
              Configure
            </Button>
            <Button size="sm" className="h-8 text-xs" onClick={() => { setEditingRecord(null); setModalOpen(true); }}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              New Record
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title={`Total ${subModuleLabel}`} value="1,284" change="+12% this month" icon={FileText} />
        <StatCard title="Active Records" value="482" change="+5% vs last week" icon={Activity} />
        <StatCard title="Pending Action" value="24" change="-3 today" icon={AlertTriangle} trend="down" />
        <StatCard title="Completion Rate" value="94%" change="+2.1% this week" icon={CheckCircle} />
      </div>

      <DataTable
        columns={genericColumns}
        data={mockData}
        searchable
        selectable
        searchPlaceholder={`Search ${subModuleLabel.toLowerCase()} by ID, name, or status...`}
        rowActions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="h-3.5 w-3.5 mr-2" />View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(row)}><Edit className="h-3.5 w-3.5 mr-2" />Edit Record</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(row.id)}><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />

      <GenericRecordModal 
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingRecord(null); }}
        onSave={handleSave}
        columns={genericColumns}
        title={subModuleLabel}
        initialData={editingRecord}
      />
    </div>
  );
}
