"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    return scrollY.on("change", (v) => setIsScrolled(v > 50));
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors",
        isScrolled ? "backdrop-blur-md" : ""
      )}
      style={{
        backgroundColor: `rgba(5, 5, 5, ${isScrolled ? 0.95 : 0})`,
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-nav-text">
          <MapPin className="w-5 h-5 text-accent-primary" />
          <span className="font-mono text-sm font-bold tracking-wider">
            MAPSTORY PACA
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/explorer"
            className="text-nav-muted hover:text-nav-text transition-colors"
          >
            Explorer
          </Link>
          <Link
            href="/sources"
            className="text-nav-muted hover:text-nav-text transition-colors"
          >
            Sources
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
