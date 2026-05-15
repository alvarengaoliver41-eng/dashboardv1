"use client";

import { Card, CardContent } from "@/components/ui/card";
import ScoreRing from "@/components/layout/ScoreRing";
import { calcDailyScore } from "@/lib/scores";
import { DailyEntry } from "@/lib/types";
import { formatDateLong } from "@/lib/utils";

const ITEMS = [
  { key: "gym" as const, label: "Gym", points: 20 },
  { key: "macros" as const, label: "Macros", points: 20 },
  { key: "deepWork" as const, label: "Deep Work", points: 20 },
  { key: "prospected" as const, label: "Prospectar", points: 20 },
  { key: "createdContent" as const, label: "Contenido", points: 20 },
];

interface Props {
  entry: DailyEntry;
  date: string;
}

export default function DailyScoreCard({ entry, date }: Props) {
  const score = calcDailyScore(entry);

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          {formatDateLong(date)}
        </p>
        <div className="flex items-center gap-6">
          <ScoreRing score={score} size={120} strokeWidth={9} />
          <div className="flex-1 space-y-2">
            {ITEMS.map(({ key, label, points }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${entry[key] ? "bg-emerald-500" : "bg-slate-200"}`}
                  />
                  <span className={`text-sm ${entry[key] ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                    {label}
                  </span>
                </div>
                <span className={`text-xs font-semibold ${entry[key] ? "text-emerald-600" : "text-slate-300"}`}>
                  +{points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
