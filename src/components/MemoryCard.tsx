
import React from "react";
import { Card } from "@/utils/gameUtils";
import * as LucideIcons from "lucide-react";
import { getCardIcon, getCardColor } from "@/utils/gameUtils";

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

  // Get the appropriate icon based on the card's pair ID
  const iconName = getCardIcon(card.pairId);
  
  // Type-safe way to get the icon component
  const IconComponent = iconName in LucideIcons 
    ? LucideIcons[iconName as keyof typeof LucideIcons] 
    : LucideIcons.HelpCircle;
    
  const iconColor = getCardColor(card.pairId);

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
          <div className={`text-3xl sm:text-4xl mb-1 ${iconColor}`}>
            <IconComponent strokeWidth={1.5} />
          </div>
          <div className="text-xs sm:text-sm font-medium text-center text-blops-dark mt-1">
            {card.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
