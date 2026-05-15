"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NetWorthSnapshot } from "@/lib/types";
import { currentMonthStr, formatMonthDisplay, formatCurrency } from "@/lib/utils";

interface Props {
  netWorth: NetWorthSnapshot[];
  onUpsert: (month: string, amount: number) => void;
}

export default function NetWorthInput({ netWorth, onUpsert }: Props) {
  const month = currentMonthStr();
  const current = netWorth.find((n) => n.month === month);
  const [value, setValue] = useState(current?.amount?.toString() ?? "");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const n = parseFloat(value);
    if (!isNaN(n)) onUpsert(month, n);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patrimonio neto — {formatMonthDisplay(month)}</CardTitle>
      </CardHeader>
      <CardContent>
        {current && (
          <p className="text-2xl font-bold text-navy-900 mb-4">{formatCurrency(current.amount)}</p>
        )}
        <form onSubmit={handleSave} className="flex gap-2">
          <Input
            type="number"
            placeholder="Valor actual en USD"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Guardar</Button>
        </form>
      </CardContent>
    </Card>
  );
}
