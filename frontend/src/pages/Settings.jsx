function Settings() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="text-gray-500 mb-8">
        Manage company, notification, and system settings.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Company Settings */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-6">
            Company Information
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 font-medium">
                Company Name
              </label>

              <input
                type="text"
                defaultValue="SHNOOR"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Business Email
              </label>

              <input
                type="email"
                defaultValue="info@shnoor.com"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Contact Number
              </label>

              <input
                type="text"
                defaultValue="+91 9876543210"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                rows="3"
                className="w-full border rounded-lg p-3"
                defaultValue="Mumbai, India"
              />
            </div>

          </div>

        </div>

        {/* Notification Settings */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-6">
            Notification Settings
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 font-medium">
                Email Notifications
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Shipment Alerts
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Risk Alerts
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

          </div>

        </div>

        {/* System Preferences */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-6">
            System Preferences
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 font-medium">
                Currency
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Time Zone
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Asia/Kolkata</option>
                <option>UTC</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Theme
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

          </div>

        </div>

        {/* Security */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-6">
            Security Settings
          </h2>

          <div className="space-y-4">

            <div>
              <label className="block mb-2 font-medium">
                Security Level
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Two-Factor Authentication
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>

            <button className="bg-red-500 text-white px-5 py-3 rounded-lg">
              Change Password
            </button>

          </div>

        </div>

      </div>

      <div className="mt-8">

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;