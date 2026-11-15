
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import HSNClassification from "./pages/HSNClassification";
import DutyCalculator from "./pages/DutyCalculator";
import ShipmentTracking from "./pages/ShipmentTracking";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Invoices from "./pages/Invoices";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Contact Page */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
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

        {/* Shipment Tracking */}
        <Route
          path="/shipments"
          element={
            <DashboardLayout>
              <ShipmentTracking />
            </DashboardLayout>
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <DashboardLayout>
              <Orders />
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

        {/* Invoices */}
        <Route
          path="/invoices"
          element={
            <DashboardLayout>
              <Invoices />
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

        {/* Fallback route for invalid URLs */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
