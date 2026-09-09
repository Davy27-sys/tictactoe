import React, { useState, useEffect } from "react";
import "./index.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Skor from "./components/Skor";
import UbahTampilan from "./components/UbahTampilan";
export default function App() {
  const [screen, setScreen] = useState("menu");

  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem("tictactoe_scores");
      return saved ? JSON.parse(saved) : { x: 0, o: 0, draw: 0 };
    } catch (error) {
      console.error("Gagal membaca skor dari localStorage:", error);
      return { x: 0, o: 0, draw: 0 };
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("tictactoe_theme");
      return savedTheme ? JSON.parse(savedTheme) : "light";
    } catch (error) {
      console.error("Gagal membaca tema dari localStorage:", error);
      return "light";
    }
  });

  useEffect(() => {
    localStorage.setItem("tictactoe_scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem("tictactoe_theme", JSON.stringify(theme));
  }, [theme]);

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
    <div className={`App theme-${theme}`}>
      {screen === "menu" && <MainMenu onNavigate={setScreen} />}

      {/* 4. Teruskan prop 'theme' ke Game */}
      {screen === "game" && (
        <Game
          onBack={() => setScreen("menu")}
          onGameEnd={handleGameEnd}
          scores={scores}
          onResetScore={handleResetScore}
          theme={theme}
        />
      )}

      {screen === "skor" && (
        <Skor
          scores={scores}
          onResetScore={handleResetScore}
          onBack={() => setScreen("menu")}
        />
      )}

      {/* 5. Kondisi untuk menampilkan komponen UbahTampilan */}
      {screen === "tampilan" && (
        <UbahTampilan
          currentTheme={theme}
          onSelectTheme={setTheme}
          onBack={() => setScreen("menu")}
        />
      )}
    </div>
  );
}
