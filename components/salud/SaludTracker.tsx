"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";

const BOOLEANS = [
  { key: "gym" as const, label: "Fui al gym", emoji: "🏋️" },
  { key: "macros" as const, label: "Cumplí macros", emoji: "🥗" },
  { key: "zeroSugar" as const, label: "Cero azúcar", emoji: "🚫" },
  { key: "slept5h" as const, label: "Dormí +5 horas", emoji: "😴" },
];

interface Props {
  entry: DailyEntry;
  onUpdate: (updates: Partial<DailyEntry>) => void;
}

export default function SaludTracker({ entry, onUpdate }: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hábitos de hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {BOOLEANS.map(({ key, label, emoji }) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`s-${key}`} className="flex items-center gap-2.5 cursor-pointer">
                  <span className="text-base">{emoji}</span>
                  <span className={entry[key] ? "text-slate-800 font-medium" : "text-slate-500"}>
                    {label}
                  </span>
                </Label>
                <Switch
                  id={`s-${key}`}
                  checked={entry[key]}
                  onCheckedChange={(v) => onUpdate({ [key]: v })}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opcionales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Energía</Label>
              <span className="text-lg font-bold text-navy-900">
                {entry.energy ?? "—"}<span className="text-xs text-slate-400 font-normal"> /10</span>
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[entry.energy ?? 5]}
              onValueChange={([v]) => onUpdate({ energy: v })}
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Sin energía</span>
              <span>Óptimo</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="ej. 75.5"
              step="0.1"
              value={entry.weight ?? ""}
              onChange={(e) =>
                onUpdate({ weight: e.target.value ? parseFloat(e.target.value) : null })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
