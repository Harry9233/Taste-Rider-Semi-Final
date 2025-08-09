import React, { useState, useEffect } from "react";

/**
 * BackgroundEffect
 * A super-light background effect component.
 * Absolutely positioned, pointer-events-none & faded for subtlety.
 */
const BackgroundEffect = () => {
  const [topOffset, setTopOffset] = useState(100);
  
  useEffect(() => {
    const updateTopOffset = () => {
      if (window.innerWidth < 640) { 
        setTopOffset(80); // Mobile header height
      } else if (window.innerWidth < 768) { 
        setTopOffset(90); // Small tablet header height
      } else {
        setTopOffset(100); // Desktop header height
      }
    };
    
    updateTopOffset();
    window.addEventListener('resize', updateTopOffset);
    return () => window.removeEventListener('resize', updateTopOffset);
  }, []);
  
  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none w-full select-none"
      style={{
        opacity: 0.11,
        mixBlendMode: "multiply",
        background: "none",
        top: `${topOffset}px`, // Dynamic top offset based on header height
        bottom: "150px", // Leave space for the footer wave
        left: 0,
        right: 0,
        zIndex: 0
      }}
    >
      <div className="w-full h-full bg-amber-100/20"></div>
    </div>
  );
};

export default BackgroundEffect;