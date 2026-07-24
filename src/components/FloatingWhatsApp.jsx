import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, ShieldCheck } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { config } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  const formattedUrl = `https://wa.me/${config.whatsappNumber}?text=Hola%2C%20necesito%20un%20diagn%C3%B3stico%20para%20mi%20equipo.%20Vengo%20de%20su%20p%C3%A1gina%20web.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
      {/* Sleek Floating Tooltip / Callout */}
      {showTooltip && (
        <div className="relative glass-panel bg-slate-900/95 border border-emerald-500/40 p-3.5 rounded-2xl shadow-2xl max-w-xs text-xs text-slate-200 animate-fadeIn flex items-start gap-2">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-1 rounded-full border border-slate-700"
            title="Cerrar notificación"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <WhatsAppIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-white flex items-center gap-1.5">
              <span>¿Necesitas ayuda inmediata?</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Habla directamente con un técnico por WhatsApp. Diagnóstico sin costo.
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={formattedUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative p-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      >
        {/* Pulse Waves */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />
        <span className="absolute -inset-3 rounded-full bg-[#25D366]/20 pointer-events-none blur-sm" />

        <WhatsAppIcon className="w-7 h-7 text-white relative z-10" />

        {/* Online Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-950 z-20" />
      </a>
    </div>
  );
};
