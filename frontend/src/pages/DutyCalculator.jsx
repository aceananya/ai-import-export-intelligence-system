import { useState, useEffect } from "react";

function DutyCalculator() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [value, setValue] = useState("");

  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      console.log("Fetching countries...");

const response = await fetch(
  "https://ai-import-export-intelligence-system.onrender.com/countries"
);

console.log(response);

      const data = await response.json();

      setCountries(data);

      if (data.length > 0) {
        setCountry(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDuty = async () => {
    if (!country || !value || !hsnCode) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
  `https://ai-import-export-intelligence-system.onrender.com/duty?country=${country}&hsn_code=${hsnCode}&value=${value}`,
  {
    method: "POST",
  }
);
console.log(data);
alert(JSON.stringify(data));

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Calculation Failed");
    }
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

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Destination Country
              </label>

              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                {countries.map((c, index) => (
                  <option key={index}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Product Value
              </label>

              <input
                type="number"
                value={value}
                onChange={(e) =>
                  setValue(e.target.value)
                }
                placeholder="Enter Product Value"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              onClick={calculateDuty}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Calculate Duty
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

              <div className="flex justify-between">
                <span>Country</span>
                <span className="font-semibold">
                  {result.country}
                </span>
              </div>

              <div className="flex justify-between">
                <span>HSN Code</span>
                <span className="font-semibold">
                  {result.hsn_code}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Product</span>
                <span className="font-semibold">
                  {result.product_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Product Value</span>
                <span>
                  ${result.product_value}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Customs Duty</span>
                <span>
                  ${result.customs_duty?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>VAT / GST</span>
                <span>
                  ${result.vat?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Surcharge</span>
                <span>
                  ${result.surcharge?.toFixed(2)}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold text-blue-600">
                <span>Total Duty</span>
                <span>
                  ${result.total_duty?.toFixed(2)}
                </span>
              </div>

            </div>
          ) : (
            <p className="text-gray-500">
              Calculate duty to view results.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default DutyCalculator;