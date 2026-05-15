"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { FinanceEntry, NetWorthSnapshot } from "@/lib/types";
import { formatMonthDisplay, formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Props {
  finance: FinanceEntry[];
  netWorth: NetWorthSnapshot[];
}

const PIE_COLORS = ["#0B2447", "#19376D", "#576CBC", "#7B8FCC", "#A5B4DB", "#D0D8EE", "#10b981", "#f59e0b", "#ef4444", "#6366f1"];

function buildMonthlyData(finance: FinanceEntry[]) {
  const map: Record<string, { income: number; expense: number; saving: number }> = {};
  for (const e of finance) {
    const month = e.date.slice(0, 7);
    if (!map[month]) map[month] = { income: 0, expense: 0, saving: 0 };
    if (e.type === "income") map[month].income += e.amount;
    if (e.type === "expense") map[month].expense += e.amount;
    if (e.type === "saving" || e.type === "investment") map[month].saving += e.amount;
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, v]) => ({ label: formatMonthDisplay(month), ...v }));
}

function buildCategoryData(finance: FinanceEntry[]) {
  const map: Record<string, number> = {};
  for (const e of finance.filter((e) => e.type === "expense")) {
    map[e.category] = (map[e.category] ?? 0) + e.amount;
  }
  return Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));
}

export default function FinanzasCharts({ finance, netWorth }: Props) {
  const monthly = buildMonthlyData(finance);
  const categories = buildCategoryData(finance);
  const nwData = [...netWorth]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((n) => ({ label: formatMonthDisplay(n.month), patrimonio: n.amount }));

  return (
    <div className="space-y-4">
      {monthly.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cashflow mensual</CardTitle>
            <CardDescription>Ingresos vs gastos vs ahorro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} barSize={12} barGap={2} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs space-y-1">
                          <p className="font-semibold text-navy-900">{payload[0]?.payload.label}</p>
                          {payload.map((p) => (
                            <p key={p.dataKey as string} style={{ color: p.fill }}>
                              {p.name}: {formatCurrency(p.value as number)}
                            </p>
                          ))}
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="income" name="Ingresos" fill="#10b981" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="expense" name="Gastos" fill="#ef4444" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="saving" name="Ahorro" fill="#576CBC" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-3 justify-center">
              {[{ label: "Ingresos", color: "#10b981" }, { label: "Gastos", color: "#ef4444" }, { label: "Ahorro", color: "#576CBC" }].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                  {label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Gastos por categoría</CardTitle>
            <CardDescription>Distribución total acumulada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {categories.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                          <p className="font-semibold text-navy-900">{payload[0].name}</p>
                          <p className="text-slate-500">{formatCurrency(payload[0].value as number)}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px", color: "#64748b" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {nwData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Patrimonio neto</CardTitle>
            <CardDescription>Evolución en el tiempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nwData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.[0] ? (
                        <div className="bg-white border border-slate-100 rounded-xl px-3 py-2 shadow text-xs">
                          <p className="font-semibold text-navy-900">{payload[0].payload.label}</p>
                          <p className="text-slate-500">Patrimonio: {formatCurrency(payload[0].value as number)}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line type="monotone" dataKey="patrimonio" stroke="#0B2447" strokeWidth={2.5} dot={{ fill: "#0B2447", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
