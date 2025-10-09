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
    setCertInput(e.target.value);
    setCertHash(hashText(e.target.value));
  };

  const issueCertificate = async () => {
    try {
      const contract = await initContract();
      const tx = await contract.issueCertificate(student, certHash, metaURI);
      await tx.wait();
      alert("Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      alert("Error issuing certificate");
    }
  };

  const revokeCertificate = async () => {
    try {
      const contract = await initContract();
      const tx = await contract.revokeCertificate(certHash);
      await tx.wait();
      alert("Certificate revoked successfully!");
    } catch (err) {
      console.error(err);
      alert("Error revoking certificate");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Panel</h2>

      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="Student Address"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      />

      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="Certificate Name/ID"
        value={certInput}
        onChange={handleTextChange}
      />

      <input
        className="mb-3"
        type="file"
        onChange={handleFileChange}
      />

      <input
        className="border p-2 mb-3 w-full rounded"
        placeholder="Meta URI"
        value={metaURI}
        onChange={(e) => setMetaURI(e.target.value)}
      />

      <div className="flex gap-4 mb-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={issueCertificate}
        >
          Issue Certificate
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={revokeCertificate}
        >
          Revoke Certificate
        </button>
      </div>

      <p className="mt-4 font-mono">Current Certificate Hash: {certHash}</p>
    </div>
  );
};

export default AdminPanel;
