export const INITIAL_SERVICES = [
  {
    id: "serv-1",
    title: "Reparación de Tarjeta Madre / Cortocircuitos (Micro-soldadura)",
    category: "Micro-electrónica",
    iconName: "Cpu",
    shortDesc: "Diagnóstico profundo con microscopio y cámara térmica. Reparación de líneas en corto, reemplazo de integrados Mosfet, KBC y CHIP de video.",
    price: 45,
    estimatedTime: "24 - 48 Horas",
    badge: "Alta Especialidad",
    features: [
      "Diagnóstico térmico IR",
      "Reemplazo de condensadores y Mosfets",
      "Reparación de puerto de carga (DC Jack)",
      "Garantía escrita de 3 a 6 meses"
    ],
    popular: true
  },
  {
    id: "serv-2",
    title: "Mantenimiento Térmico Preventivo (Limpieza + Pasta Térmica)",
    category: "Mantenimiento",
    iconName: "ThermometerSnowflake",
    shortDesc: "Limpieza ultra-sónica de ventiladores, disipadores y aplicación de pasta térmica de alto rendimiento (Arctic MX-6 / Noctua / Thermal Grizzly).",
    price: 25,
    estimatedTime: "2 - 4 Horas",
    badge: "Recomendado Anual",
    features: [
      "Limpieza de residuos de polvo",
      "Cambio de Thermal Pads desgastados",
      "Pasta térmica de nano-partículas",
      "Prueba de esfuerzo (Stress Test -30% temp)"
    ],
    popular: true
  },
  {
    id: "serv-3",
    title: "Cambio de Pantalla, Teclado y Batería (Laptops)",
    category: "Hardware Laptop",
    iconName: "Monitor",
    shortDesc: "Sustitución inmediata con repuestos 100% originales o grado A+. Pantallas FHD/4K, teclados retroiluminados y baterías de alta autonomía.",
    price: 35,
    estimatedTime: "1 - 3 Horas",
    badge: "Entrega Mismo Día",
    features: [
      "Pantallas IPS High Color Gamut",
      "Teclados originales en Español / Inglés",
      "Baterías de reemplazo con celdas de grado A",
      "Instalación profesional"
    ],
    popular: false
  },
  {
    id: "serv-4",
    title: "Optimizaciones, Formateo y Eliminación de Virus",
    category: "Software & OS",
    iconName: "ShieldCheck",
    shortDesc: "Instalación limpia de Windows 11 / macOS, drivers actualizados al día, paquete de software productivo y desinfección profunda de Malware/Ransomware.",
    price: 20,
    estimatedTime: "2 - 3 Horas",
    badge: "100% Seguro",
    features: [
      "Respaldo de información previa",
      "Licencia original de Windows & Office",
      "Optimización de inicio y registros",
      "Antivirus profesional activado"
    ],
    popular: false
  },
  {
    id: "serv-5",
    title: "Recuperación de Datos y Cambio de SSD/RAM",
    category: "Almacenamiento",
    iconName: "HardDrive",
    shortDesc: "Aceleración x10 de tu equipo instalando unidades SSD M.2 NVMe de última generación. Recuperación de archivos borrados o discos dañados.",
    price: 30,
    estimatedTime: "2 - 24 Horas",
    badge: "Aceleración Máxima",
    features: [
      "Clonación exacta sin perder archivos",
      "SSD NVMe hasta 3500 MB/s",
      "Recuperación lógica de partitiones lost",
      "Ampliación RAM Dual-Channel"
    ],
    popular: true
  }
];

export const INITIAL_BUSINESS_CONFIG = {
  storeName: "Alt-F4 Fix",
  subtitle: "Centro Especializado en Reparación de Laptops & PCs",
  whatsappNumber: "593963788846",
  isOpen: true,
  responseTime: "Respondiendo en <15 min",
  closedMessage: "Taller Cerrado | Horario de Atención: 08:30 - 18:30",
  bannerAnnouncement: "⚡ ¡Diagnóstico EXPRESS 100% Gratuito en taller! Descuento del 10% en mantenimiento preventivo este mes.",
  guaranteeDays: 90,
  address: "Av. Vicente Paredes y Geovanni Calles, Quito - Ecuador"
};

export const INITIAL_DEVICE_TYPES = [
  { id: "laptop", name: "Laptop / Notebook", icon: "Laptop", baseMultiplier: 1.0 },
  { id: "desktop", name: "PC de Escritorio (Gamer / Oficina)", icon: "Computer", baseMultiplier: 0.9 },
  { id: "all-in-one", name: "All-in-One (Todo en Uno)", icon: "Tv", baseMultiplier: 1.15 }
];

export const INITIAL_ISSUES = [
  {
    id: "no-power",
    title: "No prende / Pantalla completamente negra",
    category: "Tarjeta Madre",
    estimatedCost: 45,
    estimatedTime: "24h",
    recommendedServiceId: "serv-1"
  },
  {
    id: "overheating",
    title: "Calentamiento excesivo / Ruidos fuertes en ventilador",
    category: "Mantenimiento",
    estimatedCost: 25,
    estimatedTime: "2h",
    recommendedServiceId: "serv-2"
  },
  {
    id: "broken-screen",
    title: "Pantalla rota, manchada o parpadea",
    category: "Hardware",
    estimatedCost: 65,
    estimatedTime: "3h",
    recommendedServiceId: "serv-3"
  },
  {
    id: "slow-system",
    title: "Muy lenta / Virus / Errores de Windows",
    category: "Software",
    estimatedCost: 20,
    estimatedTime: "2h",
    recommendedServiceId: "serv-4"
  },
  {
    id: "ssd-upgrade",
    title: "Quiero aumentar velocidad SSD o memoria RAM",
    category: "Mejora",
    estimatedCost: 35,
    estimatedTime: "1h",
    recommendedServiceId: "serv-5"
  },
  {
    id: "liquid-damage",
    title: "Se derramó líquido (Agua, Café, Bebidas)",
    category: "Urgencia",
    estimatedCost: 40,
    estimatedTime: "24h",
    recommendedServiceId: "serv-1"
  },
  {
    id: "battery-keyboard",
    title: "Teclado no escribe o Batería dura muy poco",
    category: "Hardware",
    estimatedCost: 30,
    estimatedTime: "2h",
    recommendedServiceId: "serv-3"
  }
];

export const INITIAL_ADDONS = [
  { id: "express", name: "Servicio URGENTE Express 24h", price: 15, icon: "Zap" },
  { id: "backup", name: "Respaldo previo de Archivos y Fotos", price: 10, icon: "Database" },
  { id: "thermal-premium", name: "Pasta Térmica Premium Noctua NT-H2", price: 10, icon: "Sparkles" }
];

export const INITIAL_QUOTES = [
  {
    id: "COT-1001",
    date: "2026-07-24 10:15",
    customerName: "Carlos Mendoza",
    phone: "0998765432",
    device: "Laptop HP Omen 15",
    issue: "Calentamiento excesivo / Ruidos fuertes",
    total: 35,
    addons: ["Pasta Térmica Premium Noctua NT-H2"],
    status: "Pendiente",
    notes: "Ruidos metálicos al encender."
  },
  {
    id: "COT-1002",
    date: "2026-07-24 11:30",
    customerName: "María Fernanda Ríos",
    phone: "0981234567",
    device: "MacBook Air M1",
    issue: "No prende / Pantalla completamente negra",
    total: 60,
    addons: ["Servicio URGENTE Express 24h"],
    status: "En Proceso",
    notes: "Se apagó mientras trabajaba."
  },
  {
    id: "COT-1003",
    date: "2026-07-24 13:05",
    customerName: "Esteban Paredes",
    phone: "0976543210",
    device: "PC Escritorio Ryzen 7",
    issue: "Quiero aumentar velocidad SSD o memoria RAM",
    total: 45,
    addons: ["Respaldo previo de Archivos y Fotos"],
    status: "Finalizado",
    notes: "Instalar SSD 1TB NVMe Samsung."
  }
];
