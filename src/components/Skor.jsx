import React from "react";

function Skor({ scores, onResetScore, onBack }) {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <button onClick={onBack}>&larr; Kembali ke Menu</button>
      <h2>Papan Skor</h2>

      <div style={{ margin: "20px auto", width: "200px", textAlign: "left" }}>
        <p>
          <strong>Menang X:</strong> {scores.x}
        </p>
        <p>
          <strong>Menang O:</strong> {scores.o}
        </p>
        <p>
          <strong>Seri:</strong> {scores.draw}
        </p>
      </div>

      <button onClick={onResetScore} style={{ color: "red" }}>
        Reset Skor
      </button>
    </div>
  );
}

export default Skor;