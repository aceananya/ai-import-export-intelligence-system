
import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "ABC Exports",
      product: "Cotton Textiles",
      date: "2026-10-12",
      quantity: 500,
      amount: 125000,
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      customer: "Global Trade",
      product: "Electronic Components",
      date: "2026-10-15",
      quantity: 200,
      amount: 85000,
      status: "Processing",
    },
    {
      id: "ORD-1003",
      customer: "Horizon Imports",
      product: "Industrial Machinery",
      date: "2026-10-18",
      quantity: 50,
      amount: 250000,
      status: "Pending",
    },
    {
      id: "ORD-1004",
      customer: "Prime Logistics",
      product: "Packaging Materials",
      date: "2026-10-21",
      quantity: 1000,
      amount: 65000,
      status: "Shipped",
    },
    {
      id: "ORD-1005",
      customer: "Eastern Supplies",
      product: "Raw Materials",
      date: "2026-10-25",
      quantity: 300,
      amount: 175000,
      status: "Pending",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Order Statistics
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // Delete Order
  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((previousOrders) =>
        previousOrders.filter((order) => order.id !== id)
      );
    }
  };

  // Search and Filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Status Styling
  const statusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Pending":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold">
        Orders
      </h1>

      <p className="text-gray-500 mb-8">
        Manage and track customer orders.
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Pending Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {pendingOrders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Delivered Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {deliveredOrders}
          </h2>
        </div>

      </div>

      {/* Order Management */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <h2 className="text-xl font-semibold">
          Customer Orders
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          View and track orders placed by customers.
        </p>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <h2 className="text-xl font-semibold">
            All Orders
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b text-gray-500 text-sm">

                <th className="text-left py-3 px-2">
                  Order ID
                </th>

                <th className="text-left py-3 px-2">
                  Customer
                </th>

                <th className="text-left py-3 px-2">
                  Product
                </th>

                <th className="text-left py-3 px-2">
                  Order Date
                </th>

                <th className="text-left py-3 px-2">
                  Quantity
                </th>

                <th className="text-left py-3 px-2">
                  Amount
                </th>

                <th className="text-left py-3 px-2">
                  Status
                </th>

                <th className="text-left py-3 px-2">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4 px-2 font-medium">
                      {order.id}
                    </td>

                    <td className="px-2">
                      {order.customer}
                    </td>

                    <td className="px-2">
                      {order.product}
                    </td>

                    <td className="px-2">
                      {order.date}
                    </td>

                    <td className="px-2">
                      {order.quantity}
                    </td>

                    <td className="px-2 font-medium">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-2">
                      <div className="flex gap-3">

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>

                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>

                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 text-2xl hover:text-black"
              >
                &times;
              </button>

            </div>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Order ID</span>
                <span className="font-medium">{selectedOrder.id}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Customer</span>
                <span className="font-medium">{selectedOrder.customer}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Product</span>
                <span className="font-medium">{selectedOrder.product}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Order Date</span>
                <span className="font-medium">{selectedOrder.date}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Quantity</span>
                <span className="font-medium">{selectedOrder.quantity}</span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-semibold">
                  ₹{selectedOrder.amount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(selectedOrder.status)}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-7 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Orders;

