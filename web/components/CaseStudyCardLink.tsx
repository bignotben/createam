"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

// Departure duration for the card before the route actually changes — long
// enough to read as a deliberate "zooming toward the detail" gesture, short
// enough that navigation never feels delayed.
const DEPART_MS = 180;

export function CaseStudyCardLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [departing, setDeparting] = useState(false);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modifier/middle clicks (open in new tab, etc.) and reduced-motion
    // users behave like a normal, unintercepted link — no delay either way.
    if (shouldReduceMotion || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    setDeparting(true);
    setTimeout(() => router.push(href), DEPART_MS);
  }

  return (
    <motion.div
      animate={departing ? { scale: 1.035, opacity: 0.5 } : { scale: 1, opacity: 1 }}
      transition={{ duration: DEPART_MS / 1000, ease: "easeIn" }}
    >
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    </motion.div>
  );
}
