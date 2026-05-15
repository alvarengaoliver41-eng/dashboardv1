"use client";

import { Card, CardContent } from "@/components/ui/card";
import { calcStreak } from "@/lib/scores";
import { DailyEntry } from "@/lib/types";
import { Flame } from "lucide-react";

const STREAKS = [
  {
    label: "Gym",
    emoji: "🏋️",
    check: (e: DailyEntry) => e.gym,
  },
  {
    label: "Deep Work",
    emoji: "🧠",
    check: (e: DailyEntry) => e.deepWork,
  },
  {
    label: "Macros",
    emoji: "🥗",
    check: (e: DailyEntry) => e.macros,
  },
  {
    label: "Prospectar",
    emoji: "📤",
    check: (e: DailyEntry) => e.prospected,
  },
];

interface Props {
  daily: Record<string, DailyEntry>;
}

export default function StreaksRow({ daily }: Props) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">
        Rachas activas
      </p>
      <div className="grid grid-cols-4 gap-2">
        {STREAKS.map(({ label, emoji, check }) => {
          const streak = calcStreak(daily, check);
          return (
            <Card key={label} className="text-center p-3">
              <div className="text-xl mb-1">{emoji}</div>
              <div className="flex items-center justify-center gap-0.5">
                <span className={`text-2xl font-bold ${streak > 0 ? "text-navy-900" : "text-slate-300"}`}>
                  {streak}
                </span>
                {streak > 0 && <Flame size={14} className="text-orange-400 mb-1" />}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">{label}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
