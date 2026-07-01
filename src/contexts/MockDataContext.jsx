import { createContext, useContext, useState, useEffect } from "react";

const MockDataContext = createContext();

export function useMockData() {
  return useContext(MockDataContext);
}

// Initial mock data
const initialPatients = [
  { id: "EH-2026-9001", name: "Sarah Connor", age: 45, gender: "Female", blood: "O-", status: "Active IPD", lastVisit: "2026-06-29" },
  { id: "EH-2026-9002", name: "John Smith", age: 32, gender: "Male", blood: "A+", status: "OPD", lastVisit: "2026-06-30" },
  { id: "EH-2026-9003", name: "Emily Chen", age: 28, gender: "Female", blood: "B+", status: "Discharged", lastVisit: "2026-06-15" },
];

const initialAppointments = [
  { id: 1, date: "2026-06-30", time: "09:00", patient: "Alice Cooper", doctor: "Dr. Smith", type: "Consultation", status: "Confirmed" },
  { id: 2, date: "2026-06-30", time: "11:30", patient: "Bob Marley", doctor: "Dr. Smith", type: "Follow-up", status: "Pending" },
  { id: 3, date: "2026-06-12", time: "14:00", patient: "Charlie Brown", doctor: "Dr. Adams", type: "Checkup", status: "Completed" },
];

export function MockDataProvider({ children }) {
  // Try to load from localStorage, otherwise use initial data
  const loadData = (key, initialData) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialData;
    } catch (e) {
      return initialData;
    }
  };

  const [patients, setPatients] = useState(() => loadData("hms_patients", initialPatients));
  const [appointments, setAppointments] = useState(() => loadData("hms_appointments", initialAppointments));

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("hms_patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("hms_appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Generic CRUD helpers
  const generateId = (prefix = "ID") => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

  // --- Patients CRUD ---
  const addPatient = (patient) => {
    const newPatient = {
      id: generateId("EH-2026"),
      ...patient,
      lastVisit: new Date().toISOString().split("T")[0],
    };
    setPatients((prev) => [newPatient, ...prev]);
    return newPatient.id;
  };

  const updatePatient = (id, updatedData) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Appointments CRUD ---
  const addAppointment = (appointment) => {
    const newApt = {
      id: Date.now(),
      status: "Confirmed",
      ...appointment,
    };
    setAppointments((prev) => [...prev, newApt]);
  };

  const updateAppointment = (id, updatedData) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedData } : a)));
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const value = {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
}
