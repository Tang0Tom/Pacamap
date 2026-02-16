"use client";

import "../../../styles/brutal.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, MapPin, Zap, Download } from "lucide-react";

const PacaMap = dynamic(() => import("@/components/map/PacaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--brutal-bg)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--brutal-black)] bg-[var(--brutal-magenta)] mx-auto mb-4 animate-spin"></div>
        <p className="brutal-body font-bold">CHARGEMENT CARTE...</p>
      </div>
    </div>
  ),
});

export default function BrutalMapExplorer() {
  const departments = [
    { code: "04", name: "Alpes-de-Haute-Provence", emplois: "42K", color: "cyan" },
    { code: "05", name: "Hautes-Alpes", emplois: "38K", color: "yellow" },
    { code: "06", name: "Alpes-Maritimes", emplois: "412K", color: "magenta" },
    { code: "13", name: "Bouches-du-Rhône", emplois: "742K", color: "green" },
    { code: "83", name: "Var", emplois: "370K", color: "cyan" },
    { code: "84", name: "Vaucluse", emplois: "238K", color: "yellow" },
  ];

  return (
    <div className="brutal-page min-h-screen flex flex-col">
      {/* Header */}
      <header className="brutal-header">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/2" className="brutal-button px-3 py-2">
                <ArrowLeft className="w-5 h-5" strokeWidth={3} />
              </Link>
              <div>
                <h1 className="brutal-heading text-xl">CARTE INTERACTIVE</h1>
                <p className="brutal-mono text-xs">PACA GÉOSPATIAL VIEWER</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6" strokeWidth={3} />
              <p className="brutal-tag brutal-tag-magenta">6 ZONES</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-96 border-r-4 border-[var(--brutal-black)] bg-white p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--brutal-magenta)] border-4 border-[var(--brutal-black)] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div>
                <p className="brutal-tag brutal-tag-yellow">DATA LAYER</p>
              </div>
            </div>
            <h2 className="brutal-subheading text-3xl mb-3">EMPLOI SALARIÉ</h2>
            <p className="brutal-body mb-4">
              Visualisation heatmap de la distribution géographique.
              Région PACA • Dataset 2022.
            </p>
          </div>

          <div className="brutal-divider"></div>

          {/* Stats */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="brutal-stat bg-[var(--brutal-yellow)]">
                <p className="brutal-stat-label">TOTAL</p>
                <p className="brutal-stat-number">1.84M</p>
              </div>
              <div className="brutal-stat bg-[var(--brutal-green)]">
                <p className="brutal-stat-label">ZONES</p>
                <p className="brutal-stat-number">6</p>
              </div>
            </div>
          </div>

          <div className="brutal-divider"></div>

          {/* Departments */}
          <div>
            <p className="brutal-subheading text-xl mb-4">DÉPARTEMENTS</p>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div
                  key={dept.code}
                  className={`brutal-card brutal-card-${dept.color} brutal-card-interactive p-4`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="brutal-mono text-xs mb-1 opacity-80">
                        ZONE-{dept.code}
                      </p>
                      <p className="brutal-subheading text-sm">{dept.name}</p>
                    </div>
                    <p className="brutal-heading text-2xl">{dept.emplois}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brutal-divider"></div>

          {/* Data Source */}
          <div className="brutal-card bg-[var(--brutal-black)] text-white">
            <p className="brutal-tag brutal-tag-magenta mb-3">SOURCE</p>
            <p className="brutal-mono text-sm">
              INSEE.FLORES.2022<br />
              STATUS: VERIFIED<br />
              UPDATE: 2024
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6">
            <Link href="/sources" className="w-full brutal-button justify-center">
              <Download className="w-5 h-5" strokeWidth={3} />
              TÉLÉCHARGER DATA
            </Link>
          </div>
        </aside>

        {/* Map Container */}
        <div className="flex-1 relative min-h-[600px]">
          <div className="absolute inset-0 p-6">
            <div className="brutal-card h-full overflow-hidden relative" style={{ minHeight: '500px' }}>
              {/* Corner HUD */}
              <div className="absolute top-6 left-6 z-10">
                <div className="brutal-card bg-[var(--brutal-yellow)] p-3">
                  <p className="brutal-mono text-xs font-bold">LAT/LONG</p>
                  <p className="brutal-mono text-sm">43.93 / 6.00</p>
                </div>
              </div>

              <div className="absolute top-6 right-6 z-10">
                <div className="brutal-card bg-[var(--brutal-cyan)] p-3">
                  <p className="brutal-mono text-xs font-bold">ZOOM</p>
                  <p className="brutal-mono text-sm">7.5x</p>
                </div>
              </div>

              {/* Compass Brutal */}
              <div className="absolute bottom-6 right-6 z-10">
                <div className="w-20 h-20 bg-white border-4 border-[var(--brutal-black)] relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-[var(--brutal-black)]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rotate-90">
                    <div className="w-full h-1 bg-[var(--brutal-black)]"></div>
                  </div>
                  <div className="w-3 h-3 bg-[var(--brutal-magenta)] border-2 border-[var(--brutal-black)] relative z-10"></div>
                  <p className="absolute -top-8 left-1/2 -translate-x-1/2 brutal-mono text-xs font-bold">N</p>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="brutal-card bg-white p-4">
                  <p className="brutal-mono text-xs font-bold mb-3">LÉGENDE</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-4 bg-blue-200 border-2 border-[var(--brutal-black)]"></div>
                      <span className="brutal-mono text-xs">LOW</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-4 bg-blue-400 border-2 border-[var(--brutal-black)]"></div>
                      <span className="brutal-mono text-xs">MED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-4 bg-blue-600 border-2 border-[var(--brutal-black)]"></div>
                      <span className="brutal-mono text-xs">HIGH</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative shapes sur la carte */}
              <div className="brutal-shape brutal-shape-circle w-16 h-16 top-1/4 right-1/4 bg-[var(--brutal-yellow)] opacity-20 z-0"></div>
              <div className="brutal-shape brutal-shape-circle w-12 h-12 bottom-1/3 left-1/3 bg-[var(--brutal-magenta)] opacity-20 z-0"></div>

              <PacaMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
