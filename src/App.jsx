import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/patients/PatientsPage";
import PatientRegistrationPage from "./pages/patients/PatientRegistrationPage";
import PatientProfilePage from "./pages/patients/PatientProfilePage";
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentsCalendarPage from "./pages/appointments/AppointmentsCalendarPage";
import OPDPage from "./pages/opd/OPDPage";
import OPDConsultationPage from "./pages/opd/OPDConsultationPage";
import IPDPage from "./pages/ipd/IPDPage";
import EmergencyPage from "./pages/emergency/EmergencyPage";
import DoctorsPage from "./pages/doctors/DoctorsPage";
import NurseStationPage from "./pages/nurse/NurseStationPage";
import LaboratoryPage from "./pages/laboratory/LaboratoryPage";
import RadiologyPage from "./pages/radiology/RadiologyPage";
import PharmacyPage from "./pages/pharmacy/PharmacyPage";
import InventoryPage from "./pages/inventory/InventoryPage";
import BloodBankPage from "./pages/bloodbank/BloodBankPage";
import OperationTheatrePage from "./pages/ot/OperationTheatrePage";
import AmbulancePage from "./pages/ambulance/AmbulancePage";
import BillingPage from "./pages/billing/BillingPage";
import InsurancePage from "./pages/insurance/InsurancePage";
import FinancePage from "./pages/finance/FinancePage";
import HRPage from "./pages/hr/HRPage";
import CRMPage from "./pages/crm/CRMPage";
import FrontOfficePage from "./pages/frontoffice/FrontOfficePage";
import ReportsPage from "./pages/reports/ReportsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import AdminPage from "./pages/admin/AdminPage";
import UserManagementPage from "./pages/users/UserManagementPage";
import AICenterPage from "./pages/ai/AICenterPage";
import SettingsPage from "./pages/settings/SettingsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/403" element={<ForbiddenPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
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
              <Route path="patients/allergies" element={<PatientsPage />} />
              <Route path="patients/insurance" element={<PatientsPage />} />
              <Route path="patients/documents" element={<PatientsPage />} />

              {/* Appointments */}
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="appointments/calendar" element={<AppointmentsCalendarPage />} />
              <Route path="appointments/schedule" element={<AppointmentsPage />} />
              <Route path="appointments/queue" element={<AppointmentsPage />} />
              <Route path="appointments/telemedicine" element={<AppointmentsPage />} />

              {/* OPD */}
              <Route path="opd" element={<OPDPage />} />
              <Route path="opd/consultation" element={<OPDConsultationPage />} />
              <Route path="opd/prescription" element={<OPDPage />} />
              <Route path="opd/diagnosis" element={<OPDPage />} />
              <Route path="opd/notes" element={<OPDPage />} />
              <Route path="opd/billing" element={<OPDPage />} />

              {/* IPD */}
              <Route path="ipd" element={<IPDPage />} />
              <Route path="ipd/beds" element={<IPDPage />} />
              <Route path="ipd/wards" element={<IPDPage />} />
              <Route path="ipd/nursing-chart" element={<IPDPage />} />
              <Route path="ipd/discharge" element={<IPDPage />} />
              <Route path="ipd/discharge-summary" element={<IPDPage />} />

              {/* Emergency */}
              <Route path="emergency" element={<EmergencyPage />} />
              <Route path="emergency/triage" element={<EmergencyPage />} />
              <Route path="emergency/queue" element={<EmergencyPage />} />
              <Route path="emergency/billing" element={<EmergencyPage />} />

              {/* Doctors */}
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="doctors/availability" element={<DoctorsPage />} />
              <Route path="doctors/leaves" element={<DoctorsPage />} />
              <Route path="doctors/departments" element={<DoctorsPage />} />
              <Route path="doctors/specializations" element={<DoctorsPage />} />

              {/* Nurse Station */}
              <Route path="nurse" element={<NurseStationPage />} />
              <Route path="nurse/medication" element={<NurseStationPage />} />
              <Route path="nurse/vitals" element={<NurseStationPage />} />
              <Route path="nurse/notes" element={<NurseStationPage />} />
              <Route path="nurse/shift" element={<NurseStationPage />} />

              {/* Laboratory */}
              <Route path="lab" element={<LaboratoryPage />} />
              <Route path="lab/samples" element={<LaboratoryPage />} />
              <Route path="lab/processing" element={<LaboratoryPage />} />
              <Route path="lab/reports" element={<LaboratoryPage />} />
              <Route path="lab/templates" element={<LaboratoryPage />} />
              <Route path="lab/reference" element={<LaboratoryPage />} />

              {/* Radiology */}
              <Route path="radiology" element={<RadiologyPage />} />
              <Route path="radiology/imaging" element={<RadiologyPage />} />
              <Route path="radiology/reports" element={<RadiologyPage />} />

              {/* Pharmacy */}
              <Route path="pharmacy" element={<PharmacyPage />} />
              <Route path="pharmacy/inventory" element={<PharmacyPage />} />
              <Route path="pharmacy/purchase" element={<PharmacyPage />} />
              <Route path="pharmacy/sales" element={<PharmacyPage />} />
              <Route path="pharmacy/expiry" element={<PharmacyPage />} />
              <Route path="pharmacy/suppliers" element={<PharmacyPage />} />

              {/* Inventory */}
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="inventory/stock" element={<InventoryPage />} />
              <Route path="inventory/purchase-orders" element={<InventoryPage />} />
              <Route path="inventory/grn" element={<InventoryPage />} />
              <Route path="inventory/vendors" element={<InventoryPage />} />
              <Route path="inventory/assets" element={<InventoryPage />} />

              {/* Blood Bank */}
              <Route path="blood-bank" element={<BloodBankPage />} />
              <Route path="blood-bank/stock" element={<BloodBankPage />} />
              <Route path="blood-bank/issue" element={<BloodBankPage />} />
              <Route path="blood-bank/compatibility" element={<BloodBankPage />} />

              {/* Operation Theatre */}
              <Route path="ot" element={<OperationTheatrePage />} />
              <Route path="ot/operations" element={<OperationTheatrePage />} />
              <Route path="ot/surgeons" element={<OperationTheatrePage />} />
              <Route path="ot/notes" element={<OperationTheatrePage />} />

              {/* Ambulance */}
              <Route path="ambulance" element={<AmbulancePage />} />
              <Route path="ambulance/drivers" element={<AmbulancePage />} />
              <Route path="ambulance/bookings" element={<AmbulancePage />} />
              <Route path="ambulance/maintenance" element={<AmbulancePage />} />

              {/* Billing */}
              <Route path="billing" element={<BillingPage />} />
              <Route path="billing/payments" element={<BillingPage />} />
              <Route path="billing/refunds" element={<BillingPage />} />
              <Route path="billing/packages" element={<BillingPage />} />
              <Route path="billing/services" element={<BillingPage />} />
              <Route path="billing/taxes" element={<BillingPage />} />

              {/* Insurance */}
              <Route path="insurance" element={<InsurancePage />} />
              <Route path="insurance/companies" element={<InsurancePage />} />
              <Route path="insurance/policies" element={<InsurancePage />} />
              <Route path="insurance/approvals" element={<InsurancePage />} />

              {/* Finance */}
              <Route path="finance" element={<FinancePage />} />
              <Route path="finance/expense" element={<FinancePage />} />
              <Route path="finance/ledger" element={<FinancePage />} />
              <Route path="finance/bank" element={<FinancePage />} />
              <Route path="finance/budget" element={<FinancePage />} />
              <Route path="finance/profit-loss" element={<FinancePage />} />

              {/* HR */}
              <Route path="hr" element={<HRPage />} />
              <Route path="hr/attendance" element={<HRPage />} />
              <Route path="hr/leaves" element={<HRPage />} />
              <Route path="hr/payroll" element={<HRPage />} />
              <Route path="hr/shift" element={<HRPage />} />
              <Route path="hr/recruitment" element={<HRPage />} />

              {/* CRM */}
              <Route path="crm" element={<CRMPage />} />
              <Route path="crm/communication" element={<CRMPage />} />
              <Route path="crm/campaign" element={<CRMPage />} />
              <Route path="crm/feedback" element={<CRMPage />} />

              {/* Front Office */}
              <Route path="front-office" element={<FrontOfficePage />} />
              <Route path="front-office/reception" element={<FrontOfficePage />} />
              <Route path="front-office/calls" element={<FrontOfficePage />} />
              <Route path="front-office/complaints" element={<FrontOfficePage />} />

              {/* Reports */}
              <Route path="reports" element={<ReportsPage />} />
              <Route path="reports/financial" element={<ReportsPage />} />
              <Route path="reports/lab" element={<ReportsPage />} />
              <Route path="reports/inventory" element={<ReportsPage />} />
              <Route path="reports/audit" element={<ReportsPage />} />
              <Route path="reports/custom" element={<ReportsPage />} />

              {/* Analytics */}
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="analytics/revenue" element={<AnalyticsPage />} />
              <Route path="analytics/patients" element={<AnalyticsPage />} />
              <Route path="analytics/doctors" element={<AnalyticsPage />} />
              <Route path="analytics/departments" element={<AnalyticsPage />} />

              {/* Administration */}
              <Route path="admin" element={<AdminPage />} />
              <Route path="admin/departments" element={<AdminPage />} />
              <Route path="admin/branches" element={<AdminPage />} />
              <Route path="admin/rooms" element={<AdminPage />} />
              <Route path="admin/services" element={<AdminPage />} />
              <Route path="admin/audit" element={<AdminPage />} />
              <Route path="admin/logs" element={<AdminPage />} />
              <Route path="admin/api-keys" element={<AdminPage />} />

              {/* User Management */}
              <Route path="users" element={<UserManagementPage />} />
              <Route path="users/roles" element={<UserManagementPage />} />
              <Route path="users/permissions" element={<UserManagementPage />} />
              <Route path="users/role-matrix" element={<UserManagementPage />} />
              <Route path="users/login-history" element={<UserManagementPage />} />

              {/* AI Center */}
              <Route path="ai" element={<AICenterPage />} />
              <Route path="ai/scribe" element={<AICenterPage />} />
              <Route path="ai/diagnosis" element={<AICenterPage />} />
              <Route path="ai/documents" element={<AICenterPage />} />
              <Route path="ai/voice" element={<AICenterPage />} />

              {/* Settings */}
              <Route path="settings" element={<SettingsPage />} />
              <Route path="settings/branding" element={<SettingsPage />} />
              <Route path="settings/security" element={<SettingsPage />} />
              <Route path="settings/localization" element={<SettingsPage />} />
              <Route path="settings/backup" element={<SettingsPage />} />
              <Route path="settings/notifications" element={<SettingsPage />} />
              <Route path="settings/integrations" element={<SettingsPage />} />

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
