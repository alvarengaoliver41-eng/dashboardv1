"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ScoreRing from "@/components/layout/ScoreRing";
import { DailyEntry } from "@/lib/types";
import { calcOutputScore } from "@/lib/scores";

const ITEMS = [
  { key: "deepWork" as const, label: "2h de deep work", emoji: "🧠", pts: 40 },
  { key: "prospected" as const, label: "Prospecté hoy", emoji: "📤", pts: 30 },
  { key: "createdContent" as const, label: "Creé contenido", emoji: "✏️", pts: 30 },
];

interface Props {
  entry: DailyEntry;
  onUpdate: (updates: Partial<DailyEntry>) => void;
}

export default function TrabajoTracker({ entry, onUpdate }: Props) {
  const score = calcOutputScore(entry);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <ScoreRing score={score} size={110} strokeWidth={8} label="Output" />
            <div className="flex-1 space-y-2.5">
              {ITEMS.map(({ key, label, emoji, pts }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-sm ${entry[key] ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                    {emoji} {label}
                  </span>
                  <span className={`text-xs font-bold ${entry[key] ? "text-emerald-600" : "text-slate-300"}`}>
                    +{pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check-in de trabajo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ITEMS.map(({ key, label, emoji }) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`t-${key}`} className="flex items-center gap-2.5 cursor-pointer">
                  <span className="text-base">{emoji}</span>
                  <span className={entry[key] ? "text-slate-800 font-medium" : "text-slate-500"}>
                    {label}
                  </span>
                </Label>
                <Switch
                  id={`t-${key}`}
                  checked={entry[key]}
                  onCheckedChange={(v) => onUpdate({ [key]: v })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
