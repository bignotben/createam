"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Zero-duration rather than skipping the wrapper entirely: AnimatePresence
  // still resolves the exit -> enter handoff, but on the next frame, so
  // navigation reads as instant with no structural branching to keep in sync.
  const exit = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.15, ease: "easeIn" as const };
  const enter = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" as const };

  return (
    // popLayout (not "wait"): the exiting page is popped out of flow and
    // positioned absolutely the instant it starts leaving, so the incoming
    // page occupies normal flow immediately instead of the content area
    // collapsing to zero height for the exit's duration — which would
    // otherwise yank the footer up and back down (a CLS regression this
    // task explicitly rules out).
    <div className="relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: enter }}
          exit={{ opacity: 0, y: -6, transition: exit }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
