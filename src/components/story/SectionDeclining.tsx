"use client";

import Section from "./Section";
import TransitionWrapper from "@/components/ui/TransitionWrapper";
import GrowthChart from "@/components/charts/GrowthChart";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";
import Card from "@/components/ui/Card";
import InsightCard from "@/components/story/InsightCard";
import { usePacaData } from "@/hooks/usePacaData";
import type { SectorChange } from "@/types/data";
import { generateSectorInsights } from "@/lib/insights-engine";
import { TrendingDown } from "lucide-react";

export default function SectionDeclining() {
  const { data: declining } = usePacaData<SectorChange[]>(
    "declining-sectors.json"
  );

  const growthData =
    declining?.map((s) => ({ name: s.label, change: s.change })) ?? [];

  const trendSeries =
    declining?.map((s) => ({
      sector: s.sector,
      label: s.label,
      data: s.trend,
    })) ?? [];

  // Générer les insights automatiques
  const insights = declining ? generateSectorInsights(declining, "declining") : [];

  return (
    <Section id="section-3" theme="light">
      <TransitionWrapper>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-accent-decline" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-content-text">
            Les Métiers Qui Disparaissent
          </h2>
        </div>
        <p className="text-content-muted mb-8 max-w-xl">
          En 15 ans, l&apos;agriculture, l&apos;industrie et la construction ont
          perdu des dizaines de milliers d&apos;emplois en PACA. Une mutation
          profonde du tissu économique régional.
        </p>
      </TransitionWrapper>

      {/* Insights automatiques - Contextualisation */}
      {insights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {insights.slice(0, 2).map((insight, idx) => (
            <TransitionWrapper key={idx} delay={0.1 + idx * 0.1}>
              <InsightCard insight={insight} />
            </TransitionWrapper>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransitionWrapper delay={0.2}>
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-4">
              Variation 2008 — 2022
            </h3>
            <GrowthChart data={growthData} sourceId="dares" height={280} />
          </Card>
        </TransitionWrapper>

        <TransitionWrapper delay={0.4} direction="right">
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-4">
              Courbes de déclin
            </h3>
            {trendSeries.length > 0 && (
              <TimeSeriesChart
                series={trendSeries}
                sourceId="insee-flores"
                height={280}
              />
            )}
          </Card>
        </TransitionWrapper>
      </div>

      {declining && declining.length > 0 && (
        <TransitionWrapper delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {declining.map((sector) => (
              <Card key={sector.sector} className="text-center">
                <p className="text-2xl font-bold font-mono text-accent-decline">
                  {sector.change > 0 ? "+" : ""}
                  {sector.change}%
                </p>
                <p className="text-sm text-content-muted mt-1">
                  {sector.label}
                </p>
                <p className="text-xs text-content-muted font-mono mt-1">
                  {Math.abs(sector.absoluteChange).toLocaleString("fr-FR")}{" "}
                  emplois perdus
                </p>
              </Card>
            ))}
          </div>
        </TransitionWrapper>
      )}
    </Section>
  );
}
