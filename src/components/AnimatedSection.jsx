 import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * AnimatedSection
 * Animates children (fade-in, slide-up) as they scroll into view.
 * Usage:
 *   <AnimatedSection>...</AnimatedSection>
 */
const AnimatedSection = ({ children, className = "", ...rest }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;