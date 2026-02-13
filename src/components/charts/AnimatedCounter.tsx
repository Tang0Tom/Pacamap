"use client";

import { useAnimatedValue } from "@/hooks/useAnimatedValue";
import { motion, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  decimals?: number;
  delay?: number;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  className,
  decimals = 0,
  delay = 0,
}: AnimatedCounterProps) {
  const { ref, value: springValue, isInView } = useAnimatedValue({
    to: value,
    delay,
  });

  const display = useTransform(springValue, (v) => {
    if (decimals > 0) {
      return v.toFixed(decimals);
    }
    return Math.round(v).toLocaleString("fr-FR");
  });

  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-baseline justify-center gap-1">
        {prefix && (
          <span className="text-2xl md:text-3xl font-bold">{prefix}</span>
        )}
        <motion.span
          ref={ref}
          className="text-4xl md:text-6xl font-bold font-mono tabular-nums"
        >
          {display}
        </motion.span>
        {suffix && (
          <span className="text-xl md:text-2xl font-bold text-nav-muted">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-sm md:text-base text-nav-muted mt-2 uppercase tracking-wider font-mono">
        {label}
      </p>
    </div>
  );
}
