import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import SopView from './components/SopView';
import MaintenanceView from './components/MaintenanceView';
import InventoryView from './components/InventoryView';
import OrdersView from './components/OrdersView';
import ImageEditorView from './components/ImageEditorView';
import AnalyticsView from './components/AnalyticsView';
import PredictiveView from './components/PredictiveView';
import CapacityView from './components/CapacityView';
import TrainingView from './components/TrainingView';

export type View = 'dashboard' | 'sops' | 'maintenance' | 'inventory' | 'orders' | 'image-editor' | 'analytics' | 'predictive' | 'capacity' | 'training';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'sops':
        return <SopView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'inventory':
        return <InventoryView />;
      case 'orders':
        return <OrdersView />;
      case 'image-editor':
        return <ImageEditorView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'predictive':
        return <PredictiveView />;
      case 'capacity':
        return <CapacityView />;
      case 'training':
        return <TrainingView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-bc-gray font-sans text-gray-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-bc-gray p-4 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;