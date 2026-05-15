import { scoreHex } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ScoreRing({ score, size = 140, strokeWidth = 10, label = "Score" }: ScoreRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, score));
  const offset = circumference - (clamped / 100) * circumference;
  const color = scoreHex(clamped);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", position: "absolute" }}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-navy-900 leading-none">{clamped}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">{label}</span>
      </div>
    </div>
  );
}
