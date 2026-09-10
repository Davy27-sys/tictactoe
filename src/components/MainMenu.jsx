import React from "react";

export default function MainMenu({ onNavigate }) {
  return (
    <div className="menu-container">
      <h1 className="title">Tic Tac Toe</h1>
      <p className="subtitle">Pilih menu untuk memulai</p>

      <div className="menu-buttons">
        <button className="btn btn-primary" onClick={() => onNavigate("game")}>
          🎮 Mulai Main
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onNavigate("skor")}
        >
          🏆 Lihat Skor
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onNavigate("tampilan")}
        >
          🎨 Ubah Tampilan
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onNavigate("history")}
        >
          📜 Riwayat Permainan
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => onNavigate("vs-computer")}
        >
          🤖 Lawan Komputer
        </button>
      </div>
    </div>
  );
}
