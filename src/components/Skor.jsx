import React from "react";

export default function Skor({ scores, onResetScore, onBack }) {
  return (
    <div className="menu-container">
      <h1 className="title">Riwayat Skor</h1>
      <p className="subtitle">Statistik permainan kamu saat ini</p>

      <div
        className="mini-scoreboard"
        style={{ flexDirection: "column", gap: "10px", margin: "20px 0" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Pemain X:</span>
          <strong>{scores.x} Menang</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Pemain O:</span>
          <strong>{scores.o} Menang</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Seri:</span>
          <strong>{scores.draw} Kali</strong>
        </div>
      </div>

      <div className="menu-buttons">
        <button
          className="btn"
          style={{ backgroundColor: "#dc3545", color: "white" }}
          onClick={onResetScore}
        >
          Reset Semua Skor
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          &larr; Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
