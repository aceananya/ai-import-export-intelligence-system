
import { useState } from "react";

const LOCAL_URL = "http://127.0.0.1:8000";

const RENDER_URL =
  "https://ai-import-export-intelligence-system.onrender.com";

// Local backend first, Render fallback
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

function RiskAssessment() {
  const [partnerName, setPartnerName] = useState("");
  const [country, setCountry] = useState("");
  const [latePayments, setLatePayments] = useState("");
  const [shipmentDelays, setShipmentDelays] = useState("");
  const [complianceIssues, setComplianceIssues] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateRisk = async () => {
    if (
      !partnerName.trim() ||
      !country.trim() ||
      latePayments === "" ||
      shipmentDelays === "" ||
      complianceIssues === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const numbers = [
      Number(latePayments),
      Number(shipmentDelays),
      Number(complianceIssues),
    ];

    if (
      numbers.some(
        (number) =>
          !Number.isInteger(number) || number < 0
      )
    ) {
      alert("Please enter valid, non-negative whole numbers.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Keep the exact backend parameter names unchanged.
      const params = new URLSearchParams({
        client_name: partnerName.trim(),
        country: country.trim(),
        late_payments: latePayments,
        shipment_delays: shipmentDelays,
        compliance_issues: complianceIssues,
      });

      const response = await fetchWithFallback(
        `/risk?${params.toString()}`,
        { method: "POST" }
      );

      const data = await response.json();

      console.log("Risk assessment response:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      setResult(data);
    } catch (error) {
      console.error("Risk calculation failed:", error);

      alert(
        `Risk Calculation Failed: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyle = (level) => {
    const normalizedLevel = String(level || "").toLowerCase();

    if (normalizedLevel.includes("high")) {
      return "bg-red-100 text-red-700";
    }

    if (normalizedLevel.includes("medium")) {
      return "bg-yellow-100 text-yellow-700";
    }

    if (normalizedLevel.includes("low")) {
      return "bg-green-100 text-green-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-8">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold">
        Trade Risk Assessment
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Evaluate potential trading partners and identify
        possible international trade risks before proceeding
        with a transaction.
      </p>

      {/* Information Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-blue-900">
          Why assess trading partner risk?
        </h2>

        <p className="text-sm text-blue-800 mt-2">
          Review a potential supplier or buyer's previous
          payment delays, shipment disruptions and compliance
          history to make more informed trade decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-xl font-semibold mb-2">
            Trading Partner Details
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter the available history of the company you
            intend to trade with.
          </p>

          <div className="space-y-5">

            {/* Partner Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Trading Partner / Company Name
              </label>

              <input
                type="text"
                placeholder="Enter company name"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Partner's Country
              </label>

              <input
                type="text"
                placeholder="e.g. China, USA, UAE"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Late Payments */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Previous Late Payments
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Number of late payments"
                value={latePayments}
                onChange={(e) => setLatePayments(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-400 mt-1">
                Number of previous delayed payments.
              </p>
            </div>

            {/* Shipment Delays */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Previous Shipment Delays
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Number of delayed shipments"
                value={shipmentDelays}
                onChange={(e) => setShipmentDelays(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-400 mt-1">
                Number of previously delayed shipments.
              </p>
            </div>

            {/* Compliance Issues */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Previous Compliance Issues
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Number of compliance issues"
                value={complianceIssues}
                onChange={(e) => setComplianceIssues(e.target.value)}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-400 mt-1">
                Number of previously reported compliance issues.
              </p>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateRisk}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Analyzing Trade Risk..."
                : "Analyze Trading Partner Risk"}
            </button>

          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-xl font-semibold mb-2">
            Risk Analysis Results
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Your trading partner's risk assessment will
            appear here.
          </p>

          {result ? (

            <div className="space-y-5">

              {/* Partner Information */}
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500">
                  Trading Partner
                </p>

                <h3 className="font-semibold text-lg mt-1">
                  {result.client_name ?? partnerName}
                </h3>

                <p className="text-sm text-gray-500">
                  {result.country ?? country}
                </p>
              </div>

              {/* Risk Score */}
              <div className="bg-slate-50 rounded-xl p-5">

                <p className="text-gray-500 text-sm">
                  Risk Score
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {result.risk_score ?? "N/A"}
                </h2>

                <p className="text-xs text-gray-400 mt-2">
                  As calculated by the risk assessment API.
                </p>

              </div>

              {/* Risk Level */}
              <div className="flex justify-between items-center border-b pb-4">

                <span className="text-gray-600">
                  Risk Level
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getRiskStyle(result.risk_level)}`}
                >
                  {result.risk_level ?? "N/A"}
                </span>

              </div>

              {/* Recommendation */}
              <div className="bg-blue-50 rounded-xl p-5">

                <h3 className="font-semibold text-blue-900 mb-2">
                  AI Recommendation
                </h3>

                <p className="text-sm text-blue-800 leading-relaxed">
                  {result.recommendation ?? "No recommendation available."}
                </p>

              </div>

            </div>

          ) : (

            <div className="flex flex-col items-center justify-center text-center py-16">

              <div className="bg-blue-50 rounded-full p-5 mb-4">
                <span className="text-3xl">🛡️</span>
              </div>

              <h3 className="font-semibold text-gray-700">
                No Assessment Yet
              </h3>

              <p className="text-gray-500 text-sm mt-2 max-w-xs">
                Enter the trading partner's details and
                select Analyze to receive a risk assessment.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-6">
        Risk assessments are based on the information provided.
        Verify trading partner details and official compliance
        requirements independently before making trade decisions.
      </p>

    </div>
  );
}

export default RiskAssessment;


