interface PageHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

import React from "react";

export default function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between px-5 pt-10 pb-5">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {right && <div className="mt-1">{right}</div>}
    </div>
  );
}
