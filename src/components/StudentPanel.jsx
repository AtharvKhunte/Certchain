import React, { useState } from "react";
import { initContract, hashText } from "../utils/web3";
import { getFileHash } from "../utils/hash";

const StudentPanel = () => {
  const [certInput, setCertInput] = useState("");
  const [file, setFile] = useState(null);
  const [certHash, setCertHash] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const hash = await getFileHash(uploadedFile);
      setFile(uploadedFile);
      setCertHash(hash);
    }
  };

  const handleTextChange = (e) => {
    setCertInput(e.target.value);
    setCertHash(hashText(e.target.value));
  };

  const checkCertificate = async () => {
    if (!certHash) {
      alert("Please enter or upload a certificate to check.");
      return;
    }

    try {
      setLoading(true);
      const contract = await initContract();
      const cert = await contract.getCertificate(certHash);
      setCertificate(cert);
    } catch (err) {
      console.error(err);
      alert("Certificate not found or invalid hash");
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
        🎓 Student Certificate Verification
      </h2>

      <div className="space-y-4">
        <input
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Enter Certificate Name/ID"
          value={certInput}
          onChange={handleTextChange}
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
        />

        <button
          onClick={checkCertificate}
          disabled={loading}
          className={`w-full mt-4 py-3 text-white font-semibold rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Checking..." : "Check Certificate"}
        </button>

        {certHash && (
          <p className="mt-3 text-sm text-gray-500 break-all">
            <strong>Current Certificate Hash:</strong> {certHash}
          </p>
        )}

        {certificate && (
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📄 Certificate Details</h3>
            <p><strong>Issuer:</strong> {certificate.issuer}</p>
            <p><strong>Student:</strong> {certificate.student}</p>
            <p><strong>Meta URI:</strong> {certificate.metaURI}</p>
            <p>
              <strong>Issued At:</strong>{" "}
              {new Date(Number(certificate.issuedAt.toString()) * 1000).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {certificate.revoked ? (
                <span className="text-red-600 font-semibold">Revoked ❌</span>
              ) : (
                <span className="text-green-600 font-semibold">Valid ✅</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPanel;
