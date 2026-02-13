"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SectionExplore() {
  return (
    <Section id="section-6" theme="dark" height="h-[200vh]" fadeOut={false}>
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          viewport={{ once: true }}
        >
          <MapPin className="w-8 h-8 text-accent-primary" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-nav-text mb-6">
          Explorez Vous-Même
        </h2>

        <p className="text-lg md:text-xl text-nav-muted max-w-2xl leading-relaxed mb-12">
          Plongez dans les données : cliquez sur un département, filtrez par
          secteur, comparez les territoires. Toutes les données sont à portée
          de clic.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/explorer"
            className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Ouvrir l&apos;explorateur
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/sources"
            className="inline-flex items-center gap-2 border border-nav-muted/30 hover:border-nav-muted/60 text-nav-muted hover:text-nav-text px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Voir les sources
          </Link>
        </div>
      </div>
    </Section>
  );
}
