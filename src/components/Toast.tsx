import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible || !message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out animate-bounce">
      <div className="bg-slate-900/95 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs sm:text-sm font-semibold backdrop-blur-md">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
