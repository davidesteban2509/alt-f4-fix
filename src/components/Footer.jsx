import React from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { Laptop, MapPin, Clock, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { config, setActiveTab } = useApp();

  return (
    <footer className="glass-panel border-t border-slate-800 bg-slate-950/80 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="overflow-hidden w-9 h-9 rounded-xl border border-cyan-500/40 bg-slate-900 flex items-center justify-center">
                <img src={logoImg} alt="Alt-F4 Fix Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Alt-F4 <span className="text-cyan-400">Fix</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Laboratorio especializado en micro-soldadura, reconstrucción electrónica y optimización técnica de Laptops y PCs de alto rendimiento.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('servicios')} className="hover:text-cyan-400 transition-colors">
                  📊 Servicios & Diagnóstico
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cotizador')} className="hover:text-cyan-400 transition-colors">
                  🧮 Cotizador Express
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-cyan-400 transition-colors">
                  ⚙️ Panel de Control Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Horarios & Ubicación */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Taller & Atencion</h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Lunes a Sábado: 08:30 - 18:30</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-300">{config.address || 'Av. Vicente Paredes y Geovanni Calles, Quito - Ecuador'}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">+{config.whatsappNumber}</span>
              </p>
            </div>
          </div>

          {/* Garantía badge */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía Respaldada</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Todas nuestras reparaciones electrónicas cuentan con hoja de servicio oficial y garantía escrita por {config.guaranteeDays || 90} días.
            </p>
          </div>

        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Alt-F4 Fix. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desarrollado con</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            <span>para Alt-F4 Fix</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
