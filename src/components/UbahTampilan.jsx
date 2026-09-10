import React from "react";

export default function UbahTampilan({ currentTheme, onSelectTheme, onBack }) {
  const themes = [
    { id: "light", name: "☀️ Tema Terang" },
    { id: "dark", name: "🌙 Tema Gelap" },
    { id: "neon", name: "🟢 Tema Neon" },
  ];

  return (
    <div className="menu-container">
      <h1 className="title">Ubah Tampilan</h1>
      <p className="subtitle">Pilih tema papan permainan favoritmu:</p>

      {/* Container untuk deretan tombol gelembung */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        {themes.map((theme) => {
          const isActive = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              style={{
                width: "100%",
                padding: "14px 24px",
                fontSize: "1rem",
                fontWeight: "600",
                color: isActive ? "#ffffff" : "#cbd5e1",
                background: isActive
                  ? "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)"
                  : "#334155",
                border: isActive
                  ? "2px solid #38bdf8"
                  : "2px solid transparent",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive
                  ? "0 0 15px rgba(56, 189, 248, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3)"
                  : "0 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              {theme.name} {isActive ? "(Aktif)" : ""}
            </button>
          );
        })}
      </div>

      {/* Tombol Kembali dengan bentuk gelembung */}
      <button
        onClick={onBack}
        style={{
          width: "100%",
          padding: "12px 24px",
          fontSize: "0.95rem",
          fontWeight: "600",
          color: "#94a3b8",
          backgroundColor: "#1e293b",
          border: "1px solid #475569",
          borderRadius: "50px", // Bentuk gelembung
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        &larr; Kembali ke Menu
      </button>
    </div>
  );
}
