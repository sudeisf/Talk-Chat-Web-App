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
    <div className="flex min-h-28 items-center border border-border p-5 gap-4 bg-card rounded-md">
      <div className={`p-2.5 rounded-full bg-muted h-fit ${color}`}>
        {icon}
      </div>
      <div className="space-y-1.5 min-w-0">
        <p className="text-lg font-sans text-muted-foreground truncate">{title}</p>
        <div className="flex gap-2 items-center">
          <h3 className={`text-4xl leading-none font-semibold ${color}`}>{value}</h3>
          <div
            className={`flex ${trendColorClass} ${trendBgClass} min-w-[84px] rounded-full justify-center text-lg font-medium items-center px-2 py-1`}
          >
            {isNegative ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
            {Math.abs(percentage).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
