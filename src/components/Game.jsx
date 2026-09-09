import React, { useState, useEffect } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

function Square({ value, onSquareClick, isWinning }) {
  const className = `square ${isWinning ? "winning-square" : ""}`;

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game({
  onBack,
  onGameEnd,
  scores,
  onResetScore,
  theme = "light",
}) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const winningLine = winInfo ? winInfo.line : [];
  const isDraw = !winner && squares.every((square) => square !== null);

  useEffect(() => {
    if ((winner || isDraw) && !hasRecordedResult) {
      if (winner) {
        onGameEnd(winner);
      } else if (isDraw) {
        onGameEnd("draw");
      }
      setHasRecordedResult(true);
    }
  }, [winner, isDraw, hasRecordedResult, onGameEnd]);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setHasRecordedResult(false);
  }

  let status = "";
  if (winner) {
    status = `Pemenang: ${winner}`;
  } else if (isDraw) {
    status = "Hasil Seri!";
  } else {
    status = `Giliran: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className={`game-container theme-${theme}`}>
      <button
        className="reset-btn"
        style={{ marginBottom: "15px", backgroundColor: "#6c757d" }}
        onClick={onBack}
      >
        &larr; Kembali ke Menu
      </button>

      <h1 className="title">Tic Tac Toe</h1>

      <div className="mini-scoreboard">
        <span>
          <strong>X:</strong> {scores.x}
        </span>
        <span>
          <strong>Seri:</strong> {scores.draw}
        </span>
        <span>
          <strong>O:</strong> {scores.o}
        </span>
      </div>

      <div className="status">{status}</div>

      <div className="board">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleClick(index)}
            isWinning={winningLine.includes(index)}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button className="reset-btn" onClick={handleReset}>
          Ulangi Permainan
        </button>
        <button
          className="reset-btn"
          style={{ backgroundColor: "#dc3545" }}
          onClick={onResetScore}
        >
          Reset Skor
        </button>
      </div>
    </div>
  );
}
