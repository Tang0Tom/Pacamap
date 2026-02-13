"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_PALETTE } from "@/lib/colors";
import SourceBadge from "@/components/ui/SourceBadge";
import type { SectorTimeSeries } from "@/types/data";

interface TimeSeriesChartProps {
  series: SectorTimeSeries[];
  sourceId?: string;
  height?: number;
}

export default function TimeSeriesChart({
  series,
  sourceId,
  height = 350,
}: TimeSeriesChartProps) {
  // Merge all series into a single data array keyed by year
  const years = new Set<number>();
  series.forEach((s) => s.data.forEach((d) => years.add(d.year)));

  const mergedData = Array.from(years)
    .sort()
    .map((year) => {
      const point: Record<string, number> = { year };
      series.forEach((s) => {
        const found = s.data.find((d) => d.year === year);
        point[s.sector] = found?.value ?? 0;
      });
      return point;
    });

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={mergedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(v) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toString()
            }
          />
          <Tooltip
            formatter={(value, name) => [
              Number(value).toLocaleString("fr-FR"),
              series.find((s) => s.sector === String(name))?.label ?? String(name),
            ]}
          />
          <Legend
            formatter={(value) =>
              series.find((s) => s.sector === value)?.label ?? value
            }
          />
          {series.map((s, i) => (
            <Line
              key={s.sector}
              type="monotone"
              dataKey={s.sector}
              stroke={CHART_PALETTE[i % CHART_PALETTE.length]}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              animationDuration={2000}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {sourceId && <SourceBadge sourceId={sourceId} />}
    </div>
  );
}
