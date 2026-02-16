import "../../styles/atlas.css";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingDown, TrendingUp, Users } from "lucide-react";

export default function AtlasHome() {
  return (
    <div className="atlas-page min-h-screen relative z-10">
      {/* Header ornement */}
      <header className="border-b-2 border-[var(--atlas-sepia)] bg-[var(--atlas-paper)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="atlas-heading text-2xl">MapStory PACA</h1>
            <p className="atlas-numero text-xs mt-1">Atlas Économique • 2008-2022</p>
          </div>
          <nav className="flex gap-6">
            <Link href="/1" className="atlas-body text-sm hover:text-[var(--atlas-burgundy)] transition-colors">
              Atlas
            </Link>
            <Link href="/explorer/1" className="atlas-body text-sm hover:text-[var(--atlas-burgundy)] transition-colors">
              Cartographie
            </Link>
            <Link href="/sources" className="atlas-body text-sm hover:text-[var(--atlas-burgundy)] transition-colors">
              Sources
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative">
        <span className="atlas-chapter-numero">I</span>
        <div className="relative z-10">
          <p className="atlas-numero text-sm mb-4">CHAPITRE PREMIER</p>
          <h2 className="atlas-heading text-6xl md:text-8xl mb-6">
            Chronique d'une<br />
            Mutation Économique
          </h2>
          <p className="atlas-body max-w-2xl mb-8">
            De la crise financière de 2008 à la pandémie mondiale, plongée dans quinze années
            de transformations profondes du tissu économique provençal. Un récit cartographique
            où les données racontent l'histoire des hommes et des territoires.
          </p>
          <button className="atlas-button">
            Commencer la Lecture
            <ArrowRight className="inline-block ml-2 w-4 h-4" />
          </button>
        </div>

        <div className="atlas-divider my-16"></div>

        {/* Stats ornementales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="atlas-card p-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-[var(--atlas-navy)]" strokeWidth={1.5} />
            <p className="atlas-numero text-4xl mb-2">1,84M</p>
            <p className="atlas-body text-sm">Emplois Salariés en PACA</p>
          </div>
          <div className="atlas-card p-8 text-center">
            <TrendingDown className="w-12 h-12 mx-auto mb-4 text-[var(--atlas-burgundy)]" strokeWidth={1.5} />
            <p className="atlas-numero text-4xl mb-2">-76K</p>
            <p className="atlas-body text-sm">Emplois Perdus (Secteurs en Déclin)</p>
          </div>
          <div className="atlas-card p-8 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-[var(--atlas-teal)]" strokeWidth={1.5} />
            <p className="atlas-numero text-4xl mb-2">+158K</p>
            <p className="atlas-body text-sm">Emplois Créés (Secteurs Émergents)</p>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <section className="bg-gradient-to-b from-[var(--atlas-paper)] to-[#EDE9DC] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="atlas-numero text-sm mb-4 text-center">SOMMAIRE</p>
          <h3 className="atlas-heading text-4xl mb-12 text-center">Les Chapitres de l'Atlas</h3>

          <div className="space-y-6">
            {[
              { num: "I", title: "Vue d'Ensemble Régionale", desc: "Portrait statistique de PACA en 2022" },
              { num: "II", title: "Quinze Ans de Mutations", desc: "Analyse chronologique 2008-2022" },
              { num: "III", title: "Les Métiers Qui Disparaissent", desc: "Agriculture, Industrie, Construction" },
              { num: "IV", title: "Les Métiers Qui Émergent", desc: "Services, Numérique, Santé" },
              { num: "V", title: "Disparités Territoriales", desc: "Contrastes entre départements" },
              { num: "VI", title: "Cartographie Interactive", desc: "Explorer les données par territoire" },
            ].map((chapter, i) => (
              <div
                key={i}
                className="atlas-card p-6 hover:shadow-xl transition-all duration-500 cursor-pointer group"
              >
                <div className="flex items-start gap-6">
                  <span className="atlas-heading text-5xl text-[var(--atlas-ochre)] opacity-60 group-hover:opacity-100 transition-opacity">
                    {chapter.num}
                  </span>
                  <div className="flex-1">
                    <h4 className="atlas-subheading text-xl mb-1">{chapter.title}</h4>
                    <p className="atlas-body text-sm text-[var(--atlas-sepia)]">{chapter.desc}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[var(--atlas-burgundy)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="atlas-card p-12 text-center relative overflow-hidden">
          <MapPin className="w-32 h-32 absolute -top-8 -right-8 text-[var(--atlas-ochre)] opacity-10" />
          <h3 className="atlas-heading text-4xl mb-4 relative z-10">Explorer la Cartographie</h3>
          <p className="atlas-body max-w-2xl mx-auto mb-8 relative z-10">
            Découvrez les données département par département sur une carte interactive
            au style atlas classique réinterprété.
          </p>
          <Link href="/explorer/1" className="atlas-button inline-block">
            Accéder à la Carte
          </Link>
        </div>
      </section>

      {/* Footer ornement */}
      <footer className="border-t-2 border-[var(--atlas-sepia)] bg-[var(--atlas-paper)] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="atlas-numero text-xs">
            MapStory PACA — Atlas Économique Régional • Données INSEE & DARES 2008-2022
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/sources" className="atlas-body text-xs hover:text-[var(--atlas-burgundy)]">
              Sources & Méthodologie
            </Link>
            <span className="text-[var(--atlas-sepia)]">•</span>
            <Link href="/2" className="atlas-body text-xs hover:text-[var(--atlas-burgundy)]">
              Version Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
