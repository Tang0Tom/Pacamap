"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/charts/AnimatedCounter";
import Section from "./Section";

export default function SectionIntro() {
  return (
    <Section id="section-0" theme="dark" height="h-[250vh]" fadeIn={false}>
      <div className="flex flex-col items-center text-center">
        <motion.p
          className="text-nav-muted font-mono text-sm tracking-widest uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Scrollytelling interactif
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-nav-text">L&apos;Emploi</span>
          <span className="block text-accent-primary">en PACA</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-nav-muted max-w-2xl leading-relaxed mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Comment le paysage économique de la région Provence-Alpes-Côte d&apos;Azur
          s&apos;est transformé en 15 ans. Quels métiers disparaissent, lesquels
          émergent.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <AnimatedCounter value={1842000} label="Emplois salariés" delay={1} />
          <AnimatedCounter value={5098000} label="Habitants" delay={1.2} />
          <AnimatedCounter value={245000} label="Établissements" delay={1.4} />
          <AnimatedCounter
            value={8.9}
            suffix="%"
            label="Taux de chômage"
            decimals={1}
            delay={1.6}
          />
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center gap-2 text-nav-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <p className="text-sm font-mono">Scrollez pour explorer</p>
          <motion.div
            className="w-5 h-8 border-2 border-nav-muted rounded-full flex justify-center pt-1.5"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-nav-muted rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
