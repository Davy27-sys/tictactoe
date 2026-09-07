import React, { useState } from "react";
import "./index.css";

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
  let markClass = "";
  if (value === "X") markClass = "x-mark";
  if (value === "O") markClass = "o-mark";

  const className = `square ${markClass} ${isWinning ? "winning-square" : ""}`;

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winInfo = calculateWinner(squares);
  const winner = winInfo ? winInfo.winner : null;
  const winningLine = winInfo ? winInfo.line : [];
  const isDraw = !winner && squares.every((square) => square !== null);

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
  }

  let status;
  if (winner) {
    status = `Pemenang: ${winner}`;
  } else if (isDraw) {
    status = "Hasil Seri!";
  } else {
    status = `Giliran: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
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

      {/* Tombol Ulangi Permainan */}
      <button className="reset-btn" onClick={handleReset}>
        Ulangi Permainan
      </button>
    </div>
  );
}
