"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

const ITEMS = [
  { key: "gym" as const, label: "Fui al gym", emoji: "🏋️" },
  { key: "macros" as const, label: "Cumplí macros", emoji: "🥗" },
  { key: "deepWork" as const, label: "2h de deep work", emoji: "🧠" },
  { key: "prospected" as const, label: "Prospecté", emoji: "📤" },
  { key: "createdContent" as const, label: "Creé contenido", emoji: "✏️" },
];

const DEFAULT = {
  gym: false,
  macros: false,
  deepWork: false,
  prospected: false,
  createdContent: false,
};

interface Props {
  onSave: (updates: Partial<DailyEntry>) => void;
}

export default function QuickChecklist({ onSave }: Props) {
  const [local, setLocal] = useState(DEFAULT);
  const [saved, setSaved] = useState(false);

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
            <p className="font-semibold text-emerald-800">¡Check-in guardado!</p>
            <p className="text-sm text-emerald-600 mt-0.5">El formulario se limpió para el próximo día.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check-in de hoy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ITEMS.map(({ key, label, emoji }) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={`switch-${key}`} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <span className="text-base">{emoji}</span>
              <span className={local[key] ? "text-slate-800 font-medium" : "text-slate-500"}>
                {label}
              </span>
            </Label>
            <Switch
              id={`switch-${key}`}
              checked={local[key]}
              onCheckedChange={(v) => setLocal((p) => ({ ...p, [key]: v }))}
            />
          </div>
        ))}

        <div className="pt-3 border-t border-slate-100">
          <Button onClick={handleSave} className="w-full" size="lg">
            Guardar check-in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
