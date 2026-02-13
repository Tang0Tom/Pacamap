"use client";

import { useState, useCallback } from "react";
import Section from "./Section";
import TransitionWrapper from "@/components/ui/TransitionWrapper";
import PacaMap from "@/components/map/PacaMap";
import MapLegend from "@/components/map/MapLegend";
import SectorBarChart from "@/components/charts/SectorBarChart";
import SourceBadge from "@/components/ui/SourceBadge";
import Card from "@/components/ui/Card";
import { usePacaData } from "@/hooks/usePacaData";
import { CHOROPLETH_BLUES } from "@/lib/colors";
import { PACA_DEPARTMENTS } from "@/lib/constants";
import type { PacaOverview } from "@/types/data";
import type { GeoJSONFeature, GeoJSONCollection } from "@/types/geo";

export default function SectionOverview() {
  const { data: overview } = usePacaData<PacaOverview>("paca-overview.json");
  const { data: geoData } = usePacaData<GeoJSONCollection>("geo/departements.json");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const selectedData = overview?.departments.find(
    (d) => d.code === selectedDept
  );

  const barData = selectedData
    ? selectedData.topSectors.map((s) => ({
        name: s.label,
        value: s.value,
      }))
    : overview
    ? [
        { name: "Services", value: 705600 },
        { name: "Public & Santé", value: 459100 },
        { name: "Commerce", value: 294600 },
        { name: "Industrie", value: 128200 },
        { name: "Construction", value: 119500 },
        { name: "Agriculture", value: 35000 },
      ]
    : [];

  const valueAccessor = useCallback(
    (f: GeoJSONFeature) => {
      const dept = overview?.departments.find(
        (d) => d.code === f.properties.code
      );
      return dept?.employment ?? 0;
    },
    [overview]
  );

  const handleFeatureClick = useCallback((f: GeoJSONFeature) => {
    setSelectedDept(f.properties.code);
  }, []);

  return (
    <Section id="section-1" theme="light">
      <TransitionWrapper>
        <h2 className="text-3xl md:text-5xl font-bold text-content-text mb-2">
          La Région
        </h2>
        <p className="text-content-muted mb-8 max-w-xl">
          6 départements, du littoral méditerranéen aux sommets alpins.
          Cliquez sur un département pour voir sa répartition sectorielle.
        </p>
      </TransitionWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransitionWrapper delay={0.2}>
          <Card className="relative h-[400px] md:h-[500px] overflow-hidden">
            {geoData && (
              <PacaMap
                className="h-full"
                interactive={false}
                choropleth={{
                  data: geoData,
                  valueAccessor,
                  min: 38000,
                  max: 742000,
                  scale: CHOROPLETH_BLUES,
                  onFeatureClick: handleFeatureClick,
                }}
              />
            )}
            <MapLegend
              title="Emploi salarié"
              scale={CHOROPLETH_BLUES}
              min={38000}
              max={742000}
              className="absolute bottom-4 left-4 z-[1000]"
            />
            <SourceBadge
              sourceId="geo-api"
              className="absolute bottom-4 right-4 z-[1000] bg-white/80 px-2 py-1 rounded"
            />
          </Card>
        </TransitionWrapper>

        <TransitionWrapper delay={0.4} direction="right">
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-1">
              {selectedDept
                ? PACA_DEPARTMENTS[selectedDept as keyof typeof PACA_DEPARTMENTS]
                : "Région PACA"}
            </h3>
            <p className="text-sm text-content-muted mb-4">
              Répartition de l&apos;emploi par secteur
              {selectedData && (
                <span className="ml-2 font-mono text-accent-primary">
                  {selectedData.employment.toLocaleString("fr-FR")} emplois
                </span>
              )}
            </p>
            <SectorBarChart data={barData} sourceId="insee-flores" height={350} />
          </Card>
        </TransitionWrapper>
      </div>
    </Section>
  );
}
