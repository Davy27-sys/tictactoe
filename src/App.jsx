import React, { useState, useEffect } from "react";
import "./index.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";

export default function App() {
  const [screen, setScreen] = useState("menu");

  // Skor tetap disimpan di localStorage
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem("tictactoe_scores");
    return saved ? JSON.parse(saved) : { x: 0, o: 0, draw: 0 };
  });

  useEffect(() => {
    localStorage.setItem("tictactoe_scores", JSON.stringify(scores));
  }, [scores]);

  const handleGameEnd = (result) => {
    setScores((prev) => {
      if (result === "X") return { ...prev, x: prev.x + 1 };
      if (result === "O") return { ...prev, o: prev.o + 1 };
      if (result === "draw") return { ...prev, draw: prev.draw + 1 };
      return prev;
    });
  };

  const handleResetScore = () => {
    setScores({ x: 0, o: 0, draw: 0 });
  };

  return (
    <div className="App">
      {screen === "menu" && <MainMenu onNavigate={setScreen} />}
      {screen === "game" && (
        <Game
          onBack={() => setScreen("menu")}
          onGameEnd={handleGameEnd}
          scores={scores}
          onResetScore={handleResetScore}
        />
      )}
    </div>
  );
}
