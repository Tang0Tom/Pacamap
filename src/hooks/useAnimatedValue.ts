"use client";

import { useInView, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseAnimatedValueOptions {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export function useAnimatedValue({
  from = 0,
  to,
  duration = 1.5,
  delay = 0,
  once = true,
}: UseAnimatedValueOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, motionValue, to, delay]);

  return { ref, value: springValue, isInView };
}

export function useScrollDrivenValue(
  progress: MotionValue<number>,
  outputRange: [number, number],
  inputRange: [number, number] = [0, 1]
): MotionValue<number> {
  return useTransform(progress, inputRange, outputRange);
}
