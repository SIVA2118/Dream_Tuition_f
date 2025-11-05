import React, { useEffect, useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", mobile: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();

      // Add formatted Student IDs (DT001, DT002, etc.)
      const formatted = (data || []).map((s, i) => ({
        ...s,
        studentId: `DT${String(i + 1).padStart(3, "0")}`,
      }));

      setStudents(formatted);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const handler = () => fetchStudents();
    window.addEventListener("studentsChanged", handler);
    return () => window.removeEventListener("studentsChanged", handler);
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Deleted successfully");
        fetchStudents();
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const startEdit = (student) => {
    setEditingStudent(student._id);
    setEditData({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
    });
  };

  const saveUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Updated successfully");
        setEditingStudent(null);
        fetchStudents();
      } else {
        alert(data.error || "Update failed");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const cancelEdit = () => setEditingStudent(null);

  // 🔍 Filtered students list based on search input (now includes ID)
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ Added ID search
  );

  return (
    <div
      style={{
        marginTop: 20,
        maxWidth: 700,
        marginInline: "auto",
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          color: "#1e293b",
          fontSize: "1.2rem",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        🎓 Student List
      </h2>

      {/* 🔎 Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, mobile, or ID (DT001)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          marginBottom: 16,
          fontSize: 14,
          outlineColor: "#3b82f6",
        }}
      />

      {loading ? (
        <div style={{ textAlign: "center", color: "#94a3b8" }}>Loading…</div>
      ) : filteredStudents.length === 0 ? (
        <div style={{ textAlign: "center", color: "#94a3b8" }}>
          No students found
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredStudents.map((s) => (
            <li
              key={s._id}
              style={{
                background: "#f9fafb",
                marginBottom: 12,
                borderRadius: 10,
                padding: 12,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
              }}
              className="student-card"
            >
              {editingStudent === s._id ? (
                <div>
                  <input
                    type="text"
                    value={editData.name}
                    placeholder="Name"
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    value={editData.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    value={editData.mobile}
                    placeholder="Mobile"
                    onChange={(e) =>
                      setEditData({ ...editData, mobile: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <div style={{ textAlign: "right", marginTop: 6 }}>
                    <button onClick={() => saveUpdate(s._id)} style={saveBtn}>
                      💾 Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{ ...cancelBtn, marginLeft: 6 }}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "1rem" }}>
                      {s.name}
                    </strong>
                    <div style={{ color: "#64748b", fontSize: "0.9rem" }}>
                      {s.email} • {s.mobile}
                    </div>
                    <div
                      style={{
                        color: "#3b82f6",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        marginTop: 4,
                      }}
                    >
                      🆔 Student ID: {s.studentId}
                    </div>
                  </div>
                  <div>
                    <button onClick={() => startEdit(s)} style={editBtn}>
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(s._id)}
                      style={{ ...deleteBtn, marginLeft: 6 }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "6px 8px",
  marginBottom: 6,
  borderRadius: 6,
  border: "1px solid #cbd5e1",
  outlineColor: "#3b82f6",
  fontSize: 14,
};

const editBtn = {
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};

const saveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};

const cancelBtn = {
  background: "#94a3b8",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
};
