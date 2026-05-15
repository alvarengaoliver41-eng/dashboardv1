"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FinanceEntry, FINANCE_TYPES, EXPENSE_CATEGORIES } from "@/lib/types";
import { todayStr } from "@/lib/utils";

interface Props {
  onAdd: (entry: Omit<FinanceEntry, "id">) => void;
}

export default function FinanzasForm({ onAdd }: Props) {
  const [type, setType] = useState<FinanceEntry["type"]>("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Otros");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayStr());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) return;
    onAdd({ type, amount: parseFloat(amount), category, note, date });
    setAmount("");
    setNote("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar movimiento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {FINANCE_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`py-2.5 rounded-xl text-sm font-semibold transition-colors border-2 ${
                  type === value
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-slate-200 text-slate-500 bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="amount">Monto (USD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category">Categoría</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-transparent"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fin-date">Fecha</Label>
            <Input
              id="fin-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">Nota (opcional)</Label>
            <Input
              id="note"
              placeholder="ej. Freelance Dr. Storch"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Guardar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
