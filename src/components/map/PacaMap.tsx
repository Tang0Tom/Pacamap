"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { GeoJSONFeature } from "@/types/geo";

const PacaMapClient = dynamic(() => import("./PacaMapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-content-muted text-sm">Chargement de la carte...</span>
    </div>
  ),
});

export interface ChoroplethConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  valueAccessor: (feature: GeoJSONFeature) => number;
  min: number;
  max: number;
  scale?: readonly string[];
  onFeatureClick?: (feature: GeoJSONFeature) => void;
  onFeatureHover?: (feature: GeoJSONFeature | null) => void;
}

interface PacaMapProps {
  className?: string;
  zoom?: number;
  interactive?: boolean;
  choropleth?: ChoroplethConfig;
}

export default function PacaMap({
  className,
  zoom,
  interactive,
  choropleth,
}: PacaMapProps) {
  return (
    <div className={cn("relative", className)}>
      <PacaMapClient
        zoom={zoom}
        interactive={interactive}
        choropleth={choropleth}
      />
    </div>
  );
}
