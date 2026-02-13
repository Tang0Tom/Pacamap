import { cn } from "@/lib/utils";
import { getSourceLabel } from "@/lib/sources";
import { DATA_SOURCES } from "@/lib/sources";
import { ExternalLink } from "lucide-react";

interface SourceBadgeProps {
  sourceId: string;
  className?: string;
}

export default function SourceBadge({ sourceId, className }: SourceBadgeProps) {
  const source = DATA_SOURCES[sourceId];
  if (!source) return null;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-accent-primary transition-colors mt-2",
        className
      )}
    >
      <span>Source : {getSourceLabel(sourceId)}</span>
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}
