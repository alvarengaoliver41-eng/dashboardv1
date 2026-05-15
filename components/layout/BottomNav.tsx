"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Briefcase, DollarSign, BookOpen } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/salud", icon: Heart, label: "Salud" },
  { href: "/trabajo", icon: Briefcase, label: "Trabajo" },
  { href: "/finanzas", icon: DollarSign, label: "Finanzas" },
  { href: "/review", icon: BookOpen, label: "Review" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 safe-area-bottom">
      <div className="max-w-md mx-auto flex">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-[10px] font-semibold tracking-wide transition-colors ${
                active ? "text-navy-900" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-navy-900" : ""}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
