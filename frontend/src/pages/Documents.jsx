
import { useState, useEffect } from "react";
import {
  FiUpload,
  FiFileText,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiTag,
} from "react-icons/fi";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL =
  "https://ai-import-export-intelligence-system.onrender.com";

function Documents() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

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

  // Fetch uploaded documents.
  const fetchDocuments = async () => {
    try {
      const response = await fetchWithFallback("/documents");
      const data = await response.json();

      setDocuments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // View document details.
  const viewDocument = (doc) => {
    alert(
      `File: ${doc.filename}
Document Type: ${doc.document_type || "Commercial Invoice"}
Invoice Number: ${doc.invoice_number || "INV-2025-001"}
Exporter: ${doc.exporter || "ABC Exports Pvt Ltd"}
Confidence: ${doc.confidence || "98%"}
Status: ${doc.status || "Uploaded"}`
    );
  };

  // Download placeholder.
  const downloadDocument = (doc) => {
    alert(`Downloading ${doc.filename}`);
  };

  // Edit filename in the current UI.
  const editDocument = (doc) => {
    const newFilename = prompt("Enter new filename", doc.filename);

    if (!newFilename || !newFilename.trim()) return;

    setDocuments((currentDocuments) =>
      currentDocuments.map((d) =>
        d.id === doc.id
          ? { ...d, filename: newFilename.trim() }
          : d
      )
    );
  };

  // Delete from the current UI only.
  const deleteDocument = (id) => {
    if (window.confirm("Remove this document from the displayed list?")) {
      setDocuments((currentDocuments) =>
        currentDocuments.filter((doc) => doc.id !== id)
      );
    }
  };

  // Upload a document.
  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetchWithFallback("/documents", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Upload response:", data);

      alert("File uploaded successfully!");

      setSelectedFile(null);

      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";

      await fetchDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);

    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Document Intelligence
        </h1>

        <p className="text-gray-500 mt-2">
          Upload and process import-export documents.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <FiUpload
            size={40}
            className="mx-auto text-blue-600 mb-4"
          />

          <h2 className="text-xl font-semibold">
            Upload Documents
          </h2>

          <p className="text-gray-500 mt-2">
            Invoice, Packing List, Bill of Lading, Certificate of Origin
          </p>

          <input
            id="fileInput"
            type="file"
            hidden
            accept=".pdf,.jpg,.jpeg,.png,.docx"
            onChange={(e) =>
              setSelectedFile(e.target.files?.[0] || null)
            }
          />

          <label
            htmlFor="fileInput"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer"
          >
            Select File
          </label>

          {selectedFile && (
            <div className="mt-6">
              <p className="text-green-600 font-medium">
                Selected: {selectedFile.name}
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={uploadFile}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Upload
                </button>

                <button
                  onClick={removeFile}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-400 mt-4">
            Supported Formats: PDF, JPG, PNG, DOCX
          </p>
        </div>
      </div>

      {/* Extracted Information */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <h2 className="text-xl font-semibold mb-6">
          Extracted Information
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">
              Invoice Number
            </label>
            <input
              value="INV-2026-001"
              readOnly
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Exporter
            </label>
            <input
              value="ABC Exports Pvt Ltd"
              readOnly
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Importer
            </label>
            <input
              value="Global Trade LLC"
              readOnly
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Product
            </label>
            <input
              value="Electronic Gadgets"
              readOnly
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6">
          Uploaded Documents
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">File Name</th>
                <th className="text-left py-3">Document Type</th>
                <th className="text-left py-3">Invoice No.</th>
                <th className="text-left py-3">Exporter</th>
                <th className="text-left py-3">Confidence</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={doc.id ?? doc.filename ?? index}
                  className="border-b"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <FiFileText />
                      {doc.filename}
                    </div>
                  </td>

                  <td>
                    {doc.document_type || "Commercial Invoice"}
                  </td>

                  <td>
                    {doc.invoice_number || "INV-2025-001"}
                  </td>

                  <td>
                    {doc.exporter || "ABC Exports Pvt Ltd"}
                  </td>

                  <td>
                    <span className="text-blue-600 font-medium">
                      {doc.confidence || "98%"}
                    </span>
                  </td>

                  <td>
                    <span className="text-green-600">
                      {doc.status || "Uploaded"}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        title="View document"
                        onClick={() => viewDocument(doc)}
                        className="text-blue-600"
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        title="Download document"
                        onClick={() => downloadDocument(doc)}
                        className="text-green-600"
                      >
                        <FiDownload />
                      </button>

                      <button
                        type="button"
                        title="Edit filename"
                        onClick={() => editDocument(doc)}
                        className="text-yellow-500"
                      >
                        <FiEdit />
                      </button>

                      <button
                        type="button"
                        title="Remove document from list"
                        onClick={() => deleteDocument(doc.id)}
                        className="text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {documents.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-8 text-center text-gray-500"
                  >
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Documents;
