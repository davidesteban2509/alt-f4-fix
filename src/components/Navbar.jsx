import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Laptop, 
  Wrench, 
  Calculator, 
  Settings, 
  Sparkles,
  PhoneCall,
  Lock,
  Unlock
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    config, 
    toggleBusinessStatus, 
    adminUnlocked, 
    quotes 
  } = useApp();

  const pendingQuotesCount = quotes.filter(q => q.status === 'Pendiente').length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-700/60 backdrop-blur-xl">
      {/* Announcement Banner */}
      {config.bannerAnnouncement && (
        <div className="bg-gradient-to-r from-cyan-900/70 via-slate-900 to-blue-900/70 py-1.5 px-4 text-center text-xs sm:text-sm font-medium border-b border-cyan-500/20 text-cyan-200 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
          <span className="truncate">{config.bannerAnnouncement}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => setActiveTab('servicios')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative overflow-hidden w-11 h-11 rounded-xl border border-cyan-500/40 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300 bg-slate-900 flex items-center justify-center">
              <img 
                src="/logo.jpeg" 
                alt="Alt-F4 Fix Logo" 
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                  Alt-F4 <span className="text-cyan-400">Fix</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-cyan-950 text-cyan-400 rounded-md border border-cyan-800/50">
                  Pro Repair
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Laptop & PC Doctor</p>
            </div>
          </div>



          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('servicios')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'servicios'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Wrench className={`w-4 h-4 ${activeTab === 'servicios' ? 'text-cyan-400' : ''}`} />
              <span>Servicios & Diagnóstico</span>
            </button>

            <button
              onClick={() => setActiveTab('cotizador')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'cotizador'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calculator className={`w-4 h-4 ${activeTab === 'cotizador' ? 'text-cyan-400' : ''}`} />
              <span>Cotizador Express</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-inner'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Settings className={`w-4 h-4 ${activeTab === 'admin' ? 'text-cyan-400' : ''}`} />
              <span className="hidden md:inline">Admin CMS</span>
              <span className="md:hidden">Admin</span>
              
              {/* Lock Indicator */}
              {adminUnlocked ? (
                <Unlock className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
              )}

              {/* Pending quotes notification dot */}
              {pendingQuotesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950">
                  {pendingQuotesCount}
                </span>
              )}
            </button>
          </nav>

        </div>



      </div>
    </header>
  );
};
