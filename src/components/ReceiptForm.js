import React, { useEffect, useState } from "react";

export default function ReceiptForm() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverSignature, setReceiverSignature] = useState("");
  const [sending, setSending] = useState(false);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    const handler = () => fetchStudents();
    window.addEventListener("studentsChanged", handler);
    return () => window.removeEventListener("studentsChanged", handler);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!studentId) return alert("Select a student");
    if (!month) return alert("Select a month");
    if (!amount || Number(amount) <= 0) return alert("Enter valid amount");

    setSending(true);
    try {
      const res = await fetch("http://localhost:5000/api/receipts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          month,
          amount: Number(amount),
          receiverSignature,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Error: " + (data.error || res.statusText));
      } else {
        alert("✅ Receipt created and emailed successfully!");
        setMonth("");
        setAmount("");
        setReceiverSignature("");
      }
    } catch (err) {
      console.error(err);
      alert("Network error: " + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>🧾 Create & Email Receipt</h2>

      <form onSubmit={submit} style={formStyle}>
        {/* Student Dropdown */}
        <label style={labelStyle}>
          <span style={labelText}>🎓 Student</span>
          <select
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={selectStyle}
          >
            <option value="">-- Select student --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} — {s.email}
              </option>
            ))}
          </select>
        </label>

        {/* Month Dropdown */}
        <label style={labelStyle}>
          <span style={labelText}>📅 Month</span>
          <select
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={selectStyle}
          >
            <option value="">-- Select month --</option>
            {months.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        {/* Amount */}
        <label style={labelStyle}>
          <span style={labelText}>💰 Amount (Rs)</span>
          <input
            type="number"
            min="0"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={inputStyle}
          />
        </label>

        {/* Receiver signature */}
        <label style={labelStyle}>
          <span style={labelText}>✍️ Receiver Signature</span>
          <input
            type="text"
            value={receiverSignature}
            onChange={(e) => setReceiverSignature(e.target.value)}
            placeholder="Authorized person name"
            style={inputStyle}
          />
        </label>

        {/* Button */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button type="submit" style={submitBtn} disabled={sending}>
            {sending ? "📨 Sending..." : "📤 Create & Email"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- STYLES ---------------- */
const containerStyle = {
  maxWidth: 500,
  margin: "40px auto",
  background: "#ffffff",
  padding: "30px 25px",
  borderRadius: 16,
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  transition: "0.3s",
};

const titleStyle = {
  textAlign: "center",
  color: "#1e293b",
  marginBottom: 20,
  fontSize: "1.5rem",
  fontWeight: 600,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelText = {
  marginBottom: 6,
  fontSize: "0.95rem",
  color: "#475569",
  fontWeight: 500,
};

const inputStyle = {
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
  outlineColor: "#3b82f6",
  transition: "0.2s",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  background: "#f8fafc",
};

const submitBtn = {
  background: "#2563eb",
  color: "white",
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "all 0.2s",
};
submitBtn[":hover"] = {
  background: "#1d4ed8",
};
