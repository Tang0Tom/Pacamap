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
        "bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100",
        className
      )}
    >
      <p className="text-xs font-semibold text-content-text mb-2">{title}</p>
      <div className="flex gap-0.5">
        {scale.map((color, i) => (
          <div key={i} className="flex-1">
            <div
              className="h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <p className="text-[10px] text-content-muted mt-1 font-mono">
              {Math.round(min + step * i).toLocaleString("fr-FR")}
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
