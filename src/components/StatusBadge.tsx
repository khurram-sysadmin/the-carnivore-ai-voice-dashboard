import React from 'react';
import { motion } from 'motion/react';

interface StatusBadgeProps {
  id?: string;
  status: string;
}

export default function StatusBadge({ id, status }: StatusBadgeProps) {
  const normalized = status.toUpperCase();

  let styles = {
    bg: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200',
    dot: 'bg-zinc-400',
  };

  switch (normalized) {
    case 'RECEIVED':
      styles = {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
      };
      break;
    case 'PREPARING':
      styles = {
        bg: 'bg-blue-50 text-blue-800 border-blue-200',
        dot: 'bg-blue-500 animate-pulse',
      };
      break;
    case 'READY':
      styles = {
        bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        dot: 'bg-indigo-500',
      };
      break;
    case 'OUT_FOR_DELIVERY':
      styles = {
        bg: 'bg-purple-50 text-purple-800 border-purple-200',
        dot: 'bg-purple-500 animate-bounce',
      };
      break;
    case 'COMPLETED':
    case 'RESOLVED':
      styles = {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      };
      break;
    case 'CANCELLED':
    case 'NO_SHOW':
      styles = {
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        dot: 'bg-rose-500',
      };
      break;
    case 'CONFIRMED':
      styles = {
        bg: 'bg-teal-50 text-teal-800 border-teal-200',
        dot: 'bg-teal-500',
      };
      break;
    case 'MODIFIED':
    case 'IN_PROGRESS':
      styles = {
        bg: 'bg-orange-50 text-orange-800 border-orange-200',
        dot: 'bg-orange-500',
      };
      break;
    case 'PENDING':
    case 'NEW':
      styles = {
        bg: 'bg-rose-100 text-rose-800 border-rose-300',
        dot: 'bg-rose-600 animate-ping',
      };
      break;
  }

  return (
    <motion.span
      key={status}
      id={id || `status-${status.toLowerCase()}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: [0.92, 1.05, 1] }}
      transition={{ 
        duration: 0.35, 
        times: [0, 0.6, 1],
        ease: "easeOut" 
      }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {status.replace(/_/g, ' ')}
    </motion.span>
  );
}
