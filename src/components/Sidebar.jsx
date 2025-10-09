import React from "react";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-indigo-600 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">CertifyChain</h1>
      <button
        onClick={() => setActivePage("admin")}
        className={`mb-3 py-2 px-4 text-left rounded-lg ${
          activePage === "admin"
            ? "bg-indigo-800"
            : "hover:bg-indigo-700 transition"
        }`}
      >
        🛠 Admin Panel
      </button>
      <button
        onClick={() => setActivePage("student")}
        className={`py-2 px-4 text-left rounded-lg ${
          activePage === "student"
            ? "bg-indigo-800"
            : "hover:bg-indigo-700 transition"
        }`}
      >
        🎓 Student Panel
      </button>
    </div>
  );
};

export default Sidebar;
