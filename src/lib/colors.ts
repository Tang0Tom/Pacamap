// Navigation (dark) - Bleu Méditerranéen profond
export const NAV_COLORS = {
  bg: "#0A2540", // Bleu nuit méditerranéen
  text: "#FFFBEB", // Crème chaud
  muted: "#94A3B8", // Gris-bleu doux
} as const;

// Content (light) - Crème chaud
export const CONTENT_COLORS = {
  bg: "#FFFBEB", // Crème chaud (au lieu de gris froid)
  text: "#1E293B", // Slate foncé
  muted: "#64748B", // Slate moyen
} as const;

// Accents - Palette méditerranéenne
export const ACCENT = {
  primary: "#0E7490", // Cyan méditerranéen
  growth: "#EA580C", // Terracotta / Orange chaud
  decline: "#6366F1", // Indigo (plus doux que rouge agressif)
  highlight: "#D97706", // Ocre doré
} as const;

// Choropleth cyan/teal scale - Méditerranéen (7 steps pour + de granularité)
export const CHOROPLETH_BLUES = [
  "#ECFEFF", // Cyan très pâle
  "#CFFAFE", // Cyan pâle
  "#A5F3FC", // Cyan clair
  "#22D3EE", // Cyan vif
  "#06B6D4", // Cyan saturé
  "#0E7490", // Cyan profond
  "#164E63", // Cyan très foncé
] as const;

// Choropleth indigo scale - Pour déclin (plus doux que rouge)
export const CHOROPLETH_REDS = [
  "#EEF2FF", // Indigo très pâle
  "#E0E7FF", // Indigo pâle
  "#C7D2FE", // Indigo clair
  "#A5B4FC", // Indigo moyen
  "#818CF8", // Indigo saturé
  "#6366F1", // Indigo vif
  "#4F46E5", // Indigo profond
] as const;

// Choropleth terracotta/orange scale - Pour croissance
export const CHOROPLETH_GREENS = [
  "#FFF7ED", // Orange très pâle
  "#FFEDD5", // Orange pâle
  "#FED7AA", // Orange clair
  "#FDBA74", // Orange moyen
  "#FB923C", // Orange saturé
  "#EA580C", // Terracotta vif
  "#C2410C", // Terracotta profond
] as const;

// Chart palette - Palette méditerranéenne harmonieuse (6 couleurs)
export const CHART_PALETTE = [
  "#0E7490", // Cyan méditerranéen
  "#EA580C", // Terracotta
  "#D97706", // Ocre doré
  "#6366F1", // Indigo
  "#059669", // Émeraude
  "#DB2777", // Rose magenta
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
