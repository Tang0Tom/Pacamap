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

export const PACA_CENTER: [number, number] = [43.935, 6.0];
export const PACA_BOUNDS: [[number, number], [number, number]] = [
  [42.98, 4.23],
  [45.12, 7.72],
];
export const PACA_DEFAULT_ZOOM = 8;
