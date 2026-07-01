import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MockDataProvider } from "./contexts/MockDataContext";
import MainLayout from "./layouts/MainLayout";
import DoctorLayout from "./layouts/doctor/DoctorLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import PatientProfileEMR from "./pages/doctor/PatientProfileEMR";
import ConsultationPage from "./pages/doctor/ConsultationPage";
import PrescriptionPage from "./pages/doctor/PrescriptionPage";
import LabOrderPage from "./pages/doctor/LabOrderPage";
import RadiologyOrderPage from "./pages/doctor/RadiologyOrderPage";
import DoctorReportsPage from "./pages/doctor/DoctorReportsPage";
import MessagesPage from "./pages/doctor/MessagesPage";
import TasksPage from "./pages/doctor/TasksPage";
import DocumentsPage from "./pages/doctor/DocumentsPage";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";
import DoctorSettingsPage from "./pages/doctor/DoctorSettingsPage";

// Nurse Pages
import NurseLayout from "./layouts/nurse/NurseLayout";
import NurseDashboard from "./pages/nurse/NurseDashboard";
import VitalsPage from "./pages/nurse/VitalsPage";
import MedicationPage from "./pages/nurse/MedicationPage";
import NursingNotesPage from "./pages/nurse/NursingNotesPage";
import NurseTasksPage from "./pages/nurse/NurseTasksPage";
import BedManagementPage from "./pages/nurse/BedManagementPage";
import NurseReportsPage from "./pages/nurse/NurseReportsPage";

// Pages
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/patients/PatientsPage";
import PatientRegistrationPage from "./pages/patients/PatientRegistrationPage";
import PatientProfilePage from "./pages/patients/PatientProfilePage";
import PatientAllergiesPage from "./pages/patients/PatientAllergiesPage";
import PatientInsurancePage from "./pages/patients/PatientInsurancePage";
import PatientDocumentsPage from "./pages/patients/PatientDocumentsPage";
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentsCalendarPage from "./pages/appointments/AppointmentsCalendarPage";
import OPDConsultationPage from "./pages/opd/OPDConsultationPage";
import DynamicSubModulePage from "./components/common/DynamicSubModulePage";

function App() {
  return (
    <MockDataProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/403" element={<ForbiddenPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            
            {/* Doctor Portal Routes */}
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index element={<DoctorDashboard />} />
              <Route path="appointments" element={<DynamicSubModulePage />} />
              <Route path="appointments/today" element={<DynamicSubModulePage />} />
              <Route path="appointments/calendar" element={<DynamicSubModulePage />} />
              <Route path="appointments/queue" element={<DynamicSubModulePage />} />
              
              <Route path="patients" element={<DoctorPatientsPage />} />
              <Route path="patients/search" element={<DoctorPatientsPage />} />
              <Route path="patients/list" element={<DoctorPatientsPage />} />
              <Route path="patients/profile/:id" element={<PatientProfileEMR />} />
              
              <Route path="consultation" element={<ConsultationPage />} />
              <Route path="consultation/notes" element={<DynamicSubModulePage />} />
              <Route path="consultation/prescription" element={<PrescriptionPage />} />
              <Route path="consultation/lab" element={<LabOrderPage />} />
              <Route path="consultation/radiology" element={<RadiologyOrderPage />} />
              <Route path="consultation/discharge" element={<DynamicSubModulePage />} />
              <Route path="consultation/certificates" element={<DynamicSubModulePage />} />
              <Route path="consultation/referrals" element={<DynamicSubModulePage />} />
              <Route path="consultation/telemedicine" element={<DynamicSubModulePage />} />
              
              <Route path="messages" element={<MessagesPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="reports" element={<DoctorReportsPage />} />
              <Route path="profile" element={<DoctorProfilePage />} />
              <Route path="settings" element={<DoctorSettingsPage />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Nurse Portal Routes */}
            <Route path="/nurse" element={<NurseLayout />}>
              <Route index element={<NurseDashboard />} />
              <Route path="vitals" element={<VitalsPage />} />
              <Route path="medication" element={<MedicationPage />} />
              <Route path="notes" element={<NursingNotesPage />} />
              <Route path="tasks" element={<NurseTasksPage />} />
              <Route path="beds" element={<BedManagementPage />} />
              <Route path="reports" element={<NurseReportsPage />} />
              <Route path="*" element={<DynamicSubModulePage />} />
            </Route>

            {/* Super Admin / Staff Portal Routes */}
            <Route path="/" element={<MainLayout />}>
              {/* Dashboard */}
              <Route index element={<DashboardPage />} />
              <Route path="dashboard/clinical" element={<DashboardPage />} />
              <Route path="dashboard/finance" element={<DashboardPage />} />
              <Route path="dashboard/operational" element={<DashboardPage />} />
              <Route path="dashboard/analytics" element={<DashboardPage />} />

              {/* Patient Management */}
              <Route path="patients" element={<PatientsPage />} />
              <Route path="patients/register" element={<PatientRegistrationPage />} />
              <Route path="patients/medical-history" element={<PatientProfilePage />} />
              <Route path="patients/allergies" element={<PatientAllergiesPage />} />
              <Route path="patients/insurance" element={<PatientInsurancePage />} />
              <Route path="patients/documents" element={<PatientDocumentsPage />} />

              {/* Appointments */}
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="appointments/calendar" element={<AppointmentsCalendarPage />} />
              <Route path="appointments/schedule" element={<DynamicSubModulePage />} />
              <Route path="appointments/queue" element={<DynamicSubModulePage />} />
              <Route path="appointments/telemedicine" element={<DynamicSubModulePage />} />

              {/* OPD */}
              <Route path="opd" element={<DynamicSubModulePage />} />
              <Route path="opd/consultation" element={<OPDConsultationPage />} />
              <Route path="opd/prescription" element={<DynamicSubModulePage />} />
              <Route path="opd/diagnosis" element={<DynamicSubModulePage />} />
              <Route path="opd/notes" element={<DynamicSubModulePage />} />
              <Route path="opd/billing" element={<DynamicSubModulePage />} />

              {/* IPD */}
              <Route path="ipd" element={<DynamicSubModulePage />} />
              <Route path="ipd/beds" element={<DynamicSubModulePage />} />
              <Route path="ipd/wards" element={<DynamicSubModulePage />} />
              <Route path="ipd/nursing-chart" element={<DynamicSubModulePage />} />
              <Route path="ipd/discharge" element={<DynamicSubModulePage />} />
              <Route path="ipd/discharge-summary" element={<DynamicSubModulePage />} />

              {/* Emergency */}
              <Route path="emergency" element={<DynamicSubModulePage />} />
              <Route path="emergency/triage" element={<DynamicSubModulePage />} />
              <Route path="emergency/queue" element={<DynamicSubModulePage />} />
              <Route path="emergency/billing" element={<DynamicSubModulePage />} />

              {/* Doctors */}
              <Route path="doctors" element={<DynamicSubModulePage />} />
              <Route path="doctors/availability" element={<DynamicSubModulePage />} />
              <Route path="doctors/leaves" element={<DynamicSubModulePage />} />
              <Route path="doctors/departments" element={<DynamicSubModulePage />} />
              <Route path="doctors/specializations" element={<DynamicSubModulePage />} />

              {/* Nurse Station */}
              <Route path="nurse" element={<DynamicSubModulePage />} />
              <Route path="nurse/medication" element={<DynamicSubModulePage />} />
              <Route path="nurse/vitals" element={<DynamicSubModulePage />} />
              <Route path="nurse/notes" element={<DynamicSubModulePage />} />
              <Route path="nurse/shift" element={<DynamicSubModulePage />} />

              {/* Laboratory */}
              <Route path="lab" element={<DynamicSubModulePage />} />
              <Route path="lab/samples" element={<DynamicSubModulePage />} />
              <Route path="lab/processing" element={<DynamicSubModulePage />} />
              <Route path="lab/reports" element={<DynamicSubModulePage />} />
              <Route path="lab/templates" element={<DynamicSubModulePage />} />
              <Route path="lab/reference" element={<DynamicSubModulePage />} />

              {/* Radiology */}
              <Route path="radiology" element={<DynamicSubModulePage />} />
              <Route path="radiology/imaging" element={<DynamicSubModulePage />} />
              <Route path="radiology/reports" element={<DynamicSubModulePage />} />

              {/* Pharmacy */}
              <Route path="pharmacy" element={<DynamicSubModulePage />} />
              <Route path="pharmacy/inventory" element={<DynamicSubModulePage />} />
              <Route path="pharmacy/purchase" element={<DynamicSubModulePage />} />
              <Route path="pharmacy/sales" element={<DynamicSubModulePage />} />
              <Route path="pharmacy/expiry" element={<DynamicSubModulePage />} />
              <Route path="pharmacy/suppliers" element={<DynamicSubModulePage />} />

              {/* Inventory */}
              <Route path="inventory" element={<DynamicSubModulePage />} />
              <Route path="inventory/stock" element={<DynamicSubModulePage />} />
              <Route path="inventory/purchase-orders" element={<DynamicSubModulePage />} />
              <Route path="inventory/grn" element={<DynamicSubModulePage />} />
              <Route path="inventory/vendors" element={<DynamicSubModulePage />} />
              <Route path="inventory/assets" element={<DynamicSubModulePage />} />

              {/* Blood Bank */}
              <Route path="blood-bank" element={<DynamicSubModulePage />} />
              <Route path="blood-bank/stock" element={<DynamicSubModulePage />} />
              <Route path="blood-bank/issue" element={<DynamicSubModulePage />} />
              <Route path="blood-bank/compatibility" element={<DynamicSubModulePage />} />

              {/* Operation Theatre */}
              <Route path="ot" element={<DynamicSubModulePage />} />
              <Route path="ot/operations" element={<DynamicSubModulePage />} />
              <Route path="ot/surgeons" element={<DynamicSubModulePage />} />
              <Route path="ot/notes" element={<DynamicSubModulePage />} />

              {/* Ambulance */}
              <Route path="ambulance" element={<DynamicSubModulePage />} />
              <Route path="ambulance/drivers" element={<DynamicSubModulePage />} />
              <Route path="ambulance/bookings" element={<DynamicSubModulePage />} />
              <Route path="ambulance/maintenance" element={<DynamicSubModulePage />} />

              {/* Billing */}
              <Route path="billing" element={<DynamicSubModulePage />} />
              <Route path="billing/payments" element={<DynamicSubModulePage />} />
              <Route path="billing/refunds" element={<DynamicSubModulePage />} />
              <Route path="billing/packages" element={<DynamicSubModulePage />} />
              <Route path="billing/services" element={<DynamicSubModulePage />} />
              <Route path="billing/taxes" element={<DynamicSubModulePage />} />

              {/* Insurance */}
              <Route path="insurance" element={<DynamicSubModulePage />} />
              <Route path="insurance/companies" element={<DynamicSubModulePage />} />
              <Route path="insurance/policies" element={<DynamicSubModulePage />} />
              <Route path="insurance/approvals" element={<DynamicSubModulePage />} />

              {/* Finance */}
              <Route path="finance" element={<DynamicSubModulePage />} />
              <Route path="finance/expense" element={<DynamicSubModulePage />} />
              <Route path="finance/ledger" element={<DynamicSubModulePage />} />
              <Route path="finance/bank" element={<DynamicSubModulePage />} />
              <Route path="finance/budget" element={<DynamicSubModulePage />} />
              <Route path="finance/profit-loss" element={<DynamicSubModulePage />} />

              {/* HR */}
              <Route path="hr" element={<DynamicSubModulePage />} />
              <Route path="hr/attendance" element={<DynamicSubModulePage />} />
              <Route path="hr/leaves" element={<DynamicSubModulePage />} />
              <Route path="hr/payroll" element={<DynamicSubModulePage />} />
              <Route path="hr/shift" element={<DynamicSubModulePage />} />
              <Route path="hr/recruitment" element={<DynamicSubModulePage />} />

              {/* CRM */}
              <Route path="crm" element={<DynamicSubModulePage />} />
              <Route path="crm/communication" element={<DynamicSubModulePage />} />
              <Route path="crm/campaign" element={<DynamicSubModulePage />} />
              <Route path="crm/feedback" element={<DynamicSubModulePage />} />

              {/* Front Office */}
              <Route path="front-office" element={<DynamicSubModulePage />} />
              <Route path="front-office/reception" element={<DynamicSubModulePage />} />
              <Route path="front-office/calls" element={<DynamicSubModulePage />} />
              <Route path="front-office/complaints" element={<DynamicSubModulePage />} />

              {/* Reports */}
              <Route path="reports" element={<DynamicSubModulePage />} />
              <Route path="reports/financial" element={<DynamicSubModulePage />} />
              <Route path="reports/lab" element={<DynamicSubModulePage />} />
              <Route path="reports/inventory" element={<DynamicSubModulePage />} />
              <Route path="reports/audit" element={<DynamicSubModulePage />} />
              <Route path="reports/custom" element={<DynamicSubModulePage />} />

              {/* Analytics */}
              <Route path="analytics" element={<DynamicSubModulePage />} />
              <Route path="analytics/revenue" element={<DynamicSubModulePage />} />
              <Route path="analytics/patients" element={<DynamicSubModulePage />} />
              <Route path="analytics/doctors" element={<DynamicSubModulePage />} />
              <Route path="analytics/departments" element={<DynamicSubModulePage />} />

              {/* Administration */}
              <Route path="admin" element={<DynamicSubModulePage />} />
              <Route path="admin/departments" element={<DynamicSubModulePage />} />
              <Route path="admin/branches" element={<DynamicSubModulePage />} />
              <Route path="admin/rooms" element={<DynamicSubModulePage />} />
              <Route path="admin/services" element={<DynamicSubModulePage />} />
              <Route path="admin/audit" element={<DynamicSubModulePage />} />
              <Route path="admin/logs" element={<DynamicSubModulePage />} />
              <Route path="admin/api-keys" element={<DynamicSubModulePage />} />

              {/* User Management */}
              <Route path="users" element={<DynamicSubModulePage />} />
              <Route path="users/roles" element={<DynamicSubModulePage />} />
              <Route path="users/permissions" element={<DynamicSubModulePage />} />
              <Route path="users/role-matrix" element={<DynamicSubModulePage />} />
              <Route path="users/login-history" element={<DynamicSubModulePage />} />

              {/* AI Center */}
              <Route path="ai" element={<DynamicSubModulePage />} />
              <Route path="ai/scribe" element={<DynamicSubModulePage />} />
              <Route path="ai/diagnosis" element={<DynamicSubModulePage />} />
              <Route path="ai/documents" element={<DynamicSubModulePage />} />
              <Route path="ai/voice" element={<DynamicSubModulePage />} />

              {/* Settings */}
              <Route path="settings" element={<DynamicSubModulePage />} />
              <Route path="settings/branding" element={<DynamicSubModulePage />} />
              <Route path="settings/security" element={<DynamicSubModulePage />} />
              <Route path="settings/localization" element={<DynamicSubModulePage />} />
              <Route path="settings/backup" element={<DynamicSubModulePage />} />
              <Route path="settings/notifications" element={<DynamicSubModulePage />} />
              <Route path="settings/integrations" element={<DynamicSubModulePage />} />

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
    </MockDataProvider>
  );
}

export default App;
