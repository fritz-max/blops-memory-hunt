
import React, { useRef, useEffect, useState } from "react";

interface CharacterProps {
  position: { x: number, y: number };
  size: number;
}

const Character: React.FC<CharacterProps> = ({ position, size }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="character"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        borderRadius: '50%',
        backgroundColor: '#FF9D80', // Warmer color for the character
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Highlight effect */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
      />
      
      {/* Left eye */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          backgroundColor: '#000',
          animation: 'pulse 1.5s ease-in-out infinite alternate'
        }}
      />
      
      {/* Right eye */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          right: '30%',
          width: '20%',
          height: '20%',
          borderRadius: '50%',
          backgroundColor: '#000',
          animation: 'pulse 1.5s ease-in-out infinite alternate'
        }}
      />
      
      {/* Mouth */}
      <div 
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '25%',
          width: '50%',
          height: '10%',
          borderRadius: '50%',
          backgroundColor: '#000'
        }}
      />
    </div>
  );
};

export default Character;
