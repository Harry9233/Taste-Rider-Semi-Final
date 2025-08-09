import React, { useState, useEffect } from "react";

/**
 * Typewriter
 * Usage: <Typewriter text="Crafted by Nature, Curated for You" speed={33} />
 */
const Typewriter = ({ text, speed = 33, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setShowCursor(true);

    const reveal = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        setTimeout(reveal, speed);
      }
    };
    reveal();

    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 510);

    return () => clearInterval(cursorBlink);
  }, [text, speed]);

  return (
    <span className={className} style={{ whiteSpace: "pre" }}>
      {displayed}
      <span
        className="typewriter-cursor"
        style={{
          display: "inline-block",
          width: "1ch",
          color: "inherit",
          opacity: showCursor ? 1 : 0,
          fontWeight: 900,
        }}
      >
        |
      </span>
    </span>
  );
};

export default Typewriter;