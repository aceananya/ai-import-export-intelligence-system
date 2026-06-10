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

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/analytics"
      );

      const data = await response.json();

      setAnalyticsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalShipments = analyticsData.reduce(
    (sum, item) => sum + item.shipments,
    0
  );

  const totalDuties = analyticsData.reduce(
    (sum, item) => sum + item.duties,
    0
  );

  const totalHighRisk = analyticsData.reduce(
    (sum, item) => sum + item.high_risk,
    0
  );

  const avgDuty =
    analyticsData.length > 0
      ? Math.round(totalDuties / analyticsData.length)
      : 0;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Reports & Analytics
      </h1>

      <p className="text-gray-500 mb-6">
        Trade insights and reports.
      </p>

      <div className="mb-6">
        <select className="border rounded-lg px-4 py-2 bg-white">
          <option>Last 6 Months</option>
        </select>
      </div>

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
                ₹{totalDuties.toLocaleString()}
              </h3>
            </div>

            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">
                Average Duty
              </p>

              <h3 className="text-2xl font-bold mt-2">
                ₹{avgDuty.toLocaleString()}
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

          <ResponsiveContainer
            width="100%"
            height={300}
          >

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

          <ResponsiveContainer
            width="100%"
            height={300}
          >

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

          <ResponsiveContainer
            width="100%"
            height={300}
          >

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