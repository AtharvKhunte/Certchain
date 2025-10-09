// src/pages/StudentPanel.jsx
import React, { useState } from "react";
import { initContract, hashText } from "../utils/web3";
import { getFileHash } from "../utils/hash";

const StudentPanel = () => {
  const [certInput, setCertInput] = useState("");
  const [certHash, setCertHash] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCertInput(value);
    setCertHash(hashText(value));
  };

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    const hash = await getFileHash(uploadedFile);
    setCertHash(hash);
    setCertInput("");
  };

  const checkCertificate = async () => {
    if (!certHash) {
      alert("Enter certificate text or upload a certificate file.");
      return;
    }
    try {
      setLoading(true);
      const contract = await initContract();
      const cert = await contract.getCertificate(certHash);
      // cert returns a tuple: (issuer, student, metaURI, issuedAt, revoked)
      const issuedAtRaw = cert.issuedAt;
      // convert BigNumber/BigInt to Number safely
      const issuedAtNumber = Number(issuedAtRaw.toString());
      setCertificate({
        issuer: cert.issuer ?? cert[0],
        student: cert.student ?? cert[1],
        metaURI: cert.metaURI ?? cert[2],
        issuedAt: issuedAtNumber,
        revoked: cert.revoked ?? cert[4],
      });
    } catch (err) {
      console.error(err);
      alert("Certificate not found or invalid hash.");
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Student Panel</h2>

      <input className="w-full p-3 mb-3 border rounded" placeholder="Certificate text/ID" value={certInput} onChange={handleTextChange} />
      <input type="file" className="w-full mb-3" onChange={handleFileChange} />

      <button onClick={checkCertificate} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">
        {loading ? "Checking..." : "Check Certificate"}
      </button>

      {certificate && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <p><strong>Issuer:</strong> {certificate.issuer}</p>
          <p><strong>Student:</strong> {certificate.student}</p>
          <p><strong>Meta URI:</strong> {certificate.metaURI}</p>
          <p><strong>Issued At:</strong> {new Date(certificate.issuedAt * 1000).toLocaleString()}</p>
          <p><strong>Status:</strong> {certificate.revoked ? "Revoked" : "Valid"}</p>
        </div>
      )}
    </div>
  );
};

export default StudentPanel;
