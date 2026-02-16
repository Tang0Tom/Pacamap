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
import { TrendingUp } from "lucide-react";

export default function SectionEmerging() {
  const { data: emerging } = usePacaData<SectorChange[]>(
    "emerging-sectors.json"
  );

  const growthData =
    emerging?.map((s) => ({ name: s.label, change: s.change })) ?? [];

  const trendSeries =
    emerging?.map((s) => ({
      sector: s.sector,
      label: s.label,
      data: s.trend,
    })) ?? [];

  // Générer les insights automatiques (positifs)
  const insights = emerging ? generateSectorInsights(emerging, "emerging") : [];

  return (
    <Section id="section-4" theme="light">
      <TransitionWrapper>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent-growth" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-content-text">
            Les Métiers Qui Émergent
          </h2>
        </div>
        <p className="text-content-muted mb-8 max-w-xl">
          Les services aux entreprises, le numérique et la santé tirent
          la croissance de l&apos;emploi. La Côte d&apos;Azur et Marseille en
          tête de la transformation.
        </p>
      </TransitionWrapper>

      {/* Insights automatiques - Croissance */}
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
              Croissance 2008 — 2022
            </h3>
            <GrowthChart data={growthData} sourceId="france-travail" height={250} />
          </Card>
        </TransitionWrapper>

        <TransitionWrapper delay={0.4} direction="right">
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-4">
              Courbes de croissance
            </h3>
            {trendSeries.length > 0 && (
              <TimeSeriesChart
                series={trendSeries}
                sourceId="dares"
                height={250}
              />
            )}
          </Card>
        </TransitionWrapper>
      </div>

      {emerging && emerging.length > 0 && (
        <TransitionWrapper delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {emerging.map((sector) => (
              <Card key={sector.sector}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-content-text">
                      {sector.label}
                    </p>
                    <p className="text-sm text-content-muted mt-1">
                      +{sector.absoluteChange.toLocaleString("fr-FR")} emplois
                      créés
                    </p>
                  </div>
                  <span className="text-2xl font-bold font-mono text-accent-growth">
                    +{sector.change}%
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  {sector.topDepartments.map((dept) => (
                    <span
                      key={dept.code}
                      className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-mono"
                    >
                      {dept.name}: +{dept.change}%
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TransitionWrapper>
      )}
    </Section>
  );
}
