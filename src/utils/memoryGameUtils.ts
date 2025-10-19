// Game card interface
export interface Card {
  id: number;
  pairId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Card data with Danish terms
export const cardItems = [
  { pairId: 1, image: "/assets/vendespil_01.png" },
  { pairId: 2, image: "/assets/vendespil_02.png" },
  { pairId: 3, image: "/assets/vendespil_03.png" },
  { pairId: 4, image: "/assets/vendespil_04.png" },
  { pairId: 5, image: "/assets/vendespil_05.png" },
  { pairId: 6, image: "/assets/vendespil_06.png" },
  { pairId: 7, image: "/assets/vendespil_07.png" },
  { pairId: 8, image: "/assets/vendespil_08.png" },
  { pairId: 9, image: "/assets/vendespil_09.png" },
  { pairId: 10, image: "/assets/vendespil_10.png" },
];

// Function to initialize a shuffled deck
export function initializeDeck(): Card[] {
  // Create two copies of each card (pairs)
  const cards = [
    ...cardItems.map((item, index) => ({
      id: index,
      pairId: item.pairId,
      image: item.image,
      isFlipped: false,
      isMatched: false,
    })),
    ...cardItems.map((item, index) => ({
      id: index + cardItems.length,
      pairId: item.pairId,
      image: item.image,
      isFlipped: false,
      isMatched: false,
    })),
  ];

  // Shuffle the cards
  return shuffleArray(cards);
}

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Sound effects
export const playMatchSound = () => {
  const audio = document.getElementById("match-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }
};

export const playMismatchSound = () => {
  const audio = document.getElementById("mismatch-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }
};

export const playFlipSound = () => {
  const audio = document.getElementById("flip-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }
};

export const playWinSound = () => {
  const audio = document.getElementById("win-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }
};
