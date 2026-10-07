import { useState } from 'react';
import { Navbar, AppView } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { PredictionSection } from '@/components/sections/PredictionSection';
import { KitchenFeed } from '@/components/sections/KitchenFeed';
import { Dashboard } from '@/components/sections/Dashboard';
import { Dataset } from '@/components/sections/Dataset';
import { WasteComparison } from '@/components/sections/WasteComparison';
import { Insights } from '@/components/sections/Insights';
import { Model } from '@/components/sections/Model';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/sections/Footer';
import { KitchenTicketModal } from '@/components/KitchenTicketModal';
import { AddLogModal } from '@/components/AddLogModal';
import { Toast } from '@/components/Toast';

import { initialDataset } from '@/lib/data';
import { DataPoint, KitchenTicket, PresetScenario } from '@/types/campus';

const sampleTickets: KitchenTicket[] = [
  {
    ticketId: 'CC-8421',
    timestamp: '08:30 AM',
    outlet: 'Central Canteen',
    item: 'Hyderabadi Chicken Biryani',
    recommendedPrep: 165,
    predictedDemand: 158,
    buffer: 7,
    expectedStudents: 420,
    weather: 'Sunny',
    academicDay: 'Normal',
    status: 'Ready',
  },
  {
    ticketId: 'CC-8422',
    timestamp: '09:15 AM',
    outlet: 'Yuba Cafe',
    item: 'Chicken Kathi Roll',
    recommendedPrep: 140,
    predictedDemand: 134,
    buffer: 6,
    expectedStudents: 450,
    weather: 'Sunny',
    academicDay: 'Normal',
    status: 'Preparing',
  },
  {
    ticketId: 'CC-8423',
    timestamp: '10:00 AM',
    outlet: 'Al Ameens Food Court',
    item: 'Butter Chicken with Naan',
    recommendedPrep: 110,
    predictedDemand: 104,
    buffer: 6,
    expectedStudents: 380,
    weather: 'Rainy',
    academicDay: 'Normal',
    status: 'Queued',
  },
];

function App() {
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [activePreset, setActivePreset] = useState<PresetScenario | null>(null);
  const [dataset, setDataset] = useState<DataPoint[]>(initialDataset);
  const [tickets, setTickets] = useState<KitchenTicket[]>(sampleTickets);
  const [modalTicket, setModalTicket] = useState<KitchenTicket | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navigateTo = (view: AppView, targetSection?: string) => {
    setActiveView(view);
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDispatchTicket = (ticket: KitchenTicket) => {
    setTickets((prev) => [ticket, ...prev]);
    triggerToast(`Dispatched Order ${ticket.ticketId} (${ticket.recommendedPrep} ${ticket.item} plates) to Kitchen!`);
  };

  const handleAddLog = (newLog: DataPoint) => {
    setDataset((prev) => [newLog, ...prev]);
    triggerToast(`New log entry added for ${newLog.item} on ${newLog.date}!`);
  };

  return (
    <div className="min-h-screen bg-peach-100 text-ink antialiased">
      {activeView !== 'landing' && <Navbar activeView={activeView} onNavigate={navigateTo} />}

      <main className={activeView !== 'landing' ? 'pt-20' : ''}>
        {/* View 1: Landing Page (No top Navbar) */}
        {activeView === 'landing' && (
          <>
            <Hero
              onNavigatePredict={() => navigateTo('predict', 'predict')}
              onNavigateDashboard={() => navigateTo('predict', 'dashboard')}
            />
            <Problem />
            <Solution />
            <Insights />
            <About />
          </>
        )}

        {/* View 2: Single Unified Predict Demand & Analytics Dashboard Page (With Navbar) */}
        {(activeView === 'predict' || activeView === 'dashboard') && (
          <>
            <PredictionSection
              presetScenario={activePreset}
              onDispatchTicket={handleDispatchTicket}
              onOpenTicketModal={(t) => setModalTicket(t)}
            />
            <KitchenFeed
              tickets={tickets}
              onOpenTicket={(t) => setModalTicket(t)}
            />
            <Dashboard />
          </>
        )}

        {/* View 4: Dataset Logs Page (With Navbar) */}
        {activeView === 'dataset' && (
          <Dataset
            data={dataset}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {/* View 5: Waste Calculator Page (With Navbar) */}
        {activeView === 'calculator' && <WasteComparison />}

        {/* View 6: ML Architecture Model Page (With Navbar) */}
        {activeView === 'model' && <Model />}
      </main>

      <Footer />

      <KitchenTicketModal
        ticket={modalTicket}
        onClose={() => setModalTicket(null)}
      />

      <AddLogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLog={handleAddLog}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;
