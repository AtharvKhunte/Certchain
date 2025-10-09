// src/pages/Home.jsx
import React from "react";
import { Shield, GraduationCap, FileSearch } from "lucide-react";

const Home = () => {
  const features = [
    { icon: <Shield size={28} className="text-indigo-600" />, title: "Secure", desc: "On-chain certificate immutability." },
    { icon: <GraduationCap size={28} className="text-indigo-600" />, title: "Issue", desc: "Admins issue certificates in seconds." },
    { icon: <FileSearch size={28} className="text-indigo-600" />, title: "Verify", desc: "Instant verification for anyone." },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Welcome to CertifyChain</h1>
        <p className="text-gray-600 mt-2">A simple on-chain certificate issuance & verification system.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="mb-3 flex justify-center">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
