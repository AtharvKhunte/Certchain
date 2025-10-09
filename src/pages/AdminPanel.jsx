import React, { useState } from "react";
import { initContract, hashText } from "../utils/web3";
import { getFileHash } from "../utils/hash";

const AdminPanel = () => {
  const [student, setStudent] = useState("");
  const [certInput, setCertInput] = useState("");
  const [file, setFile] = useState(null);
  const [metaURI, setMetaURI] = useState("");
  const [certHash, setCertHash] = useState("");

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

  const issueCertificate = async () => {
    try {
      const contract = await initContract();
      const tx = await contract.issueCertificate(student, certHash, metaURI);
      await tx.wait();
      alert("✅ Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error issuing certificate");
    }
  };

  const revokeCertificate = async () => {
    try {
      const contract = await initContract();
      const tx = await contract.revokeCertificate(certHash);
      await tx.wait();
      alert("🚫 Certificate revoked successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error revoking certificate");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Student Wallet Address"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      />

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

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Meta URI (IPFS link or metadata)"
        value={metaURI}
        onChange={(e) => setMetaURI(e.target.value)}
      />

      <div className="flex justify-between">
        <button
          onClick={issueCertificate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Issue Certificate
        </button>
        <button
          onClick={revokeCertificate}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Revoke
        </button>
      </div>

      {certHash && (
        <p className="text-gray-600 text-sm mt-4 break-all">
          <strong>Certificate Hash:</strong> {certHash}
        </p>
      )}
    </div>
  );
};

export default AdminPanel;
