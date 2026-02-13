import type {
  PacaOverview,
  SectorTimeSeries,
  DepartmentComparison,
  SectorChange,
} from "@/types/data";

const BASE_PATH = "/data";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_PATH}/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

export function loadPacaOverview() {
  return fetchJson<PacaOverview>("paca-overview.json");
}

export function loadSectorTimeSeries() {
  return fetchJson<SectorTimeSeries[]>("sectors-timeseries.json");
}

export function loadDepartmentComparison() {
  return fetchJson<DepartmentComparison[]>("departments-comparison.json");
}

export function loadDecliningSectors() {
  return fetchJson<SectorChange[]>("declining-sectors.json");
}

export function loadEmergingSectors() {
  return fetchJson<SectorChange[]>("emerging-sectors.json");
}

export async function loadGeoJson(filename: string) {
  const res = await fetch(`${BASE_PATH}/geo/${filename}`);
  if (!res.ok) throw new Error(`Failed to load geo/${filename}`);
  return res.json();
}
