import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { 
  INITIAL_DEVICE_TYPES, 
  INITIAL_ISSUES, 
  INITIAL_ADDONS 
} from '../data/initialData';
import { 
  Laptop, 
  Computer, 
  Tv, 
  Calculator, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Minus,
  Send,
  Zap,
  Info
} from 'lucide-react';

const DEVICE_ICONS = {
  Laptop: Laptop,
  Computer: Computer,
  Tv: Tv
};

export const TabCalculator = () => {
  const { 
    config, 
    addQuote, 
    showToast, 
    preselectedIssueId, 
    setPreselectedIssueId 
  } = useApp();

  // Form State
  const [selectedDevice, setSelectedDevice] = useState(INITIAL_DEVICE_TYPES[0]);
  const [selectedIssue, setSelectedIssue] = useState(() => {
    if (preselectedIssueId) {
      return INITIAL_ISSUES.find(i => i.id === preselectedIssueId) || INITIAL_ISSUES[0];
    }
    return INITIAL_ISSUES[0];
  });
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Customer details state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [notes, setNotes] = useState('');

  // Sync preselected issue if user navigated from Tab 1
  useEffect(() => {
    if (preselectedIssueId) {
      const found = INITIAL_ISSUES.find(i => i.id === preselectedIssueId);
      if (found) {
        setSelectedIssue(found);
      }
      setPreselectedIssueId(null);
    }
  }, [preselectedIssueId, setPreselectedIssueId]);

  // Calculate dynamic total price
  const baseCost = selectedIssue.estimatedCost * selectedDevice.baseMultiplier;
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addonObj = INITIAL_ADDONS.find(a => a.id === addonId);
    return acc + (addonObj ? addonObj.price : 0);
  }, 0);

  const calculatedTotal = Math.round(baseCost + addonsTotal);

  // Toggle Addon selection
  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  // Generate WhatsApp Message & Save to Admin CMS
  const handleScheduleWhatsApp = (e) => {
    e.preventDefault();

    const selectedAddonNames = selectedAddons.map(id => {
      const item = INITIAL_ADDONS.find(a => a.id === id);
      return item ? item.name : id;
    });

    // 1. Save quote locally into Admin CMS Solicitudes Recientes
    const quoteEntry = addQuote({
      customerName: customerName || 'Cliente Web',
      phone: customerPhone || 'Sin especificar',
      device: `${selectedDevice.name} ${deviceModel ? `(${deviceModel})` : ''}`,
      issue: selectedIssue.title,
      total: calculatedTotal,
      addons: selectedAddonNames,
      notes: notes || 'Sin notas adicionales'
    });

    showToast(` Cotización ${quoteEntry.id} generada y registrada en taller`);

    // 2. Build pre-populated WhatsApp message
    const messageLines = [
      `👋 *¡Hola Alt-F4 Fix! Quisiera agendar un diagnóstico/reparación.*`,
      ``,
      `📌 *DETALLES DE LA COTIZACIÓN:*`,
      `• *Código de Cotización:* ${quoteEntry.id}`,
      `• *Cliente:* ${customerName || 'Cliente Web'}`,
      `• *Contacto:* ${customerPhone || 'Por WhatsApp'}`,
      `• *Tipo de Equipo:* ${selectedDevice.name}`,
      `• *Modelo:* ${deviceModel || 'Por confirmar en taller'}`,
      `• *Problema Principal:* ${selectedIssue.title}`,
      `• *Adicionales:* ${selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'Ninguno'}`,
      `• *Total Estimado:* $${calculatedTotal} USD`,
      `• *Notas:* ${notes || 'N/A'}`,
      ``,
      `⏱️ *Tiempo Estimado de Entrega:* ~${selectedIssue.estimatedTime}`,
      `✅ *Vengo desde el Cotizador Express de su sitio web.*`
    ];

    const encodedMessage = encodeURIComponent(messageLines.join('\n'));
    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp URL in new window
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          <span>Calculadora de Presupuesto Inmediata</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cotizador Express de <span className="text-cyan-400">Reparaciones</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Selecciona tu tipo de equipo y la falla principal para obtener una estimación transparente en segundos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE FORM (8 Cols) */}
        <div className="lg:col-span-7 space-y-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/60">
          
          {/* STEP 1: Select Device Type */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">1</span>
              <span>Tipo de Dispositivo</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              {INITIAL_DEVICE_TYPES.map(dev => {
                const IconComponent = DEVICE_ICONS[dev.icon] || Laptop;
                const isSelected = selectedDevice.id === dev.id;

                return (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => setSelectedDevice(dev)}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/10'
                        : 'glass-panel border-slate-700/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                    }`}
                  >
                    <IconComponent className={`w-7 h-7 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold leading-snug">{dev.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Select Primary Issue */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">2</span>
              <span>¿Cuál es el Problema Principal?</span>
            </label>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {INITIAL_ISSUES.map(issue => {
                const isSelected = selectedIssue.id === issue.id;

                return (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between gap-4 transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500/60 text-white shadow-md'
                        : 'glass-panel border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-600'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">{issue.title}</p>
                        <span className="text-[10px] text-slate-400 font-medium">Categoría: {issue.category} • Entrega estim.: ~{issue.estimatedTime}</span>
                      </div>
                    </div>

                    <span className="text-xs sm:text-sm font-extrabold text-cyan-400 shrink-0">
                      ~${Math.round(issue.estimatedCost * selectedDevice.baseMultiplier)} USD
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Optional Add-ons */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">3</span>
              <span>Servicios Adicionales Opcionales</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INITIAL_ADDONS.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);

                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-2xl border text-left flex items-start justify-between gap-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                        : 'glass-panel border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-200 leading-snug">{addon.name}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">+${addon.price} USD</span>
                    </div>

                    <div className={`p-1 rounded-lg ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                      {isSelected ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Customer Contact Info */}
          <form onSubmit={handleScheduleWhatsApp} className="space-y-4 pt-4 border-t border-slate-700/60">
            <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">4</span>
              <span>Tus Datos de Contacto</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Tu Nombre y Apellido</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Mendoza"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Teléfono / WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 0991234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Marca y Modelo del Equipo</label>
                <input
                  type="text"
                  placeholder="Ej. Lenovo Legion 5 / ASUS Zenbook"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium mb-1 block">Detalles adicionales (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. El ventilador suena fuerte..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input"
                />
              </div>
            </div>
          </form>

        </div>

        {/* RIGHT COLUMN: DYNAMIC PRICING SUMMARY BOX (5 Cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Resumen de Cotización</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Diagnóstico 0$
              </span>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-start text-slate-300">
                <div>
                  <p className="font-semibold text-white">{selectedDevice.name}</p>
                  <p className="text-[11px] text-slate-400">{selectedIssue.title}</p>
                </div>
                <span className="font-bold text-slate-100">${Math.round(baseCost)} USD</span>
              </div>

              {selectedAddons.map(id => {
                const addon = INITIAL_ADDONS.find(a => a.id === id);
                if (!addon) return null;
                return (
                  <div key={id} className="flex justify-between items-center text-emerald-300">
                    <span className="text-xs">+ {addon.name}</span>
                    <span className="font-bold">${addon.price} USD</span>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-slate-700/60 flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium">Revisión e informe en laboratorio:</span>
                <span className="text-xs font-bold text-emerald-400 uppercase">Gratis</span>
              </div>
            </div>

            {/* Total Cost Display */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/80 to-slate-900 border border-cyan-500/40 text-center space-y-1">
              <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">Costo Estimado Total</span>
              <div className="text-4xl font-extrabold text-white tracking-tight">
                ${calculatedTotal} <span className="text-sm font-normal text-slate-400">USD</span>
              </div>
              <p className="text-[11px] text-slate-400">Garantía de {config.guaranteeDays || 90} días incluida por escrito.</p>
            </div>

            {/* Call to Action Button */}
            <button
              onClick={handleScheduleWhatsApp}
              className="w-full py-4 rounded-2xl font-extrabold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>Agendar esta Reparación por WhatsApp</span>
            </button>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Compromiso Alt-F4 Fix:</span>
              </div>
              <p>
                Al hacer clic, se abrirá WhatsApp con todos los detalles precargados para ser atendido en menos de 15 minutos por un técnico.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
