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
      <h2 style={{ color: '#1e293b', fontSize: '1.8rem', marginBottom: '10px' }}>
        Welcome to Dream Tuition Center
      </h2>
      <p style={{ color: '#475569', marginBottom: '30px' }}>
        Select a page from the navigation bar to continue.
      </p>

      {/* 🖼️ Center Image */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="https://t3.ftcdn.net/jpg/12/94/01/34/240_F_1294013479_9TS0PUzsTSRBGofEYeHkDpEShO7gJccC.jpg"
          alt="Dream Tuition Center"
          style={{
            width: '80%',
            maxWidth: '700px',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
