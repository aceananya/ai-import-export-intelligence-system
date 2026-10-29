
import { useState } from "react";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL =
  "https://ai-import-export-intelligence-system.onrender.com";

function RiskAssessment() {
  const [clientName, setClientName] = useState("");
  const [country, setCountry] = useState("");
  const [latePayments, setLatePayments] = useState("");
  const [shipmentDelays, setShipmentDelays] = useState("");
  const [complianceIssues, setComplianceIssues] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Try localhost first, then Render.
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

  const calculateRisk = async () => {
    if (
      !clientName.trim() ||
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
        (number) => !Number.isFinite(number) || number < 0
      )
    ) {
      alert("Please enter valid, non-negative numbers.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const params = new URLSearchParams({
        client_name: clientName.trim(),
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
      alert(`Risk Calculation Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">
        Risk Assessment
      </h1>

      <p className="text-gray-500 mb-8">
        AI-powered shipment risk analysis.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">
            Risk Parameters
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              min="0"
              step="1"
              placeholder="Late Payments"
              value={latePayments}
              onChange={(e) => setLatePayments(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              min="0"
              step="1"
              placeholder="Shipment Delays"
              value={shipmentDelays}
              onChange={(e) => setShipmentDelays(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              min="0"
              step="1"
              placeholder="Compliance Issues"
              value={complianceIssues}
              onChange={(e) => setComplianceIssues(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <button
              onClick={calculateRisk}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Calculating..." : "Calculate Risk"}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">
            Risk Result
          </h2>

          {result ? (
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <span>Client</span>
                <span className="font-medium text-right">
                  {result.client_name ?? clientName}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Country</span>
                <span className="font-medium text-right">
                  {result.country ?? country}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Risk Score</span>
                <span className="font-semibold">
                  {result.risk_score ?? "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Risk Level</span>
                <span className="font-semibold">
                  {result.risk_level ?? "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Recommendation</span>
                <span className="font-semibold text-right max-w-[65%]">
                  {result.recommendation ?? "N/A"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              {loading
                ? "Calculating risk..."
                : "Calculate risk to view result."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RiskAssessment;

