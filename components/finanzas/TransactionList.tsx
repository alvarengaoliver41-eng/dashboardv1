"use client";

import { Trash2 } from "lucide-react";
import { FinanceEntry } from "@/lib/types";
import { formatDateDisplay, formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TYPE_COLORS = {
  income: "success",
  expense: "destructive",
  saving: "default",
  investment: "warning",
} as const;

const TYPE_LABELS = {
  income: "Ingreso",
  expense: "Gasto",
  saving: "Ahorro",
  investment: "Inversión",
};

interface Props {
  entries: FinanceEntry[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ entries, onDelete }: Props) {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20);

  if (sorted.length === 0) {
    return (
      <Card>
        <CardContent className="pt-5 text-center text-slate-400 text-sm py-8">
          Sin movimientos registrados
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos movimientos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sorted.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={TYPE_COLORS[e.type]}>{TYPE_LABELS[e.type]}</Badge>
                  <span className="text-xs text-slate-400">{formatDateDisplay(e.date)}</span>
                </div>
                <p className="text-sm text-slate-600 mt-0.5 truncate">
                  {e.note || e.category}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`font-bold text-sm ${
                  e.type === "income" ? "text-emerald-600"
                  : e.type === "expense" ? "text-red-500"
                  : "text-navy-900"
                }`}>
                  {e.type === "expense" ? "-" : "+"}{formatCurrency(e.amount)}
                </span>
                <button
                  onClick={() => onDelete(e.id)}
                  className="text-slate-300 hover:text-red-400 transition-colors p-1"
                  aria-label="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
