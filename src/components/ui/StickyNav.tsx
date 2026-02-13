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
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
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
              "text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",
              activeSection === i ? "text-accent-primary" : "text-nav-muted"
            )}
          >
            {title}
          </span>
          <motion.div
            className={cn(
              "w-2.5 h-2.5 rounded-full border-2 transition-colors",
              activeSection === i
                ? "bg-accent-primary border-accent-primary"
                : "bg-transparent border-nav-muted"
            )}
            animate={activeSection === i ? { scale: 1.2 } : { scale: 1 }}
          />
        </a>
      ))}
    </nav>
  );
}
