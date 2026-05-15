import { DailyEntry } from "./types";

export function calcDailyScore(e: Partial<DailyEntry>): number {
  let s = 0;
  if (e.gym) s += 20;
  if (e.macros) s += 20;
  if (e.deepWork) s += 20;
  if (e.prospected) s += 20;
  if (e.createdContent) s += 20;
  return s;
}

export function calcOutputScore(e: Partial<DailyEntry>): number {
  let s = 0;
  if (e.deepWork) s += 40;
  if (e.prospected) s += 30;
  if (e.createdContent) s += 30;
  return s;
}

export function calcHealthScore(e: Partial<DailyEntry>): number {
  let s = 0;
  if (e.gym) s += 25;
  if (e.macros) s += 25;
  if (e.zeroSugar) s += 25;
  if (e.slept5h) s += 25;
  return s;
}

export function calcStreak(
  daily: Record<string, DailyEntry>,
  check: (e: DailyEntry) => boolean,
  fromDate?: string
): number {
  const ref = fromDate ? new Date(fromDate + "T12:00:00") : new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(ref);
    d.setDate(ref.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const entry = daily[key];
    if (!entry || !check(entry)) break;
    streak++;
  }
  return streak;
}

export function avgScore(
  daily: Record<string, DailyEntry>,
  dates: string[],
  fn: (e: Partial<DailyEntry>) => number
): number {
  const entries = dates.map((d) => daily[d]).filter(Boolean);
  if (!entries.length) return 0;
  return Math.round(entries.reduce((sum, e) => sum + fn(e), 0) / entries.length);
}
