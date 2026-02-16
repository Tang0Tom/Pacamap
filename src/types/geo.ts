export interface GeoJSONFeature {
  type: "Feature";
  properties: {
    code: string;
    nom: string;
    departement?: string;
    population?: number;
    [key: string]: unknown;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export interface TopoJSONTopology {
  type: "Topology";
  objects: Record<string, TopoJSONObject>;
  arcs: number[][][];
}

export interface TopoJSONObject {
  type: "GeometryCollection";
  geometries: TopoJSONGeometry[];
}

export interface TopoJSONGeometry {
  type: string;
  arcs: number[] | number[][] | number[][][];
  properties: {
    code: string;
    nom: string;
    [key: string]: unknown;
  };
}

export interface MapViewState {
  center: [number, number];
  zoom: number;
}

// Centre de PACA avec vue contextuelle
export const PACA_CENTER: [number, number] = [43.935, 6.0];

// Bounds élargis pour montrer PACA dans son contexte régional
export const PACA_BOUNDS: [[number, number], [number, number]] = [
  [42.5, 4.0],    // Sud-Ouest (avec marge Méditerranée)
  [45.5, 8.0],    // Nord-Est (avec marge Alpes/Italie)
];

// Zoom réduit pour vue d'ensemble (pas trop zoomé)
export const PACA_DEFAULT_ZOOM = 7.5;
