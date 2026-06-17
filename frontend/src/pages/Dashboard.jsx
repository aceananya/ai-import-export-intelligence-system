import {
  FiFileText,
  FiTruck,
  FiDollarSign,
  FiAlertTriangle,
  FiTag,
  FiShield,
  FiSearch,
  FiBell,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const cards = [
    {
      title: "Total Documents",
      value: "1,248",
      icon: <FiFileText />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Shipments",
      value: "532",
      icon: <FiTruck />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Duty Calculated",
      value: "₹2.45 Cr",
      icon: <FiDollarSign />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "High Risk Clients",
      value: "24",
      icon: <FiAlertTriangle />,
      color: "bg-red-100 text-red-600",
    },
  ];

  const shipmentData = [
    { month: "Jan", shipments: 35 },
    { month: "Feb", shipments: 48 },
    { month: "Mar", shipments: 62 },
    { month: "Apr", shipments: 58 },
    { month: "May", shipments: 76 },
    { month: "Jun", shipments: 91 },
  ];

  return (
    <div className="p-4 md:p-10">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-12">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back, Administrator
          </h1>

          <p className="text-gray-500 mt-1">
            Here's your import-export overview.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Search shipments, clients..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 bg-white"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <FiSearch />
              Search
            </button>

          </div>

          <button className="relative">
            <FiBell className="text-2xl text-slate-600" />

            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-sm">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                SHNOOR International
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
              A
            </div>
          </div>

        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${card.color}`}
            >
              {card.icon}
            </div>

            <p className="text-gray-500 mt-4 text-sm">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>

            <p className="text-green-600 text-sm mt-2">
              +12.5% from last month
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Shipment Overview
            </h2>

            <select className="border rounded-lg px-3 py-1">
              <option>This Month</option>
            </select>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={shipmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="shipments"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Recent Activity
            </h2>

            <button className="text-blue-600">
              View All
            </button>
          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <FiFileText className="text-blue-600" />
              <span>Document extracted successfully</span>
            </div>

            <div className="flex items-center gap-3">
              <FiTag className="text-orange-500" />
              <span>HSN Classification completed</span>
            </div>

            <div className="flex items-center gap-3">
              <FiDollarSign className="text-yellow-500" />
              <span>Duty calculated for shipment</span>
            </div>

            <div className="flex items-center gap-3">
              <FiTruck className="text-green-600" />
              <span>Shipment updated to In Transit</span>
            </div>

            <div className="flex items-center gap-3">
              <FiShield className="text-red-500" />
              <span>Risk score updated</span>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Recent Shipments
          </h2>

          <button className="text-blue-600">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Shipment ID</th>
              <th className="text-left py-3">Client</th>
              <th className="text-left py-3">Destination</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4">SHP001</td>
              <td>ABC Exports</td>
              <td>USA</td>
              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Delivered
                </span>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-4">SHP002</td>
              <td>Global Trade</td>
              <td>UAE</td>
              <td>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  In Transit
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-4">SHP003</td>
              <td>Skyline Imports</td>
              <td>UK</td>
              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Customs
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>

      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">
            Risk Distribution
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Low Risk</span>
                <span>60%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-green-500 h-3 rounded-full w-[60%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Medium Risk</span>
                <span>25%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-yellow-500 h-3 rounded-full w-[25%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>High Risk</span>
                <span>15%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-red-500 h-3 rounded-full w-[15%]" />
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Top Trade Lanes
          </h2>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>India → USA</span>
                <span>42%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-blue-600 h-3 rounded-full w-[42%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>India → UAE</span>
                <span>18%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-green-500 h-3 rounded-full w-[18%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>India → UK</span>
                <span>15%</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div className="bg-yellow-500 h-3 rounded-full w-[15%]" />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;