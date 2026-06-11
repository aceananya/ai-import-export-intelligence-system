import { useState } from "react";
import { FiSearch, FiTag } from "react-icons/fi";

function HSNClassification() {
  const [product, setProduct] = useState("");
  const [result, setResult] = useState(null);

  const classifyProduct = async () => {
  if (!product) {
    alert("Please enter a product name");
    return;
  }

  try {
    const response = await fetch(
      `https://ai-import-export-intelligence-system.onrender.com/hsn?product=${product}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

console.log(data);


setResult(data);
console.log("Result state:", data);
  } catch (error) {
    console.error(error);
    alert("Classification Failed");
  }
};

  return (
    <div className="p-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-500">
  HSN Classification TEST123
</h1>

        <p className="text-gray-500 mt-2">
          Find and classify products using HSN codes.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter Product Name..."
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            onClick={classifyProduct}
            className="bg-blue-600 text-white px-6 rounded-lg flex items-center gap-2"
          >
            <FiSearch />
            Search
          </button>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <h2 className="text-xl font-semibold mb-6">
          Classification Result
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-sm text-gray-500">
              Product Name
            </label>

            <input
              readOnly
              value={result?.product || ""}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              HSN Code
            </label>

            <input
              readOnly
              value={result?.hsn_code || ""}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Category
            </label>

            <input
              readOnly
              value={result?.category || ""}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Confidence Score
            </label>

            <input
              readOnly
              value={result ? "98%" : ""}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

        </div>

        {result && (
          <div className="mt-6 flex items-center gap-2 text-green-600">
            <FiTag />
            Classification Completed Successfully
          </div>
        )}

      </div>

    </div>
  );
}

export default HSNClassification;