"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// Settles in from a slight zoom, echoing the departing card's scale-up on
// /radovi (see CaseStudyCardLink) — reads as one continuous gesture rather
// than a generic scroll-reveal. Always plays on mount rather than on
// scroll-into-view, since it's used for above-the-fold hero images.
// reveal-item still gives it the sitewide prefers-reduced-motion opt-out.
export function HeroArrival({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="reveal-item"
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
