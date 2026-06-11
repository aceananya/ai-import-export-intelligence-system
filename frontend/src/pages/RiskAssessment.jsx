import { useState } from "react";

function RiskAssessment() {

const [clientName, setClientName] = useState("");
const [country, setCountry] = useState("");
const [latePayments, setLatePayments] = useState("");
const [shipmentDelays, setShipmentDelays] = useState("");
const [complianceIssues, setComplianceIssues] = useState("");

const [result, setResult] = useState(null);

const calculateRisk = async () => {

if (
  !clientName ||
  !country ||
  latePayments === "" ||
  shipmentDelays === "" ||
  complianceIssues === ""
) {
  alert("Please fill all fields");
  return;
}

try {

  const response = await fetch(
    `https://ai-import-export-intelligence-system.onrender.com/risk?client_name=${clientName}&country=${country}&late_payments=${latePayments}&shipment_delays=${shipmentDelays}&compliance_issues=${complianceIssues}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  setResult(data);

} catch (error) {
  console.error(error);
  alert("Risk Calculation Failed");
}


};

return ( <div className="p-10">


  <h1 className="text-3xl font-bold mb-2">
    Risk Assessment
  </h1>

  <p className="text-gray-500 mb-8">
    AI-powered shipment risk analysis.
  </p>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

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
          placeholder="Late Payments"
          value={latePayments}
          onChange={(e) => setLatePayments(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Shipment Delays"
          value={shipmentDelays}
          onChange={(e) => setShipmentDelays(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Compliance Issues"
          value={complianceIssues}
          onChange={(e) => setComplianceIssues(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={calculateRisk}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Calculate Risk
        </button>

      </div>

    </div>

    <div className="bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-xl font-semibold mb-6">
        Risk Result
      </h2>

      {result ? (

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Client</span>
            <span>{result.client_name}</span>
          </div>

          <div className="flex justify-between">
            <span>Country</span>
            <span>{result.country}</span>
          </div>

          <div className="flex justify-between">
            <span>Risk Score</span>
            <span>{result.risk_score}</span>
          </div>

          <div className="flex justify-between">
            <span>Risk Level</span>
            <span className="font-semibold">
              {result.risk_level}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Recommendation</span>
            <span className="font-semibold">
              {result.recommendation}
            </span>
          </div>

        </div>

      ) : (

        <p className="text-gray-500">
          Calculate risk to view result.
        </p>

      )}

    </div>

  </div>

</div>


);
}

export default RiskAssessment;
