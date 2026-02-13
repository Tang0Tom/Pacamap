export interface DataSource {
  id: string;
  name: string;
  provider: string;
  url: string;
  description: string;
  format: string;
  frequency: string;
  lastUpdate: string;
}

export const DATA_SOURCES: Record<string, DataSource> = {
  "insee-flores": {
    id: "insee-flores",
    name: "FLORES",
    provider: "INSEE",
    url: "https://www.insee.fr/fr/statistiques?taille=100&debut=0&categorie=3&theme=15",
    description:
      "Fichier LOcalisé des Rémunérations et de l'Emploi Salarié — effectifs salariés par secteur NAF et par commune",
    format: "CSV",
    frequency: "Annuel",
    lastUpdate: "2022",
  },
  dares: {
    id: "dares",
    name: "Emploi salarié trimestriel",
    provider: "DARES",
    url: "https://dares.travail-emploi.gouv.fr/donnees/lemploi-salarie",
    description:
      "Séries trimestrielles d'emploi salarié par secteur d'activité et par département",
    format: "Excel/CSV",
    frequency: "Trimestriel",
    lastUpdate: "T3 2024",
  },
  "france-travail": {
    id: "france-travail",
    name: "Marché du travail",
    provider: "France Travail",
    url: "https://francetravail.io/data/api/marche-travail",
    description:
      "Données sur les offres d'emploi, les embauches et les demandeurs d'emploi par secteur",
    format: "API REST JSON",
    frequency: "Mensuel",
    lastUpdate: "2024",
  },
  "insee-chomage": {
    id: "insee-chomage",
    name: "Activité, emploi et chômage",
    provider: "INSEE",
    url: "https://www.insee.fr/fr/statistiques?taille=100&debut=0&theme=15&categorie=3",
    description:
      "Taux de chômage, taux d'activité et données d'emploi par département",
    format: "CSV",
    frequency: "Annuel",
    lastUpdate: "2023",
  },
  "geo-api": {
    id: "geo-api",
    name: "Contours administratifs",
    provider: "geo.api.gouv.fr",
    url: "https://geo.api.gouv.fr",
    description:
      "Contours géographiques des départements, EPCI et communes de France",
    format: "GeoJSON",
    frequency: "Annuel",
    lastUpdate: "2024",
  },
};

export function getSource(id: string): DataSource {
  const source = DATA_SOURCES[id];
  if (!source) throw new Error(`Unknown source: ${id}`);
  return source;
}

export function getSourceLabel(id: string): string {
  const source = DATA_SOURCES[id];
  if (!source) return id;
  return `${source.provider} ${source.name} ${source.lastUpdate}`;
}
