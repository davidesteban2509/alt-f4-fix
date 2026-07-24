import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
    }
  };

  const getBorder = () => {
    switch (toast.type) {
      case 'success': return 'border-emerald-500/40 bg-emerald-950/80';
      case 'warning': return 'border-amber-500/40 bg-amber-950/80';
      case 'info': return 'border-cyan-500/40 bg-cyan-950/80';
      default: return 'border-emerald-500/40 bg-emerald-950/80';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-bounce-short transition-all">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${getBorder()} shadow-xl backdrop-blur-md text-slate-100 max-w-sm`}>
        {getIcon()}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
};
