"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum } from "@/types";

const palette = ["#116149", "#f2c14e", "#d9704a", "#287c9b", "#7a4e9f", "#c2410c"];
const severityPalette = ["#047857", "#65a30d", "#b7791f", "#ea580c", "#dc2626"];
const initialChartSize = { width: 1, height: 288 };

function ChartShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-[#17231f]">{title}</h3>
      <div className="mt-4 h-72">{children}</div>
    </article>
  );
}

export function BenchmarkCharts({
  byLanguage,
  byHarmCategory,
  byResponseLabel,
  bySeverity,
}: {
  byLanguage: ChartDatum[];
  byHarmCategory: ChartDatum[];
  byResponseLabel: ChartDatum[];
  bySeverity: ChartDatum[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartShell title="Prompts by language">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={initialChartSize}
        >
          <BarChart data={byLanguage} margin={{ left: 0, right: 8 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} />
            <Tooltip cursor={{ fill: "#f4f7f4" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#116149" />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Prompts by harm category">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={initialChartSize}
        >
          <PieChart>
            <Pie
              data={byHarmCategory}
              dataKey="value"
              nameKey="name"
              innerRadius={54}
              outerRadius={92}
              paddingAngle={3}
            >
              {byHarmCategory.map((entry, index) => (
                <Cell key={entry.name} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Response labels distribution">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={initialChartSize}
        >
          <BarChart data={byResponseLabel} margin={{ left: 0, right: 8 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} />
            <Tooltip cursor={{ fill: "#fff8ea" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#d9704a" />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Severity distribution">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={initialChartSize}
        >
          <PieChart>
            <Pie
              data={bySeverity}
              dataKey="value"
              nameKey="name"
              outerRadius={94}
              label
            >
              {bySeverity.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={severityPalette[index % severityPalette.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </ChartShell>
    </div>
  );
}
