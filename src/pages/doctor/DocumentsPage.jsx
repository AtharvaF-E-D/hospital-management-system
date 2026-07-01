import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Upload, Filter, Trash2, Eye, MoreVertical, FileArchive, Image as ImageIcon } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    { id: "DOC-001", name: "Patient Consent Form - John Doe", type: "PDF", date: "2023-10-25", size: "1.2 MB", uploadedBy: "Dr. Smith" },
    { id: "DOC-002", name: "Lab Results - Sarah Smith", type: "PDF", date: "2023-10-26", size: "3.4 MB", uploadedBy: "Lab System" },
    { id: "DOC-003", name: "X-Ray Chest - Mike Johnson", type: "Image", date: "2023-10-27", size: "5.1 MB", uploadedBy: "Radiology Dept" },
    { id: "DOC-004", name: "Discharge Summary - Emma Davis", type: "Word", date: "2023-10-28", size: "450 KB", uploadedBy: "Dr. Smith" },
    { id: "DOC-005", name: "Medical History - Robert Brown", type: "PDF", date: "2023-10-29", size: "2.1 MB", uploadedBy: "Front Desk" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocs = documents.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />;
      case 'Image': return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case 'Word': return <FileText className="h-5 w-5 text-blue-700" />;
      default: return <FileArchive className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-teal-600" /> Documents Library
          </h1>
          <p className="text-sm text-slate-500">Manage, view, and upload clinical documents.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">All Documents</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search documents by name..." 
                className="pl-9 h-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Date Uploaded</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Uploaded By</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{doc.name}</p>
                        <p className="text-xs text-slate-500">{doc.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-slate-100 text-slate-600 border-none">
                        {doc.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{doc.date}</td>
                    <td className="px-6 py-4 text-slate-500">{doc.size}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-teal-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-teal-600">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDocs.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No documents found matching "{searchTerm}"
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
