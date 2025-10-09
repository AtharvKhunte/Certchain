// src/components/Topbar.jsx
import React from "react";
import { Menu } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-800">Blockchain Certificate Portal</h2>
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-gray-600 hover:text-indigo-600">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
