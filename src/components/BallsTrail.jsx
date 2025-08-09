import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// COLORS inspired by spices
const BALL_COLORS = [
  "#FDAF17", // turmeric/yellow
  "#E57539", // chili/orange
  "#B74727", // paprika/red
  "#866C4F", // cumin/brown
  "#44B883"  // coriander/green
];

const BALL_COUNT = 12;

export default function BallsTrail({ show }) {
  const controls = useAnimation();
  const trailRef = useRef(null);

  useEffect(() => {
    if (show) {
      controls.start((i) => ({
        x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 240, 0],
        y: [0, -120 - i * 16, -180 - i * 24, -250 - i * 5],
        opacity: [0, 1, 1, 0],
        transition: {
          duration: 1.5,
          delay: i * 0.09
        }
      }));
    } else {
      controls.set({ opacity: 0, y: 0, x: 0 });
    }
  }, [show, controls]);

  return (
    <div
      ref={trailRef}
      className="fixed bottom-6 left-0 w-full pointer-events-none z-[80] flex items-end justify-center"
      style={{ height: 0 }}
    >
      {/* Animate a trail of spice balls */}
      {[...Array(BALL_COUNT)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          initial={{ opacity: 0, y: 0, x: 0 }}
          className="w-5 h-5 rounded-full absolute"
          style={{
            background: BALL_COLORS[i % BALL_COLORS.length],
            left: `calc(48% + ${(i - BALL_COUNT / 2) * 42}px)`,
            boxShadow: `0 0 16px 2px ${BALL_COLORS[i % BALL_COLORS.length]}99`,
            zIndex: 85
          }}
        />
      ))}
    </div>
  );
}