import React from "react";
import { FallingItem as FallingItemType } from "@/utils/catchGameUtils";

interface FallingItemProps {
  item: FallingItemType;
}

const FallingItem: React.FC<FallingItemProps> = ({ item }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={item.image}
        alt={item.type}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}
      />
    </div>
  );
};

export default FallingItem;
