import React from "react";
import MemoryCard from "./MemoryCard";
import { Card } from "@/utils/memoryGameUtils";

interface GameBoardProps {
  cards: Card[];
  onCardClick: (id: number) => void;
  disabled: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  onCardClick,
  disabled,
}) => {
  return (
    <div className="memory-grid">
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default GameBoard;
