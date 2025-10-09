// src/pages/AdminPanel.jsx
import React, { useState } from "react";
import { initContract, hashText, isAddress } from "../utils/web3";
import { getFileHash } from "../utils/hash";

const AdminPanel = () => {
  const [student, setStudent] = useState("");
  const [certInput, setCertInput] = useState("");
  const [metaURI, setMetaURI] = useState("");
  const [certHash, setCertHash] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    const hash = await getFileHash(uploadedFile);
    setCertHash(hash);
    setCertInput(""); // clear input if file provided
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCertInput(value);
    setCertHash(hashText(value));
  };

  const issueCertificate = async () => {
    if (!isAddress(student)) {
      alert("Please enter a valid Ethereum address for the student.");
      return;
    }
    if (!certHash) {
      alert("Please provide certificate text or upload a file to compute the hash.");
      return;
    }

    try {
      setLoading(true);
      const contract = await initContract();
      const tx = await contract.issueCertificate(student, certHash, metaURI || "");
      await tx.wait();
      alert("✅ Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error issuing certificate. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const revokeCertificate = async () => {
    if (!certHash) {
      alert("Provide a certificate hash to revoke.");
      return;
    }
    try {
      setLoading(true);
      const contract = await initContract();
      const tx = await contract.revokeCertificate(certHash);
      await tx.wait();
      alert("🚫 Certificate revoked.");
    } catch (err) {
      console.error(err);
      alert("❌ Error revoking certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>

      <input className="w-full p-3 mb-3 border rounded" placeholder="Student wallet address (0x...)" value={student} onChange={(e) => setStudent(e.target.value)} />

      <input className="w-full p-3 mb-3 border rounded" placeholder="Certificate text / ID (or upload file below)" value={certInput} onChange={handleTextChange} />

      <input type="file" className="w-full mb-3" onChange={handleFileChange} />

      <input className="w-full p-3 mb-3 border rounded" placeholder="Meta URI (optional)" value={metaURI} onChange={(e) => setMetaURI(e.target.value)} />

      <p className="text-sm text-gray-600 break-all mb-4"><strong>Current Hash:</strong> {certHash || "(none)"}</p>

      <div className="flex gap-3">
        <button disabled={loading} onClick={issueCertificate} className="flex-1 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">Issue Certificate</button>
        <button disabled={loading} onClick={revokeCertificate} className="flex-1 bg-red-600 text-white py-3 rounded hover:bg-red-700">Revoke</button>
      </div>
    </div>
  );
};

export default AdminPanel;
