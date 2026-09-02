"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps {
  averages: {
    development: number;
    accessibility: number;
    transparency: number;
    infrastructure: number;
  };
}

const chartConfig = {
  development: {
    label: "Development",
    color: "#E94560",
  },
  accessibility: {
    label: "Accessibility",
    color: "#3B82F6",
  },
  transparency: {
    label: "Transparency",
    color: "#10B981",
  },
  infrastructure: {
    label: "Infrastructure",
    color: "#F59E0B",
  },
} satisfies ChartConfig;

export default function ReviewBreakdownPie({ averages }: ChartProps) {
  const chartData = [
    { category: "development", label: "Development", score: averages.development, fill: "#E94560" },
    { category: "accessibility", label: "Accessibility", score: averages.accessibility, fill: "#3B82F6" },
    { category: "transparency", label: "Transparency", score: averages.transparency, fill: "#10B981" },
    { category: "infrastructure", label: "Infrastructure", score: averages.infrastructure, fill: "#F59E0B" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[220px] w-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="score"
            nameKey="label"
            innerRadius={45}
            outerRadius={75}
            stroke="#16213E"
            strokeWidth={3}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#F9F9F9]/70 w-full px-4">
        {chartData.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.fill }}
            />
            <span className="truncate">{item.label}:</span>
            <strong className="text-[#F9F9F9]">{item.score.toFixed(1)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}