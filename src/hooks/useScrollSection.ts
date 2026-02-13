"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseScrollSectionOptions {
  fadeIn?: boolean;
  fadeOut?: boolean;
}

interface UseScrollSectionReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}

export function useScrollSection({
  fadeIn = true,
  fadeOut = true,
}: UseScrollSectionOptions = {}): UseScrollSectionReturn {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1]
  );

  return { ref, progress: scrollYProgress, opacity };
}
