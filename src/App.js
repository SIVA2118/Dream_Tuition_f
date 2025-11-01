import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import ReceiptForm from './components/ReceiptForm';

export default function App() {
  return (
    <Router>
      <div className="app">
        <header className="hero">
          <div className="hero-inner">
            <h1>Dream Tuition Center</h1>
            <p className="subtitle">Create receipts & manage students easily</p>
          </div>

          {/* ✅ Navigation Bar */}
          <nav className="navbar" style={{
            background: '#333', padding: '10px', display: 'flex',
            justifyContent: 'center', gap: '20px'
          }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            <Link to="/add-student" style={{ color: '#fff', textDecoration: 'none' }}>Add Student</Link>
            <Link to="/students" style={{ color: '#fff', textDecoration: 'none' }}>Student List</Link>
            <Link to="/receipt" style={{ color: '#fff', textDecoration: 'none' }}>Receipt</Link>
          </nav>
        </header>

        <main className="container" style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/receipt" element={<ReceiptForm />} />
          </Routes>
        </main>

        <footer className="footer" style={{
          background: '#222', color: '#fff',
          textAlign: 'center', padding: '15px', marginTop: '20px'
        }}>
          <small>📍 Address: Door No 50, 1st floor, Pachaiyapan Nagar, 1st street, Rakkiyapalayam pirvu, Tiruppur - 641606</small><br />
          <small>📞 Mobile: 8110054961</small>
        </footer>
      </div>
    </Router>
  );
}

// 🏠 Home Page Component
function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Welcome to Dream Tuition Center</h2>
      <p>Select a page from the navigation bar to continue.</p>
    </div>
  );
}
