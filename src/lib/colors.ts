// Navigation (dark)
export const NAV_COLORS = {
  bg: "#050505",
  text: "#f7f7fb",
  muted: "#a3a3b2",
} as const;

// Content (light)
export const CONTENT_COLORS = {
  bg: "#fafafa",
  text: "#1a1a2e",
  muted: "#6b7280",
} as const;

// Accents
export const ACCENT = {
  primary: "#2563eb",
  growth: "#10b981",
  decline: "#ef4444",
  highlight: "#f59e0b",
} as const;

// Choropleth blue scale (5 steps)
export const CHOROPLETH_BLUES = [
  "#eff6ff",
  "#bfdbfe",
  "#60a5fa",
  "#2563eb",
  "#1e40af",
] as const;

// Choropleth red scale (for decline)
export const CHOROPLETH_REDS = [
  "#fef2f2",
  "#fecaca",
  "#f87171",
  "#ef4444",
  "#b91c1c",
] as const;

// Choropleth green scale (for growth)
export const CHOROPLETH_GREENS = [
  "#ecfdf5",
  "#a7f3d0",
  "#34d399",
  "#10b981",
  "#047857",
] as const;

// Chart palette (6 distinct colors for sectors)
export const CHART_PALETTE = [
  "#2563eb", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
] as const;

export function getChoroplethColor(
  value: number,
  min: number,
  max: number,
  scale: readonly string[] = CHOROPLETH_BLUES
): string {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const index = Math.min(Math.floor(normalized * scale.length), scale.length - 1);
  return scale[index];
}
