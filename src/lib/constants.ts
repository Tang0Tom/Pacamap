export const PACA_DEPARTMENTS = {
  "04": "Alpes-de-Haute-Provence",
  "05": "Hautes-Alpes",
  "06": "Alpes-Maritimes",
  "13": "Bouches-du-Rhône",
  "83": "Var",
  "84": "Vaucluse",
} as const;

export type DepartmentCode = keyof typeof PACA_DEPARTMENTS;

export const DEPARTMENT_CODES = Object.keys(PACA_DEPARTMENTS) as DepartmentCode[];

// NAF A17 sectors grouped into narrative super-categories
export const SECTOR_GROUPS = {
  agriculture: {
    label: "Agriculture",
    naf: ["AZ"],
    icon: "wheat",
  },
  industrie: {
    label: "Industrie",
    naf: ["BE", "C1", "C2", "C3", "C4", "C5"],
    icon: "factory",
  },
  construction: {
    label: "Construction",
    naf: ["FZ"],
    icon: "hard-hat",
  },
  commerce: {
    label: "Commerce & Transport",
    naf: ["GZ", "HZ"],
    icon: "shopping-bag",
  },
  services: {
    label: "Services",
    naf: ["IZ", "JZ", "KZ", "LZ", "MN"],
    icon: "briefcase",
  },
  public: {
    label: "Public & Santé",
    naf: ["OQ"],
    icon: "building-2",
  },
} as const;

export type SectorGroupKey = keyof typeof SECTOR_GROUPS;

export const SECTION_TITLES = [
  "L'Emploi en PACA",
  "La Région",
  "Il y a 15 Ans",
  "Les Métiers Qui Disparaissent",
  "Les Métiers Qui Émergent",
  "Les Disparités",
  "Explorez Vous-Même",
] as const;
