"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";
import { DailyEntry } from "@/lib/types";
import { getLastNDays, formatDateDisplay, dayLabel } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Props {
  daily: Record<string, DailyEntry>;
}

export default function ReviewHistory({ daily }: Props) {
  const days30 = getLastNDays(30);
  const moodData = days30
    .filter((d) => daily[d]?.mood != null)
    .map((d) => ({
      label: formatDateDisplay(d),
      day: dayLabel(d),
      mood: daily[d]?.mood,
    }));

  const days7 = getLastNDays(7);
  const recentReviews = days7
    .filter((d) => daily[d] && (daily[d].wentWell || daily[d].wentBad || daily[d].freeNote || daily[d].mood != null))
    .reverse();

  const avgMood =
    moodData.length > 0
      ? Math.round(moodData.reduce((sum, d) => sum + (d.mood ?? 0), 0) / moodData.length * 10) / 10
      : null;

  return (
    <div className="space-y-4">
      {moodData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>
              Estado de ánimo
              {avgMood !== null && (
                <span className="ml-2 text-navy-500 text-base font-bold">Ø {avgMood}</span>
              )}
            </CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} interval="preserveStartEnd" />
                  <YAxis domain={[1, 10]} tickCount={5} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <ReferenceLine y={7} stroke="#10b981" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                          <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                          <p className="text-slate-500">Mood: {payload[0].value}/10</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line type="monotone" dataKey="mood" stroke="#576CBC" strokeWidth={2.5} dot={{ fill: "#576CBC", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {recentReviews.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">
            Reviews recientes
          </p>
          <div className="space-y-3">
            {recentReviews.map((d) => {
              const e = daily[d];
              return (
                <Card key={d}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500">{formatDateDisplay(d)}</span>
                      {e.mood != null && (
                        <span className="text-sm font-bold text-navy-900">😊 {e.mood}/10</span>
                      )}
                    </div>
                    {e.wentWell && (
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Bien ✅</span>
                        <p className="text-sm text-slate-600 mt-0.5">{e.wentWell}</p>
                      </div>
                    )}
                    {e.wentBad && (
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">Mejorar ❌</span>
                        <p className="text-sm text-slate-600 mt-0.5">{e.wentBad}</p>
                      </div>
                    )}
                    {e.freeNote && (
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Nota 📝</span>
                        <p className="text-sm text-slate-600 mt-0.5">{e.freeNote}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
