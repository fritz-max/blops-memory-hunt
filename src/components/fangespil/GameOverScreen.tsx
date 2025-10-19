
import React from "react";
import { Button } from "@/components/ui/button";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[50vh] md:min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-4">Spillet er slut!</h2>
      <p className="text-xl mb-8">Du fik {score} point!</p>
      
      <Button onClick={onRestart} className="game-button">
        Prøv igen
      </Button>
    </div>
  );
};

export default GameOverScreen;
