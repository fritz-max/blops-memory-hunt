import React from "react";
import {
  FallingItem as FallingItemType,
  getItemName,
  getItemColor,
} from "@/utils/catchGameUtils";

interface FallingItemProps {
  item: FallingItemType;
}

const FallingItem: React.FC<FallingItemProps> = ({ item }) => {
  const getItemColor = (type: string) => {
    switch (type) {
      case "blood":
        return "#E53E3E"; // Red
      case "protein":
        return "#48BB78"; // Green
      case "antibody":
        return "#D53F8C"; // Pink/Purple (more red-based)
      case "virus":
        return "#DD6B20"; // Orange (more red-based)
      default:
        return "#FFFFFF"; // White
    }
  };

  const renderItemContent = () => {
    const bgColor = getItemColor(item.type);

    if (item.type === "blood" || item.type === "virus") {
      // Circle shapes for blood and virus
      return (
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "50%",
              backgroundColor: bgColor,
              border: "2px solid #333333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "pulse 1.5s infinite alternate",
            }}
          >
            {item.type === "virus" ? (
              // Add spikes for virus
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "24%",
                    height: "10%",
                    backgroundColor: "#3388DD",
                    transformOrigin: "center",
                    transform: `rotate(${i * 45}deg) translateX(100%)`,
                  }}
                />
              ))
            ) : (
              // Add highlight for blood
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "40%",
                  height: "40%",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              />
            )}
          </div>
        </div>
      );
    } else {
      // Rectangle for protein and antibody
      return (
        <div className="w-full h-full relative">
          <div
            style={{
              position: "absolute",
              inset: "2px",
              borderRadius: "8px",
              backgroundColor: bgColor,
              border: "2px solid #333333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "scale 1.5s infinite alternate",
            }}
          >
            {item.type === "antibody" ? (
              // Y-shape for antibody
              <>
                <div
                  style={{
                    position: "absolute",
                    width: "20%",
                    height: "80%",
                    backgroundColor: "#8866DD",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "20%",
                    height: "40%",
                    top: "0",
                    left: "25%",
                    backgroundColor: "#8866DD",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "20%",
                    height: "40%",
                    top: "0",
                    right: "25%",
                    backgroundColor: "#8866DD",
                    borderRadius: "4px",
                  }}
                />
              </>
            ) : (
              // Cross pattern for protein
              <>
                <div
                  style={{
                    position: "absolute",
                    width: "20%",
                    height: "80%",
                    backgroundColor: "#35AA65",
                    borderRadius: "4px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "80%",
                    height: "20%",
                    backgroundColor: "#35AA65",
                    borderRadius: "4px",
                  }}
                />
              </>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${item.x}px`,
        top: `${item.y}px`,
        width: `${item.width}px`,
        height: `${item.height + 20}px`, // Extra space for the label
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: `${item.width}px`,
          height: `${item.height}px`,
        }}
      >
        {renderItemContent()}
      </div>
      <div
        style={{
          marginTop: "4px",
          color: "white",
          fontSize: "12px",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "0 0 4px black, 0 0 2px black",
          width: "100%",
        }}
      >
        {getItemName(item.type)}
      </div>
    </div>
  );
};

export default FallingItem;
