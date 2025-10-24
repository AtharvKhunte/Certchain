// src/pages/CertificateVerification.jsx
import React, { useState } from "react";
import { initContract, hashText } from "../utils/web3";
import { getFileHash } from "../utils/hash";

const CertificateVerification = () => {
  const [certInput, setCertInput] = useState("");
  const [file, setFile] = useState(null);
  const [certHash, setCertHash] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTextChange = (e) => {
    const value = e.target.value.trim();
    setCertInput(value);
    if (value) setCertHash(hashText(value));
    else setCertHash("");
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const hash = await getFileHash(uploadedFile);
      setFile(uploadedFile);
      setCertHash(hash);
      setCertInput("");
    }
  };

  const verifyCertificate = async () => {
    if (!certHash) {
      alert("Enter certificate ID/text or upload file.");
      return;
    }
    setLoading(true);
    setError("");
    setCertificate(null);

    try {
      const contract = await initContract();
      const cert = await contract.getCertificate(certHash);
      setCertificate({
        issuer: cert[0],
        student: cert[1],
        metaURI: cert[2],
        issuedAt: Number(cert[3]),
        revoked: cert[4],
      });
    } catch (err) {
      console.error(err);
      setError("Certificate not found or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">🔍 Verify Certificate (Public)</h2>

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Certificate ID / Text"
          value={certInput}
          onChange={handleTextChange}
          className="border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
        />
        <div className="text-center text-gray-500">OR</div>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
        />
        <button
          onClick={verifyCertificate}
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {certificate && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-700">✅ Certificate Details</h3>
          <p><strong>Issuer:</strong> {certificate.issuer}</p>
          <p><strong>Student:</strong> {certificate.student}</p>
          <p><strong>Meta URI:</strong> {certificate.metaURI || "N/A"}</p>
          <p><strong>Issued At:</strong> {new Date(certificate.issuedAt * 1000).toLocaleString()}</p>
          <p>
            <strong>Status:</strong>{" "}
            {certificate.revoked ? <span className="text-red-500">Revoked ❌</span> :
            <span className="text-green-600">Valid ✅</span>}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 text-center text-red-600 bg-red-50 p-3 rounded">{error}</div>
      )}

      {certHash && (
        <p className="mt-6 text-xs text-gray-500 break-all"><strong>Hash:</strong> {certHash}</p>
      )}
    </div>
  );
};

export default CertificateVerification;
