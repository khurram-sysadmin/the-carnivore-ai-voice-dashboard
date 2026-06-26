import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  colorClass?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorClass = 'text-red-600 bg-red-50 border-red-100'
}: StatsCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-wider block truncate">
            {title}
          </span>
          <span className="text-xl sm:text-2xl font-black text-zinc-900 mt-1.5 block tracking-tight truncate">
            {value}
          </span>
        </div>
        <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${colorClass}`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
      </div>

      {(trend || description) && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-100">
          {trend && (
            <span
              className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-rose-50 text-rose-800'
              }`}
            >
              {trend.value}
            </span>
          )}
          {description && (
            <span className="text-xs text-zinc-500 font-medium">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
