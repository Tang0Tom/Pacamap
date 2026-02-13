import { cn } from "@/lib/utils";

interface MapTooltipProps {
  name: string;
  value?: number;
  label?: string;
  unit?: string;
  className?: string;
}

export default function MapTooltip({
  name,
  value,
  label,
  unit = "",
  className,
}: MapTooltipProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 text-sm",
        className
      )}
    >
      <p className="font-semibold text-content-text">{name}</p>
      {value !== undefined && (
        <p className="text-content-muted">
          {label && <span>{label} : </span>}
          <span className="font-mono font-semibold text-accent-primary">
            {value.toLocaleString("fr-FR")}
            {unit}
          </span>
        </p>
      )}
    </div>
  );
}
