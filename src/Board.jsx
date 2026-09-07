import React from "react";

function Board({ board, onClick }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <button key={index} className="square" onClick={() => onClick(index)}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default Board;
