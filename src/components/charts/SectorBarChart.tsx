"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CHART_PALETTE } from "@/lib/colors";
import SourceBadge from "@/components/ui/SourceBadge";

interface SectorBarChartProps {
  data: { name: string; value: number }[];
  sourceId?: string;
  layout?: "horizontal" | "vertical";
  height?: number;
  colorBy?: "index" | "value";
  positiveColor?: string;
  negativeColor?: string;
}

export default function SectorBarChart({
  data,
  sourceId,
  layout = "horizontal",
  height = 300,
  colorBy = "index",
  positiveColor = "#10b981",
  negativeColor = "#ef4444",
}: SectorBarChartProps) {
  const getColor = (entry: { value: number }, index: number) => {
    if (colorBy === "value") {
      return entry.value >= 0 ? positiveColor : negativeColor;
    }
    return CHART_PALETTE[index % CHART_PALETTE.length];
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={layout === "horizontal" ? "vertical" : "horizontal"}
          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          {layout === "horizontal" ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString("fr-FR")} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={75} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v.toLocaleString("fr-FR")} />
            </>
          )}
          <Tooltip
            formatter={(value) => Number(value).toLocaleString("fr-FR")}
            labelStyle={{ fontWeight: 600 }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(entry, index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {sourceId && <SourceBadge sourceId={sourceId} />}
    </div>
  );
}
