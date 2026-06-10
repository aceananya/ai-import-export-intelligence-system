import { useState, useEffect } from "react";

import {
  FiUpload,
  FiFileText,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiX,
} from "react-icons/fi";

function Documents() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

const fetchDocuments = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/documents"
    );

    const data = await response.json();

    setDocuments(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchDocuments();
}, []);
  const viewDocument = (doc) => {
  alert(
    `File: ${doc.filename}
Document Type: ${doc.document_type || "Commercial Invoice"}
Invoice Number: ${doc.invoice_number || "INV-2025-001"}
Exporter: ${doc.exporter || "ABC Exports Pvt Ltd"}
Confidence: ${doc.confidence || "98%"}
Status: ${doc.status}`
  );
};

const downloadDocument = (doc) => {
  alert(`Downloading ${doc.filename}`);
};

const editDocument = (doc) => {
  const newFilename = prompt(
    "Enter new filename",
    doc.filename
  );

  if (!newFilename) return;

  setDocuments(
    documents.map((d) =>
      d.id === doc.id
        ? { ...d, filename: newFilename }
        : d
    )
  );
};

const deleteDocument = (id) => {
  if (
    window.confirm(
      "Delete this document?"
    )
  ) {
    setDocuments(
      documents.filter(
        (doc) => doc.id !== id
      )
    );
  }
};

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/documents",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      alert("File Uploaded Successfully");

      setSelectedFile(null);

document.getElementById("fileInput").value = "";

fetchDocuments();
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);

    document.getElementById("fileInput").value = "";
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
            onChange={(e) =>
              setSelectedFile(e.target.files[0])
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

  {documents.map((doc) => (

    <tr
      key={doc.id}
      className="border-b"
    >

      <td className="py-4 flex items-center gap-2">
        <FiFileText />
        {doc.filename}
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
    {doc.status}
  </span>
</td>

      <td>
        <div className="flex gap-4">

          <FiEye
  onClick={() => viewDocument(doc)}
  className="cursor-pointer text-blue-600"
/>

<FiDownload
  onClick={() => downloadDocument(doc)}
  className="cursor-pointer text-green-600"
/>

<FiEdit
  onClick={() => editDocument(doc)}
  className="cursor-pointer text-yellow-500"
/>

<FiTrash2
  onClick={() => deleteDocument(doc.id)}
  className="cursor-pointer text-red-600"
/>

        </div>
      </td>

    </tr>

  ))}

</tbody>

        </table>

      </div>

    </div>
  );
}

export default Documents;