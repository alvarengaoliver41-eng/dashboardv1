"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, LineChart, Line, CartesianGrid, Cell
} from "recharts";
import { DailyEntry } from "@/lib/types";
import { getLastNWeeks, getLastNDays, formatDateDisplay, dayLabel, scoreHex } from "@/lib/utils";
import { calcOutputScore } from "@/lib/scores";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Props {
  daily: Record<string, DailyEntry>;
}

export default function TrabajoCharts({ daily }: Props) {
  const weeks6 = getLastNWeeks(6);
  const days14 = getLastNDays(14);

  const deepWorkData = weeks6.map(({ label, dates }) => ({
    label,
    horas: dates.filter((d) => daily[d]?.deepWork).length * 2,
  }));

  const prospectoData = weeks6.map(({ label, dates }) => ({
    label,
    dias: dates.filter((d) => daily[d]?.prospected).length,
  }));

  const contenidoData = weeks6.map(({ label, dates }) => ({
    label,
    piezas: dates.filter((d) => daily[d]?.createdContent).length,
  }));

  const outputTrend = days14.map((d) => ({
    label: formatDateDisplay(d),
    day: dayLabel(d),
    score: calcOutputScore(daily[d] ?? {}),
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Deep Work por semana</CardTitle>
          <CardDescription>Horas acumuladas — objetivo 14h/semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deepWorkData} barSize={24} margin={{ top: 8, right: 0, left: -30, bottom: 0 }}>
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[0, 16]} />
                <ReferenceLine y={14} stroke="#10b981" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "14h", position: "right", fill: "#10b981", fontSize: 10 }} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                        <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                        <p className="text-slate-500">{payload[0].value}h de deep work</p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="horas" radius={[4, 4, 0, 0]}>
                  {deepWorkData.map((e, i) => (
                    <Cell key={i} fill={(e.horas as number) >= 14 ? "#10b981" : "#576CBC"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Output Score diario</CardTitle>
          <CardDescription>Últimos 14 días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={outputTrend} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis domain={[0, 100]} tickCount={5} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <ReferenceLine y={70} stroke="#10b981" strokeDasharray="4 4" strokeWidth={1} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                        <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                        <p className="text-slate-500">Output: {payload[0].value}/100</p>
                      </div>
                    ) : null
                  }
                />
                <Line type="monotone" dataKey="score" stroke="#0B2447" strokeWidth={2.5} dot={{ fill: "#0B2447", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Prospección</CardTitle>
            <CardDescription className="text-xs">Días/semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prospectoData} barSize={14} margin={{ top: 0, right: 0, left: -36, bottom: 0 }}>
                  <XAxis dataKey="label" hide />
                  <YAxis domain={[0, 7]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#94a3b8" }} />
                  <Bar dataKey="dias" radius={[3, 3, 0, 0]}>
                    {prospectoData.map((e, i) => (
                      <Cell key={i} fill={(e.dias as number) >= 5 ? "#10b981" : "#576CBC"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Contenido</CardTitle>
            <CardDescription className="text-xs">Piezas/semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contenidoData} barSize={14} margin={{ top: 0, right: 0, left: -36, bottom: 0 }}>
                  <XAxis dataKey="label" hide />
                  <YAxis domain={[0, 7]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: "#94a3b8" }} />
                  <Bar dataKey="piezas" radius={[3, 3, 0, 0]}>
                    {contenidoData.map((e, i) => (
                      <Cell key={i} fill={(e.piezas as number) >= 3 ? "#10b981" : "#576CBC"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
