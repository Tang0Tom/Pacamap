import type {
  SectorChange,
  DepartmentComparison,
  SectorTimeSeries,
} from "@/types/data";
import type {
  Insight,
  NationalComparison,
  BreakPoint,
} from "@/types/insights";

/**
 * Seuil pour considérer une variation comme significative
 */
const SIGNIFICANCE_THRESHOLD = 5; // %

/**
 * Seuil pour détecter un outlier départemental (écart-type)
 */
const OUTLIER_THRESHOLD = 1.5;

/**
 * Seuil pour détecter une rupture de tendance (changement de pente)
 */
const BREAKPOINT_THRESHOLD = 50; // % de changement de pente

/**
 * Génère des insights sur les secteurs en déclin ou en croissance
 */
export function generateSectorInsights(
  sectors: SectorChange[],
  type: "declining" | "emerging" = "declining"
): Insight[] {
  const insights: Insight[] = [];

  if (sectors.length === 0) return insights;

  // Trier par impact absolu
  const sorted = [...sectors].sort(
    (a, b) => Math.abs(b.absoluteChange) - Math.abs(a.absoluteChange)
  );

  const topSector = sorted[0];
  const isNegative = type === "declining";

  // Insight #1: Secteur le plus impacté
  insights.push({
    type: isNegative ? "negative" : "positive",
    icon: isNegative ? "TrendingDown" : "TrendingUp",
    title: isNegative ? "Déclin Majeur" : "Croissance Leader",
    message: `${topSector.label} ${isNegative ? "a perdu" : "a gagné"} ${Math.abs(
      topSector.absoluteChange
    ).toLocaleString("fr-FR")} emplois (${Math.abs(topSector.change).toFixed(
      1
    )}%), le ${isNegative ? "déclin" : "gain"} absolu le plus important de tous les secteurs.`,
    metrics: [
      {
        label: "Variation",
        value: `${topSector.change > 0 ? "+" : ""}${topSector.change.toFixed(1)}%`,
      },
      {
        label: "Emplois actuels",
        value: topSector.currentValue.toLocaleString("fr-FR"),
      },
    ],
  });

  // Insight #2: Département le plus touché du secteur principal
  if (topSector.topDepartments && topSector.topDepartments.length > 0) {
    const topDept = topSector.topDepartments[0];
    insights.push({
      type: "neutral",
      icon: "Target",
      title: "Concentration Géographique",
      message: `${topDept.name} est le département le plus ${
        isNegative ? "touché" : "dynamique"
      } dans ${topSector.label.toLowerCase()} avec ${Math.abs(
        topDept.change
      ).toFixed(1)}% de ${isNegative ? "baisse" : "hausse"}.`,
    });
  }

  // Insight #3: Rupture de tendance dans le secteur principal
  const breakpoint = detectBreakpoint(topSector.trend);
  if (breakpoint) {
    insights.push({
      type: "neutral",
      icon: "Activity",
      title: "Rupture de Tendance",
      message: `Une ${
        breakpoint.slopeChange > 0 ? "accélération" : "décélération"
      } marquée a été détectée en ${breakpoint.year}${
        breakpoint.reason ? ` (${breakpoint.reason})` : ""
      }, avec un changement de dynamique de ${Math.abs(
        breakpoint.slopeChange
      ).toFixed(0)}%.`,
    });
  }

  return insights;
}

/**
 * Génère des insights sur les disparités départementales
 */
export function generateDepartmentInsights(
  departments: DepartmentComparison[]
): Insight[] {
  const insights: Insight[] = [];

  if (departments.length === 0) return insights;

  // Calculer statistiques sur les taux de croissance
  const growthRates = departments.map((d) => d.growthRate);
  const avgGrowth =
    growthRates.reduce((sum, rate) => sum + rate, 0) / growthRates.length;
  const stdDev = calculateStdDev(growthRates);

  // Trouver les outliers
  const outliers = departments.filter(
    (d) => Math.abs(d.growthRate - avgGrowth) > stdDev * OUTLIER_THRESHOLD
  );

  const topPerformer = [...departments].sort(
    (a, b) => b.growthRate - a.growthRate
  )[0];
  const worstPerformer = [...departments].sort(
    (a, b) => a.growthRate - b.growthRate
  )[0];

  // Insight #1: Meilleur et pire performeur
  insights.push({
    type: "neutral",
    icon: "Target",
    title: "Contraste Territorial",
    message: `${topPerformer.name} affiche la meilleure dynamique (+${topPerformer.growthRate.toFixed(
      1
    )}%), tandis que ${
      worstPerformer.name
    } enregistre la plus forte baisse (${worstPerformer.growthRate.toFixed(
      1
    )}%), soit ${Math.abs(
      topPerformer.growthRate - worstPerformer.growthRate
    ).toFixed(1)} points d'écart.`,
    metrics: [
      {
        label: "Meilleur",
        value: `${topPerformer.name} (+${topPerformer.growthRate.toFixed(1)}%)`,
      },
      {
        label: "Plus faible",
        value: `${worstPerformer.name} (${worstPerformer.growthRate.toFixed(1)}%)`,
      },
    ],
  });

  // Insight #2: Disparité régionale
  if (outliers.length > 0) {
    insights.push({
      type: "neutral",
      icon: "AlertTriangle",
      title: "Disparités Marquées",
      message: `${outliers.length} département${
        outliers.length > 1 ? "s présentent" : " présente"
      } une dynamique atypique (écart > ${OUTLIER_THRESHOLD}x l'écart-type régional), témoignant de fortes disparités territoriales.`,
    });
  }

  // Insight #3: Chômage
  const avgUnemployment =
    departments.reduce((sum, d) => sum + d.unemploymentRate, 0) /
    departments.length;
  const highUnemployment = departments.filter(
    (d) => d.unemploymentRate > avgUnemployment + 1
  );

  if (highUnemployment.length > 0) {
    insights.push({
      type: "negative",
      icon: "TrendingDown",
      title: "Pression sur l'Emploi",
      message: `${
        highUnemployment.length
      } département${
        highUnemployment.length > 1 ? "s" : ""
      } affiche${
        highUnemployment.length > 1 ? "nt" : ""
      } un taux de chômage supérieur à ${(avgUnemployment + 1).toFixed(
        1
      )}% (${highUnemployment.map((d) => d.name).join(", ")}).`,
    });
  }

  return insights;
}

/**
 * Génère des insights sur les tendances temporelles
 */
export function generateTrendInsights(
  timeSeries: SectorTimeSeries[]
): Insight[] {
  const insights: Insight[] = [];

  if (timeSeries.length === 0) return insights;

  // Détecter les ruptures de 2008 et 2020 sur tous les secteurs
  const breakpoints2008: string[] = [];
  const breakpoints2020: string[] = [];

  timeSeries.forEach((series) => {
    const bp2008 = detectBreakpointAtYear(series.data, 2008);
    const bp2020 = detectBreakpointAtYear(series.data, 2020);

    if (bp2008 && Math.abs(bp2008.slopeChange) > 30) {
      breakpoints2008.push(series.label);
    }
    if (bp2020 && Math.abs(bp2020.slopeChange) > 30) {
      breakpoints2020.push(series.label);
    }
  });

  // Insight #1: Impact de la crise 2008
  if (breakpoints2008.length > 0) {
    insights.push({
      type: "negative",
      icon: "TrendingDown",
      title: "Crise Financière 2008",
      message: `La crise de 2008 a significativement impacté ${
        breakpoints2008.length
      } secteur${breakpoints2008.length > 1 ? "s" : ""} (${breakpoints2008.join(
        ", "
      )}), avec des ruptures de tendance marquées.`,
    });
  }

  // Insight #2: Impact COVID 2020
  if (breakpoints2020.length > 0) {
    insights.push({
      type: "neutral",
      icon: "Activity",
      title: "Impact COVID-19",
      message: `La pandémie de 2020 a provoqué des perturbations dans ${
        breakpoints2020.length
      } secteur${breakpoints2020.length > 1 ? "s" : ""} : ${breakpoints2020.join(
        ", "
      )}.`,
    });
  }

  // Insight #3: Tendance globale sur la période
  const totalChange = timeSeries.map((s) => {
    const first = s.data[0].value;
    const last = s.data[s.data.length - 1].value;
    return ((last - first) / first) * 100;
  });

  const avgChange =
    totalChange.reduce((sum, c) => sum + c, 0) / totalChange.length;

  insights.push({
    type: avgChange > 0 ? "positive" : "negative",
    icon: avgChange > 0 ? "TrendingUp" : "TrendingDown",
    title: "Dynamique Globale",
    message: `Sur la période 2008-2022, l'emploi régional a ${
      avgChange > 0 ? "progressé" : "reculé"
    } en moyenne de ${Math.abs(avgChange).toFixed(
      1
    )}% tous secteurs confondus, malgré les crises successives.`,
  });

  return insights;
}

/**
 * Génère des insights comparatifs PACA vs France
 */
export function generateComparativeInsights(
  nationalData: NationalComparison
): Insight[] {
  const insights: Insight[] = [];

  const { france, paca } = nationalData;

  // Insight #1: Performance globale
  const pacaTotalChange =
    Object.values(paca.sectors).reduce((sum, s) => sum + s.change, 0) /
    Object.keys(paca.sectors).length;
  const franceTotalChange =
    Object.values(france.sectors).reduce((sum, s) => sum + s.change, 0) /
    Object.keys(france.sectors).length;

  const diff = pacaTotalChange - franceTotalChange;

  insights.push({
    type: diff > 0 ? "positive" : "negative",
    icon: diff > 0 ? "TrendingUp" : "TrendingDown",
    title: "PACA vs France",
    message: `PACA ${
      diff > 0 ? "surperforme" : "sous-performe"
    } la moyenne nationale avec ${Math.abs(diff).toFixed(
      1
    )} point${
      Math.abs(diff) > 1 ? "s" : ""
    } d'écart sur l'évolution moyenne de l'emploi.`,
    metrics: [
      { label: "PACA", value: `${pacaTotalChange.toFixed(1)}%` },
      { label: "France", value: `${franceTotalChange.toFixed(1)}%` },
    ],
  });

  // Insight #2: Secteurs spécifiques
  const outperformingSectors: string[] = [];
  const underperformingSectors: string[] = [];

  Object.keys(paca.sectors).forEach((key) => {
    const sectorKey = key as keyof typeof paca.sectors;
    const pacaSector = paca.sectors[sectorKey];
    const franceSector = france.sectors[sectorKey];

    if (!franceSector) return;

    const sectorDiff = pacaSector.change - franceSector.change;

    if (sectorDiff > SIGNIFICANCE_THRESHOLD) {
      outperformingSectors.push(key);
    } else if (sectorDiff < -SIGNIFICANCE_THRESHOLD) {
      underperformingSectors.push(key);
    }
  });

  if (outperformingSectors.length > 0) {
    insights.push({
      type: "positive",
      icon: "TrendingUp",
      title: "Forces Régionales",
      message: `PACA se distingue positivement dans ${
        outperformingSectors.length
      } secteur${
        outperformingSectors.length > 1 ? "s" : ""
      } par rapport à la moyenne française.`,
    });
  }

  if (underperformingSectors.length > 0) {
    insights.push({
      type: "negative",
      icon: "TrendingDown",
      title: "Faiblesses Relatives",
      message: `${underperformingSectors.length} secteur${
        underperformingSectors.length > 1 ? "s affichent" : " affiche"
      } une performance inférieure à la moyenne nationale.`,
    });
  }

  // Insight #3: Chômage
  const unemploymentDiff = paca.unemploymentRate - france.unemploymentRate;

  if (Math.abs(unemploymentDiff) > 1) {
    insights.push({
      type: unemploymentDiff > 0 ? "negative" : "positive",
      icon: unemploymentDiff > 0 ? "AlertTriangle" : "Info",
      title: "Taux de Chômage",
      message: `PACA enregistre un taux de chômage ${
        unemploymentDiff > 0 ? "supérieur" : "inférieur"
      } de ${Math.abs(unemploymentDiff).toFixed(
        1
      )} point${Math.abs(unemploymentDiff) > 1 ? "s" : ""} à la moyenne nationale (${
        paca.unemploymentRate
      }% vs ${france.unemploymentRate}%).`,
    });
  }

  return insights;
}

// ============================================================================
// Fonctions utilitaires
// ============================================================================

/**
 * Détecte un point de rupture dans une série temporelle
 */
function detectBreakpoint(data: { year: number; value: number }[]): BreakPoint | null {
  if (data.length < 4) return null;

  let maxSlopeChange = 0;
  let breakYear = 0;

  for (let i = 2; i < data.length - 1; i++) {
    // Pente avant
    const slopeBefore = (data[i].value - data[i - 2].value) / 2;
    // Pente après
    const slopeAfter = (data[i + 1].value - data[i - 1].value) / 2;

    // Changement de pente relatif
    const slopeChange = slopeBefore !== 0
      ? ((slopeAfter - slopeBefore) / Math.abs(slopeBefore)) * 100
      : 0;

    if (Math.abs(slopeChange) > Math.abs(maxSlopeChange)) {
      maxSlopeChange = slopeChange;
      breakYear = data[i].year;
    }
  }

  if (Math.abs(maxSlopeChange) > BREAKPOINT_THRESHOLD) {
    return {
      year: breakYear,
      slopeChange: maxSlopeChange,
      reason: getBreakpointReason(breakYear),
    };
  }

  return null;
}

/**
 * Détecte un point de rupture à une année spécifique
 */
function detectBreakpointAtYear(
  data: { year: number; value: number }[],
  targetYear: number
): BreakPoint | null {
  const idx = data.findIndex((d) => d.year === targetYear);
  if (idx < 1 || idx >= data.length - 1) return null;

  const slopeBefore = data[idx].value - data[idx - 1].value;
  const slopeAfter = data[idx + 1].value - data[idx].value;

  const slopeChange = slopeBefore !== 0
    ? ((slopeAfter - slopeBefore) / Math.abs(slopeBefore)) * 100
    : 0;

  return {
    year: targetYear,
    slopeChange,
    reason: getBreakpointReason(targetYear),
  };
}

/**
 * Retourne la raison probable d'une rupture selon l'année
 */
function getBreakpointReason(year: number): string | undefined {
  if (year === 2008) return "Crise financière";
  if (year === 2020) return "COVID-19";
  return undefined;
}

/**
 * Calcule l'écart-type d'un tableau de nombres
 */
function calculateStdDev(values: number[]): number {
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - avg, 2));
  const variance =
    squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
  return Math.sqrt(variance);
}
