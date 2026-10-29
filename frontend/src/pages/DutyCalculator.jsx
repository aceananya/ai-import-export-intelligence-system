
import { useState, useEffect } from "react";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL =
  "https://ai-import-export-intelligence-system.onrender.com";

function DutyCalculator() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [calculating, setCalculating] = useState(false);

  // Try the local backend first, then Render.
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

  // Fetch available countries.
  const fetchCountries = async () => {
    setLoadingCountries(true);

    try {
      const response = await fetchWithFallback("/countries");
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected countries response from backend.");
      }

      setCountries(data);

      if (data.length > 0) {
        setCountry((currentCountry) => currentCountry || data[0]);
      } else {
        setCountry("");
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
      alert("Could not load countries. Please check the backend.");
    } finally {
      setLoadingCountries(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Calculate customs duty.
  const calculateDuty = async () => {
    if (!country || !value.trim() || !hsnCode.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      alert("Please enter a valid product value greater than zero.");
      return;
    }

    setCalculating(true);
    setResult(null);

    try {
      const params = new URLSearchParams({
        country,
        hsn_code: hsnCode.trim(),
        value: String(numericValue),
      });

      const response = await fetchWithFallback(
        `/duty?${params.toString()}`,
        { method: "POST" }
      );

      const data = await response.json();

      console.log("Duty calculation response:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      setResult(data);
    } catch (error) {
      console.error("Duty calculation failed:", error);
      alert(`Calculation failed: ${error.message}`);
    } finally {
      setCalculating(false);
    }
  };

  // Format amounts safely.
  const formatAmount = (amount) => {
    const numericAmount = Number(amount);

    return Number.isFinite(numericAmount)
      ? `$${numericAmount.toFixed(2)}`
      : "N/A";
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-2">
        Duty Calculator
      </h1>

      <p className="text-gray-500 mb-8">
        Calculate customs duty using HSN Code.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">
            Parameters
          </h2>

          <div className="space-y-5">
            {/* Destination Country */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Destination Country
              </label>

              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={loadingCountries || countries.length === 0}
                className="w-full border rounded-lg p-3"
              >
                {countries.length === 0 && (
                  <option value="">
                    {loadingCountries
                      ? "Loading countries..."
                      : "No countries available"}
                  </option>
                )}

                {countries.map((c, index) => (
                  <option key={`${c}-${index}`} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {!loadingCountries && countries.length === 0 && (
                <button
                  type="button"
                  onClick={fetchCountries}
                  className="text-blue-600 text-sm mt-2"
                >
                  Retry loading countries
                </button>
              )}
            </div>

            {/* HSN Code */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                HSN Code
              </label>

              <input
                type="text"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
                placeholder="Enter HSN Code"
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Product Value */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Product Value
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Product Value"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              onClick={calculateDuty}
              disabled={calculating || !country || countries.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {calculating ? "Calculating..." : "Calculate Duty"}
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">
            Duty Result
          </h2>

          {result ? (
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <span>Country</span>
                <span className="font-semibold text-right">
                  {result.country ?? country}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>HSN Code</span>
                <span className="font-semibold text-right">
                  {result.hsn_code ?? hsnCode}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Product</span>
                <span className="font-semibold text-right">
                  {result.product_name ?? "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Product Value</span>
                <span>{formatAmount(result.product_value)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Customs Duty</span>
                <span>{formatAmount(result.customs_duty)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>VAT / GST</span>
                <span>{formatAmount(result.vat)}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Surcharge</span>
                <span>{formatAmount(result.surcharge)}</span>
              </div>

              <hr />

              <div className="flex justify-between gap-4 text-2xl font-bold text-blue-600">
                <span>Total Duty</span>
                <span>
                  {formatAmount(result.total_duty)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              {calculating
                ? "Calculating customs duty..."
                : "Calculate duty to view results."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DutyCalculator;
