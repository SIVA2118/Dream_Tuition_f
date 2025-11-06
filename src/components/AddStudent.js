import React, { useState } from 'react';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Please fill all required fields');

    try {
      setLoading(true);
      const res = await fetch('https://dream-tuition-b-jdm8.vercel.app/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Student added successfully!');
        setName('');
        setEmail('');
        setMobile('');
        window.dispatchEvent(new Event('studentsChanged'));
      } else {
        alert(data.error || 'Error adding student');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card"
      style={{
        marginTop: 20,
        background: '#ffffff',
        borderRadius: 10,
        padding: '16px 20px',
        maxWidth: 320,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginInline: 'auto',
      }}
    >
      <h2
        style={{
          marginBottom: 10,
          color: '#1e293b',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      >
        ✨ Add Student
      </h2>

      <form onSubmit={submit} className="form" style={{ fontSize: 14 }}>
        <div className="field" style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter name"
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              outlineColor: '#3b82f6',
            }}
          />
        </div>

        <div className="field" style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter email"
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              outlineColor: '#3b82f6',
            }}
          />
        </div>

        <div className="field" style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Mobile</label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid #d1d5db',
              outlineColor: '#3b82f6',
            }}
          />
        </div>

        <div className="actions" style={{ textAlign: 'center', marginTop: 10 }}>
          <button
            type="submit"
            className={`btn primary ${loading ? 'disabled' : ''}`}
            disabled={loading}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              width: '100%',
            }}
          >
            {loading ? 'Saving…' : '➕ Add'}
          </button>
        </div>
      </form>
    </div>
  );
}
