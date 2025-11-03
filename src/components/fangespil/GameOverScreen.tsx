
import React from "react";
import { Link } from "react-router-dom";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  const isWin = score >= 100;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] md:min-h-[70vh]">
      <div className="text-6xl mb-6 animate-bounce-soft">
        {isWin ? "🎉" : "😊"}
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {isWin ? "Tillykke!" : "Spillet er slut!"}
      </h2>
      <p className="text-2xl sm:text-3xl mb-3 font-semibold text-purple-700">
        {isWin ? "Du vandt!" : "Godt forsøgt!"}
      </p>
      <p className="text-xl mb-8 text-blops-dark">
        Du fik <span className="font-bold text-2xl text-pink-600">{score}</span> point!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/"
          className="game-button bg-white/80 hover:bg-white/90 text-purple-700 text-xl sm:text-2xl px-12 py-4"
        >
          ← Tilbage
        </Link>
        <button onClick={onRestart} className="game-button game-button-primary text-xl sm:text-2xl px-12 py-4">
          Spil igen
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
