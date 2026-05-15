"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { DailyEntry } from "@/lib/types";
import { calcDailyScore } from "@/lib/scores";
import { getLastNDays, dayLabel, scoreHex } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  daily: Record<string, DailyEntry>;
}

export default function WeeklyMiniChart({ daily }: Props) {
  const days = getLastNDays(7);
  const chartData = days.map((d) => ({
    day: dayLabel(d),
    score: calcDailyScore(daily[d] ?? {}),
    date: d,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos 7 días</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[90px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={24} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.score === 0 ? "#e2e8f0" : scoreHex(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
