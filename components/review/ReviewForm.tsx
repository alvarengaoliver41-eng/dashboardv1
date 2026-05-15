"use client";

import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DailyEntry } from "@/lib/types";

const MOOD_LABELS = ["", "Muy mal", "Mal", "Regular", "Regular+", "Neutro", "Bien−", "Bien", "Muy bien", "Excelente", "Increíble"];

interface Props {
  entry: DailyEntry;
  onUpdate: (updates: Partial<DailyEntry>) => void;
}

export default function ReviewForm({ entry, onUpdate }: Props) {
  const mood = entry.mood ?? 5;

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
                <span className="text-2xl font-bold text-navy-900">{mood}</span>
                <p className="text-xs text-slate-400">{MOOD_LABELS[mood]}</p>
              </div>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[mood]}
              onValueChange={([v]) => onUpdate({ mood: v })}
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
              value={entry.wentWell}
              onChange={(e) => onUpdate({ wentWell: e.target.value })}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="went-bad">¿Qué salió mal? ❌</Label>
            <Textarea
              id="went-bad"
              placeholder="Lo que mejoraría mañana..."
              value={entry.wentBad}
              onChange={(e) => onUpdate({ wentBad: e.target.value })}
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="free-note">Nota libre 📝</Label>
            <Textarea
              id="free-note"
              placeholder="Cualquier pensamiento del día..."
              value={entry.freeNote}
              onChange={(e) => onUpdate({ freeNote: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
