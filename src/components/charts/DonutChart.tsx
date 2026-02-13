"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CHART_PALETTE } from "@/lib/colors";
import SourceBadge from "@/components/ui/SourceBadge";

interface DonutChartProps {
  data: { name: string; value: number }[];
  sourceId?: string;
  height?: number;
}

export default function DonutChart({
  data,
  sourceId,
  height = 300,
}: DonutChartProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationDuration={1500}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={CHART_PALETTE[index % CHART_PALETTE.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => Number(value).toLocaleString("fr-FR")}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
      {sourceId && <SourceBadge sourceId={sourceId} />}
    </div>
  );
}
