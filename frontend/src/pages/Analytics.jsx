
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL =
  "https://ai-import-export-intelligence-system.onrender.com";

// Try the local backend first, then fall back to Render.
const fetchWithFallback = async (path, options = {}) => {
  try {
    const response = await fetch(`${LOCAL_URL}${path}`, options);

    if (!response.ok) {
      throw new Error(`Local backend returned ${response.status}`);
    }

    return response;
  } catch (localError) {
    console.warn(
      "Local backend unavailable. Trying Render.",
      localError
    );

    const response = await fetch(`${RENDER_URL}${path}`, options);

    if (!response.ok) {
      throw new Error(`Render backend returned ${response.status}`);
    }

    return response;
  }
};

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchWithFallback("/analytics");
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "The analytics API did not return an array."
        );
      }

      setAnalyticsData(data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      setError(
        "Unable to load analytics. Please check your backend and try again."
      );
      setAnalyticsData([]);
    } finally {
      setLoading(false);
    }
  };

  const totalShipments = analyticsData.reduce(
    (sum, item) => sum + (Number(item.shipments) || 0),
    0
  );

  const totalDuties = analyticsData.reduce(
    (sum, item) => sum + (Number(item.duties) || 0),
    0
  );

  const totalHighRisk = analyticsData.reduce(
    (sum, item) => sum + (Number(item.high_risk) || 0),
    0
  );

  const avgDuty =
    analyticsData.length > 0
      ? Math.round(totalDuties / analyticsData.length)
      : 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Reports &amp; Analytics
      </h1>

      <p className="text-gray-500 mb-6">
        Trade insights and reports.
      </p>

      <div className="mb-6">
        <select
          className="border rounded-lg px-4 py-2 bg-white"
          defaultValue="6"
          aria-label="Analytics time period"
        >
          <option value="6">Last 6 Months</option>
        </select>
      </div>

      {loading && (
        <p className="text-gray-500 mb-4">
          Loading analytics...
        </p>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={fetchAnalytics}
            className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Top Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* KPI Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            Key Performance Indicators
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Total Shipments
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {totalShipments}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Total Duties
              </p>
              <h3 className="text-2xl font-bold mt-2">
                ₹{totalDuties.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Average Duty
              </p>
              <h3 className="text-2xl font-bold mt-2">
                ₹{avgDuty.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                High Risk Clients
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {totalHighRisk}
              </h3>
            </div>
          </div>
        </div>

        {/* Duty Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Duty Collection Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="duties"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Shipment Growth */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Shipment Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="shipments"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Risk Analysis
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="high_risk"
                stroke="#dc2626"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
