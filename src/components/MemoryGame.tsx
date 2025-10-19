import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import GameOver from "./GameOver";
import {
  Card,
  initializeDeck,
  playFlipSound,
  playMatchSound,
  playMismatchSound,
  playWinSound,
} from "@/utils/gameUtils";

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Initialize the game
  const startGame = () => {
    setCards(initializeDeck());
    setFlippedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
    setIsChecking(false);
    setGameStarted(true);
    setGameOver(false);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.includes(id)) return;

    playFlipSound();

    // Add the clicked card to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Update the card state to show it's flipped
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setIsChecking(true);

      // Increment attempts counter
      setAttempts((prev) => prev + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // It's a match!
        setTimeout(() => {
          playMatchSound();
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );

          const newMatchedPairs = matchedPairs + 1;
          setMatchedPairs(newMatchedPairs);

          // Check if all pairs are matched
          if (newMatchedPairs === 10) {
            setTimeout(() => {
              playWinSound();
              setGameOver(true);
            }, 500);
          }

          setFlippedCards([]);
          setIsChecking(false);
        }, 300);
      } else {
        // Not a match, flip the cards back
        setTimeout(() => {
          playMismatchSound();
          setCards((prevCards) =>
            prevCards.map((card) =>
              newFlippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  // Restart the game
  const handleRestart = () => {
    startGame();
  };

  return (
    <div className="game-container">
      {/* Sound effects (hidden) */}
      <audio
        id="flip-sound"
        src="https://assets.soundon.fm/sounds/flip-card.mp3"
        preload="auto"
      ></audio>
      <audio
        id="match-sound"
        src="https://assets.soundon.fm/sounds/match.mp3"
        preload="auto"
      ></audio>
      <audio
        id="mismatch-sound"
        src="https://assets.soundon.fm/sounds/no-match.mp3"
        preload="auto"
      ></audio>
      <audio
        id="win-sound"
        src="https://assets.soundon.fm/sounds/win.mp3"
        preload="auto"
      ></audio>

      <h1 className="game-title">Blops vendespil</h1>

      {gameStarted ? (
        <>
          <p className="game-stats mb-6">Find to ens kort</p>
          <p className="game-stats">Antal forsøg: {attempts}</p>
          <div className="my-6">
            <GameBoard
              cards={cards}
              onCardClick={handleCardClick}
              disabled={isChecking || gameOver}
            />
          </div>
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-2xl px-8">
            {/* Decorative images positioned around the content */}
            <img
              src="/assets/vendespil_01.png"
              alt="Characters"
              className="absolute -top-32 -left-24 w-40 sm:w-52 animate-float opacity-95"
            />
            <img
              src="/assets/vendespil_02.png"
              alt="Detective"
              className="absolute -top-28 -right-20 w-32 sm:w-44 animate-bounce-soft opacity-95"
            />
            <img
              src="/assets/vendespil_04.png"
              alt="Blops creatures"
              className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-60 sm:w-72 animate-pulse-soft opacity-95"
            />

            {/* Centered content */}
            <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-purple-300">
              <p className="text-xl sm:text-2xl mb-6 font-medium text-purple-800">
                Find par af kort med blopperne, fibberne, fakkerne og de andre
                figurer fra Silje, Ida og Antons ITP-univers.
              </p>
              <p className="text-2xl sm:text-3xl mb-8 font-bold text-pink-600">
                God fornøjelse!
              </p>
              <button
                onClick={startGame}
                className="game-button game-button-primary animate-bounce-in text-xl sm:text-2xl px-12 py-4"
              >
                Start spillet
              </button>
            </div>
          </div>
        </div>
      )}

      {gameOver && <GameOver attempts={attempts} onRestart={handleRestart} />}
    </div>
  );
};

export default MemoryGame;
