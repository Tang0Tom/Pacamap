import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/colors";
import type { Insight } from "@/types/insights";
import {
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  Target,
  Activity,
} from "lucide-react";

interface InsightCardProps {
  insight: Insight;
  className?: string;
}

const ICON_MAP = {
  TrendingUp,
  TrendingDown,
  Info,
  AlertTriangle,
  Target,
  Activity,
};

const TYPE_STYLES = {
  positive: {
    border: "border-l-[3px] border-l-orange-600",
    iconBg: "bg-gradient-to-br from-orange-50 to-amber-50",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
    glow: "shadow-orange-500/10",
  },
  negative: {
    border: "border-l-[3px] border-l-indigo-500",
    iconBg: "bg-gradient-to-br from-indigo-50 to-purple-50",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-900",
    glow: "shadow-indigo-500/10",
  },
  neutral: {
    border: "border-l-[3px] border-l-cyan-600",
    iconBg: "bg-gradient-to-br from-cyan-50 to-sky-50",
    iconColor: "text-cyan-700",
    titleColor: "text-cyan-900",
    glow: "shadow-cyan-500/10",
  },
};

export default function InsightCard({ insight, className }: InsightCardProps) {
  const Icon = ICON_MAP[insight.icon];
  const styles = TYPE_STYLES[insight.type];

  return (
    <div
      className={cn(
        "rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200/60 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5",
        styles.border,
        styles.glow,
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        {/* Icône */}
        <div
          className={cn(
            "rounded-xl p-2.5 shrink-0 shadow-sm",
            styles.iconBg
          )}
        >
          <Icon className={cn("w-5 h-5", styles.iconColor)} strokeWidth={2.5} />
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          {/* Titre */}
          <h4 className={cn("font-semibold text-sm mb-1", styles.titleColor)}>
            {insight.title}
          </h4>

          {/* Message */}
          <p className="text-sm text-gray-700 leading-relaxed">
            {insight.message}
          </p>

          {/* Métriques optionnelles */}
          {insight.metrics && insight.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
              {insight.metrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="text-xs text-gray-500 mb-0.5">
                    {metric.label}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
