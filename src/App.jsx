import React, { useState, useEffect } from "react";
import "./index.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Skor from "./components/Skor";
import UbahTampilan from "./components/UbahTampilan";
import Riwayat from "./components/Riwayat";

const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Gagal memuat ${key} dari localStorage:`, error);
    return defaultValue;
  }
};

export default function App() {
  const [screen, setScreen] = useState("menu");

  const [scores, setScores] = useState(() =>
    loadFromStorage("tictactoe_scores", { x: 0, o: 0, draw: 0 }),
  );

  const [theme, setTheme] = useState(() =>
    loadFromStorage("tictactoe_theme", "light"),
  );

  const [matchHistory, setMatchHistory] = useState(() =>
    loadFromStorage("tictactoe_history", []),
  );

  useEffect(() => {
    localStorage.setItem("tictactoe_scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem("tictactoe_theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tictactoe_history", JSON.stringify(matchHistory));
  }, [matchHistory]);

  const handleGameEnd = (result) => {
    setScores((prev) => {
      if (result === "X") return { ...prev, x: prev.x + 1 };
      if (result === "O") return { ...prev, o: prev.o + 1 };
      if (result === "draw") return { ...prev, draw: prev.draw + 1 };
      return prev;
    });

    const waktuSekarang = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const entriBaru = { hasil: result, waktu: waktuSekarang };

    setMatchHistory((prevHistory) => [entriBaru, ...prevHistory]);
  };

  const handleResetScore = () => {
    setScores({ x: 0, o: 0, draw: 0 });
  };

  const handleClearHistory = () => {
    setMatchHistory([]);
  };

  return (
    <div className={`App theme-${theme}`}>
      {/* Teruskan onNavigate atau handler buka riwayat ke MainMenu */}
      {screen === "menu" && <MainMenu onNavigate={setScreen} />}

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

      {screen === "tampilan" && (
        <UbahTampilan
          currentTheme={theme}
          onSelectTheme={setTheme}
          onBack={() => setScreen("menu")}
        />
      )}

      {/* LAYAR BARU: Komponen Riwayat Pertandingan */}
      {screen === "history" && (
        <Riwayat
          history={matchHistory}
          onClear={handleClearHistory}
          onBack={() => setScreen("menu")}
        />
      )}

      {screen === "vs-computer" && (
        <Game
          onBack={() => setScreen("menu")}
          onGameEnd={handleGameEnd}
          scores={scores}
          onResetScore={handleResetScore}
          theme={theme}
          isComputerMode={true} 
        />
      )}
    </div>
  );
}
