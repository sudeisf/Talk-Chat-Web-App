'use client';

import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  percentage: number;
}

export default function SummaryCard({
  title,
  value,
  icon,
  color = 'text-blue-600',
  percentage,
}: SummaryCardProps) {
  const isPositive = percentage > 0;
  const isNegative = percentage < 0;
  const trendColorClass = isPositive
    ? 'text-green-600'
    : isNegative
      ? 'text-red-600'
      : 'text-muted-foreground';
  const trendBgClass = isPositive
    ? 'bg-green-500/10'
    : isNegative
      ? 'bg-red-500/10'
      : 'bg-muted';

  return (
    <div className="flex min-h-24 items-center border border-border p-4 gap-3 bg-card rounded-md">
      <div className={`p-2 rounded-full bg-muted h-fit ${color}`}>
        {icon}
      </div>
      <div className="space-y-1 min-w-0">
        <p className="text-sm font-sans text-muted-foreground truncate">{title}</p>
        <div className="flex gap-2 items-center">
          <h3 className={`text-2xl leading-none font-semibold ${color}`}>{value}</h3>
          <div
            className={`flex ${trendColorClass} ${trendBgClass} min-w-[72px] rounded-full justify-center text-sm font-medium items-center px-2 py-1`}
          >
            {isNegative ? (
              <ArrowDown className="w-3.5 h-3.5" />
            ) : (
              <ArrowUp className="w-3.5 h-3.5" />
            )}
            {Math.abs(percentage).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
