import React, { useState } from "react";
import { initContract, hashText } from "../utils/web3";
import { getFileHash } from "../utils/hash";

const StudentPanel = () => {
  const [certInput, setCertInput] = useState("");
  const [file, setFile] = useState(null);
  const [certHash, setCertHash] = useState("");
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const hash = await getFileHash(uploadedFile);
      setFile(uploadedFile);
      setCertHash(hash);
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCertInput(value);
    setCertHash(hashText(value));
  };

  const checkCertificate = async () => {
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
      alert("❌ Certificate not found");
      setCertificate(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Student Panel</h2>

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Certificate Name or ID"
        value={certInput}
        onChange={handleTextChange}
      />

      <input
        type="file"
        className="border p-2 w-full mb-3 rounded"
        onChange={handleFileChange}
      />

      <button
        onClick={checkCertificate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Check Certificate
      </button>

      {certificate && (
        <div className="mt-4 text-gray-700">
          <p><strong>Issuer:</strong> {certificate.issuer}</p>
          <p><strong>Student:</strong> {certificate.student}</p>
          <p><strong>Meta URI:</strong> {certificate.metaURI}</p>
          <p>
            <strong>Issued At:</strong>{" "}
            {new Date(certificate.issuedAt * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {certificate.revoked ? "❌ Revoked" : "✅ Valid"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentPanel;
