import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import StudentPanel from "./pages/StudentPanel";
import CertificateVerification from "./pages/CertificateVerification";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
        <Route path="/student" element={<Layout><StudentPanel /></Layout>} />
        <Route path="/verify" element={<Layout><CertificateVerification /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
