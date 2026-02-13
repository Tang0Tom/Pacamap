import NavigationBar from "@/components/ui/NavigationBar";
import Card from "@/components/ui/Card";
import { DATA_SOURCES } from "@/lib/sources";
import { ExternalLink, Database, Calendar, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sources — MapStory PACA",
  description: "Toutes les sources de données utilisées dans MapStory PACA",
};

export default function SourcesPage() {
  const sources = Object.values(DATA_SOURCES);

  return (
    <div className="min-h-screen bg-content-bg">
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-content-text mb-4">
          Sources des données
        </h1>
        <p className="text-lg text-content-muted mb-12 max-w-2xl">
          Toutes les données utilisées dans MapStory PACA proviennent de sources
          publiques officielles. Chaque visualisation indique sa source via un
          badge cliquable.
        </p>

        <div className="space-y-6">
          {sources.map((source) => (
            <Card key={source.id}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 text-accent-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-content-text">
                        {source.provider} — {source.name}
                      </h2>
                      <p className="text-content-muted mt-1">
                        {source.description}
                      </p>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 text-sm text-accent-primary hover:underline"
                    >
                      Accéder
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-content-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      {source.format}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {source.frequency}
                    </span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                      Dernière maj : {source.lastUpdate}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-accent-primary hover:underline font-medium"
          >
            Retour au récit
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-content-muted">
        <p>
          MapStory PACA — Données ouvertes,{" "}
          <Link href="/sources" className="text-accent-primary hover:underline">
            sources vérifiables
          </Link>
        </p>
      </footer>
    </div>
  );
}
