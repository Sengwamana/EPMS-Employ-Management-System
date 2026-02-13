import { useState } from "react";
import Card from "../../ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Sun", theory: 40, practice: 30, lexicon: 20 },
  { day: "Mon", theory: 55, practice: 40, lexicon: 35 },
  { day: "Tue", theory: 50, practice: 55, lexicon: 40 },
  { day: "Wed", theory: 70, practice: 60, lexicon: 55 },
  { day: "Thu", theory: 60, practice: 50, lexicon: 45 },
  { day: "Fri", theory: 75, practice: 65, lexicon: 60 },
  { day: "Sat", theory: 85, practice: 80, lexicon: 70 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl text-xs shadow-xl border border-gray-700/50">
        <p className="font-semibold mb-1.5">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-0.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-bold">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center gap-5 mb-2">
      {payload?.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-500 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const PerformanceChart = () => {
  const [period, setPeriod] = useState("Weekly");

  return (
    <Card className="relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Performance Chart
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            Track results and watch your progress rise.
          </p>
        </div>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none bg-violet-50 text-violet-600 text-xs font-medium px-3 py-1.5 pr-7 rounded-xl border border-violet-200/60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
          >
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-violet-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 mb-4">
        <CustomLegend
          payload={[
            { value: "Theory", color: "#f97316" }, // Orange
            { value: "Practice", color: "#fbbf24" }, // Amber
            { value: "Lexicon", color: "#171717" }, // Black
          ]}
        />
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradTheory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradPractice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gradLexicon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#171717" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#171717" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#f0f0f5"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#d1d5db" }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="theory"
              name="Theory"
              stroke="#f97316"
              strokeWidth={2.5}
              fill="url(#gradTheory)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#f97316",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="practice"
              name="Practice"
              stroke="#fbbf24"
              strokeWidth={2.5}
              fill="url(#gradPractice)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#fbbf24",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="lexicon"
              name="Lexicon"
              stroke="#171717"
              strokeWidth={2.5}
              fill="url(#gradLexicon)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#171717",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Floating badge */}
      <div
        className="absolute top-36 right-28 hidden xl:flex items-center gap-2 bg-white rounded-2xl px-3 py-2 border border-gray-100"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
      >
        <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">+12</p>
          <p className="text-[10px] text-gray-400">More practice</p>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceChart;
