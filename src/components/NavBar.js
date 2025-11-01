import React from 'react';

export default function NavBar({ currentPage, setCurrentPage }) {
  return (
    <nav style={{
      background: '#0077cc',
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <h2>🎓 Dream Tuition Center</h2>
      <div>
        <button
          onClick={() => setCurrentPage('list')}
          className="nav-btn"
          style={{
            marginRight: 10,
            background: currentPage === 'list' ? '#005fa3' : '#0094ff',
            border: 'none',
            color: 'white',
            padding: '8px 14px',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Students List
        </button>
        <button
          onClick={() => setCurrentPage('add')}
          className="nav-btn"
          style={{
            background: currentPage === 'add' ? '#005fa3' : '#0094ff',
            border: 'none',
            color: 'white',
            padding: '8px 14px',
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Add Student
        </button>
      </div>
    </nav>
  );
}
