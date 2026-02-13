import type { DepartmentCode, SectorGroupKey } from "@/lib/constants";

export interface PacaOverview {
  totalEmployment: number;
  totalEstablishments: number;
  population: number;
  unemploymentRate: number;
  year: number;
  departments: DepartmentData[];
}

export interface DepartmentData {
  code: DepartmentCode;
  name: string;
  employment: number;
  establishments: number;
  population: number;
  unemploymentRate: number;
  topSectors: SectorValue[];
}

export interface SectorValue {
  sector: SectorGroupKey;
  label: string;
  value: number;
  percentage: number;
}

export interface SectorTimeSeries {
  sector: string;
  label: string;
  data: TimePoint[];
}

export interface TimePoint {
  year: number;
  value: number;
}

export interface DepartmentComparison {
  code: DepartmentCode;
  name: string;
  sectors: Record<SectorGroupKey, number>;
  totalEmployment: number;
  growthRate: number;
  unemploymentRate: number;
}

export interface SectorChange {
  sector: string;
  label: string;
  change: number; // percentage change over period
  absoluteChange: number;
  currentValue: number;
  previousValue: number;
  trend: TimePoint[];
  topDepartments: {
    code: DepartmentCode;
    name: string;
    change: number;
  }[];
}
