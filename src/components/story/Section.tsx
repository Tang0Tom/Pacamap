"use client";

import { useScrollSection } from "@/hooks/useScrollSection";
import { motion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode | ((progress: MotionValue<number>) => React.ReactNode);
  id: string;
  theme?: "dark" | "light";
  className?: string;
  height?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

export default function Section({
  children,
  id,
  theme = "light",
  className,
  height = "h-[300vh]",
  fadeIn = true,
  fadeOut = true,
}: SectionProps) {
  const { ref, progress, opacity } = useScrollSection({ fadeIn, fadeOut });

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative",
        height,
        theme === "dark" ? "section-dark" : "section-light",
        className
      )}
    >
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          {typeof children === "function"
            ? children(progress)
            : children}
        </div>
      </motion.div>
    </section>
  );
}
