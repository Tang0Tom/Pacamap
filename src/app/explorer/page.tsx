"use client";

import { useState, useCallback } from "react";
import NavigationBar from "@/components/ui/NavigationBar";
import PacaMap from "@/components/map/PacaMap";
import MapLegend from "@/components/map/MapLegend";
import Card from "@/components/ui/Card";
import SectorBarChart from "@/components/charts/SectorBarChart";
import SourceBadge from "@/components/ui/SourceBadge";
import { usePacaData } from "@/hooks/usePacaData";
import { CHOROPLETH_BLUES } from "@/lib/colors";
import { PACA_DEPARTMENTS, SECTOR_GROUPS } from "@/lib/constants";
import type { PacaOverview, DepartmentComparison } from "@/types/data";
import type { GeoJSONFeature, GeoJSONCollection } from "@/types/geo";
import { X, Filter, MapPin } from "lucide-react";

type MetricKey = "employment" | "unemployment" | "growth";

export default function ExplorerPage() {
  const { data: overview } = usePacaData<PacaOverview>("paca-overview.json");
  const { data: departments } = usePacaData<DepartmentComparison[]>("departments-comparison.json");
  const { data: geoData } = usePacaData<GeoJSONCollection>("geo/departements.json");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [metric, setMetric] = useState<MetricKey>("employment");

  const selectedOverview = overview?.departments.find(
    (d) => d.code === selectedDept
  );
  const selectedComparison = departments?.find(
    (d) => d.code === selectedDept
  );

  const getMetricValue = useCallback(
    (code: string): number => {
      if (metric === "employment") {
        return overview?.departments.find((d) => d.code === code)?.employment ?? 0;
      }
      if (metric === "unemployment") {
        return overview?.departments.find((d) => d.code === code)?.unemploymentRate ?? 0;
      }
      return departments?.find((d) => d.code === code)?.growthRate ?? 0;
    },
    [metric, overview, departments]
  );

  const metricConfig = {
    employment: { label: "Emploi salarié", min: 38000, max: 742000, unit: "" },
    unemployment: { label: "Taux de chômage", min: 7, max: 11, unit: "%" },
    growth: { label: "Croissance (%)", min: -3, max: 6, unit: "%" },
  };

  const config = metricConfig[metric];

  const sectorData = selectedComparison
    ? Object.entries(selectedComparison.sectors).map(([key, val]) => ({
        name: SECTOR_GROUPS[key as keyof typeof SECTOR_GROUPS]?.label ?? key,
        value: val,
      }))
    : [];

  const valueAccessor = useCallback(
    (f: GeoJSONFeature) => getMetricValue(f.properties.code),
    [getMetricValue]
  );

  const handleFeatureClick = useCallback((f: GeoJSONFeature) => {
    setSelectedDept(f.properties.code);
  }, []);

  return (
    <div className="min-h-screen bg-content-bg">
      <NavigationBar />
      <div className="pt-16 flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-full lg:w-96 bg-white border-r border-gray-100 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-4 h-4 text-content-muted" />
            <h2 className="font-semibold text-content-text">Filtres</h2>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-content-text block mb-2">
              Indicateur
            </label>
            <div className="flex flex-col gap-2">
              {(Object.keys(metricConfig) as MetricKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setMetric(key)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    metric === key
                      ? "bg-accent-primary text-white"
                      : "bg-gray-50 text-content-text hover:bg-gray-100"
                  }`}
                >
                  {metricConfig[key].label}
                </button>
              ))}
            </div>
          </div>

          {selectedDept && selectedOverview ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-content-text text-lg">
                  {PACA_DEPARTMENTS[selectedDept as keyof typeof PACA_DEPARTMENTS]}
                </h3>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="text-content-muted hover:text-content-text"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <Card className="p-3">
                  <p className="text-xs text-content-muted">Emploi</p>
                  <p className="text-lg font-bold font-mono text-accent-primary">
                    {selectedOverview.employment.toLocaleString("fr-FR")}
                  </p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-content-muted">Chômage</p>
                  <p className="text-lg font-bold font-mono text-accent-decline">
                    {selectedOverview.unemploymentRate}%
                  </p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-content-muted">Population</p>
                  <p className="text-lg font-bold font-mono">
                    {selectedOverview.population.toLocaleString("fr-FR")}
                  </p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-content-muted">Établissements</p>
                  <p className="text-lg font-bold font-mono">
                    {selectedOverview.establishments.toLocaleString("fr-FR")}
                  </p>
                </Card>
              </div>

              {sectorData.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-content-text mb-3">
                    Répartition sectorielle
                  </h4>
                  <SectorBarChart data={sectorData} height={250} />
                </div>
              )}

              <SourceBadge sourceId="insee-flores" className="mt-4" />
            </div>
          ) : (
            <div className="text-center py-12 text-content-muted">
              <MapPin className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                Cliquez sur un département pour voir ses données
              </p>
            </div>
          )}
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          {geoData && (
            <PacaMap
              className="h-full"
              interactive
              zoom={9}
              choropleth={{
                data: geoData,
                valueAccessor,
                min: config.min,
                max: config.max,
                scale: CHOROPLETH_BLUES,
                onFeatureClick: handleFeatureClick,
              }}
            />
          )}
          <MapLegend
            title={config.label}
            scale={CHOROPLETH_BLUES}
            min={config.min}
            max={config.max}
            unit={config.unit}
            className="absolute bottom-6 left-6 z-[1000]"
          />
        </div>
      </div>
    </div>
  );
}
