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
    border: "border-l-4 border-l-emerald-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    titleColor: "text-emerald-900",
  },
  negative: {
    border: "border-l-4 border-l-red-500",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
  },
  neutral: {
    border: "border-l-4 border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
  },
};

export default function InsightCard({ insight, className }: InsightCardProps) {
  const Icon = ICON_MAP[insight.icon];
  const styles = TYPE_STYLES[insight.type];

  return (
    <div
      className={cn(
        "rounded-lg bg-white shadow-sm border border-gray-100 p-4",
        styles.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icône */}
        <div
          className={cn(
            "rounded-full p-2 shrink-0",
            styles.iconBg
          )}
        >
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
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
