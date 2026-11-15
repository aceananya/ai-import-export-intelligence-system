
import { useEffect, useState } from "react";
import {
  FiSettings,
  FiBriefcase,
  FiBell,
  FiSliders,
  FiShield,
  FiSave,
  FiRefreshCw,
  FiCheckCircle,
  FiInfo,
  FiMail,
  FiTruck,
  FiAlertTriangle,
  FiFileText,
  FiLock,
} from "react-icons/fi";

const STORAGE_KEY = "import_export_settings";

const defaultSettings = {
  companyName: "TradeNexa",
  businessEmail: "info@TradeNexa.com",
  phone: "+91 9876543210",
  address: "Mumbai, India",
  country: "India",

  emailNotifications: true,
  shipmentAlerts: true,
  delayAlerts: true,
  customsAlerts: true,

  currency: "INR",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  theme: "Light",

  twoFactorAuth: false,
};

const sections = [
  {
    id: "company",
    label: "Company Profile",
    icon: FiBriefcase,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: FiBell,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: FiSliders,
  },
  {
    id: "security",
    label: "Security",
    icon: FiShield,
  },
];

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedSettings, setSavedSettings] = useState(settings);
  const [activeSection, setActiveSection] = useState("company");
  const [message, setMessage] = useState("");

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      setMessage("");
    }, 3500);

    return () => clearTimeout(timeout);
  }, [message]);

  const updateSetting = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
      );

      setSavedSettings({ ...settings });
      setMessage("Your settings have been saved successfully.");
    } catch {
      setMessage("Unable to save settings in this browser.");
    }
  };

  const handleReset = () => {
    setSettings({ ...savedSettings });
    setMessage("Unsaved changes have been discarded.");
  };

  const InputField = ({
    label,
    field,
    type = "text",
    placeholder = "",
  }) => (
    <div>
      <label
        htmlFor={field}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
      </label>

      <input
        id={field}
        type={type}
        value={settings[field]}
        placeholder={placeholder}
        onChange={(e) => updateSetting(field, e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );

  const SelectField = ({ label, field, options }) => (
    <div>
      <label
        htmlFor={field}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
      </label>

      <select
        id={field}
        value={settings[field]}
        onChange={(e) => updateSetting(field, e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const ToggleField = ({
    icon: Icon,
    title,
    description,
    field,
  }) => (
    <div className="flex items-center justify-between gap-4 py-5 border-b border-slate-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            {title}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-label={title}
        aria-checked={settings[field]}
        onClick={() =>
          updateSetting(field, !settings[field])
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          settings[field] ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            settings[field] ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <FiSettings size={23} />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Settings
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your company profile and workspace preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] gap-6 items-start">
        {/* Settings Navigation */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
          <p className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace Settings
          </p>

          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const selected = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-left transition ${
                    selected
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-slate-100 p-4">
            <div className="flex items-start gap-2 text-slate-500">
              <FiInfo className="mt-0.5 shrink-0" />

              <p className="text-xs leading-relaxed">
                Settings are stored in this browser until
                backend synchronization is enabled.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Settings Panel */}
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Company Profile */}
          {activeSection === "company" && (
            <div>
              <div className="px-6 py-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <FiBriefcase className="text-blue-600" size={22} />

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Company Profile
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Update your organization's business information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4 rounded-xl bg-slate-50 border border-slate-100 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 text-xl font-bold">
                    {settings.companyName?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {settings.companyName || "Company"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Business Workspace
                    </p>
                  </div>
                </div>

                <InputField
                  label="Company Name"
                  field="companyName"
                  placeholder="Enter company name"
                />

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label="Business Email"
                    field="businessEmail"
                    type="email"
                  />

                  <InputField
                    label="Contact Number"
                    field="phone"
                    type="tel"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Business Address
                  </label>

                  <textarea
                    id="address"
                    rows={4}
                    value={settings.address}
                    onChange={(e) =>
                      updateSetting("address", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <InputField
                  label="Country"
                  field="country"
                />
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div>
              <div className="px-6 py-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <FiBell className="text-blue-600" size={22} />

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Notification Preferences
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Choose which shipment and trade updates you want to receive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6">
                <ToggleField
                  icon={FiMail}
                  title="Email Notifications"
                  description="Enable email notifications for your business account."
                  field="emailNotifications"
                />

                <ToggleField
                  icon={FiTruck}
                  title="Shipment Tracking Alerts"
                  description="Receive updates when shipments reach new checkpoints."
                  field="shipmentAlerts"
                />

                <ToggleField
                  icon={FiAlertTriangle}
                  title="Delivery Delay Alerts"
                  description="Get notified about potential shipment delays and disruptions."
                  field="delayAlerts"
                />

                <ToggleField
                  icon={FiFileText}
                  title="Customs & Documentation Alerts"
                  description="Receive updates related to customs clearance and documentation."
                  field="customsAlerts"
                />
              </div>

              <div className="mx-6 mb-6 mt-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                These preferences are saved locally. Automated
                notifications will require backend integration.
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeSection === "preferences" && (
            <div>
              <div className="px-6 py-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <FiSliders className="text-blue-600" size={22} />

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      System Preferences
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Customize your workspace preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                <SelectField
                  label="Default Currency"
                  field="currency"
                  options={[
                    { value: "INR", label: "INR - Indian Rupee (₹)" },
                    { value: "USD", label: "USD - US Dollar ($)" },
                    { value: "EUR", label: "EUR - Euro (€)" },
                    { value: "GBP", label: "GBP - British Pound (£)" },
                    { value: "AED", label: "AED - UAE Dirham" },
                  ]}
                />

                <SelectField
                  label="Time Zone"
                  field="timezone"
                  options={[
                    { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
                    { value: "UTC", label: "UTC" },
                    { value: "America/New_York", label: "America/New_York" },
                    { value: "Europe/London", label: "Europe/London" },
                    { value: "Asia/Dubai", label: "Asia/Dubai" },
                  ]}
                />

                <SelectField
                  label="Date Format"
                  field="dateFormat"
                  options={[
                    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                  ]}
                />

                <SelectField
                  label="Appearance"
                  field="theme"
                  options={[
                    { value: "Light", label: "Light Mode" },
                    { value: "Dark", label: "Dark Mode" },
                    { value: "System", label: "System Default" },
                  ]}
                />
              </div>

              <div className="mx-6 mb-6 rounded-xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-sm text-slate-600">
                  Display preferences are saved, but applying
                  currency, time zone, date formatting and theme
                  across all pages requires connecting these
                  preferences to the relevant components.
                </p>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div>
              <div className="px-6 py-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <FiShield className="text-blue-600" size={22} />

                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Security Settings
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Review account protection preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-5">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <FiLock size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Account Password
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Password changes require a connected
                      authentication service.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900">
                    Two-Factor Authentication
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Two-factor authentication requires backend
                    verification and is not configured yet.
                  </p>

                  <span className="inline-flex mt-4 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    Not configured
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-5">
                  <div className="flex items-start gap-3">
                    <FiInfo className="text-slate-500 mt-0.5" />

                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        Security Information
                      </h3>

                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        This page does not change passwords,
                        activate two-factor authentication,
                        or modify backend security policies.
                        These functions will require secure
                        authentication endpoints.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-2 text-sm">
              {message ? (
                <>
                  <FiCheckCircle className="text-blue-600 shrink-0" />
                  <span className="text-slate-600">{message}</span>
                </>
              ) : (
                <span className="text-slate-500">
                  {hasChanges
                    ? "You have unsaved changes."
                    : "All changes saved."}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasChanges}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                <FiRefreshCw />
                Discard
              </button>

              <button
                type="submit"
                disabled={!hasChanges}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                <FiSave />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
