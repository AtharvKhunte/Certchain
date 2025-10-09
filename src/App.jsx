import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import StudentPanel from "./components/StudentPanel";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Certificate Registry DApp</h1>

        <nav className="text-center mb-6">
          <Link className="text-blue-500 hover:underline mx-2" to="/admin">Admin Panel</Link>|
          <Link className="text-blue-500 hover:underline mx-2" to="/student">Student Panel</Link>
        </nav>

        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/student" element={<StudentPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
