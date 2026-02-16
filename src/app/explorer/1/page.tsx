"use client";

import "../.././../styles/atlas.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, MapPin } from "lucide-react";

const PacaMap = dynamic(() => import("@/components/map/PacaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center atlas-body">
      Chargement de la cartographie...
    </div>
  ),
});

export default function AtlasExplorer() {
  return (
    <div className="atlas-page min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-[var(--atlas-sepia)] bg-[var(--atlas-paper)] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/1"
              className="atlas-card p-2 hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="atlas-heading text-2xl">Cartographie</h1>
              <p className="atlas-numero text-xs mt-1">Atlas Interactif PACA</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--atlas-burgundy)]" />
            <p className="atlas-numero text-sm">6 Départements</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 border-r-2 border-[var(--atlas-sepia)] bg-gradient-to-b from-[var(--atlas-paper)] to-[#EDE9DC] p-6 overflow-y-auto">
          <div className="mb-8">
            <p className="atlas-numero text-xs mb-2">LÉGENDE</p>
            <h2 className="atlas-heading text-2xl mb-4">Emploi Salarié</h2>
            <p className="atlas-body text-sm mb-6">
              Visualisation choroplèthe de la répartition des emplois salariés par département
              en région Provence-Alpes-Côte d'Azur.
            </p>
          </div>

          <div className="atlas-divider mb-8"></div>

          {/* Info départements */}
          <div>
            <p className="atlas-numero text-xs mb-4">DÉPARTEMENTS</p>
            <div className="space-y-3">
              {[
                { code: "04", name: "Alpes-de-Haute-Provence", emplois: "42,000" },
                { code: "05", name: "Hautes-Alpes", emplois: "38,000" },
                { code: "06", name: "Alpes-Maritimes", emplois: "412,000" },
                { code: "13", name: "Bouches-du-Rhône", emplois: "742,000" },
                { code: "83", name: "Var", emplois: "370,000" },
                { code: "84", name: "Vaucluse", emplois: "238,000" },
              ].map((dept) => (
                <div
                  key={dept.code}
                  className="atlas-card p-3 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="atlas-numero text-xs text-[var(--atlas-sepia)]">
                        {dept.code}
                      </p>
                      <p className="atlas-body text-sm font-semibold">{dept.name}</p>
                    </div>
                    <p className="atlas-numero text-sm text-[var(--atlas-navy)]">
                      {dept.emplois}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="atlas-divider my-8"></div>

          <div className="atlas-card p-4">
            <p className="atlas-numero text-xs mb-2">SOURCE</p>
            <p className="atlas-body text-xs">
              INSEE FLORES 2022<br />
              Données emploi salarié
            </p>
          </div>
        </aside>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 p-6">
            <div className="atlas-card h-full overflow-hidden relative">
              {/* Coins ornementaux */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[var(--atlas-gold)] pointer-events-none z-10"></div>
              <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[var(--atlas-gold)] pointer-events-none z-10"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[var(--atlas-gold)] pointer-events-none z-10"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[var(--atlas-gold)] pointer-events-none z-10"></div>

              {/* Compass rose décoratif */}
              <div className="absolute top-6 right-6 w-20 h-20 pointer-events-none z-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-[var(--atlas-sepia)]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rotate-90">
                  <div className="w-full h-0.5 bg-[var(--atlas-sepia)]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[var(--atlas-burgundy)] border-2 border-[var(--atlas-gold)]"></div>
                </div>
                <p className="absolute -top-6 left-1/2 -translate-x-1/2 atlas-numero text-xs">N</p>
              </div>

              <PacaMap />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
