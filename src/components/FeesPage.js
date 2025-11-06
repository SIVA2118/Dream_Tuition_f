import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function PaidPage() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [payable, setPayable] = useState([]);
  const [nonPayable, setNonPayable] = useState([]);

  const handleMonthClick = async (month) => {
    setSelectedMonth(month);

    try {
      const res = await fetch(`https://dream-tuition-b-jdm8.vercel.app/api/students-payment?month=${month}`);
      const data = await res.json();

      if (res.ok) {
        setPayable(data.payable);
        setNonPayable(data.nonPayable);
      } else {
        alert(data.message || "Error fetching data");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💰 Monthly Payment Status</h2>

      <div style={styles.monthGrid}>
        {months.map((m) => (
          <button
            key={m}
            style={selectedMonth === m ? styles.activeMonth : styles.monthBtn}
            onClick={() => handleMonthClick(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {selectedMonth && (
        <div style={styles.resultBox}>
          <h3>{selectedMonth} Payment Summary</h3>

          <div style={styles.listContainer}>
            <div style={styles.listBox}>
              <h4>❌ Payable List</h4>
              {payable.length > 0 ? (
                payable.map((s, i) => <p key={i}>{s.studentName}</p>)
              ) : (
                <p>No Payable Students</p>
              )}
            </div>

            <div style={styles.listBox}>
              <h4>✅ Non-Payable List</h4>
              {nonPayable.length > 0 ? (
                nonPayable.map((s, i) => <p key={i}>{s.studentName}</p>)
              ) : (
                <p>No Non-Payable Students</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  monthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "10px",
    marginBottom: "30px",
  },
  monthBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid gray",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
  },
  activeMonth: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
  resultBox: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
  },
  listContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  listBox: {
    width: "45%",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
};
