import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  ThermometerSnowflake, 
  Monitor, 
  ShieldCheck, 
  HardDrive,
  Search,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Zap,
  Sparkles,
  PhoneCall,
  Check,
  Info
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  ThermometerSnowflake,
  Monitor,
  ShieldCheck,
  HardDrive
};

export const TabServices = () => {
  const { services, config, navigateToCalculatorWithIssue } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  const categories = ['Todos', ...new Set(services.map(s => s.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* HERO BANNER */}
      <section className="relative overflow-hidden rounded-3xl glass-panel border border-cyan-500/20 p-8 sm:p-12 shadow-2xl">
        {/* Decorative Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Servicio Técnico Informático de Alta Calidad</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Reparación Especializada de <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Laptops & PCs con Garantía
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Diagnósticos ultra-precisos, laboratorio propio de micro-soldadura electrónica y refacciones originales. Solucionamos fallas complejas que otros talleres dan por irreparables.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateToCalculatorWithIssue('no-power')}
                className="gradient-cyber hover:brightness-110 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Cotizar Reparación Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${config.whatsappNumber}?text=Hola%2C%20necesito%20un%20diagn%C3%B3stico%20gratuito%20para%20mi%20equipo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3.5 rounded-xl text-sm border border-slate-600 flex items-center gap-2 transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Consulta Directa WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Stat Cards inside Hero */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl glass-panel border border-slate-700/60 text-center">
              <p className="text-3xl font-extrabold text-cyan-400">+500</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Equipos Reparados Reales</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-700/60 text-center">
              <p className="text-3xl font-extrabold text-emerald-400">90 Días</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Garantía Total</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-700/60 text-center">
              <p className="text-3xl font-extrabold text-cyan-400">24-48h</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Entrega Promedio</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel border border-slate-700/60 text-center">
              <p className="text-3xl font-extrabold text-emerald-400">0$</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Diagnóstico Inicial</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES SECTION */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Garantía Total</h4>
            <p className="text-xs text-slate-400 mt-0.5">Respaldamos cada trabajo hasta por {config.guaranteeDays || 90} días.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Repuestos Originales</h4>
            <p className="text-xs text-slate-400 mt-0.5">Componentes Grado A+ e insumos certificados.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Diagnóstico Gratuito</h4>
            <p className="text-xs text-slate-400 mt-0.5">Revisión física e informe de laboratorio sin costo.</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Técnicos Certificados</h4>
            <p className="text-xs text-slate-400 mt-0.5">Especialistas en IPC y reparación SMD/BGA.</p>
          </div>
        </div>
      </section>

      {/* SERVICES CATALOG & SEARCH HEADER */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>Catálogo Especializado de Servicios</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-semibold border border-cyan-800">
                {filteredServices.length} Disponibles
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Precios transparentes y tiempos de entrega garantizados.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar servicio (ej. pasta, pantalla)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl glass-input w-full sm:w-64"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'glass-panel text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => {
            const IconComponent = ICON_MAP[service.iconName] || Cpu;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl glass-panel glass-panel-hover p-6 border border-slate-700/60 flex flex-col justify-between"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Popular
                  </span>
                )}

                <div className="space-y-4">
                  {/* Icon & Category */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                        {service.category}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-1.5 pt-2">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer / Pricing & CTA */}
                <div className="pt-6 mt-6 border-t border-slate-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">Desde</span>
                      <span className="text-2xl font-extrabold text-white">
                        ${service.price}
                        <span className="text-xs text-slate-400 font-normal"> USD</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{service.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
                    >
                      Detalles
                    </button>

                    <button
                      onClick={() => navigateToCalculatorWithIssue('no-power')}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SERVICE DETAIL MODAL */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {React.createElement(ICON_MAP[selectedServiceModal.iconName] || Cpu, { className: "w-8 h-8" })}
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedServiceModal.category}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedServiceModal.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedServiceModal.shortDesc}
            </p>

            <div className="space-y-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                El Servicio Incluye:
              </h4>
              <ul className="space-y-2">
                {selectedServiceModal.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-slate-400 block">Precio estimado</span>
                <span className="text-3xl font-extrabold text-emerald-400">${selectedServiceModal.price} USD</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Tiempo de trabajo</span>
                <span className="text-sm font-bold text-cyan-300">{selectedServiceModal.estimatedTime}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="w-1/2 py-3 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-800 text-slate-300"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  setSelectedServiceModal(null);
                  navigateToCalculatorWithIssue('no-power');
                }}
                className="w-1/2 py-3 rounded-xl text-xs font-bold gradient-cyber text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Cotizar este servicio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
