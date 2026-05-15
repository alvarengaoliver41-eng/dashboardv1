"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

const BOOLEANS = [
  { key: "gym" as const, label: "Fui al gym", emoji: "🏋️" },
  { key: "macros" as const, label: "Cumplí macros", emoji: "🥗" },
  { key: "zeroSugar" as const, label: "Cero azúcar", emoji: "🚫" },
  { key: "slept5h" as const, label: "Dormí +5 horas", emoji: "😴" },
];

const DEFAULT = {
  gym: false,
  macros: false,
  zeroSugar: false,
  slept5h: false,
  energy: null as number | null,
  weight: null as number | null,
};

interface Props {
  onSave: (updates: Partial<DailyEntry>) => void;
}

export default function SaludTracker({ onSave }: Props) {
  const [local, setLocal] = useState(DEFAULT);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof typeof DEFAULT>(key: K, value: (typeof DEFAULT)[K]) {
    setLocal((p) => ({ ...p, [key]: value }));
  }

  function handleSave() {
    onSave(local);
    setLocal(DEFAULT);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (saved) {
    return (
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="pt-5 flex items-center gap-3">
          <CheckCircle2 className="text-emerald-500 shrink-0" size={28} />
          <div>
            <p className="font-semibold text-emerald-800">¡Salud guardada!</p>
            <p className="text-sm text-emerald-600 mt-0.5">Registro del día completado.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                  <span className={local[key] ? "text-slate-800 font-medium" : "text-slate-500"}>
                    {label}
                  </span>
                </Label>
                <Switch
                  id={`s-${key}`}
                  checked={local[key]}
                  onCheckedChange={(v) => set(key, v)}
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
                {local.energy ?? "—"}
                <span className="text-xs text-slate-400 font-normal"> /10</span>
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[local.energy ?? 5]}
              onValueChange={([v]) => set("energy", v)}
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
              value={local.weight ?? ""}
              onChange={(e) => set("weight", e.target.value ? parseFloat(e.target.value) : null)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-navy-100">
        <CardContent className="pt-5">
          <Button onClick={handleSave} className="w-full" size="lg">
            Guardar registro de salud
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
