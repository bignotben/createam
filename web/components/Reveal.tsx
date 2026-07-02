"use client";

import type { ElementType, ReactNode } from "react";
import { motion } from "motion/react";

type Tag = "div" | "section" | "li" | "article";

const TAGS: Record<Tag, ElementType> = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
};

// Sitewide scroll-reveal timing. Kept in one place so every <Reveal> /
// <RevealGroup> animates identically. prefers-reduced-motion is handled
// globally in globals.css (.reveal-item gets forced to its final state),
// not per-component.
const TRANSITION = { duration: 0.55, ease: "easeOut" as const };
const VIEWPORT = { once: true, margin: "-80px" } as const;

type RevealProps = {
  as?: Tag;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ as = "div", children, className, delay = 0 }: RevealProps) {
  const Component = TAGS[as];
  return (
    <Component
      className={className ? `reveal-item ${className}` : "reveal-item"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...TRANSITION, delay }}
    >
      {children}
    </Component>
  );
}

const groupVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: TRANSITION },
};

type RevealGroupProps = {
  as?: Tag;
  children: ReactNode;
  className?: string;
};

export function RevealGroup({ as = "div", children, className }: RevealGroupProps) {
  const Component = TAGS[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={groupVariants}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  as?: Tag;
  children: ReactNode;
  className?: string;
};

// A named export rather than `RevealGroup.Item` — Next.js's "use client"
// boundary replaces client exports with reference stubs that don't carry
// arbitrary static properties across the server/client module boundary.
export function RevealItem({ as = "div", children, className }: RevealItemProps) {
  const Component = TAGS[as];
  return (
    <Component
      className={className ? `reveal-item ${className}` : "reveal-item"}
      variants={itemVariants}
    >
      {children}
    </Component>
  );
}
