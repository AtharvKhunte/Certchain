import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminPanel from "../pages/AdminPanel";
import StudentPanel from "../pages/StudentPanel";

const Layout = () => {
  const [activePage, setActivePage] = useState("admin");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-8">
        {activePage === "admin" ? <AdminPanel /> : <StudentPanel />}
      </main>
    </div>
  );
};

export default Layout;
