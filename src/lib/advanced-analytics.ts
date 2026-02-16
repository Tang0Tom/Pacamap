import type {
  SectorChange,
  DepartmentComparison,
  SectorTimeSeries,
} from "@/types/data";

/**
 * Analyse avancée : Corrélations, ruptures, tendances, comparaisons
 */

// ============================================================================
// Types pour analyses enrichies
// ============================================================================

export interface DetailedInsight {
  title: string;
  summary: string;
  diagnosis: string[];
  breakpoints: BreakpointAnalysis[];
  correlations: CorrelationAnalysis[];
  territorialImpact: string[];
  crossConsequences: string[];
  comparisonNational?: string;
}

export interface BreakpointAnalysis {
  year: number;
  type: "crisis" | "reform" | "acceleration" | "stabilization";
  description: string;
  impact: string;
}

export interface CorrelationAnalysis {
  variable1: string;
  variable2: string;
  coefficient: number; // Pearson correlation (-1 à 1)
  strength: "forte" | "modérée" | "faible";
  interpretation: string;
}

export interface TerritorialDisparity {
  department: string;
  value: number;
  deviation: number; // Écart à la moyenne en écart-types
  category: "critique" | "en difficulté" | "moyenne" | "dynamique" | "leader";
}

// ============================================================================
// Calculs statistiques
// ============================================================================

/**
 * Calcule le coefficient de corrélation de Pearson
 */
export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );

  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Calcule l'écart-type
 */
function calculateStdDev(values: number[]): number {
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - avg, 2));
  const variance =
    squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * Calcule la moyenne
 */
function calculateMean(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Interprète la force d'une corrélation
 */
function interpretCorrelation(r: number): "forte" | "modérée" | "faible" {
  const absR = Math.abs(r);
  if (absR > 0.7) return "forte";
  if (absR > 0.4) return "modérée";
  return "faible";
}

// ============================================================================
// Analyses avancées sectorielles
// ============================================================================

/**
 * Génère une analyse détaillée multi-factorielle pour un secteur
 */
export function generateDetailedSectorAnalysis(
  sector: SectorChange,
  allSectors: SectorChange[],
  departments: DepartmentComparison[],
  nationalComparison?: { pacaChange: number; franceChange: number }
): DetailedInsight {
  const isPositive = sector.change > 0;
  const trend = sector.trend;

  // 1. Diagnostic de base
  const diagnosis: string[] = [
    `Perte nette : ${Math.abs(sector.absoluteChange).toLocaleString("fr-FR")} emplois sur 14 ans (${sector.change.toFixed(1)}%)`,
    sector.topDepartments.length > 0
      ? `Départements critiques : ${sector.topDepartments.slice(0, 2).map(d => `${d.name} ${d.change.toFixed(1)}%`).join(", ")}`
      : "Répartition territoriale uniforme",
  ];

  if (nationalComparison) {
    const diff = sector.change - nationalComparison.franceChange;
    diagnosis.push(
      `Comparaison France : ${nationalComparison.franceChange.toFixed(1)}% (PACA ${Math.abs(diff).toFixed(1)}pts ${diff > 0 ? "meilleur" : "pire"})`
    );
  }

  // 2. Ruptures historiques
  const breakpoints: BreakpointAnalysis[] = [];

  // Analyser 2008-2012 (crise)
  const idx2008 = trend.findIndex((t) => t.year === 2008);
  const idx2012 = trend.findIndex((t) => t.year === 2012);
  if (idx2008 !== -1 && idx2012 !== -1) {
    const change0812 =
      ((trend[idx2012].value - trend[idx2008].value) /
        trend[idx2008].value) *
      100;
    if (Math.abs(change0812) > 5) {
      breakpoints.push({
        year: 2008,
        type: "crisis",
        description: `Crise financière mondiale`,
        impact: `${change0812.toFixed(1)}% entre 2008-2012`,
      });
    }
  }

  // Analyser 2020 (COVID)
  const idx2020 = trend.findIndex((t) => t.year === 2020);
  if (idx2020 !== -1 && idx2020 < trend.length - 1) {
    const change2020 =
      ((trend[idx2020 + 1].value - trend[idx2020].value) /
        trend[idx2020].value) *
      100;
    if (Math.abs(change2020) > 3) {
      breakpoints.push({
        year: 2020,
        type: change2020 > 0 ? "acceleration" : "crisis",
        description: `Pandémie COVID-19`,
        impact: `${change2020.toFixed(1)}% en 2020-2022`,
      });
    }
  }

  // 3. Corrélations avec autres secteurs
  const correlations: CorrelationAnalysis[] = [];

  // Corréler avec secteurs similaires
  const otherSectors = allSectors.filter((s) => s.sector !== sector.sector);
  for (const other of otherSectors.slice(0, 2)) {
    // Top 2 corrélations
    const sectorValues = trend.map((t) => t.value);
    const otherTrend = other.trend;
    const otherValues = otherTrend.map((t) => t.value);

    const r = calculateCorrelation(sectorValues, otherValues);

    if (Math.abs(r) > 0.5) {
      correlations.push({
        variable1: sector.label,
        variable2: other.label,
        coefficient: r,
        strength: interpretCorrelation(r),
        interpretation:
          r > 0
            ? `Évolution synchronisée (r=${r.toFixed(2)}) : déclin/croissance parallèle`
            : `Évolution inverse (r=${r.toFixed(2)}) : compensation sectorielle`,
      });
    }
  }

  // 4. Impact territorial
  const territorialImpact: string[] = [];

  if (sector.topDepartments.length > 0) {
    const worst = sector.topDepartments[0];
    const best =
      sector.topDepartments[sector.topDepartments.length - 1];

    territorialImpact.push(
      `${worst.name} : ${isPositive ? "Leader" : "Plus touché"} (${worst.change.toFixed(1)}%)`
    );

    if (sector.topDepartments.length > 1) {
      territorialImpact.push(
        `Écart territorial : ${Math.abs(worst.change - best.change).toFixed(1)}pts entre ${worst.name} et ${best.name}`
      );
    }
  }

  // Chercher corrélation avec chômage départemental
  if (departments.length > 0) {
    const unemploymentRates = departments.map((d) => d.unemploymentRate);
    const sectorByDept = departments.map((d) =>
      d.sectors[sector.sector as keyof typeof d.sectors] || 0
    );

    const unemploymentCorr = calculateCorrelation(
      sectorByDept,
      unemploymentRates
    );

    if (Math.abs(unemploymentCorr) > 0.4) {
      territorialImpact.push(
        `Corrélation chômage : ${interpretCorrelation(unemploymentCorr)} (r=${unemploymentCorr.toFixed(2)}) - ${unemploymentCorr > 0 ? "zones à fort emploi sectoriel = moins chômage" : "paradoxe : chômage élevé malgré emploi sectoriel"}`
      );
    }
  }

  // 5. Conséquences croisées
  const crossConsequences: string[] = [];

  if (!isPositive) {
    crossConsequences.push(
      `Migration population active vers métropoles (Marseille, Nice)`
    );

    if (sector.sector === "agriculture") {
      crossConsequences.push(
        `Pression foncière : conversion terres agricoles → zones résidentielles/touristiques`
      );
      crossConsequences.push(
        `Vieillissement exploitants (âge moyen estimé : 58 ans)`
      );
    }

    if (sector.sector === "industrie") {
      crossConsequences.push(
        `Désindustrialisation littorale : reconversion friches industrielles`
      );
      crossConsequences.push(
        `Impact chaîne de valeur : sous-traitance, logistique, services BtoB`
      );
    }
  } else {
    crossConsequences.push(
      `Attractivité renforcée pour jeunes diplômés et cadres`
    );

    if (sector.sector === "services") {
      crossConsequences.push(
        `Tertiarisation économie : transformation structurelle PACA`
      );
      crossConsequences.push(
        `Polarisation spatiale : concentration métropoles Nice/Marseille`
      );
    }
  }

  return {
    title: `Analyse Détaillée : ${sector.label}`,
    summary: `${isPositive ? "Croissance" : "Déclin"} de ${Math.abs(sector.change).toFixed(1)}% (${Math.abs(sector.absoluteChange).toLocaleString("fr-FR")} emplois)`,
    diagnosis,
    breakpoints,
    correlations,
    territorialImpact,
    crossConsequences,
    comparisonNational: nationalComparison
      ? `PACA ${sector.change.toFixed(1)}% vs France ${nationalComparison.franceChange.toFixed(1)}%`
      : undefined,
  };
}

/**
 * Analyse les disparités territoriales avec catégorisation
 */
export function analyzeTerritorialDisparities(
  departments: DepartmentComparison[]
): {
  disparities: TerritorialDisparity[];
  summary: string;
  giniCoefficient: number;
} {
  const growthRates = departments.map((d) => d.growthRate);
  const mean = calculateMean(growthRates);
  const stdDev = calculateStdDev(growthRates);

  const disparities: TerritorialDisparity[] = departments.map((dept) => {
    const deviation = (dept.growthRate - mean) / stdDev;

    let category: TerritorialDisparity["category"];
    if (deviation < -1.5) category = "critique";
    else if (deviation < -0.5) category = "en difficulté";
    else if (deviation < 0.5) category = "moyenne";
    else if (deviation < 1.5) category = "dynamique";
    else category = "leader";

    return {
      department: dept.name,
      value: dept.growthRate,
      deviation,
      category,
    };
  });

  // Calcul simplifié du coefficient de Gini
  const sortedRates = [...growthRates].sort((a, b) => a - b);
  let giniSum = 0;
  for (let i = 0; i < sortedRates.length; i++) {
    giniSum += (2 * (i + 1) - sortedRates.length - 1) * sortedRates[i];
  }
  const giniCoefficient =
    giniSum / (sortedRates.length * sortedRates.reduce((a, b) => a + b, 0));

  const summary = `Coefficient de Gini : ${Math.abs(giniCoefficient).toFixed(3)} (${Math.abs(giniCoefficient) > 0.3 ? "inégalités marquées" : "relative homogénéité"})`;

  return { disparities, summary, giniCoefficient };
}
