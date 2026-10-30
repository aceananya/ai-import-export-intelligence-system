
import { useState } from "react";

function Invoices() {
  const [invoices] = useState([
    {
      id: "INV-2026-001",
      customer: "ABC Exports",
      email: "abc@gmail.com",
      orderId: "ORD-1001",
      date: "2026-10-12",
      dueDate: "2026-10-27",
      amount: 125000,
      tax: 22500,
      total: 147500,
      status: "Paid",
      paymentMethod: "Bank Transfer",
      items: [
        {
          name: "Cotton Textiles",
          quantity: 500,
          rate: 250,
          amount: 125000,
        },
      ],
    },
    {
      id: "INV-2026-002",
      customer: "Global Trade",
      email: "global@gmail.com",
      orderId: "ORD-1002",
      date: "2026-10-15",
      dueDate: "2026-10-30",
      amount: 85000,
      tax: 15300,
      total: 100300,
      status: "Pending",
      paymentMethod: "Not Paid",
      items: [
        {
          name: "Electronic Components",
          quantity: 200,
          rate: 425,
          amount: 85000,
        },
      ],
    },
    {
      id: "INV-2026-003",
      customer: "Horizon Imports",
      email: "horizon@gmail.com",
      orderId: "ORD-1003",
      date: "2026-09-20",
      dueDate: "2026-10-05",
      amount: 250000,
      tax: 45000,
      total: 295000,
      status: "Overdue",
      paymentMethod: "Not Paid",
      items: [
        {
          name: "Industrial Machinery",
          quantity: 50,
          rate: 5000,
          amount: 250000,
        },
      ],
    },
    {
      id: "INV-2026-004",
      customer: "Prime Logistics",
      email: "prime@gmail.com",
      orderId: "ORD-1004",
      date: "2026-10-21",
      dueDate: "2026-11-05",
      amount: 65000,
      tax: 11700,
      total: 76700,
      status: "Pending",
      paymentMethod: "Not Paid",
      items: [
        {
          name: "Packaging Materials",
          quantity: 1000,
          rate: 65,
          amount: 65000,
        },
      ],
    },
    {
      id: "INV-2026-005",
      customer: "Eastern Supplies",
      email: "eastern@gmail.com",
      orderId: "ORD-1005",
      date: "2026-10-25",
      dueDate: "2026-11-09",
      amount: 175000,
      tax: 31500,
      total: 206500,
      status: "Paid",
      paymentMethod: "Credit Card",
      items: [
        {
          name: "Raw Materials",
          quantity: 300,
          rate: 583.33,
          amount: 175000,
        },
      ],
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Invoice Statistics
  const totalInvoices = invoices.length;

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "Overdue"
  ).length;

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  // Search and Filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(search.toLowerCase()) ||
      invoice.orderId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      invoice.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Status Styling
  const statusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Overdue":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Print Invoice
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="p-8">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold">
        Invoices
      </h1>

      <p className="text-gray-500 mb-8">
        View and manage customer invoices and payments.
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Total Invoices
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalInvoices}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            All generated invoices
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Paid Invoices
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {paidInvoices}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Successfully paid
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Pending Invoices
          </p>

          <h2 className="text-3xl font-bold mt-2 text-yellow-600">
            {pendingInvoices}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Awaiting payment
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Overdue Invoices
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            {overdueInvoices}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Payment deadline passed
          </p>
        </div>

      </div>

      {/* Invoice Overview */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

        <h2 className="text-xl font-semibold">
          Invoice Overview
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Monitor customer billing and payment status.
        </p>

        <div className="mt-5 border-t pt-5">
          <p className="text-gray-500 text-sm">
            Total Invoice Value
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalAmount.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              All Invoices
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Customer billing records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Search invoices..."
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
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b text-gray-500 text-sm">

                <th className="text-left py-3 px-2">
                  Invoice No.
                </th>

                <th className="text-left py-3 px-2">
                  Customer
                </th>

                <th className="text-left py-3 px-2">
                  Order ID
                </th>

                <th className="text-left py-3 px-2">
                  Invoice Date
                </th>

                <th className="text-left py-3 px-2">
                  Due Date
                </th>

                <th className="text-left py-3 px-2">
                  Amount
                </th>

                <th className="text-left py-3 px-2">
                  Status
                </th>

                <th className="text-left py-3 px-2">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (

                  <tr
                    key={invoice.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="py-4 px-2 font-medium">
                      {invoice.id}
                    </td>

                    <td className="px-2">
                      {invoice.customer}
                    </td>

                    <td className="px-2">
                      {invoice.orderId}
                    </td>

                    <td className="px-2">
                      {invoice.date}
                    </td>

                    <td className="px-2">
                      {invoice.dueDate}
                    </td>

                    <td className="px-2 font-medium">
                      ₹{invoice.total.toLocaleString("en-IN")}
                    </td>

                    <td className="px-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(invoice.status)}`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-600 hover:underline"
                      >
                        View Invoice
                      </button>
                    </td>

                  </tr>

                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-gray-500"
                  >
                    No invoices found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">

          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl my-8">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8">

              <div>
                <h2 className="text-2xl font-bold">
                  Invoice
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  SHNOOR Import Export Intelligence
                </p>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-500 text-2xl hover:text-black"
              >
                &times;
              </button>

            </div>

            {/* Invoice Information */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">

              <div>
                <p className="text-gray-500 text-sm mb-2">
                  Billed To
                </p>

                <h3 className="font-semibold">
                  {selectedInvoice.customer}
                </h3>

                <p className="text-gray-500 text-sm">
                  {selectedInvoice.email}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="font-semibold">
                  {selectedInvoice.id}
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  Order: {selectedInvoice.orderId}
                </p>

                <p className="text-gray-500 text-sm">
                  Invoice Date: {selectedInvoice.date}
                </p>

                <p className="text-gray-500 text-sm">
                  Due Date: {selectedInvoice.dueDate}
                </p>
              </div>

            </div>

            {/* Invoice Items */}
            <div className="border rounded-xl overflow-x-auto">

              <table className="w-full min-w-[400px]">

                <thead className="bg-gray-50">
                  <tr className="text-sm text-gray-500">

                    <th className="text-left p-3">
                      Description
                    </th>

                    <th className="text-center p-3">
                      Qty
                    </th>

                    <th className="text-right p-3">
                      Rate
                    </th>

                    <th className="text-right p-3">
                      Amount
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {selectedInvoice.items.map((item, index) => (

                    <tr key={index} className="border-t">

                      <td className="p-3">
                        {item.name}
                      </td>

                      <td className="p-3 text-center">
                        {item.quantity}
                      </td>

                      <td className="p-3 text-right">
                        ₹{item.rate.toLocaleString("en-IN")}
                      </td>

                      <td className="p-3 text-right">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Invoice Summary */}
            <div className="flex justify-end mt-6">

              <div className="w-full sm:w-72 space-y-3">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₹{selectedInvoice.amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>

                  <span>
                    ₹{selectedInvoice.tax.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-3 font-bold text-lg">
                  <span>Total</span>

                  <span>
                    ₹{selectedInvoice.total.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

            </div>

            {/* Payment Status */}
            <div className="mt-6 flex justify-between items-center border-t pt-5">

              <div>
                <p className="text-gray-500 text-sm">
                  Payment Method
                </p>

                <p className="font-medium mt-1">
                  {selectedInvoice.paymentMethod}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${statusStyle(selectedInvoice.status)}`}
              >
                {selectedInvoice.status}
              </span>

            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-8">

              <button
                onClick={printInvoice}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Print Invoice
              </button>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>

            </div>

            <p className="text-center text-xs text-gray-400 mt-5">
              This is a sample invoice for demonstration purposes.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Invoices;
