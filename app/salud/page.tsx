"use client";

import { useState } from "react";
import { useHabitData } from "@/hooks/useHabitData";
import PageHeader from "@/components/layout/PageHeader";
import SaludTracker from "@/components/salud/SaludTracker";
import SaludCharts from "@/components/salud/SaludCharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { calcHealthScore } from "@/lib/scores";
import { Badge } from "@/components/ui/badge";

export default function SaludPage() {
  const { data, hydrated, today, todayEntry, updateDaily } = useHabitData();

  if (!hydrated) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const healthScore = calcHealthScore(todayEntry);

  return (
    <div>
      <PageHeader
        title="Salud"
        subtitle="Cuerpo y hábitos físicos"
        right={
          <Badge variant={healthScore === 100 ? "success" : healthScore >= 50 ? "warning" : "secondary"}>
            {healthScore}/100
          </Badge>
        }
      />

      <div className="px-4">
        <Tabs defaultValue="hoy">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="hoy" className="flex-1">Hoy</TabsTrigger>
            <TabsTrigger value="graficos" className="flex-1">Gráficos</TabsTrigger>
          </TabsList>
          <TabsContent value="hoy">
            <SaludTracker
              entry={todayEntry}
              onUpdate={(updates) => updateDaily(today, updates)}
            />
          </TabsContent>
          <TabsContent value="graficos">
            <SaludCharts daily={data.daily} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
