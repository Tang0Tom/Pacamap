import "../../styles/data-dashboard.css";
import Link from "next/link";
import { BarChart3, Map, TrendingDown, TrendingUp, Users, Database, ArrowRight, Activity } from "lucide-react";

export default function DataDashboard() {
  const departments = [
    { code: "04", name: "Alpes-de-Haute-Provence", emplois: 42000, evolution: -2.1 },
    { code: "05", name: "Hautes-Alpes", emplois: 38000, evolution: 1.3 },
    { code: "06", name: "Alpes-Maritimes", emplois: 412000, evolution: 4.2 },
    { code: "13", name: "Bouches-du-Rhône", emplois: 742000, evolution: 5.8 },
    { code: "83", name: "Var", emplois: 370000, evolution: 3.5 },
    { code: "84", name: "Vaucluse", emplois: 238000, evolution: 2.7 },
  ];

  return (
    <div className="data-page">
      {/* Header */}
      <header className="bg-white border-b border-[var(--data-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="data-heading text-2xl">MapStory PACA</h1>
              <p className="data-body text-sm">Dashboard Analytique • Emploi Salarié 2008-2022</p>
            </div>
            <nav className="flex gap-6">
              <Link href="/1" className="data-body text-sm font-semibold hover:text-[var(--data-primary)] transition-colors">
                Dashboard
              </Link>
              <Link href="/explorer/1" className="data-body text-sm font-semibold hover:text-[var(--data-primary)] transition-colors">
                Carte Interactive
              </Link>
              <Link href="/sources" className="data-body text-sm font-semibold hover:text-[var(--data-primary)] transition-colors">
                Sources
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[var(--data-bg)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="data-status-dot active"></span>
              <span className="data-label">Données en temps réel</span>
            </div>
            <h2 className="data-heading text-5xl md:text-6xl mb-6">
              Analyse Économique<br />
              Région PACA
            </h2>
            <p className="data-body text-lg mb-8">
              Dashboard analytique pour suivre l'évolution de l'emploi salarié en région
              Provence-Alpes-Côte d'Azur. Visualisez les tendances, comparez les départements
              et explorez 15 ans de données économiques (2008-2022).
            </p>
            <div className="flex gap-4">
              <Link href="/explorer/1" className="data-button data-button-primary">
                <Map className="w-5 h-5" />
                Explorer la Carte
              </Link>
              <Link href="/sources" className="data-button data-button-secondary">
                <Database className="w-5 h-5" />
                Sources de Données
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h3 className="data-subheading text-xl mb-2">Indicateurs Clés</h3>
          <p className="data-body">Vue d'ensemble régionale • Données 2022</p>
        </div>

        <div className="data-grid-4">
          <div className="data-metric-card">
            <div className="flex items-start justify-between mb-3">
              <Users className="w-8 h-8 text-[var(--data-primary)]" />
              <span className="data-badge data-badge-info">2022</span>
            </div>
            <p className="data-metric text-3xl mb-1">1,84M</p>
            <p className="data-label">Total Emplois</p>
          </div>

          <div className="data-metric-card success">
            <div className="flex items-start justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-[var(--data-success)]" />
              <span className="data-badge data-badge-success">+8.8%</span>
            </div>
            <p className="data-metric text-3xl mb-1">+158K</p>
            <p className="data-label">Emplois Créés</p>
          </div>

          <div className="data-metric-card danger">
            <div className="flex items-start justify-between mb-3">
              <TrendingDown className="w-8 h-8 text-[var(--data-danger)]" />
              <span className="data-badge data-badge-danger">-4.1%</span>
            </div>
            <p className="data-metric text-3xl mb-1">-76K</p>
            <p className="data-label">Emplois Perdus</p>
          </div>

          <div className="data-metric-card">
            <div className="flex items-start justify-between mb-3">
              <Activity className="w-8 h-8 text-[var(--data-primary)]" />
              <span className="data-badge data-badge-info">Variation Nette</span>
            </div>
            <p className="data-metric text-3xl mb-1">+82K</p>
            <p className="data-label">Solde 2008-2022</p>
          </div>
        </div>
      </section>

      {/* Departments Table */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h3 className="data-subheading text-xl mb-2">Analyse Départementale</h3>
          <p className="data-body">Répartition et évolution par département</p>
        </div>

        <div className="data-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Département</th>
                <th>Code</th>
                <th className="text-right">Emplois</th>
                <th className="text-right">Évolution</th>
                <th>Tendance</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.code}>
                  <td className="font-semibold">{dept.name}</td>
                  <td>
                    <span className="data-mono text-xs">{dept.code}</span>
                  </td>
                  <td className="text-right">
                    <span className="data-metric text-sm">
                      {dept.emplois.toLocaleString('fr-FR')}
                    </span>
                  </td>
                  <td className="text-right">
                    <span className={`font-semibold ${dept.evolution > 0 ? 'text-[var(--data-success)]' : 'text-[var(--data-danger)]'}`}>
                      {dept.evolution > 0 ? '+' : ''}{dept.evolution}%
                    </span>
                  </td>
                  <td>
                    <div className="data-progress">
                      <div
                        className="data-progress-bar"
                        style={{ width: `${Math.abs(dept.evolution) * 10}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sectors Overview */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6">
          <h3 className="data-subheading text-xl mb-2">Évolution Sectorielle</h3>
          <p className="data-body">Transformations économiques 2008-2022</p>
        </div>

        <div className="data-grid-2">
          {/* Declining Sectors */}
          <div className="data-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[var(--data-danger)]" />
              </div>
              <div>
                <h4 className="data-subheading text-lg">Secteurs en Déclin</h4>
                <p className="data-body text-sm">3 secteurs impactés</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "Agriculture", loss: -36.4, jobs: -8100 },
                { name: "Industrie", loss: -21.7, jobs: -42900 },
                { name: "Construction", loss: -11.3, jobs: -25500 },
              ].map((sector) => (
                <div key={sector.name} className="flex items-center justify-between p-3 bg-[var(--data-bg)] rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{sector.name}</p>
                    <p className="data-body text-xs">{sector.jobs.toLocaleString('fr-FR')} emplois</p>
                  </div>
                  <span className="data-badge data-badge-danger">
                    {sector.loss}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Growing Sectors */}
          <div className="data-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[var(--data-success)]" />
              </div>
              <div>
                <h4 className="data-subheading text-lg">Secteurs en Croissance</h4>
                <p className="data-body text-sm">3 secteurs dynamiques</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "Services", growth: 22.1, jobs: 98400 },
                { name: "Commerce", growth: -2.9, jobs: -10800 },
                { name: "Administration", growth: 18.9, jobs: 70700 },
              ].map((sector) => (
                <div key={sector.name} className="flex items-center justify-between p-3 bg-[var(--data-bg)] rounded-lg">
                  <div>
                    <p className="font-semibold text-sm">{sector.name}</p>
                    <p className="data-body text-xs">{Math.abs(sector.jobs).toLocaleString('fr-FR')} emplois</p>
                  </div>
                  <span className={`data-badge ${sector.growth > 0 ? 'data-badge-success' : 'data-badge-danger'}`}>
                    {sector.growth > 0 ? '+' : ''}{sector.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Map */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="data-card bg-gradient-to-br from-[var(--data-primary)] to-[var(--data-secondary)] text-white border-none">
          <div className="text-center max-w-2xl mx-auto">
            <BarChart3 className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h3 className="text-4xl font-bold mb-4">Explorez la Carte Interactive</h3>
            <p className="text-white/90 mb-8 text-lg">
              Visualisez les données département par département avec notre carte choroplèthe interactive.
            </p>
            <Link
              href="/explorer/1"
              className="inline-flex items-center gap-2 bg-white text-[var(--data-primary)] px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all"
            >
              Accéder à la Carte
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--data-border)] bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="data-body text-sm">
              MapStory PACA © 2024 • Sources : INSEE FLORES & DARES
            </p>
            <div className="flex gap-6">
              <Link href="/sources" className="data-body text-sm hover:text-[var(--data-primary)] transition-colors">
                Sources & Méthodologie
              </Link>
              <Link href="/2" className="data-body text-sm hover:text-[var(--data-primary)] transition-colors">
                Version Alternative
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
