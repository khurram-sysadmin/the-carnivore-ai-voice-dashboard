import React from 'react';
import { ShoppingBag, Calendar, MessageSquare, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { ActivityEvent } from '../types';

interface ActivityTimelineProps {
  events: ActivityEvent[];
}

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-zinc-200 rounded-xl">
        <Clock className="w-10 h-10 text-zinc-300 mb-2" />
        <p className="text-sm text-zinc-500 font-medium">No activity logged today</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-zinc-900 mb-6 text-base tracking-tight flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-zinc-500" />
        Live Operations Log
      </h3>
      
      <div className="relative border-l border-zinc-200 pl-6 ml-3 space-y-6">
        {events.map((event, idx) => {
          let Icon = ShoppingBag;
          let colorClass = 'bg-amber-100 text-amber-800 border-amber-200';

          if (event.type === 'reservation') {
            Icon = Calendar;
            colorClass = 'bg-teal-100 text-teal-800 border-teal-200';
          } else if (event.type === 'feedback') {
            Icon = MessageSquare;
            colorClass = 'bg-blue-100 text-blue-800 border-blue-200';
          } else if (event.type === 'escalation') {
            Icon = AlertTriangle;
            colorClass = 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse';
          }

          const formattedTime = new Date(event.created_at).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          return (
            <div key={event.id || idx} className="relative group">
              {/* Timeline dot/icon */}
              <div className={`absolute -left-[38px] top-0.5 w-7 h-7 rounded-full border flex items-center justify-center ${colorClass}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    {formattedTime}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                    {event.event_type}
                  </span>
                </div>
                <p className="text-sm text-zinc-800 mt-1 leading-snug">
                  {event.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
