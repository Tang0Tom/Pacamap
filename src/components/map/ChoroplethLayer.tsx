"use client";

import { GeoJSON } from "react-leaflet";
import type { Layer, PathOptions } from "leaflet";
import type { GeoJSONFeature } from "@/types/geo";
import { getChoroplethColor, CHOROPLETH_BLUES } from "@/lib/colors";

interface ChoroplethLayerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  valueAccessor: (feature: GeoJSONFeature) => number;
  min: number;
  max: number;
  scale?: readonly string[];
  onFeatureClick?: (feature: GeoJSONFeature) => void;
  onFeatureHover?: (feature: GeoJSONFeature | null) => void;
}

export default function ChoroplethLayer({
  data,
  valueAccessor,
  min,
  max,
  scale = CHOROPLETH_BLUES,
  onFeatureClick,
  onFeatureHover,
}: ChoroplethLayerProps) {
  const style = (feature: GeoJSON.Feature | undefined): PathOptions => {
    if (!feature) return {};
    const value = valueAccessor(feature as unknown as GeoJSONFeature);
    return {
      fillColor: getChoroplethColor(value, min, max, scale),
      weight: 1,
      opacity: 0.5,
      color: "#0A2540", // Bordure bleu méditerranéen foncé
      fillOpacity: 0.75,
    };
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    layer.on({
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 2.5,
          color: "#0E7490", // Cyan méditerranéen
          fillOpacity: 0.95,
          opacity: 1,
        });
        target.bringToFront();
        onFeatureHover?.(feature as unknown as GeoJSONFeature);
      },
      mouseout: (e) => {
        const target = e.target;
        target.setStyle(style(feature));
        onFeatureHover?.(null);
      },
      click: () => {
        onFeatureClick?.(feature as unknown as GeoJSONFeature);
      },
    });
  };

  return (
    <GeoJSON
      key={JSON.stringify({ min, max })}
      data={data}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
