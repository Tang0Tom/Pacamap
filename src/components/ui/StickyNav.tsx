"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION_TITLES } from "@/lib/constants";

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = SECTION_TITLES.map((_, i) =>
      document.getElementById(`section-${i}`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s === entry.target);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {SECTION_TITLES.map((title, i) => (
        <a
          key={i}
          href={`#section-${i}`}
          className="group flex items-center gap-3 justify-end"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span
            className={cn(
              "text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap px-3 py-1.5 rounded-md",
              activeSection === i
                ? "text-accent-primary opacity-100 bg-accent-primary/5 backdrop-blur-sm"
                : "text-content-muted group-hover:bg-content-text/5"
            )}
          >
            {title}
          </span>
          <motion.div
            className={cn(
              "w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-sm",
              activeSection === i
                ? "bg-accent-primary border-accent-primary shadow-accent-primary/30 shadow-lg"
                : "bg-transparent border-content-muted/40 group-hover:border-accent-primary/50"
            )}
            animate={activeSection === i ? { scale: 1.3 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </a>
      ))}
    </nav>
  );
}
