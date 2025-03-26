
// Game card interface
export interface Card {
  id: number;
  pairId: number;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Card data with Danish terms
export const cardItems = [
  { pairId: 1, name: "Trombocyt" },
  { pairId: 2, name: "Rødt blodlegeme" },
  { pairId: 3, name: "Hvidt blodlegeme" },
  { pairId: 4, name: "Virus" },
  { pairId: 5, name: "Petikkier" },
  { pairId: 6, name: "Blodåre" },
  { pairId: 7, name: "Blåt mærke" },
  { pairId: 8, name: "Plaster" },
  { pairId: 9, name: "Læge" },
  { pairId: 10, name: "Hospital" },
];

// Function to initialize a shuffled deck
export function initializeDeck(): Card[] {
  // Create two copies of each card (pairs)
  const cards = [
    ...cardItems.map((item, index) => ({
      id: index,
      pairId: item.pairId,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    })),
    ...cardItems.map((item, index) => ({
      id: index + cardItems.length,
      pairId: item.pairId,
      name: item.name, 
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

// Get icon for a card based on its pair ID
export function getCardIcon(pairId: number) {
  switch (pairId) {
    case 1: return "bandage"; // Trombocyt (platelet)
    case 2: return "droplet"; // Rødt blodlegeme (red blood cell)
    case 3: return "shield"; // Hvidt blodlegeme (white blood cell)
    case 4: return "virus"; // Virus
    case 5: return "droplets"; // Petikkier (petechiae)
    case 6: return "tube"; // Blodåre (blood vessel)
    case 7: return "heart"; // Blåt mærke (bruise)
    case 8: return "bandage"; // Plaster (bandage)
    case 9: return "stethoscope"; // Læge (doctor)
    case 10: return "hospital"; // Hospital
    default: return "help-circle";
  }
}

// Get color for a card based on its pair ID
export function getCardColor(pairId: number) {
  switch (pairId) {
    case 1: return "text-game-platelet"; // Trombocyt
    case 2: return "text-game-blood"; // Rødt blodlegeme
    case 3: return "text-blue-400"; // Hvidt blodlegeme
    case 4: return "text-purple-500"; // Virus
    case 5: return "text-red-500"; // Petikkier
    case 6: return "text-blue-600"; // Blodåre
    case 7: return "text-indigo-500"; // Blåt mærke
    case 8: return "text-green-500"; // Plaster
    case 9: return "text-game-protein"; // Læge
    case 10: return "text-game-antibody"; // Hospital
    default: return "text-gray-500";
  }
}

// Sound effects
export const playMatchSound = () => {
  const audio = document.getElementById("match-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play failed:", e));
  }
};

export const playMismatchSound = () => {
  const audio = document.getElementById("mismatch-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play failed:", e));
  }
};

export const playFlipSound = () => {
  const audio = document.getElementById("flip-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play failed:", e));
  }
};

export const playWinSound = () => {
  const audio = document.getElementById("win-sound") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Audio play failed:", e));
  }
};
