import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import HSNClassification from "./pages/HSNClassification";
import DutyCalculator from "./pages/DutyCalculator";
import RiskAssessment from "./pages/RiskAssessment";
import ShipmentTracking from "./pages/ShipmentTracking";
import Clients from "./pages/Clients";
import Analytics from "./pages/Analytics";
import Users from "./pages/UsersRoles";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        {/* Documents */}
        <Route
          path="/documents"
          element={
            <DashboardLayout>
              <Documents />
            </DashboardLayout>
          }
        />

        {/* HSN Classification */}
        <Route
          path="/hsn"
          element={
            <DashboardLayout>
              <HSNClassification />
            </DashboardLayout>
          }
        />

        {/* Duty Calculator */}
        <Route
          path="/duty"
          element={
            <DashboardLayout>
              <DutyCalculator />
            </DashboardLayout>
          }
        />

        {/* Risk Assessment */}
        <Route
          path="/risk"
          element={
            <DashboardLayout>
              <RiskAssessment />
            </DashboardLayout>
          }
        />

        {/* Shipment Tracking */}
        <Route
          path="/shipments"
          element={
            <DashboardLayout>
              <ShipmentTracking />
            </DashboardLayout>
          }
        />

        {/* Clients */}
        <Route
          path="/clients"
          element={
            <DashboardLayout>
              <Clients />
            </DashboardLayout>
          }
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;