"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ScoreRing from "@/components/layout/ScoreRing";
import { DailyEntry } from "@/lib/types";
import { calcOutputScore } from "@/lib/scores";
import { CheckCircle2 } from "lucide-react";

const ITEMS = [
  { key: "deepWork" as const, label: "2h de deep work", emoji: "🧠", pts: 40 },
  { key: "prospected" as const, label: "Prospecté hoy", emoji: "📤", pts: 30 },
  { key: "createdContent" as const, label: "Creé contenido", emoji: "✏️", pts: 30 },
];

const DEFAULT = {
  deepWork: false,
  prospected: false,
  createdContent: false,
};

interface Props {
  onSave: (updates: Partial<DailyEntry>) => void;
}

export default function TrabajoTracker({ onSave }: Props) {
  const [local, setLocal] = useState(DEFAULT);
  const [saved, setSaved] = useState(false);

  const score = calcOutputScore(local);

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
            <p className="font-semibold text-emerald-800">¡Trabajo guardado!</p>
            <p className="text-sm text-emerald-600 mt-0.5">Output del día registrado.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <ScoreRing score={score} size={110} strokeWidth={8} label="Output" />
            <div className="flex-1 space-y-2.5">
              {ITEMS.map(({ key, label, emoji, pts }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className={`text-sm ${local[key] ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                    {emoji} {label}
                  </span>
                  <span className={`text-xs font-bold ${local[key] ? "text-emerald-600" : "text-slate-300"}`}>
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
        <CardContent className="space-y-4">
          {ITEMS.map(({ key, label, emoji }) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`t-${key}`} className="flex items-center gap-2.5 cursor-pointer">
                <span className="text-base">{emoji}</span>
                <span className={local[key] ? "text-slate-800 font-medium" : "text-slate-500"}>
                  {label}
                </span>
              </Label>
              <Switch
                id={`t-${key}`}
                checked={local[key]}
                onCheckedChange={(v) => setLocal((p) => ({ ...p, [key]: v }))}
              />
            </div>
          ))}

          <div className="pt-3 border-t border-slate-100">
            <Button onClick={handleSave} className="w-full" size="lg">
              Guardar registro de trabajo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
