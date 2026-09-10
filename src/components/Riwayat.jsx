import React from "react";

export default function Riwayat({ history, onBack, onClear }) {
  return (
    <div className="game-container" style={{ maxWidth: "400px", width: "100%", margin: "0 auto" }}>
      <h2 className="title">Riwayat Pertandingan</h2>

      {history.length > 0 && (
        <button onClick={onClear} className="btn btn-secondary" style={{ marginBottom: "15px" }}>
          🗑️ Hapus Riwayat
        </button>
      )}

      {history.length === 0 ? (
        <p className="subtitle">Belum ada riwayat pertandingan.</p>
      ) : (
        <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "15px", textAlign: "left" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {history.map((item, index) => (
              <li key={index} style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "0.9rem" }}>
                Hasil: <strong>{item.hasil}</strong> — Pukul: {item.waktu}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={onBack} className="btn btn-primary">
        ⬅️ Kembali ke Menu
      </button>
    </div>
  );
}