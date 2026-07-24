import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { TabServices } from './components/TabServices';
import { TabCalculator } from './components/TabCalculator';
import { TabAdmin } from './components/TabAdmin';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const DashboardContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {activeTab === 'servicios' && <TabServices />}
      {activeTab === 'cotizador' && <TabCalculator />}
      {activeTab === 'admin' && <TabAdmin />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
        <Navbar />
        <Toast />
        <div className="flex-grow">
          <DashboardContent />
        </div>
        <FloatingWhatsApp />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
