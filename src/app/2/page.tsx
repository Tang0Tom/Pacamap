import "../../styles/dashboard.css";
import Link from "next/link";
import { Activity, Database, MapIcon, TrendingDown, TrendingUp, Zap } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="dashboard-page min-h-screen relative z-10">
      {/* Header cyber */}
      <header className="border-b border-[var(--cyber-cyan)]/20 backdrop-blur-xl bg-[var(--cyber-dark)]/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--cyber-cyan)] to-[var(--cyber-magenta)] flex items-center justify-center">
              <Database className="w-6 h-6 text-[var(--cyber-void)]" />
            </div>
            <div>
              <h1 className="cyber-heading text-xl">MAPSTORY.PACA</h1>
              <p className="cyber-mono text-xs">v2.0.22 • LIVE</p>
            </div>
          </div>
          <nav className="flex gap-6">
            <Link href="/2" className="cyber-body text-sm hover:text-[var(--cyber-cyan)] transition-colors">
              DASHBOARD
            </Link>
            <Link href="/explorer/2" className="cyber-body text-sm hover:text-[var(--cyber-cyan)] transition-colors">
              MAP
            </Link>
            <Link href="/sources" className="cyber-body text-sm hover:text-[var(--cyber-cyan)] transition-colors">
              DATA
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Cyber */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--cyber-green)] animate-pulse"></div>
              <p className="cyber-mono text-sm">SYSTÈME ACTIF</p>
            </div>
            <h2 className="cyber-heading text-5xl md:text-7xl mb-6 leading-tight">
              ECONOMIC<br />
              DATA CONTROL<br />
              PANEL
            </h2>
            <p className="cyber-body max-w-lg mb-8">
              Interface de monitoring en temps réel des données économiques régionales
              PACA. Période : 2008-2022. Analyse multi-sectorielle avec corrélations
              statistiques avancées.
            </p>
            <div className="flex gap-4">
              <button className="cyber-button">
                ACCÉDER AUX DONNÉES
              </button>
              <button className="cyber-glass px-6 py-3 text-[var(--cyber-cyan)] cyber-body font-bold text-sm">
                DOC TECHNIQUE
              </button>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-4">
            {[
              { label: "TOTAL EMPLOIS", value: "1.84M", status: "STABLE", icon: Activity, color: "cyan" },
              { label: "VARIATION NETTE", value: "+82K", status: "↑ POSITIVE", icon: TrendingUp, color: "green" },
              { label: "SECTEURS ACTIFS", value: "6", status: "MONITORED", icon: Database, color: "magenta" },
            ].map((stat, i) => (
              <div key={i} className="cyber-glass p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="cyber-mono text-xs text-[var(--cyber-cyan)] mb-1">{stat.label}</p>
                    <p className="cyber-heading text-3xl">{stat.value}</p>
                  </div>
                  <div className="text-right">
                    <stat.icon className={`w-8 h-8 mb-2 ${stat.color === 'cyan' ? 'text-[var(--cyber-cyan)]' : stat.color === 'green' ? 'text-[var(--cyber-green)]' : 'text-[var(--cyber-magenta)]'}`} />
                    <p className="cyber-mono text-xs text-[var(--cyber-green)]">{stat.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Modules */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="cyber-subheading text-2xl">MODULES DE DONNÉES</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--cyber-green)] animate-pulse"></div>
            <p className="cyber-mono text-xs">6 MODULES CHARGÉS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "01",
              title: "VUE D'ENSEMBLE",
              desc: "Statistiques régionales globales",
              icon: Database,
              status: "100%",
            },
            {
              id: "02",
              title: "TIMELINE 2008-2022",
              desc: "Analyse temporelle multi-sectorielle",
              icon: Activity,
              status: "100%",
            },
            {
              id: "03",
              title: "SECTEURS DÉCLIN",
              desc: "Agriculture • Industrie • Construction",
              icon: TrendingDown,
              status: "100%",
            },
            {
              id: "04",
              title: "SECTEURS CROISSANCE",
              desc: "Services • Numérique • Santé",
              icon: TrendingUp,
              status: "100%",
            },
            {
              id: "05",
              title: "DISPARITÉS TERRITORIALES",
              desc: "Analyse départementale comparée",
              icon: MapIcon,
              status: "100%",
            },
            {
              id: "06",
              title: "CARTOGRAPHIE INTERACTIVE",
              desc: "Exploration géospatiale des données",
              icon: Zap,
              status: "100%",
            },
          ].map((module, i) => (
            <div
              key={i}
              className="cyber-glass p-6 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-magenta)] opacity-50"></div>

              <div className="flex items-start justify-between mb-4">
                <module.icon className="w-8 h-8 text-[var(--cyber-cyan)]" />
                <span className="cyber-mono text-xs text-[var(--cyber-green)]">{module.status}</span>
              </div>

              <p className="cyber-mono text-xs text-[var(--cyber-cyan)] mb-2">MODULE {module.id}</p>
              <h4 className="cyber-subheading text-lg mb-2">{module.title}</h4>
              <p className="cyber-body text-sm text-[#8484B4]">{module.desc}</p>

              <div className="cyber-progress mt-4">
                <div className="cyber-progress-bar" style={{ width: module.status }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Map */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="cyber-glass cyber-glow p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--cyber-magenta)]/10"></div>
          <MapIcon className="w-20 h-20 mx-auto mb-6 text-[var(--cyber-cyan)] relative z-10" />
          <h3 className="cyber-heading text-4xl mb-4 relative z-10">INTERFACE CARTOGRAPHIQUE</h3>
          <p className="cyber-body max-w-2xl mx-auto mb-8 relative z-10">
            Explorez les données en mode géospatial avec heatmap néon et visualisation
            en temps réel par département.
          </p>
          <Link href="/explorer/2" className="cyber-button inline-block relative z-10">
            LANCER L'INTERFACE
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--cyber-cyan)]/20 backdrop-blur-xl bg-[var(--cyber-dark)]/50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="cyber-mono text-xs">
              MAPSTORY.PACA © 2024 • DATA SOURCE: INSEE & DARES
            </p>
            <div className="flex gap-6">
              <Link href="/sources" className="cyber-body text-xs hover:text-[var(--cyber-cyan)] transition-colors">
                DATA SOURCES
              </Link>
              <Link href="/1" className="cyber-body text-xs hover:text-[var(--cyber-cyan)] transition-colors">
                VERSION ATLAS
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
