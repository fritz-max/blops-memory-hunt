
export type ItemType = 'blood' | 'protein' | 'antibody' | 'virus';

export interface FallingItem {
  id: string;
  type: ItemType;
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
}

export const isGoodItem = (type: ItemType): boolean => {
  return type === 'blood' || type === 'protein';
};

export const getItemName = (type: ItemType): string => {
  switch (type) {
    case 'blood':
      return 'Røde blodlegemer';
    case 'protein':
      return 'Proteiner';
    case 'antibody':
      return 'Antistoffer';
    case 'virus':
      return 'Virus';
  }
};

export const getItemColor = (type: ItemType): string => {
  switch (type) {
    case 'blood':
      return 'game-blood';
    case 'protein':
      return 'game-protein';
    case 'antibody':
      return 'game-antibody';
    case 'virus':
      return 'game-virus';
  }
};

export const generateRandomItem = (canvasWidth: number, score: number): FallingItem => {
  const types: ItemType[] = ['blood', 'protein', 'antibody', 'virus'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  // Item size (smaller on mobile)
  const isMobile = window.innerWidth < 768;
  const itemWidth = isMobile ? 50 : 70;
  const itemHeight = isMobile ? 50 : 70;
  
  // Ensure the item is fully within the canvas boundaries
  const maxX = canvasWidth - itemWidth;
  const randomX = Math.floor(Math.random() * maxX);
  
  // Calculate speed based on score
  const baseSpeed = 1;
  const speedMultiplier = 0.05;
  const speed = baseSpeed + (score * speedMultiplier);
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    type: randomType,
    x: randomX,
    y: -itemHeight, // Start above the canvas
    speed,
    width: itemWidth,
    height: itemHeight
  };
};

export const checkCollision = (
  characterX: number, 
  characterY: number, 
  characterWidth: number,
  item: FallingItem
): boolean => {
  // Simple rectangular collision detection
  return (
    characterX < item.x + item.width &&
    characterX + characterWidth > item.x &&
    characterY < item.y + item.height &&
    characterY + characterWidth > item.y
  );
};
