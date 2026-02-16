import "../../styles/brutal.css";
import Link from "next/link";
import { Map, TrendingDown, TrendingUp, Users, Zap, ArrowRight, Database } from "lucide-react";

export default function BrutalHome() {
  return (
    <div className="brutal-page">
      {/* Header */}
      <header className="brutal-header">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--brutal-magenta)] border-4 border-[var(--brutal-black)] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div>
                <h1 className="brutal-heading text-2xl">MAPSTORY PACA</h1>
                <p className="brutal-mono text-xs">v2.0 • BRUTAL EDITION</p>
              </div>
            </div>
            <nav className="flex gap-4">
              <Link href="/2" className="brutal-tag brutal-tag-magenta">
                HOME
              </Link>
              <Link href="/explorer/2" className="brutal-tag">
                MAP
              </Link>
              <Link href="/sources" className="brutal-tag">
                DATA
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Decorative shapes */}
        <div className="brutal-shape brutal-shape-circle w-32 h-32 -top-8 -right-8 opacity-20"></div>
        <div className="brutal-shape brutal-shape-square w-24 h-24 bottom-0 left-12 opacity-10"></div>

        <div className="relative z-10">
          <div className="inline-block mb-6">
            <span className="brutal-tag brutal-tag-yellow">DONNÉES ÉCONOMIQUES</span>
          </div>
          <h2 className="brutal-heading text-7xl md:text-9xl mb-8">
            EMPLOI<br />
            RÉGION<br />
            <span className="brutal-highlight">PACA</span>
          </h2>
          <p className="brutal-body text-xl max-w-2xl mb-10">
            Visualisation radicale des transformations économiques de la région
            Provence-Alpes-Côte d'Azur. Données brutes. Design brutal. Vérité pure.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/explorer/2" className="brutal-button brutal-button-primary">
              <Map className="w-5 h-5" />
              EXPLORER LA CARTE
            </Link>
            <Link href="/sources" className="brutal-button">
              <Database className="w-5 h-5" />
              VOIR LES SOURCES
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid Brutal */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="brutal-grid brutal-grid-3 gap-6">
          <div className="brutal-stat bg-[var(--brutal-yellow)]">
            <Users className="w-12 h-12 mx-auto mb-4" strokeWidth={3} />
            <p className="brutal-stat-number">1.84M</p>
            <p className="brutal-stat-label">EMPLOIS TOTAL</p>
          </div>

          <div className="brutal-stat bg-[var(--brutal-green)]">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" strokeWidth={3} />
            <p className="brutal-stat-number">+158K</p>
            <p className="brutal-stat-label">EMPLOIS CRÉÉS</p>
          </div>

          <div className="brutal-stat bg-[var(--brutal-magenta)] text-white">
            <TrendingDown className="w-12 h-12 mx-auto mb-4" strokeWidth={3} />
            <p className="brutal-stat-number text-white">-76K</p>
            <p className="brutal-stat-label text-white">EMPLOIS PERDUS</p>
          </div>
        </div>
      </section>

      <div className="brutal-divider"></div>

      {/* Departments Grid Asymétrique */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="brutal-subheading text-4xl mb-8">DÉPARTEMENTS</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { code: "04", name: "Alpes-de-Haute-Provence", emplois: "42K", color: "cyan" },
            { code: "05", name: "Hautes-Alpes", emplois: "38K", color: "yellow" },
            { code: "06", name: "Alpes-Maritimes", emplois: "412K", color: "magenta" },
            { code: "13", name: "Bouches-du-Rhône", emplois: "742K", color: "green" },
            { code: "83", name: "Var", emplois: "370K", color: "cyan" },
            { code: "84", name: "Vaucluse", emplois: "238K", color: "yellow" },
          ].map((dept) => (
            <div
              key={dept.code}
              className={`brutal-card brutal-card-${dept.color} brutal-card-interactive`}
            >
              <p className="brutal-mono text-sm mb-2 opacity-80">#{dept.code}</p>
              <h4 className="brutal-subheading text-xl mb-3">{dept.name}</h4>
              <p className="brutal-heading text-4xl">{dept.emplois}</p>
              <p className="brutal-mono text-xs mt-2 opacity-70">EMPLOIS SALARIÉS</p>
            </div>
          ))}
        </div>
      </section>

      <div className="brutal-divider"></div>

      {/* Sectors */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="brutal-subheading text-4xl mb-8">ÉVOLUTION SECTORIELLE</h3>

        <div className="brutal-grid brutal-grid-2 gap-8">
          {/* Declining */}
          <div className="brutal-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[var(--brutal-red)] border-4 border-[var(--brutal-black)] flex items-center justify-center">
                <TrendingDown className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <div>
                <h4 className="brutal-subheading text-2xl">DÉCLIN</h4>
                <p className="brutal-mono text-sm">3 SECTEURS</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: "Agriculture", pct: "-36.4%", jobs: "-8.1K" },
                { name: "Industrie", pct: "-21.7%", jobs: "-42.9K" },
                { name: "Construction", pct: "-11.3%", jobs: "-25.5K" },
              ].map((sector) => (
                <div key={sector.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="brutal-body font-bold">{sector.name}</span>
                    <span className="brutal-tag">{sector.pct}</span>
                  </div>
                  <div className="brutal-progress">
                    <div
                      className="brutal-progress-bar"
                      style={{ width: `${Math.abs(parseFloat(sector.pct)) * 2}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth */}
          <div className="brutal-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[var(--brutal-green)] border-4 border-[var(--brutal-black)] flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[var(--brutal-black)]" strokeWidth={3} />
              </div>
              <div>
                <h4 className="brutal-subheading text-2xl">CROISSANCE</h4>
                <p className="brutal-mono text-sm">3 SECTEURS</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: "Services", pct: "+22.1%", jobs: "+98.4K" },
                { name: "Commerce", pct: "-2.9%", jobs: "-10.8K" },
                { name: "Administration", pct: "+18.9%", jobs: "+70.7K" },
              ].map((sector) => (
                <div key={sector.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="brutal-body font-bold">{sector.name}</span>
                    <span className="brutal-tag brutal-tag-green">{sector.pct}</span>
                  </div>
                  <div className="brutal-progress">
                    <div
                      className="brutal-progress-bar bg-[var(--brutal-green)]"
                      style={{ width: `${Math.abs(parseFloat(sector.pct)) * 2}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Map */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="brutal-card brutal-card-magenta text-white text-center p-16 relative overflow-hidden">
          <div className="brutal-shape brutal-shape-circle w-64 h-64 -top-32 -right-32 bg-[var(--brutal-yellow)]"></div>
          <div className="relative z-10">
            <Map className="w-24 h-24 mx-auto mb-8 brutal-animate-bounce" strokeWidth={3} />
            <h3 className="brutal-heading text-6xl mb-6">CARTE INTERACTIVE</h3>
            <p className="brutal-body text-xl mb-10 max-w-2xl mx-auto">
              Explorez les données géographiques département par département
              avec notre visualisation choroplèthe.
            </p>
            <Link
              href="/explorer/2"
              className="brutal-button bg-[var(--brutal-yellow)] text-[var(--brutal-black)] hover:bg-[var(--brutal-cyan)]"
            >
              ACCÉDER À LA CARTE
              <ArrowRight className="w-6 h-6" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-[var(--brutal-black)] bg-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="brutal-mono text-sm">
              MAPSTORY.PACA © 2024 • INSEE & DARES DATA
            </p>
            <div className="flex gap-4">
              <Link href="/sources" className="brutal-tag">
                SOURCES
              </Link>
              <Link href="/1" className="brutal-tag">
                VERSION DATA
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
