"use client";

import { useHabitData } from "@/hooks/useHabitData";
import PageHeader from "@/components/layout/PageHeader";
import FinanzasForm from "@/components/finanzas/FinanzasForm";
import TransactionList from "@/components/finanzas/TransactionList";
import FinanzasCharts from "@/components/finanzas/FinanzasCharts";
import NetWorthInput from "@/components/finanzas/NetWorthInput";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { currentMonthStr, formatCurrency } from "@/lib/utils";

export default function FinanzasPage() {
  const { data, hydrated, addFinance, deleteFinance, upsertNetWorth } = useHabitData();

  if (!hydrated) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const month = currentMonthStr();
  const monthEntries = data.finance.filter((e) => e.date.startsWith(month));
  const income = monthEntries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const expenses = monthEntries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const savings = monthEntries.filter((e) => e.type === "saving" || e.type === "investment").reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <PageHeader title="Finanzas" subtitle="Ingresos, gastos y patrimonio" />

      <div className="px-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-base font-bold text-emerald-600">{formatCurrency(income)}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Ingresos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-base font-bold text-red-500">{formatCurrency(expenses)}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Gastos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-base font-bold text-navy-900">{formatCurrency(savings)}</p>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">Ahorro</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="registrar">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="registrar" className="flex-1">Registrar</TabsTrigger>
            <TabsTrigger value="graficos" className="flex-1">Gráficos</TabsTrigger>
            <TabsTrigger value="historial" className="flex-1">Historial</TabsTrigger>
          </TabsList>
          <TabsContent value="registrar" className="space-y-4">
            <FinanzasForm onAdd={addFinance} />
            <NetWorthInput netWorth={data.netWorth} onUpsert={upsertNetWorth} />
          </TabsContent>
          <TabsContent value="graficos">
            <FinanzasCharts finance={data.finance} netWorth={data.netWorth} />
          </TabsContent>
          <TabsContent value="historial">
            <TransactionList entries={data.finance} onDelete={deleteFinance} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
