// src/pages/StudentPanel.jsx
import React, { useState, useEffect } from "react";
import { initContract } from "../utils/web3";

const StudentPanel = () => {
  const [studentAddress, setStudentAddress] = useState(""); // input for student address
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCertificates = async () => {
    if (!studentAddress) {
      alert("Please enter a student wallet address.");
      return;
    }

    setLoading(true);
    setError("");
    setCertificates([]);

    try {
      const contract = await initContract();

      // Get all certificate hashes for this student
      const certHashes = await contract.getStudentCertificates(studentAddress);

      const certs = [];
      for (let hash of certHashes) {
        const cert = await contract.getCertificate(hash);
        certs.push({
          hash,
          issuer: cert[0],
          student: cert[1],
          metaURI: cert[2],
          issuedAt: Number(cert[3]),
          revoked: cert[4],
        });
      }

      setCertificates(certs);
    } catch (err) {
      console.error("Error fetching certificates:", err);
      setError("Unable to fetch certificates. Make sure the address is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Student Panel</h2>

      <input
        type="text"
        placeholder="Enter student wallet address (0x...)"
        value={studentAddress}
        onChange={(e) => setStudentAddress(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
      />

      <button
        onClick={fetchCertificates}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 mb-6"
      >
        {loading ? "Fetching Certificates..." : "Fetch Certificates"}
      </button>

      {error && (
        <div className="text-red-600 mb-4 p-2 border rounded bg-red-50">{error}</div>
      )}

      {certificates.length > 0 ? (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.hash}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p><strong>Hash:</strong> {cert.hash}</p>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Student:</strong> {cert.student}</p>
              <p><strong>Meta URI:</strong> {cert.metaURI || "N/A"}</p>
              <p><strong>Issued At:</strong> {new Date(cert.issuedAt * 1000).toLocaleString()}</p>
              <p>
                <strong>Status:</strong>{" "}
                {cert.revoked ? (
                  <span className="text-red-500 font-medium">Revoked ❌</span>
                ) : (
                  <span className="text-green-600 font-medium">Valid ✅</span>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">{loading ? "" : "No certificates found."}</p>
      )}
    </div>
  );
};

export default StudentPanel;
