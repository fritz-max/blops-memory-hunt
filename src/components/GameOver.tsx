
import React from "react";

interface GameOverProps {
  attempts: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ attempts, onRestart }) => {
  return (
    <div className="game-over-container">
      <div className="game-over-card">
        <h2 className="text-2xl font-bold text-blops-red mb-2">Godt klaret!</h2>
        <p className="text-lg text-center mb-6">
          Du fandt alle par på {attempts} forsøg.
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
