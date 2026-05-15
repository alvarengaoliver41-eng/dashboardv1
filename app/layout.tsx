import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Tu dashboard personal de hábitos y progreso",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="bg-slate-50 min-h-screen">
        <div className="max-w-md mx-auto min-h-screen pb-24">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
