"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, AlertCircle, BarChart3, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DetailedInsight } from "@/lib/advanced-analytics";

interface DetailedAnalysisPanelProps {
  insight: DetailedInsight | null;
  onClose: () => void;
}

export default function DetailedAnalysisPanel({
  insight,
  onClose,
}: DetailedAnalysisPanelProps) {
  return (
    <AnimatePresence>
      {insight && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-gradient-to-br from-white to-slate-50 shadow-2xl z-[101] overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {insight.title}
                  </h2>
                  <p className="text-lg text-accent-primary font-medium">
                    {insight.summary}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              {/* Diagnostic */}
              {insight.diagnosis.length > 0 && (
                <Section
                  title="Diagnostic Multi-Factoriel"
                  icon={BarChart3}
                  iconColor="text-cyan-600"
                >
                  <ul className="space-y-2">
                    {insight.diagnosis.map((diag, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{diag}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Ruptures historiques */}
              {insight.breakpoints.length > 0 && (
                <Section
                  title="Ruptures Historiques"
                  icon={AlertCircle}
                  iconColor="text-orange-600"
                >
                  <div className="space-y-4">
                    {insight.breakpoints.map((bp, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-4 border-l-4 border-l-orange-500 shadow-sm"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-orange-900 text-lg">
                            {bp.year}
                          </span>
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full uppercase">
                            {bp.type}
                          </span>
                        </div>
                        <p className="font-medium text-slate-900 mb-1">
                          {bp.description}
                        </p>
                        <p className="text-sm text-slate-600">
                          Impact : {bp.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Corrélations */}
              {insight.correlations.length > 0 && (
                <Section
                  title="Corrélations Statistiques"
                  icon={TrendingUp}
                  iconColor="text-indigo-600"
                >
                  <div className="space-y-3">
                    {insight.correlations.map((corr, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold font-mono text-indigo-900">
                              {corr.coefficient > 0 ? "+" : ""}
                              {corr.coefficient.toFixed(2)}
                            </span>
                            <span
                              className={cn(
                                "px-2 py-0.5 text-xs font-bold rounded-full uppercase",
                                corr.strength === "forte"
                                  ? "bg-indigo-600 text-white"
                                  : corr.strength === "modérée"
                                    ? "bg-indigo-300 text-indigo-900"
                                    : "bg-indigo-100 text-indigo-700"
                              )}
                            >
                              {corr.strength}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-1">
                          <span className="font-semibold">{corr.variable1}</span>{" "}
                          ↔{" "}
                          <span className="font-semibold">{corr.variable2}</span>
                        </p>
                        <p className="text-sm text-slate-600">
                          {corr.interpretation}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Impact territorial */}
              {insight.territorialImpact.length > 0 && (
                <Section
                  title="Impact Territorial"
                  icon={Map}
                  iconColor="text-emerald-600"
                >
                  <ul className="space-y-2">
                    {insight.territorialImpact.map((impact, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-700 bg-emerald-50 rounded-lg p-3"
                      >
                        <Map className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{impact}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Conséquences croisées */}
              {insight.crossConsequences.length > 0 && (
                <Section
                  title="Conséquences Croisées"
                  icon={TrendingDown}
                  iconColor="text-rose-600"
                >
                  <ul className="space-y-2">
                    {insight.crossConsequences.map((consequence, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        <span className="text-rose-500 font-bold shrink-0">
                          →
                        </span>
                        <span className="leading-relaxed">{consequence}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Comparaison nationale */}
              {insight.comparisonNational && (
                <div className="mt-8 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white">
                  <p className="text-sm font-medium opacity-90 mb-1">
                    Comparaison Nationale
                  </p>
                  <p className="text-lg font-bold">
                    {insight.comparisonNational}
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// Composant Section réutilisable
interface SectionProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, iconColor, children }: SectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={cn("w-5 h-5", iconColor)} strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}
