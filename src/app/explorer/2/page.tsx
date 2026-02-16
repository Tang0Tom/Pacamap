"use client";

import "../../../styles/dashboard.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Database, MapIcon, Activity } from "lucide-react";

const PacaMap = dynamic(() => import("@/components/map/PacaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="cyber-spinner"></div>
    </div>
  ),
});

export default function DashboardExplorer() {
  return (
    <div className="dashboard-page min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--cyber-cyan)]/20 backdrop-blur-xl bg-[var(--cyber-dark)]/50 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/2"
              className="cyber-glass p-2 hover:border-[var(--cyber-cyan)] transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--cyber-cyan)]" />
            </Link>
            <div>
              <h1 className="cyber-heading text-xl">GEOSPATIAL INTERFACE</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyber-green)] animate-pulse"></div>
                <p className="cyber-mono text-xs">REAL-TIME</p>
              </div>
            </div>
          </div>
          <div className="cyber-glass px-4 py-2">
            <p className="cyber-mono text-xs">6 ZONES • ACTIVES</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row relative">
        {/* Sidebar Control Panel */}
        <aside className="w-full lg:w-96 border-r border-[var(--cyber-cyan)]/20 bg-[var(--cyber-dark)]/30 backdrop-blur-xl p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-[var(--cyber-cyan)]" />
              <p className="cyber-mono text-xs text-[var(--cyber-cyan)]">DATA LAYER</p>
            </div>
            <h2 className="cyber-subheading text-2xl mb-4">EMPLOI SALARIÉ</h2>
            <p className="cyber-body text-sm mb-6">
              Visualisation heatmap de la distribution spatiale des emplois salariés.
              Région PACA • Dataset complet.
            </p>

            {/* Status indicators */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="cyber-glass p-3">
                <p className="cyber-mono text-xs text-[var(--cyber-cyan)] mb-1">TOTAL</p>
                <p className="cyber-heading text-2xl">1.84M</p>
              </div>
              <div className="cyber-glass p-3">
                <p className="cyber-mono text-xs text-[var(--cyber-magenta)] mb-1">ZONES</p>
                <p className="cyber-heading text-2xl">6</p>
              </div>
            </div>
          </div>

          <div className="cyber-divider mb-8"></div>

          {/* Départements Data */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[var(--cyber-magenta)]" />
              <p className="cyber-mono text-xs text-[var(--cyber-magenta)]">DÉPARTEMENTS</p>
            </div>
            <div className="space-y-3">
              {[
                { code: "04", name: "Alpes-Hte-Prov.", emplois: "42K", status: 92 },
                { code: "05", name: "Hautes-Alpes", emplois: "38K", status: 88 },
                { code: "06", name: "Alpes-Maritimes", emplois: "412K", status: 98 },
                { code: "13", name: "Bouches-du-Rhône", emplois: "742K", status: 100 },
                { code: "83", name: "Var", emplois: "370K", status: 96 },
                { code: "84", name: "Vaucluse", emplois: "238K", status: 94 },
              ].map((dept) => (
                <div
                  key={dept.code}
                  className="cyber-glass p-4 cursor-pointer hover:border-[var(--cyber-cyan)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="cyber-mono text-xs text-[var(--cyber-cyan)]">
                        ZONE-{dept.code}
                      </p>
                      <p className="cyber-body text-sm font-bold">{dept.name}</p>
                    </div>
                    <p className="cyber-heading text-lg text-[var(--cyber-green)]">
                      {dept.emplois}
                    </p>
                  </div>
                  <div className="cyber-progress">
                    <div
                      className="cyber-progress-bar"
                      style={{ width: `${dept.status}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cyber-divider my-8"></div>

          {/* Data Source */}
          <div className="cyber-glass p-4">
            <p className="cyber-mono text-xs text-[var(--cyber-cyan)] mb-2">SOURCE</p>
            <div className="cyber-code">
              INSEE.FLORES.2022<br />
              STATUS: VERIFIED<br />
              LAST_UPDATE: 2024
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 space-y-3">
            <button className="w-full cyber-glass p-3 hover:border-[var(--cyber-cyan)] transition-all">
              <p className="cyber-body text-sm font-bold text-[var(--cyber-cyan)]">
                FILTRER PAR SECTEUR
              </p>
            </button>
            <button className="w-full cyber-glass p-3 hover:border-[var(--cyber-magenta)] transition-all">
              <p className="cyber-body text-sm font-bold text-[var(--cyber-magenta)]">
                COMPARAISON TEMPORELLE
              </p>
            </button>
          </div>
        </aside>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 p-6">
            <div className="cyber-glass cyber-glow h-full overflow-hidden relative">
              {/* Grid overlay */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>
              </div>

              {/* Corner HUD elements */}
              <div className="absolute top-6 left-6 cyber-glass p-3 z-10 cyber-glow">
                <p className="cyber-mono text-xs text-[var(--cyber-cyan)]">LAT/LONG</p>
                <p className="cyber-mono text-sm text-[var(--cyber-green)]">43.93 / 6.00</p>
              </div>

              <div className="absolute top-6 right-6 cyber-glass p-3 z-10">
                <p className="cyber-mono text-xs text-[var(--cyber-magenta)]">ZOOM</p>
                <p className="cyber-mono text-sm text-[var(--cyber-green)]">7.5x</p>
              </div>

              {/* Compass */}
              <div className="absolute bottom-6 right-6 w-16 h-16 z-10">
                <div className="cyber-glass w-full h-full rounded-full flex items-center justify-center relative cyber-glow">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rotate-90">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[var(--cyber-cyan)] shadow-[0_0_10px_var(--cyber-cyan)]"></div>
                  <p className="absolute -top-6 left-1/2 -translate-x-1/2 cyber-mono text-xs text-[var(--cyber-cyan)]">N</p>
                </div>
              </div>

              {/* Scanning line effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent opacity-50"
                  style={{
                    animation: 'scan 4s linear infinite',
                    boxShadow: '0 0 10px var(--cyber-cyan)'
                  }}
                ></div>
              </div>

              <style jsx>{`
                @keyframes scan {
                  0% { top: 0; }
                  100% { top: 100%; }
                }
              `}</style>

              <PacaMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
