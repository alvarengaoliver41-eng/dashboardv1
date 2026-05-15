"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

const MOOD_LABELS = ["","Muy mal","Mal","Regular","Regular+","Neutro","Bien−","Bien","Muy bien","Excelente","Increíble"];

const DEFAULT = {
  mood: 5 as number,
  wentWell: "",
  wentBad: "",
  freeNote: "",
};

interface Props {
  onSave: (updates: Partial<DailyEntry>) => void;
}

export default function ReviewForm({ onSave }: Props) {
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
            <p className="font-semibold text-emerald-800">¡Review guardado!</p>
            <p className="text-sm text-emerald-600 mt-0.5">Reflexión del día registrada.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>¿Cómo fue el día?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Estado de ánimo</Label>
              <div className="text-right">
                <span className="text-2xl font-bold text-navy-900">{local.mood}</span>
                <p className="text-xs text-slate-400">{MOOD_LABELS[local.mood]}</p>
              </div>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[local.mood]}
              onValueChange={([v]) => setLocal((p) => ({ ...p, mood: v }))}
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Muy mal</span>
              <span>Increíble</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reflexión rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="went-well">¿Qué salió bien? ✅</Label>
            <Textarea
              id="went-well"
              placeholder="Lo mejor del día..."
              value={local.wentWell}
              onChange={(e) => setLocal((p) => ({ ...p, wentWell: e.target.value }))}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="went-bad">¿Qué salió mal? ❌</Label>
            <Textarea
              id="went-bad"
              placeholder="Lo que mejoraría mañana..."
              value={local.wentBad}
              onChange={(e) => setLocal((p) => ({ ...p, wentBad: e.target.value }))}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="free-note">Nota libre 📝</Label>
            <Textarea
              id="free-note"
              placeholder="Cualquier pensamiento del día..."
              value={local.freeNote}
              onChange={(e) => setLocal((p) => ({ ...p, freeNote: e.target.value }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-navy-100">
        <CardContent className="pt-5">
          <Button onClick={handleSave} className="w-full" size="lg">
            Guardar review del día
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
