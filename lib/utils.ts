import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function todayStr(): string {
  const d = new Date();
  return localDateStr(d);
}

export function localDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatDateDisplay(dateStr: string): string {
  const [, month, day] = dateStr.split("-").map(Number);
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${day} ${months[month - 1]}`;
}

export function formatDateLong(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  return `${day} de ${months[month - 1]}, ${year}`;
}

export function formatMonthDisplay(monthStr: string): string {
  const [year, month] = monthStr.split("-").map(Number);
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${months[month - 1]} ${year}`;
}

export function currentMonthStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function getLastNDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return localDateStr(d);
  });
}

export function getWeekDates(weekOffset = 0): string[] {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7) + weekOffset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return localDateStr(d);
  });
}

export function getLastNWeeks(n: number): Array<{ label: string; dates: string[] }> {
  return Array.from({ length: n }, (_, i) => {
    const offset = -(n - 1 - i);
    const dates = getWeekDates(offset);
    return { label: formatDateDisplay(dates[0]), dates };
  });
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-yellow-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-400";
}

export function scoreHex(score: number): string {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("es-PY", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function dayLabel(dateStr: string): string {
  const days = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const d = new Date(dateStr + "T12:00:00");
  return days[d.getDay()];
}
