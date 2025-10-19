import React, { useState, useEffect, useRef } from "react";
import Character from "@/components/fangespil/Character";
import FallingItem from "@/components/fangespil/FallingItem";
import {
  FallingItem as FallingItemType,
  generateRandomItem,
  checkCollision,
  isGoodItem,
} from "@/utils/catchGameUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Zap } from "lucide-react";

interface GameCanvasProps {
  onScoreChange: (points: number) => void;
  onLifeLost: () => void;
  lives: number;
  score: number;
  difficulty: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  onScoreChange,
  onLifeLost,
  lives,
  score,
  difficulty,
}) => {
  const [characterPosition, setCharacterPosition] = useState(50); // percentage of screen width
  const [fallingItems, setFallingItems] = useState<FallingItemType[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const characterSize = isMobile ? 60 : 80;
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scoreEffect, setScoreEffect] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });
  const animationFrameRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);

  // Set up the canvas size
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // Generate falling items
  useEffect(() => {
    if (isPaused) return;

    const itemInterval = setInterval(() => {
      if (canvasSize.width > 0) {
        const newItem = generateRandomItem(canvasSize.width, score);
        setFallingItems((prev) => [...prev, newItem]);
      }
    }, 700 / difficulty); // Even faster spawn rate

    return () => clearInterval(itemInterval);
  }, [canvasSize.width, difficulty, score, isPaused]);

  // Game loop using requestAnimationFrame
  useEffect(() => {
    if (isPaused || canvasSize.height === 0) return;

    const gameLoop = (timestamp: number) => {
      // Calculate delta time for consistent movement
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = timestamp;

      // Move items at a consistent speed regardless of framerate
      setFallingItems((prevItems) => {
        const updatedItems = prevItems.map((item) => ({
          ...item,
          y: item.y + (item.speed * difficulty * 2 * deltaTime) / 16, // Adjusted for deltaTime
        }));

        // Check for collisions and remove items that went offscreen
        const remainingItems = [];

        for (const item of updatedItems) {
          // Remove items that went off screen
          if (item.y > canvasSize.height) {
            remainingItems.push(item);
            continue;
          }

          // Check for collision with character
          const characterX =
            (characterPosition / 100) * canvasSize.width - characterSize / 2;
          const characterY = canvasSize.height - characterSize - 10;

          if (checkCollision(characterX, characterY, characterSize, item)) {
            // Handle collision
            if (isGoodItem(item.type)) {
              onScoreChange(1);
              // Show score effect
              setScoreEffect({
                x: item.x,
                y: item.y,
                show: true,
              });
              // Hide score effect after animation
              setTimeout(() => {
                setScoreEffect((prev) => ({ ...prev, show: false }));
              }, 800);
            } else {
              onLifeLost();
            }
            // Don't add to remaining items - it's been caught
          } else {
            remainingItems.push(item);
          }
        }

        return remainingItems;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    characterPosition,
    canvasSize,
    onScoreChange,
    onLifeLost,
    difficulty,
    isPaused,
    characterSize,
  ]);

  // Keyboard controls - even faster movement for better responsiveness
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCharacterPosition((prev) => Math.max(prev - 7, 0)); // Faster movement
      } else if (e.key === "ArrowRight") {
        setCharacterPosition((prev) => Math.min(prev + 7, 100)); // Faster movement
      } else if (e.key === "p" || e.key === "P") {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch controls - improved sensitivity
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchX = e.touches[0].clientX;
    const diffX = touchX - touchStart;

    // Calculate new position with enhanced sensitivity
    const newPosition = characterPosition + (diffX / canvasSize.width) * 150; // Increased sensitivity

    // Clamp position between 0 and 100
    setCharacterPosition(Math.max(0, Math.min(100, newPosition)));

    // Update touch start for next move
    setTouchStart(touchX);
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  // Calculate the actual character position in pixels
  const characterPosX = (characterPosition / 100) * canvasSize.width;
  const characterPosY = canvasSize.height - characterSize / 2 - 10;

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[50vh] md:h-[70vh] bg-game-background rounded-lg overflow-hidden shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Score and lives display with animations */}
      <div className="absolute top-4 left-4 z-30 font-bold bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 animate-pulse-soft">
        Point: {score}
      </div>
      <div className="absolute top-4 right-4 z-30 font-bold flex bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
        Liv: {Array(lives).fill("❤️").join("")}
      </div>

      {/* Score effect animation */}
      {scoreEffect.show && (
        <div
          className="absolute z-40 font-bold text-primary animate-slide-out flex items-center"
          style={{ left: `${scoreEffect.x}px`, top: `${scoreEffect.y}px` }}
        >
          <Zap className="mr-1 text-yellow-400" size={16} />
          +1
        </div>
      )}

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="text-white text-xl font-bold p-6 bg-black/60 rounded-lg animate-pulse-soft">
            Spillet er sat på pause
          </div>
        </div>
      )}

      {/* Character */}
      <Character
        position={{ x: characterPosX, y: characterPosY }}
        size={characterSize}
      />

      {/* Falling Items */}
      {fallingItems.map((item) => (
        <FallingItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GameCanvas;
