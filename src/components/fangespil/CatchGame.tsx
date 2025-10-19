import React, { useState, useRef } from "react";
import GameCanvas from "@/components/fangespil/GameCanvas";
import GameOverScreen from "@/components/fangespil/GameOverScreen";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

const CatchGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1.2); // Start with higher difficulty
  const gameRef = useRef<HTMLDivElement>(null);

  // Reset game state
  const resetGame = () => {
    setScore(0);
    setLives(3);
    setDifficulty(1.2); // Higher starting difficulty
    setGameOver(false);
  };

  // Start the game
  const startGame = () => {
    resetGame();
    setGameStarted(true);
  };

  // Handle score updates
  const handleScoreChange = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    // Win condition
    if (newScore >= 100) {
      setGameOver(true);
    }

    // Increase difficulty based on score - more aggressive scaling
    setDifficulty(1.2 + Math.floor(newScore / 8) * 0.25);
  };

  // Handle life loss
  const handleLifeLost = () => {
    const newLives = lives - 1;
    setLives(newLives);

    // Game over condition
    if (newLives <= 0) {
      setGameOver(true);
    }
  };

  // Get warning message based on lives remaining
  const getWarningMessage = () => {
    if (lives === 2) {
      return "Pas på! Du har mistet en Blop. Du har to Blop-liv tilbage.";
    } else if (lives === 1) {
      return "Av! Du har én Blop tilbage! Vær ekstra forsigtig!";
    }
    return null;
  };

  // Restart game
  const handleRestartClick = () => {
    resetGame();
  };

  // Calculate progress percentage
  const progressPercentage = Math.min(score, 100);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-5xl w-full h-full "
      ref={gameRef}
    >
      {!gameStarted ? (
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl">
            {/* Decorative images positioned around the content */}
            <img
              src="/assets/catch/fang_1.png"
              alt="Good item"
              className="absolute -top-24 -left-16 w-32 sm:w-40 animate-float opacity-95"
            />
            <img
              src="/assets/catch/fang_2.png"
              alt="Good item"
              className="absolute -top-20 -right-12 w-28 sm:w-36 animate-bounce-soft opacity-95"
            />
            <img
              src="/assets/catch/undgå_1.png"
              alt="Bad item"
              className="absolute -bottom-24 -left-12 w-28 sm:w-36 animate-pulse-soft opacity-95"
            />
            <img
              src="/assets/catch/undgå_2.png"
              alt="Bad item"
              className="absolute -bottom-20 -right-16 w-32 sm:w-40 animate-float opacity-95"
            />
            <img
              src="/assets/catch/user_blop_1.png"
              alt="Hero"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 sm:w-32 animate-bounce-soft opacity-95"
            />

            {/* Centered content */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-purple-300">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Blops Fangespil
              </h1>

              <p className="text-center mb-6 text-lg sm:text-xl font-semibold text-purple-700">
                Hjælp Blop med at fange fakkerne og fibberne – og undgå at blive
                ramt af løsslupne bolde! Brug piletasterne eller touch for at
                styre
              </p>

              {/* Game instructions with images */}
              <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Items to catch */}
                  <div className="bg-green-100 border-4 border-green-400 rounded-2xl p-4">
                    <h3 className="text-lg font-bold text-green-700 mb-3 text-center">
                      ✓ Fang disse!
                    </h3>
                    <div className="flex justify-center gap-4 mb-2">
                      <img
                        src="/assets/catch/fang_1.png"
                        alt="Røde blodlegemer"
                        className="w-14 h-14 object-contain"
                      />
                      <img
                        src="/assets/catch/fang_2.png"
                        alt="Proteiner"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <p className="text-sm text-center text-green-800 font-medium">
                      Røde blodlegemer og proteiner
                    </p>
                  </div>

                  {/* Items to avoid */}
                  <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-4">
                    <h3 className="text-lg font-bold text-red-700 mb-3 text-center">
                      ✗ Undgå disse!
                    </h3>
                    <div className="flex justify-center gap-4 mb-2">
                      <img
                        src="/assets/catch/undgå_1.png"
                        alt="Antistoffer"
                        className="w-14 h-14 object-contain"
                      />
                      <img
                        src="/assets/catch/undgå_2.png"
                        alt="Virus"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <p className="text-sm text-center text-red-800 font-medium">
                      Antistoffer og virus
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={startGame}
                  className="game-button game-button-primary text-xl sm:text-2xl px-12 py-4 animate-bounce-in"
                >
                  Start spillet
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : gameOver ? (
        <GameOverScreen score={score} onRestart={handleRestartClick} />
      ) : (
        <>
          <div className="w-full mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-purple-700">0</span>
              <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Mål: 100 point
              </span>
              <span className="text-sm font-bold text-purple-700">100</span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-3 bg-purple-200"
            />
          </div>

          <GameCanvas
            onScoreChange={handleScoreChange}
            onLifeLost={handleLifeLost}
            lives={lives}
            score={score}
            difficulty={difficulty}
          />

          {/* Warning message area - always reserve space */}
          <div className="mt-4 text-center min-h-[80px] flex items-center justify-center">
            {getWarningMessage() && (
              <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-4 animate-bounce-in w-full">
                <p className="text-lg font-bold text-red-700">
                  {getWarningMessage()}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CatchGame;
