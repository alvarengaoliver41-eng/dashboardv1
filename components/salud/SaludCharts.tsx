"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, ReferenceLine, Cell
} from "recharts";
import { DailyEntry } from "@/lib/types";
import { getLastNDays, dayLabel, formatDateDisplay } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Props {
  daily: Record<string, DailyEntry>;
}

function habitCount(entry?: DailyEntry): number {
  if (!entry) return 0;
  return [entry.gym, entry.macros, entry.zeroSugar, entry.slept5h].filter(Boolean).length;
}

export default function SaludCharts({ daily }: Props) {
  const days14 = getLastNDays(14);
  const days30 = getLastNDays(30);

  const weeklyData = days14.map((d) => ({
    day: dayLabel(d),
    label: formatDateDisplay(d),
    habitos: habitCount(daily[d]),
    energia: daily[d]?.energy ?? null,
    dormi: daily[d]?.slept5h ? 1 : 0,
  }));

  const energyData = days30
    .filter((d) => daily[d]?.energy != null)
    .map((d) => ({
      label: formatDateDisplay(d),
      energia: daily[d]?.energy,
    }));

  const weightData = days30
    .filter((d) => daily[d]?.weight != null)
    .map((d) => ({
      label: formatDateDisplay(d),
      peso: daily[d]?.weight,
    }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hábitos completados</CardTitle>
          <CardDescription>Últimos 14 días — máx. 4 por día</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barSize={16} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis domain={[0, 4]} tickCount={5} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                        <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                        <p className="text-slate-500">{payload[0].value} / 4 hábitos</p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="habitos" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((e, i) => (
                    <Cell
                      key={i}
                      fill={
                        e.habitos === 4 ? "#10b981"
                        : e.habitos >= 3 ? "#f59e0b"
                        : e.habitos >= 1 ? "#fb923c"
                        : "#e2e8f0"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {energyData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Nivel de energía</CardTitle>
            <CardDescription>Tendencia — escala 1 a 10</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} interval="preserveStartEnd" />
                  <YAxis domain={[1, 10]} tickCount={5} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <ReferenceLine y={7} stroke="#10b981" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                          <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                          <p className="text-slate-500">Energía: {payload[0].value}/10</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line type="monotone" dataKey="energia" stroke="#576CBC" strokeWidth={2.5} dot={{ fill: "#576CBC", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {weightData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Peso corporal</CardTitle>
            <CardDescription>Tendencia en kg</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} interval="preserveStartEnd" />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} domain={["auto", "auto"]} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                          <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                          <p className="text-slate-500">{payload[0].value} kg</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line type="monotone" dataKey="peso" stroke="#0B2447" strokeWidth={2.5} dot={{ fill: "#0B2447", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
