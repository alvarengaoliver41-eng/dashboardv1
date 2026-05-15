import { AppData, DailyEntry } from "./types";

const KEY = "ht_v1";

export function defaultDaily(date: string): DailyEntry {
  return {
    date,
    gym: false,
    macros: false,
    zeroSugar: false,
    slept5h: false,
    energy: null,
    weight: null,
    deepWork: false,
    prospected: false,
    createdContent: false,
    mood: null,
    wentWell: "",
    wentBad: "",
    freeNote: "",
  };
}

export function emptyData(): AppData {
  return { daily: {}, finance: [], netWorth: [] };
}

export function loadData(): AppData {
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyData();
    return JSON.parse(raw) as AppData;
  } catch {
    return emptyData();
  }
}

export function saveData(data: AppData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getOrCreate(data: AppData, date: string): DailyEntry {
  return data.daily[date] ?? defaultDaily(date);
}
