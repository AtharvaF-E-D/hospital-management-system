import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GenericRecordModal({ 
  isOpen, 
  onClose, 
  onSave, 
  columns, 
  title, 
  initialData = null 
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        // Initialize empty form data based on columns
        const initial = {};
        columns.forEach(col => {
          if (col.key !== "actions" && col.key !== "id") {
            initial[col.key] = "";
            // Set reasonable defaults for common fields
            if (col.key === "status") initial[col.key] = "active";
            if (col.key === "date") initial[col.key] = new Date().toISOString().split('T')[0];
          }
        });
        setFormData(initial);
      }
    }
  }, [isOpen, initialData, columns]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-background rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">{initialData ? "Edit" : "New"} {title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {columns.filter(col => col.key !== "actions" && col.key !== "id").map(col => {
              const isDate = col.key.toLowerCase().includes("date") || col.key.toLowerCase().includes("dob");
              const isStatus = col.key.toLowerCase() === "status";
              
              return (
                <div key={col.key} className="space-y-2">
                  <Label htmlFor={col.key}>{col.label}</Label>
                  
                  {isStatus ? (
                    <select
                      id={col.key}
                      value={formData[col.key] || ""}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="verified">Verified</option>
                      <option value="expired">Expired</option>
                    </select>
                  ) : isDate ? (
                    <Input
                      id={col.key}
                      type="date"
                      value={formData[col.key] || ""}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      required
                    />
                  ) : (
                    <Input
                      id={col.key}
                      type="text"
                      placeholder={`Enter ${col.label.toLowerCase()}`}
                      value={formData[col.key] || ""}
                      onChange={(e) => handleChange(col.key, e.target.value)}
                      required
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="p-4 border-t flex justify-end gap-2 bg-muted/20">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Record</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
