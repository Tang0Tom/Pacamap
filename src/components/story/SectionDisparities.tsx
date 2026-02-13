"use client";

import Section from "./Section";
import TransitionWrapper from "@/components/ui/TransitionWrapper";
import SectorBarChart from "@/components/charts/SectorBarChart";
import Card from "@/components/ui/Card";
import SourceBadge from "@/components/ui/SourceBadge";
import { usePacaData } from "@/hooks/usePacaData";
import type { DepartmentComparison } from "@/types/data";
import { ArrowLeftRight } from "lucide-react";

export default function SectionDisparities() {
  const { data: departments } = usePacaData<DepartmentComparison[]>(
    "departments-comparison.json"
  );

  const unemploymentData =
    departments?.map((d) => ({
      name: d.name.replace("Alpes-de-Haute-Provence", "Alpes-Hte-Prov.").replace("Bouches-du-Rhône", "Bouches-du-R."),
      value: d.unemploymentRate,
    })) ?? [];

  const growthData =
    departments?.map((d) => ({
      name: d.name.replace("Alpes-de-Haute-Provence", "Alpes-Hte-Prov.").replace("Bouches-du-Rhône", "Bouches-du-R."),
      value: d.growthRate,
    })) ?? [];

  const sorted = departments ? [...departments].sort((a, b) => b.totalEmployment - a.totalEmployment) : [];
  const biggest = sorted[0];
  const smallest = sorted[sorted.length - 1];

  return (
    <Section id="section-5" theme="light">
      <TransitionWrapper>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-accent-highlight" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-content-text">
            Les Disparités
          </h2>
        </div>
        <p className="text-content-muted mb-8 max-w-xl">
          Entre le littoral dynamique et l&apos;arrière-pays montagneux,
          les écarts de développement économique sont considérables.
        </p>
      </TransitionWrapper>

      {biggest && smallest && (
        <TransitionWrapper delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border-l-4 border-l-accent-primary">
              <p className="text-sm text-content-muted uppercase tracking-wider font-mono mb-1">
                Plus gros bassin d&apos;emploi
              </p>
              <p className="text-xl font-bold text-content-text">
                {biggest.name}
              </p>
              <p className="text-3xl font-bold font-mono text-accent-primary mt-2">
                {biggest.totalEmployment.toLocaleString("fr-FR")}
              </p>
              <p className="text-sm text-content-muted">emplois salariés</p>
            </Card>
            <Card className="border-l-4 border-l-accent-highlight">
              <p className="text-sm text-content-muted uppercase tracking-wider font-mono mb-1">
                Plus petit bassin d&apos;emploi
              </p>
              <p className="text-xl font-bold text-content-text">
                {smallest.name}
              </p>
              <p className="text-3xl font-bold font-mono text-accent-highlight mt-2">
                {smallest.totalEmployment.toLocaleString("fr-FR")}
              </p>
              <p className="text-sm text-content-muted">emplois salariés</p>
            </Card>
          </div>
        </TransitionWrapper>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransitionWrapper delay={0.3}>
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-4">
              Taux de chômage par département
            </h3>
            <SectorBarChart
              data={unemploymentData}
              height={280}
              layout="horizontal"
            />
            <SourceBadge sourceId="insee-chomage" />
          </Card>
        </TransitionWrapper>

        <TransitionWrapper delay={0.5} direction="right">
          <Card>
            <h3 className="text-lg font-semibold text-content-text mb-4">
              Croissance de l&apos;emploi (%, 2008-2022)
            </h3>
            <SectorBarChart
              data={growthData}
              height={280}
              layout="horizontal"
              colorBy="value"
            />
            <SourceBadge sourceId="insee-flores" />
          </Card>
        </TransitionWrapper>
      </div>
    </Section>
  );
}
