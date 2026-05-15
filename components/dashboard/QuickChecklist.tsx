"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";

const ITEMS = [
  { key: "gym" as const, label: "Fui al gym", emoji: "🏋️" },
  { key: "macros" as const, label: "Cumplí macros", emoji: "🥗" },
  { key: "deepWork" as const, label: "2h de deep work", emoji: "🧠" },
  { key: "prospected" as const, label: "Prospecté", emoji: "📤" },
  { key: "createdContent" as const, label: "Creé contenido", emoji: "✏️" },
];

interface Props {
  entry: DailyEntry;
  onUpdate: (updates: Partial<DailyEntry>) => void;
}

export default function QuickChecklist({ entry, onUpdate }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check-in de hoy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ITEMS.map(({ key, label, emoji }) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`switch-${key}`} className="flex items-center gap-2.5 text-sm cursor-pointer">
                <span className="text-base">{emoji}</span>
                <span className={entry[key] ? "text-slate-800 font-medium" : "text-slate-500"}>
                  {label}
                </span>
              </Label>
              <Switch
                id={`switch-${key}`}
                checked={entry[key]}
                onCheckedChange={(checked) => onUpdate({ [key]: checked })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
