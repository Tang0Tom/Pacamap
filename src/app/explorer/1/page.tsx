"use client";

import "../../../styles/data-dashboard.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, MapPin, Layers, Download } from "lucide-react";

const PacaMap = dynamic(() => import("@/components/map/PacaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--data-bg)]">
      <div className="text-center">
        <div className="data-spinner mb-4"></div>
        <p className="data-body">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

export default function DataMapExplorer() {
  const departments = [
    { code: "04", name: "Alpes-de-Haute-Provence", emplois: 42000, evolution: -2.1 },
    { code: "05", name: "Hautes-Alpes", emplois: 38000, evolution: 1.3 },
    { code: "06", name: "Alpes-Maritimes", emplois: 412000, evolution: 4.2 },
    { code: "13", name: "Bouches-du-Rhône", emplois: 742000, evolution: 5.8 },
    { code: "83", name: "Var", emplois: 370000, evolution: 3.5 },
    { code: "84", name: "Vaucluse", emplois: 238000, evolution: 2.7 },
  ];

  return (
    <div className="data-page min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[var(--data-border)] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/1"
              className="data-button data-button-secondary px-3 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="data-heading text-xl">Carte Interactive</h1>
              <p className="data-body text-sm">Visualisation Choroplèthe PACA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--data-primary)]" />
            <p className="data-label">6 Départements</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-96 border-r border-[var(--data-border)] bg-white p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-[var(--data-primary)]" />
              <p className="data-label">Couche de Données</p>
            </div>
            <h2 className="data-subheading text-2xl mb-2">Emploi Salarié</h2>
            <p className="data-body text-sm mb-4">
              Distribution spatiale des emplois salariés par département.
              Région PACA • Données 2022.
            </p>
            <div className="data-badge data-badge-success">
              <span className="data-status-dot active"></span>
              Données actualisées
            </div>
          </div>

          <div className="data-divider"></div>

          {/* Stats Overview */}
          <div className="mb-6">
            <p className="data-label mb-3">Vue d'Ensemble</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="data-metric-card">
                <p className="data-label mb-1">Total</p>
                <p className="data-metric text-xl">1.84M</p>
              </div>
              <div className="data-metric-card success">
                <p className="data-label mb-1">Variation</p>
                <p className="data-metric text-xl">+4.5%</p>
              </div>
            </div>
          </div>

          <div className="data-divider"></div>

          {/* Departments List */}
          <div>
            <p className="data-label mb-3">Départements</p>
            <div className="space-y-2">
              {departments.map((dept) => (
                <div
                  key={dept.code}
                  className="data-card p-3 data-card-interactive"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="data-mono text-xs text-[var(--data-text-muted)] mb-1">
                        {dept.code}
                      </p>
                      <p className="font-semibold text-sm">{dept.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="data-metric text-sm">
                        {(dept.emplois / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <div className="data-progress">
                    <div
                      className="data-progress-bar"
                      style={{ width: `${(dept.emplois / 742000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="data-divider"></div>

          {/* Data Source */}
          <div className="data-card bg-[var(--data-bg)]">
            <p className="data-label mb-2">Source de Données</p>
            <p className="data-mono text-xs">INSEE.FLORES.2022</p>
            <p className="data-body text-xs mt-1">
              Emploi salarié au lieu de travail
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            <Link
              href="/sources"
              className="w-full data-button data-button-secondary justify-center"
            >
              <Download className="w-4 h-4" />
              Sources & Méthodologie
            </Link>
          </div>
        </aside>

        {/* Map Container */}
        <div className="flex-1 relative min-h-[600px]">
          <div className="absolute inset-0 p-6">
            <div className="data-card h-full overflow-hidden relative" style={{ minHeight: '500px' }}>
              {/* Corner Info */}
              <div className="absolute top-6 left-6 z-10">
                <div className="data-card bg-white/95 backdrop-blur p-3">
                  <p className="data-label mb-1">Coordonnées</p>
                  <p className="data-mono text-xs">43.93°N, 6.00°E</p>
                </div>
              </div>

              <div className="absolute top-6 right-6 z-10">
                <div className="data-card bg-white/95 backdrop-blur p-3">
                  <p className="data-label mb-1">Zoom</p>
                  <p className="data-mono text-xs">Niveau 7.5</p>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="data-card bg-white/95 backdrop-blur p-4">
                  <p className="data-label mb-3">Légende</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-3 bg-blue-200 border border-[var(--data-border)]"></div>
                      <span className="data-body text-xs">Faible densité</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-3 bg-blue-400 border border-[var(--data-border)]"></div>
                      <span className="data-body text-xs">Densité moyenne</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-3 bg-blue-600 border border-[var(--data-border)]"></div>
                      <span className="data-body text-xs">Forte densité</span>
                    </div>
                  </div>
                </div>
              </div>

              <PacaMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
