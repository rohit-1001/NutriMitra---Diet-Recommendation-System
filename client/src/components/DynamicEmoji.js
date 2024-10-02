import React, { useEffect, useState } from "react";

// Custom component for the animated emoji
const AnimatedEmoji = () => {
  const [emoji, setEmoji] = useState("😟"); // Initial emoji

  useEffect(() => {
    const interval = setInterval(() => {
      // Alternate between two emojis to simulate a distressed look
      setEmoji((prev) => (prev === "😟" ? "😢" : "😟"));
    }, 500); // Change every 500ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <span style={{ fontSize: "28px", display: "inline-block" }}>
      {emoji}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-5px);
            }
            60% {
              transform: translateY(-3px);
            }
          }
        `}
      </style>
    </span>
  );
};

export default AnimatedEmoji;
