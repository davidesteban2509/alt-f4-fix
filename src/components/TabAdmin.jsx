import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Lock, 
  Unlock, 
  PhoneCall, 
  Store, 
  Megaphone, 
  Wrench, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Download, 
  Search, 
  ShieldAlert, 
  Save, 
  Sparkles,
  UserCheck,
  Check,
  X
} from 'lucide-react';

export const TabAdmin = () => {
  const {
    config,
    updateConfig,
    toggleBusinessStatus,
    services,
    updateService,
    addService,
    deleteService,
    resetServicesToDefault,
    quotes,
    updateQuoteStatus,
    deleteQuote,
    clearAllQuotes,
    adminUnlocked,
    setAdminUnlocked,
    showToast
  } = useApp();

  // Auth unlock login state
  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Filter & search for quotes log
  const [quoteSearch, setQuoteSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Edit Service Modal state
  const [editingService, setEditingService] = useState(null);
  const [isNewServiceModal, setIsNewServiceModal] = useState(false);

  // New service form state
  const [newServiceData, setNewServiceData] = useState({
    title: '',
    category: 'Mantenimiento',
    iconName: 'Cpu',
    shortDesc: '',
    price: 30,
    estimatedTime: '2 - 4 Horas',
    features: ['Diagnóstico incluido', 'Garantía escrita']
  });

  // Local state for main config inputs to allow smooth editing before saving
  const [localWhatsapp, setLocalWhatsapp] = useState(config.whatsappNumber);
  const [localBanner, setLocalBanner] = useState(config.bannerAnnouncement);
  const [localResponseTime, setLocalResponseTime] = useState(config.responseTime);
  const [localAddress, setLocalAddress] = useState(config.address || 'Av. Vicente Paredes y Geovanni Calles, Quito - Ecuador');

  // Handle Unlock
  const handleUnlockAdmin = (e) => {
    e.preventDefault();
    const u = userInput.trim();
    const p = passwordInput.trim();

    if (u === 'dave25' && p === 'davexD25') {
      setAdminUnlocked(true);
      setAuthError(false);
      showToast('🔓 Sesión de Administrador iniciada correctamente');
    } else {
      setAuthError(true);
    }
  };

  // Handle Save Main Config
  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateConfig({
      whatsappNumber: localWhatsapp,
      bannerAnnouncement: localBanner,
      responseTime: localResponseTime
    });
  };

  // Filtered quotes log
  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.customerName.toLowerCase().includes(quoteSearch.toLowerCase()) ||
                          q.id.toLowerCase().includes(quoteSearch.toLowerCase()) ||
                          q.device.toLowerCase().includes(quoteSearch.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export Quotes to CSV
  const handleExportCSV = () => {
    if (quotes.length === 0) {
      showToast('No hay solicitudes para exportar', 'warning');
      return;
    }

    const headers = ['ID', 'Fecha', 'Cliente', 'Telefono', 'Dispositivo', 'Falla', 'Adicionales', 'Total', 'Estado'];
    const rows = quotes.map(q => [
      q.id,
      q.date,
      `"${q.customerName}"`,
      `"${q.phone}"`,
      `"${q.device}"`,
      `"${q.issue}"`,
      `"${Array.isArray(q.addons) ? q.addons.join(';') : ''}"`,
      q.total,
      q.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Solicitudes_TechFix_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(' Reporte CSV descargado con éxito');
  };

  // Save edited service
  const handleSaveServiceEdit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService);
      setEditingService(null);
    }
  };

  // Create new service
  const handleCreateNewService = (e) => {
    e.preventDefault();
    const serviceToAdd = {
      id: `serv-custom-${Date.now()}`,
      ...newServiceData,
      popular: false
    };
    addService(serviceToAdd);
    setIsNewServiceModal(false);
    setNewServiceData({
      title: '',
      category: 'Mantenimiento',
      iconName: 'Cpu',
      shortDesc: '',
      price: 30,
      estimatedTime: '2 - 4 Horas',
      features: ['Diagnóstico incluido', 'Garantía escrita']
    });
  };

  // LOCKED SCREEN VIEW
  if (!adminUnlocked) {
    return (
      <div className="max-w-md mx-auto my-12 glass-panel p-8 rounded-3xl border border-cyan-500/30 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Panel de Control Admin</h3>
          <p className="text-xs text-slate-400">
            Ingresa tus credenciales de acceso para administrar la plataforma.
          </p>
        </div>

        <form onSubmit={handleUnlockAdmin} className="space-y-3.5 text-left">
          <div>
            <label className="text-xs text-slate-300 font-semibold mb-1 block">Usuario</label>
            <input
              type="text"
              required
              placeholder="Ingresa tu usuario"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full text-xs sm:text-sm py-2.5 px-4 rounded-xl glass-input"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold mb-1 block">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full text-xs sm:text-sm py-2.5 px-4 rounded-xl glass-input"
            />
          </div>

          {authError && (
            <p className="text-xs text-rose-400 font-semibold text-center pt-1">
              Usuario o contraseña incorrectos. Por favor intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 text-sm mt-2"
          >
            Iniciar Sesión Admin
          </button>
        </form>
      </div>
    );
  }

  // UNLOCKED ADMIN CMS VIEW
  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Panel CMS & Gestión del Taller
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                En Vivo
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Los cambios que realices aquí actualizan en tiempo real las pestañas públicas y se guardan en tu navegador (LocalStorage).
            </p>
          </div>
        </div>

        <button
          onClick={() => setAdminUnlocked(false)}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 self-start sm:self-auto"
        >
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Bloquear Panel</span>
        </button>
      </div>

      {/* SECTION 1: LIVE BUSINESS CONFIGURATION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* General Config Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-700/60 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700/60 pb-3">
            <PhoneCall className="w-5 h-5 text-cyan-400" />
            <span>Configuración de Contacto & Anuncios</span>
          </h3>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1.5 block">
                Número de WhatsApp para Pedidos (Formato Internacional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-mono">+</span>
                <input
                  type="text"
                  required
                  value={localWhatsapp}
                  onChange={(e) => setLocalWhatsapp(e.target.value)}
                  className="pl-8 pr-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input w-full font-mono"
                  placeholder="593963788846"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Número activo actual: <span className="text-cyan-300 font-mono">+{config.whatsappNumber}</span>
              </p>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1.5 block">
                Texto del Anuncio Superior (Banner Noticioso)
              </label>
              <input
                type="text"
                value={localBanner}
                onChange={(e) => setLocalBanner(e.target.value)}
                className="px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input w-full"
                placeholder="Ej. ¡Descuento especial en mantenimiento térmico!"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1.5 block">
                Tiempo de Respuesta Promedio
              </label>
              <input
                type="text"
                value={localResponseTime}
                onChange={(e) => setLocalResponseTime(e.target.value)}
                className="px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input w-full"
                placeholder="Ej. Respondiendo en <15 min"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-semibold mb-1.5 block">
                Dirección Física del Taller (Footer)
              </label>
              <input
                type="text"
                value={localAddress}
                onChange={(e) => setLocalAddress(e.target.value)}
                className="px-4 py-2.5 text-xs sm:text-sm rounded-xl glass-input w-full"
                placeholder="Ej. Av. Vicente Paredes y Geovanni Calles, Quito - Ecuador"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios de Configuración</span>
            </button>
          </form>
        </div>

        {/* Business Open/Closed Status Card (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-700/60 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700/60 pb-3">
              <Store className="w-5 h-5 text-emerald-400" />
              <span>Estado de Atención del Taller</span>
            </h3>

            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${config.isOpen ? 'bg-emerald-400 pulse-emerald' : 'bg-rose-500'}`} />
                  <div>
                    <p className="text-sm font-bold text-white">
                      {config.isOpen ? 'TALLER ABIERTO' : 'TALLER CERRADO'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {config.isOpen ? config.responseTime : config.closedMessage}
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleBusinessStatus}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    config.isOpen
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900'
                  }`}
                >
                  {config.isOpen ? 'Cambiar a CERRADO' : 'Cambiar a ABIERTO'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Prueba en vivo:</span>
                </p>
                <p className="text-slate-300">
                  Al alternar este botón, el distintivo superior en el Header de toda la página cambia de verde a rojo instantáneamente.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span>Servicios Activos: <strong className="text-white">{services.length}</strong></span>
            <span>Solicitudes Registradas: <strong className="text-cyan-400">{quotes.length}</strong></span>
          </div>
        </div>

      </section>

      {/* SECTION 2: EDIT SERVICES CATALOG */}
      <section className="space-y-6 glass-panel p-6 rounded-3xl border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <span>Gestor del Catálogo de Servicios & Precios</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edita precios base, títulos y tiempos de entrega para que los clientes vean las tarifas actualizadas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetServicesToDefault}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Restaurar Predeterminados</span>
            </button>

            <button
              onClick={() => setIsNewServiceModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Nuevo Servicio</span>
            </button>
          </div>
        </div>

        {/* Services Edit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-xl">Servicio</th>
                <th className="p-3.5">Categoría</th>
                <th className="p-3.5">Precio Base</th>
                <th className="p-3.5">Tiempo Estimado</th>
                <th className="p-3.5 rounded-r-xl text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {services.map(service => (
                <tr key={service.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white">{service.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{service.shortDesc}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-cyan-400">{service.category}</td>
                  <td className="p-3.5 font-extrabold text-emerald-400">${service.price} USD</td>
                  <td className="p-3.5 text-slate-300">{service.estimatedTime}</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                      title="Editar Servicio"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 border border-slate-700"
                      title="Eliminar Servicio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: SOLICITUDES RECIENTES (CUSTOMER QUERY LOGS TABLE) */}
      <section className="space-y-6 glass-panel p-6 rounded-3xl border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Solicitudes Recientes & Cotizaciones de Clientes</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Registro en tiempo real de consultas generadas desde el Cotizador Express.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            {quotes.length > 0 && (
              <button
                onClick={clearAllQuotes}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel hover:bg-rose-950 text-rose-400 border border-rose-500/40 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar Historial</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar por cliente, ID o equipo..."
              value={quoteSearch}
              onChange={(e) => setQuoteSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl glass-input w-full"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['Todos', 'Pendiente', 'En Proceso', 'Contactado', 'Finalizado'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'glass-panel text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Log Table */}
        <div className="overflow-x-auto">
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <FileText className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm font-semibold">No se encontraron solicitudes registradas.</p>
              <p className="text-xs text-slate-500">Prueba generando una cotización en la pestaña "Cotizador Express".</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900/80 text-slate-400 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5 rounded-l-xl">ID / Fecha</th>
                  <th className="p-3.5">Cliente & Contacto</th>
                  <th className="p-3.5">Equipo & Falla</th>
                  <th className="p-3.5">Total Presupuestado</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 rounded-r-xl text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredQuotes.map(quote => (
                  <tr key={quote.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-cyan-400">{quote.id}</div>
                      <div className="text-[10px] text-slate-400">{quote.date}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">{quote.customerName}</div>
                      <div className="text-xs text-slate-300 font-mono">{quote.phone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">{quote.device}</div>
                      <div className="text-xs text-slate-400 truncate max-w-xs">{quote.issue}</div>
                      {quote.addons && quote.addons.length > 0 && (
                        <div className="text-[10px] text-emerald-400">+{quote.addons.join(', ')}</div>
                      )}
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-400 text-base">
                      ${quote.total} USD
                    </td>
                    <td className="p-3.5">
                      <select
                        value={quote.status}
                        onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border bg-slate-900 ${
                          quote.status === 'Pendiente' ? 'text-amber-400 border-amber-500/40' :
                          quote.status === 'En Proceso' ? 'text-cyan-400 border-cyan-500/40' :
                          quote.status === 'Contactado' ? 'text-blue-400 border-blue-500/40' :
                          'text-emerald-400 border-emerald-500/40'
                        }`}
                      >
                        <option value="Pendiente">🟡 Pendiente</option>
                        <option value="En Proceso">🔵 En Proceso</option>
                        <option value="Contactado">📲 Contactado</option>
                        <option value="Finalizado">🟢 Finalizado</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 border border-slate-700"
                        title="Eliminar Solicitud"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Editar Servicio</span>
              <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">✕</button>
            </h4>

            <form onSubmit={handleSaveServiceEdit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Título del Servicio</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Precio Base ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl glass-input"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Tiempo Estimado</label>
                  <input
                    type="text"
                    required
                    value={editingService.estimatedTime}
                    onChange={(e) => setEditingService({ ...editingService, estimatedTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Descripción Corta</label>
                <textarea
                  rows={3}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="w-1/2 py-2.5 rounded-xl font-semibold glass-panel hover:bg-slate-800 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW SERVICE MODAL */}
      {isNewServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Crear Nuevo Servicio</span>
              <button onClick={() => setIsNewServiceModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </h4>

            <form onSubmit={handleCreateNewService} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Título del Servicio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cambio de Pasta Térmica Metal Líquido"
                  value={newServiceData.title}
                  onChange={(e) => setNewServiceData({ ...newServiceData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Precio Base ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newServiceData.price}
                    onChange={(e) => setNewServiceData({ ...newServiceData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl glass-input"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Categoría</label>
                  <select
                    value={newServiceData.category}
                    onChange={(e) => setNewServiceData({ ...newServiceData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl glass-input bg-slate-900"
                  >
                    <option value="Micro-electrónica">Micro-electrónica</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Hardware Laptop">Hardware Laptop</option>
                    <option value="Software & OS">Software & OS</option>
                    <option value="Almacenamiento">Almacenamiento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Tiempo Estimado</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 1 - 2 Horas"
                  value={newServiceData.estimatedTime}
                  onChange={(e) => setNewServiceData({ ...newServiceData, estimatedTime: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Descripción Resumida</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe los beneficios principales del servicio..."
                  value={newServiceData.shortDesc}
                  onChange={(e) => setNewServiceData({ ...newServiceData, shortDesc: e.target.value })}
                  className="w-full p-2.5 rounded-xl glass-input"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewServiceModal(false)}
                  className="w-1/2 py-2.5 rounded-xl font-semibold glass-panel hover:bg-slate-800 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950"
                >
                  Crear Servicio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
