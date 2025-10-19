
import React from "react";
import { Card } from "@/utils/gameUtils";

interface MemoryCardProps {
  card: Card;
  onClick: (id: number) => void;
  disabled: boolean;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`memory-card flip-card ${card.isFlipped || card.isMatched ? "flipped" : ""} ${
        card.isMatched ? "opacity-80" : ""
      }`}
      onClick={handleClick}
      aria-label={card.isFlipped ? card.name : "Ukendt kort"}
    >
      <div className="flip-card-inner h-full w-full">
        {/* Card Front (Hidden) */}
        <div className="flip-card-front rounded-2xl bg-white border-2 border-blops-red flex items-center justify-center">
          <div className="text-blops-red text-4xl font-bold">?</div>
        </div>

        {/* Card Back (Shown when flipped) */}
        <div className="flip-card-back rounded-2xl bg-white border-2 border-blops-red flex flex-col items-center justify-center p-2">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
