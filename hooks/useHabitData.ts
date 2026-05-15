"use client";

import { useState, useEffect, useCallback } from "react";
import { AppData, DailyEntry, FinanceEntry } from "@/lib/types";
import { loadData, saveData, getOrCreate, emptyData } from "@/lib/storage";
import { todayStr, generateId, currentMonthStr } from "@/lib/utils";

export function useHabitData() {
  const [data, setData] = useState<AppData>(emptyData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadData());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveData(data);
  }, [data, hydrated]);

  const today = todayStr();
  const todayEntry = getOrCreate(data, today);

  const getDaily = useCallback(
    (date: string): DailyEntry => getOrCreate(data, date),
    [data]
  );

  const updateDaily = useCallback((date: string, updates: Partial<DailyEntry>) => {
    setData((prev) => ({
      ...prev,
      daily: {
        ...prev.daily,
        [date]: { ...getOrCreate(prev, date), ...updates },
      },
    }));
  }, []);

  const addFinance = useCallback(
    (entry: Omit<FinanceEntry, "id">) => {
      setData((prev) => ({
        ...prev,
        finance: [...prev.finance, { ...entry, id: generateId() }],
      }));
    },
    []
  );

  const deleteFinance = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      finance: prev.finance.filter((e) => e.id !== id),
    }));
  }, []);

  const upsertNetWorth = useCallback((month: string, amount: number) => {
    setData((prev) => {
      const exists = prev.netWorth.find((n) => n.month === month);
      return {
        ...prev,
        netWorth: exists
          ? prev.netWorth.map((n) => (n.month === month ? { ...n, amount } : n))
          : [...prev.netWorth, { month, amount }],
      };
    });
  }, []);

  return {
    data,
    hydrated,
    today,
    todayEntry,
    currentMonth: currentMonthStr(),
    getDaily,
    updateDaily,
    addFinance,
    deleteFinance,
    upsertNetWorth,
  };
}
