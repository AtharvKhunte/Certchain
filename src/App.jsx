import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import StudentPanel from "./components/StudentPanel";

function App() {
  return (
    <Router>
      <div>
        <h1>Certificate Registry DApp</h1>
        <nav>
          <Link to="/admin">Admin Panel</Link> | <Link to="/student">Student Panel</Link>
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
