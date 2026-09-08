import React from "react";

export default function MainMenu({ onNavigate }) {
  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <div style={{ marginTop: "30px" }}>
        <button className="reset-btn" onClick={() => onNavigate("game")}>
          Main Game
        </button>
      </div>
    </div>
  );
}
