import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_SERVICES, 
  INITIAL_BUSINESS_CONFIG, 
  INITIAL_QUOTES 
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AppContext = createContext();

const STORAGE_KEYS = {
  CONFIG: 'techfix_config_v1',
  SERVICES: 'techfix_services_v1',
  QUOTES: 'techfix_quotes_v1',
  ADMIN_AUTH: 'techfix_admin_auth_v1'
};

export const AppProvider = ({ children }) => {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState('servicios');

  // Pre-selected service state when navigating from Tab 1 -> Tab 2
  const [preselectedIssueId, setPreselectedIssueId] = useState(null);

  // Business Configuration State
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration check: Update storeName and address if cached with old defaults
        parsed.storeName = INITIAL_BUSINESS_CONFIG.storeName;
        if (!parsed.address || parsed.address.includes('Principal N34-120') || parsed.address.includes('Los Cedros')) {
          parsed.address = INITIAL_BUSINESS_CONFIG.address;
        }
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(parsed));
        return { ...INITIAL_BUSINESS_CONFIG, ...parsed };
      }
      return INITIAL_BUSINESS_CONFIG;
    } catch (e) {
      return INITIAL_BUSINESS_CONFIG;
    }
  });

  // Services List State
  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration check: Clean up feature strings if cached in local storage
        const cleaned = parsed.map(s => ({
          ...s,
          features: Array.isArray(s.features) 
            ? s.features.map(f => {
                if (f === 'Limpieza de residuos de polvo e hilos') return 'Limpieza de residuos de polvo';
                if (f === 'Instalación profesional sin marcas') return 'Instalación profesional';
                return f;
              })
            : s.features
        }));
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(cleaned));
        return cleaned;
      }
      return INITIAL_SERVICES;
    } catch (e) {
      return INITIAL_SERVICES;
    }
  });

  // Customer Quotes Log State
  const [quotes, setQuotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch (e) {
      return INITIAL_QUOTES;
    }
  });

  // Fetch live quotes from Supabase database if configured
  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('customer_quotes')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const formatted = data.map(row => ({
              id: row.id,
              date: row.created_at ? row.created_at.replace('T', ' ').slice(0, 16) : row.date,
              customerName: row.customer_name,
              phone: row.phone,
              device: row.device,
              issue: row.issue,
              addons: row.addons || [],
              total: row.total,
              status: row.status,
              notes: row.notes
            }));
            setQuotes(formatted);
          }
        });
    }
  }, []);

  // Admin Access Lock State
  const [adminUnlocked, setAdminUnlocked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  // Notification Toast State
  const [toast, setToast] = useState(null);

  // Save changes to localStorage on updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(adminUnlocked));
  }, [adminUnlocked]);

  // Automatic Ecuador Schedule Checker (08:30 - 18:30 ECT)
  useEffect(() => {
    const checkSchedule = () => {
      try {
        const now = new Date();
        const options = { timeZone: 'America/Guayaquil', hour: 'numeric', minute: 'numeric', hour12: false };
        const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
        let h = 0, m = 0;
        for (const p of parts) {
          if (p.type === 'hour') h = parseInt(p.value, 10);
          if (p.type === 'minute') m = parseInt(p.value, 10);
        }
        const decimal = h + (m / 60);
        // Open between 08:30 (8.5) and 18:30 (18.5)
        const isWorkHours = decimal >= 8.5 && decimal < 18.5;

        setConfig(prev => {
          if (prev.manualOverride) return prev;
          if (prev.isOpen !== isWorkHours) {
            return { ...prev, isOpen: isWorkHours };
          }
          return prev;
        });
      } catch (e) {
        // Fallback
      }
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 30000);
    return () => clearInterval(interval);
  }, []);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Actions
  const updateConfig = (newPartialConfig) => {
    setConfig(prev => ({ ...prev, ...newPartialConfig }));
    showToast('Configuración del taller actualizada con éxito ✨');
  };

  const toggleBusinessStatus = () => {
    if (!adminUnlocked) {
      showToast('Acceso denegado. Inicia sesión como Administrador.', 'warning');
      return;
    }
    setConfig(prev => {
      const nextStatus = !prev.isOpen;
      showToast(nextStatus ? '🟢 El taller está ahora ABIERTO' : '🔴 El taller está ahora CERRADO', nextStatus ? 'success' : 'warning');
      return { ...prev, isOpen: nextStatus, manualOverride: true };
    });
  };

  const updateService = (updatedService) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    showToast(`Servicio "${updatedService.title.slice(0, 25)}..." modificado`);
  };

  const addService = (newService) => {
    setServices(prev => [newService, ...prev]);
    showToast('Nuevo servicio agregado al catálogo');
  };

  const deleteService = (serviceId) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
    showToast('Servicio eliminado', 'info');
  };

  const resetServicesToDefault = () => {
    setServices(INITIAL_SERVICES);
    showToast('Servicios restaurados a los valores por defecto', 'info');
  };

  const addQuote = (newQuoteData) => {
    const fullQuote = {
      id: `COT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Pendiente',
      ...newQuoteData
    };

    setQuotes(prev => [fullQuote, ...prev]);

    if (isSupabaseConfigured() && supabase) {
      supabase.from('customer_quotes').insert([{
        id: fullQuote.id,
        customer_name: fullQuote.customerName,
        phone: fullQuote.phone,
        device: fullQuote.device,
        issue: fullQuote.issue,
        addons: fullQuote.addons,
        total: fullQuote.total,
        status: fullQuote.status,
        notes: fullQuote.notes
      }]).then(({ error }) => {
        if (error) console.error('Supabase Sync Error:', error);
      });
    }

    return fullQuote;
  };

  const updateQuoteStatus = (quoteId, newStatus) => {
    setQuotes(prev => prev.map(q => q.id === quoteId ? { ...q, status: newStatus } : q));
    showToast(`Solicitud ${quoteId} actualizada a: ${newStatus}`);

    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('customer_quotes')
        .update({ status: newStatus })
        .eq('id', quoteId)
        .then(({ error }) => {
          if (error) console.error('Supabase Update Error:', error);
        });
    }
  };

  const deleteQuote = (quoteId) => {
    setQuotes(prev => prev.filter(q => q.id !== quoteId));
    showToast(`Solicitud ${quoteId} eliminada`);

    if (isSupabaseConfigured() && supabase) {
      supabase
        .from('customer_quotes')
        .delete()
        .eq('id', quoteId)
        .then(({ error }) => {
          if (error) console.error('Supabase Delete Error:', error);
        });
    }
  };

  const clearAllQuotes = () => {
    setQuotes([]);
    showToast('Historial de cotizaciones limpiado', 'info');
  };

  const navigateToCalculatorWithIssue = (issueId) => {
    setPreselectedIssueId(issueId);
    setActiveTab('cotizador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      config,
      updateConfig,
      toggleBusinessStatus,
      services,
      updateService,
      addService,
      deleteService,
      resetServicesToDefault,
      quotes,
      addQuote,
      updateQuoteStatus,
      deleteQuote,
      clearAllQuotes,
      adminUnlocked,
      setAdminUnlocked,
      toast,
      showToast,
      preselectedIssueId,
      setPreselectedIssueId,
      navigateToCalculatorWithIssue
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
