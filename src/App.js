import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import ReceiptForm from "./components/ReceiptForm";
import FeesPage from "./components/FeesPage";

import "./App.css";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Router>
      <div className="app">
        <header className="hero">
          <div className="hero-inner">
            <h1>Dream Tuition</h1>
            <p className="subtitle">manage students easily</p>
          </div>

          {/* 🌐 Navbar */}
          <nav className="navbar">
            <h2 className="navbar-title"></h2>

            {/* Hamburger Icon for Mobile */}
            <button className="menu-toggle" onClick={toggleDrawer}>
              {drawerOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Desktop Links */}
            <div className="navbar-links">
              <Link to="/" onClick={closeDrawer}>
                Home
              </Link>
              <Link to="/add-student" onClick={closeDrawer}>
                Add Student
              </Link>
              <Link to="/students" onClick={closeDrawer}>
                Student List
              </Link>
              <Link to="/receipt" onClick={closeDrawer}>
                Receipt
              </Link>
              <Link to="/fees" onClick={closeDrawer}>
              Fees
              </Link>

            </div>
          </nav>
        </header>

        {/* 🧭 Drawer (for Mobile) */}
        <div className={`drawer ${drawerOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeDrawer}>🏠 Home</Link>
          <Link to="/add-student" onClick={closeDrawer}>➕ Add Student</Link>
          <Link to="/students" onClick={closeDrawer}>📋 Student List</Link>
          <Link to="/receipt" onClick={closeDrawer}>🧾 Receipt</Link>
          <Link to="/fees" onClick={closeDrawer}>Fees</Link>

        </div>

        {/* Overlay for mobile when drawer is open */}
        {drawerOpen && <div className="overlay" onClick={closeDrawer}></div>}

        {/* 🌈 Page Content */}
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/receipt" element={<ReceiptForm />} />
            <Route path="/fees" element={<FeesPage />} />

          </Routes>
        </main>

        <footer className="footer">
          <small>
            📍 Address: Door No 50, 1st floor, Pachaiyapan Nagar, 1st street,
            Rakkiyapalayam pirvu, Tiruppur - 641606
          </small>
          <br />
          <small>📞 Mobile: 8110054961</small>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="homepage">
      <h2>Welcome to Dream Tuition Center</h2>
      <p>Select a page from the navigation bar to continue.</p>

      <img
        src="https://t3.ftcdn.net/jpg/12/94/01/34/240_F_1294013479_9TS0PUzsTSRBGofEYeHkDpEShO7gJccC.jpg"
        alt="Dream Tuition Center"
      />
    </div>
  );
}
