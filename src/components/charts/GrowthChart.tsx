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
  ReferenceLine,
} from "recharts";
import SourceBadge from "@/components/ui/SourceBadge";

interface GrowthChartProps {
  data: { name: string; change: number }[];
  sourceId?: string;
  height?: number;
}

export default function GrowthChart({
  data,
  sourceId,
  height = 300,
}: GrowthChartProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
          />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={95} />
          <Tooltip
            formatter={(value) => `${Number(value) > 0 ? "+" : ""}${value}%`}
            labelStyle={{ fontWeight: 600 }}
          />
          <ReferenceLine x={0} stroke="#6b7280" />
          <Bar dataKey="change" radius={[0, 4, 4, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.change >= 0 ? "#10b981" : "#ef4444"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {sourceId && <SourceBadge sourceId={sourceId} />}
    </div>
  );
}
