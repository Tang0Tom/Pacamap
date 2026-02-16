"use client";

import Section from "./Section";
import TransitionWrapper from "@/components/ui/TransitionWrapper";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";
import DonutChart from "@/components/charts/DonutChart";
import Card from "@/components/ui/Card";
import InsightCard from "@/components/story/InsightCard";
import { usePacaData } from "@/hooks/usePacaData";
import type { SectorTimeSeries } from "@/types/data";
import { generateTrendInsights } from "@/lib/insights-engine";

export default function SectionHistory() {
  const { data: timeSeries } = usePacaData<SectorTimeSeries[]>(
    "sectors-timeseries.json"
  );

  const donutData = [
    { name: "Services", value: 580000 },
    { name: "Public & Santé", value: 410000 },
    { name: "Commerce & Transport", value: 340000 },
    { name: "Industrie", value: 165000 },
    { name: "Construction", value: 145000 },
    { name: "Agriculture", value: 55000 },
  ];

  // Générer les insights sur les tendances temporelles
  const insights = timeSeries ? generateTrendInsights(timeSeries) : [];

  return (
    <Section id="section-2" theme="light">
      <TransitionWrapper>
        <h2 className="text-3xl md:text-5xl font-bold text-content-text mb-2">
          Il y a 15 Ans
        </h2>
        <p className="text-content-muted mb-8 max-w-xl">
          En 2008, le paysage économique de PACA était dominé par les services,
          mais l&apos;industrie et l&apos;agriculture occupaient encore une place
          significative.
        </p>
      </TransitionWrapper>

      {/* Insights sur les ruptures historiques */}
      {insights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {insights.map((insight, idx) => (
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
              Répartition sectorielle en 2008
            </h3>
            <DonutChart data={donutData} sourceId="insee-flores" height={320} />
          </Card>
        </TransitionWrapper>

        <TransitionWrapper delay={0.4} direction="right">
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-4">
              Évolution 2008 — 2022
            </h3>
            {timeSeries && (
              <TimeSeriesChart
                series={timeSeries}
                sourceId="dares"
                height={320}
              />
            )}
          </Card>
        </TransitionWrapper>
      </div>
    </Section>
  );
}
