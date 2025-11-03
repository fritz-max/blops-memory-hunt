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
  const [mouseDown, setMouseDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scoreEffect, setScoreEffect] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });
  const [lifeLostEffect, setLifeLostEffect] = useState<{
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
    }, 1000 / difficulty); // Slower spawn rate for children

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
          y: item.y + (item.speed * difficulty * 1.2 * deltaTime) / 16, // Slower speed for children
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
              // Show life lost effect
              setLifeLostEffect({
                x: item.x,
                y: item.y,
                show: true,
              });
              // Hide life lost effect after animation
              setTimeout(() => {
                setLifeLostEffect((prev) => ({ ...prev, show: false }));
              }, 800);
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

  // Keyboard controls - smaller steps for better precision
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCharacterPosition((prev) => Math.max(prev - 3.5, 0)); // Smaller movement for precision
      } else if (e.key === "ArrowRight") {
        setCharacterPosition((prev) => Math.min(prev + 3.5, 100)); // Smaller movement for precision
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

  // Mouse controls - drag and drop
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const newPosition = (mouseX / canvasSize.width) * 100;

    // Clamp position between 0 and 100
    setCharacterPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleMouseLeave = () => {
    setMouseDown(false);
  };

  // Calculate the actual character position in pixels
  const characterPosX = (characterPosition / 100) * canvasSize.width;
  const characterPosY = canvasSize.height - characterSize / 2 - 10;

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[70vh] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl overflow-hidden shadow-xl border-4 border-purple-200"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Score and lives display with animations */}
      <div className="absolute top-4 left-4 z-30 font-bold bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg border-2 border-pink-300">
        <span className="text-pink-600">Point:</span> <span className="text-purple-700">{score}</span>
      </div>
      <div className="absolute top-4 right-4 z-30 font-bold flex bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg border-2 border-pink-300">
        <span className="text-pink-600 mr-2">Liv:</span> {Array(lives).fill("❤️").join("")}
      </div>

      {/* Score effect animation */}
      {scoreEffect.show && (
        <div
          className="absolute z-40 font-bold text-green-600 animate-slide-out flex items-center text-xl"
          style={{ left: `${scoreEffect.x}px`, top: `${scoreEffect.y}px` }}
        >
          <Zap className="mr-1 text-yellow-400" size={20} />
          +1
        </div>
      )}

      {/* Life lost effect animation */}
      {lifeLostEffect.show && (
        <div
          className="absolute z-40 font-bold text-red-600 animate-slide-out flex items-center text-xl"
          style={{ left: `${lifeLostEffect.x}px`, top: `${lifeLostEffect.y}px` }}
        >
          <span className="text-2xl mr-1">💔</span>
          -1 Liv
        </div>
      )}

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white/90 rounded-3xl p-8 shadow-2xl border-4 border-purple-300 animate-pulse-soft">
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Spillet er sat på pause
            </p>
            <p className="text-sm text-purple-600 mt-2">Tryk 'P' for at fortsætte</p>
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
