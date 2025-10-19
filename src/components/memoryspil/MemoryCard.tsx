import React from "react";
import { Card } from "@/utils/memoryGameUtils";

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
      className={`memory-card flip-card ${
        card.isFlipped || card.isMatched ? "flipped" : ""
      } ${card.isMatched ? "opacity-70" : ""}`}
      onClick={handleClick}
    >
      <div className="flip-card-inner h-full w-full">
        {/* Card Front (Hidden) */}
        <div className="flip-card-front rounded-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 border-4 border-white flex items-center justify-center shadow-lg">
          <div className="text-white text-5xl font-bold drop-shadow-lg animate-pulse-soft">
            ?
          </div>
        </div>

        {/* Card Back (Shown when flipped) */}
        <div className="flip-card-back rounded-2xl bg-gradient-to-br from-white to-blue-50 border-4 border-purple-300 flex flex-col items-center justify-center p-3 shadow-lg">
          <img
            src={card.image}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
