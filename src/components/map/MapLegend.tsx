import { cn } from "@/lib/utils";

interface MapLegendProps {
  title: string;
  scale: readonly string[];
  min: number;
  max: number;
  unit?: string;
  className?: string;
}

export default function MapLegend({
  title,
  scale,
  min,
  max,
  unit = "",
  className,
}: MapLegendProps) {
  const step = (max - min) / scale.length;

  return (
    <div
      className={cn(
        "bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-200/60",
        className
      )}
    >
      <p className="text-xs font-bold text-content-text mb-3 tracking-wide uppercase">
        {title}
      </p>
      <div className="flex gap-1">
        {scale.map((color, i) => (
          <div key={i} className="flex-1 group">
            <div
              className="h-4 rounded-md shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: color }}
            />
            <p className="text-[10px] text-content-muted mt-1.5 font-mono text-center">
              {Math.round(min + step * i).toLocaleString("fr-FR")}
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
