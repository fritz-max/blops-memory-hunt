
import React from "react";

interface GameOverProps {
  attempts: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ attempts, onRestart }) => {
  return (
    <div className="game-over-container">
      <div className="game-over-card bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 border-4 border-purple-400">
        <div className="text-6xl mb-4 animate-bounce-soft">🎉</div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Godt klaret!
        </h2>
        <p className="text-xl text-center mb-3 font-semibold text-purple-700">
          Du fandt alle par!
        </p>
        <p className="text-lg text-center mb-6 text-blops-dark">
          Antal forsøg: <span className="font-bold text-2xl text-pink-600">{attempts}</span>
        </p>
        <button
          onClick={onRestart}
          className="game-button game-button-primary"
        >
          Spil igen
        </button>
      </div>
    </div>
  );
};

export default GameOver;
