"use client";

import { useHabitData } from "@/hooks/useHabitData";
import PageHeader from "@/components/layout/PageHeader";
import DailyScoreCard from "@/components/dashboard/DailyScoreCard";
import QuickChecklist from "@/components/dashboard/QuickChecklist";
import StreaksRow from "@/components/dashboard/StreaksRow";
import WeeklyMiniChart from "@/components/dashboard/WeeklyMiniChart";
import Link from "next/link";
import { Heart, Briefcase, DollarSign, BookOpen, ChevronRight } from "lucide-react";

const SECTIONS = [
  { href: "/salud", icon: Heart, label: "Salud", description: "Hábitos y cuerpo" },
  { href: "/trabajo", icon: Briefcase, label: "Trabajo", description: "Output y proyectos" },
  { href: "/finanzas", icon: DollarSign, label: "Finanzas", description: "Ingresos y gastos" },
  { href: "/review", icon: BookOpen, label: "Review", description: "Diario y mood" },
];

export default function HomePage() {
  const { data, hydrated, today, todayEntry, updateDaily } = useHabitData();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Buenos días" subtitle="Registrá tu día en 2 minutos" />

      <div className="px-4 space-y-4">
        <DailyScoreCard entry={todayEntry} date={today} />

        <QuickChecklist
          onSave={(updates) => updateDaily(today, updates)}
        />

        <StreaksRow daily={data.daily} />

        <WeeklyMiniChart daily={data.daily} />

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">
            Secciones
          </p>
          <div className="grid grid-cols-2 gap-3">
            {SECTIONS.map(({ href, icon: Icon, label, description }) => (
              <Link
                key={href}
                href={href}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow active:scale-[0.98]"
              >
                <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-navy-800" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
