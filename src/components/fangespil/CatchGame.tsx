import React, { useState, useRef, useEffect } from "react";
import GameCanvas from "@/components/fangespil/GameCanvas";
import GameOverScreen from "@/components/fangespil/GameOverScreen";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

const CatchGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1.2); // Start with higher difficulty
  const gameRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

    // Welcome toast
    toast({
      title: "Velkommen til Blop!",
      description:
        "Fang de røde blodlegemer og proteiner. Undgå virus og antistoffer!",
      duration: 4000,
    });
  };

  // Handle score updates
  const handleScoreChange = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    // Special achievement toasts
    if (newScore === 10) {
      toast({
        title: "Godt klaret!",
        description: "Du har fået 10 point!",
        duration: 3000,
      });
    } else if (newScore === 25) {
      toast({
        title: "Fantastisk!",
        description: "Du har fået 25 point!",
        duration: 3000,
      });
    } else if (newScore === 50) {
      toast({
        title: "Utroligt!",
        description: "Halvvejs til sejren!",
        duration: 3000,
      });
    } else if (newScore === 75) {
      toast({
        title: "Næsten der!",
        description: "Bare 25 point mere!",
        duration: 3000,
      });
    }

    // Win condition
    if (newScore >= 100) {
      toast({
        title: "Tillykke!",
        description: "Du har vundet spillet med 100 point!",
        duration: 5000,
      });
      setGameOver(true);
    }

    // Increase difficulty based on score - more aggressive scaling
    setDifficulty(1.2 + Math.floor(newScore / 8) * 0.25);
  };

  // Handle life loss
  const handleLifeLost = () => {
    const newLives = lives - 1;
    setLives(newLives);

    // Warning toasts
    if (newLives === 2) {
      toast({
        title: "Pas på!",
        description: "Du har mistet et liv! To liv tilbage.",
        duration: 3000,
        variant: "destructive",
      });
    } else if (newLives === 1) {
      toast({
        title: "Forsigtig!",
        description: "Sidste liv! Vær ekstra forsigtig!",
        duration: 3000,
        variant: "destructive",
      });
    }

    // Game over condition
    if (newLives <= 0) {
      setGameOver(true);
    }
  };

  // Restart game
  const handleRestartClick = () => {
    resetGame();
  };

  // Calculate progress percentage
  const progressPercentage = Math.min(score, 100);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-5xl w-full h-full glass-panel rounded-xl p-4 shadow-xl animate-fade-in"
      ref={gameRef}
    >
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] md:min-h-[70vh]">
          <h1 className="text-4xl font-bold mb-8 text-primary animate-pulse-soft flex items-center">
            <Sparkles className="mr-2 text-yellow-400 animate-spin-slow" />
            Blop
            <Sparkles className="ml-2 text-yellow-400 animate-spin-slow" />
          </h1>
          <p className="text-center mb-8 text-lg">
            Fang røde blodlegemer og proteiner. Undgå antistoffer og virus.
          </p>
          <Button
            onClick={startGame}
            className="game-button text-lg animate-pulse-soft"
          >
            Start
          </Button>
        </div>
      ) : gameOver ? (
        <GameOverScreen score={score} onRestart={handleRestartClick} />
      ) : (
        <>
          <div className="w-full mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">0</span>
              <span className="text-xs font-medium">100</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <GameCanvas
            onScoreChange={handleScoreChange}
            onLifeLost={handleLifeLost}
            lives={lives}
            score={score}
            difficulty={difficulty}
          />
        </>
      )}
    </div>
  );
};

export default CatchGame;
