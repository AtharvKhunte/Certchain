// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, GraduationCap, FileCheck } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const links = [
    { to: "/", label: "Home", icon: <Home size={16} /> },
    { to: "/admin", label: "Admin Panel", icon: <User size={16} /> },
    { to: "/student", label: "Student Panel", icon: <GraduationCap size={16} /> },
    { to: "/verify", label: "Verify", icon: <FileCheck size={16} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="px-6 py-4 border-b flex items-center gap-2 text-indigo-600 font-semibold">
        CertifyChain
      </div>
      <nav className="flex-1 px-3 py-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
              location.pathname === link.to ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50"
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
