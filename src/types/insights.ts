import type { SectorGroupKey, DepartmentCode } from "@/lib/constants";

/**
 * Type d'insight selon sa tonalité
 */
export type InsightType = "positive" | "negative" | "neutral";

/**
 * Icône Lucide React à afficher pour l'insight
 */
export type InsightIcon =
  | "TrendingUp"
  | "TrendingDown"
  | "Info"
  | "AlertTriangle"
  | "Target"
  | "Activity";

/**
 * Structure d'un insight automatique
 */
export interface Insight {
  /** Type de l'insight (détermine la couleur) */
  type: InsightType;
  /** Icône à afficher */
  icon: InsightIcon;
  /** Titre court de l'insight */
  title: string;
  /** Message descriptif détaillé */
  message: string;
  /** Métriques optionnelles à afficher */
  metrics?: InsightMetric[];
}

/**
 * Métrique affichée dans un insight
 */
export interface InsightMetric {
  /** Label de la métrique */
  label: string;
  /** Valeur formatée (ex: "-36.4%", "25,500 emplois") */
  value: string;
}

/**
 * Données de comparaison nationale
 */
export interface NationalComparison {
  year: number;
  france: RegionData;
  paca: RegionData;
}

/**
 * Données d'une région (France ou PACA)
 */
export interface RegionData {
  totalEmployment: number;
  unemploymentRate: number;
  sectors: Record<SectorGroupKey, SectorStats>;
}

/**
 * Statistiques d'un secteur
 */
export interface SectorStats {
  employment: number;
  /** Changement en % depuis 2008 */
  change: number;
}

/**
 * Point de rupture détecté dans une série temporelle
 */
export interface BreakPoint {
  year: number;
  /** Changement de pente en % */
  slopeChange: number;
  /** Raison probable (ex: "Crise financière", "COVID-19") */
  reason?: string;
}
