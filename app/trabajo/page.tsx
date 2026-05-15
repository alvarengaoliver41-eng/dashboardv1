"use client";

import { useHabitData } from "@/hooks/useHabitData";
import PageHeader from "@/components/layout/PageHeader";
import TrabajoTracker from "@/components/trabajo/TrabajoTracker";
import TrabajoCharts from "@/components/trabajo/TrabajoCharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { calcOutputScore, calcStreak, avgScore } from "@/lib/scores";
import { getLastNDays } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function TrabajoPage() {
  const { data, hydrated, today, todayEntry, updateDaily } = useHabitData();

  if (!hydrated) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const outputToday = calcOutputScore(todayEntry);
  const week7 = getLastNDays(7);
  const avgWeek = avgScore(data.daily, week7, calcOutputScore);
  const streak = calcStreak(data.daily, (e) => e.deepWork);

  return (
    <div>
      <PageHeader title="Trabajo" subtitle="Output y productividad" />

      <div className="px-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-navy-900">{outputToday}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold text-navy-900">{avgWeek}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Prom 7d</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-2xl font-bold text-navy-900">{streak}</span>
                {streak > 0 && <Flame size={14} className="text-orange-400 mb-1" />}
              </div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Racha DW</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hoy">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="hoy" className="flex-1">Hoy</TabsTrigger>
            <TabsTrigger value="graficos" className="flex-1">Gráficos</TabsTrigger>
          </TabsList>
          <TabsContent value="hoy">
            <TrabajoTracker
              entry={todayEntry}
              onUpdate={(updates) => updateDaily(today, updates)}
            />
          </TabsContent>
          <TabsContent value="graficos">
            <TrabajoCharts daily={data.daily} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
