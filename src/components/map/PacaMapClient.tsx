"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { PACA_CENTER, PACA_DEFAULT_ZOOM, PACA_BOUNDS } from "@/types/geo";
import { cn } from "@/lib/utils";
import ChoroplethLayer from "./ChoroplethLayer";
import type { ChoroplethConfig } from "./PacaMap";
import "leaflet/dist/leaflet.css";

interface PacaMapClientProps {
  className?: string;
  zoom?: number;
  interactive?: boolean;
  choropleth?: ChoroplethConfig;
}

export default function PacaMapClient({
  className,
  zoom = PACA_DEFAULT_ZOOM,
  interactive = true,
  choropleth,
}: PacaMapClientProps) {
  return (
    <MapContainer
      center={PACA_CENTER}
      zoom={zoom}
      maxBounds={PACA_BOUNDS}
      boundsOptions={{ padding: [30, 30] }} // Padding pour ne pas couper les bords
      minZoom={6.5} // Permet de dézoomer légèrement plus
      maxZoom={11}
      scrollWheelZoom={interactive}
      dragging={interactive}
      zoomControl={interactive}
      doubleClickZoom={interactive}
      className={cn("w-full h-full rounded-xl", className)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      {choropleth && (
        <ChoroplethLayer
          data={choropleth.data}
          valueAccessor={choropleth.valueAccessor}
          min={choropleth.min}
          max={choropleth.max}
          scale={choropleth.scale}
          onFeatureClick={choropleth.onFeatureClick}
          onFeatureHover={choropleth.onFeatureHover}
        />
      )}
    </MapContainer>
  );
}
