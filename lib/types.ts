export interface DailyEntry {
  date: string; // YYYY-MM-DD

  // Salud
  gym: boolean;
  macros: boolean;
  zeroSugar: boolean;
  slept5h: boolean;
  energy: number | null;  // 1–10
  weight: number | null;  // kg

  // Trabajo
  deepWork: boolean;
  prospected: boolean;
  createdContent: boolean;

  // Review
  mood: number | null;   // 1–10
  wentWell: string;
  wentBad: string;
  freeNote: string;
}

export interface FinanceEntry {
  id: string;
  date: string; // YYYY-MM-DD
  type: "income" | "expense" | "saving" | "investment";
  amount: number;
  category: string;
  note: string;
}

export interface NetWorthSnapshot {
  month: string; // YYYY-MM
  amount: number;
}

export interface AppData {
  daily: Record<string, DailyEntry>;
  finance: FinanceEntry[];
  netWorth: NetWorthSnapshot[];
}

export const EXPENSE_CATEGORIES = [
  "Comida",
  "Transporte",
  "Salud",
  "Ropa",
  "Entretenimiento",
  "Servicios",
  "Educación",
  "Hogar",
  "Inversión",
  "Otros",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const FINANCE_TYPES: { value: FinanceEntry["type"]; label: string }[] = [
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Gasto" },
  { value: "saving", label: "Ahorro" },
  { value: "investment", label: "Inversión" },
];
