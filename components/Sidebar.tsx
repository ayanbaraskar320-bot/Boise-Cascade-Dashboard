import React from 'react';
import { DashboardIcon, DocumentIcon, WrenchIcon, BoxIcon, TruckIcon, ImageIcon, AnalyticsIcon, TrendingUpIcon, CapacityIcon, BookOpenIcon } from './icons/IconComponents';
import { View } from '../App';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isNew?: boolean;
}> = ({ icon, label, isActive, onClick, isNew = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-bc-green text-white' : 'text-white hover:bg-white/20'
    }`}
  >
    {icon}
    <span className="ml-4 flex-1 text-left">{label}</span>
     {isNew && <span className="ml-auto text-xs bg-yellow-400 text-yellow-900 font-bold px-2 py-0.5 rounded-full">NEW</span>}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, isNew: true },
    { id: 'predictive', label: 'Predictions', icon: <TrendingUpIcon />, isNew: true },
    { id: 'sops', label: 'SOPs', icon: <DocumentIcon /> },
    { id: 'maintenance', label: 'Maintenance', icon: <WrenchIcon /> },
    { id: 'inventory', label: 'Inventory', icon: <BoxIcon /> },
    { id: 'orders', label: 'Supplier Orders', icon: <TruckIcon /> },
    { id: 'capacity', label: 'Capacity', icon: <CapacityIcon />, isNew: true },
    { id: 'image-editor', label: 'Image Editor', icon: <ImageIcon /> },
    { id: 'training', label: 'Training', icon: <BookOpenIcon />, isNew: true },
  ];

  return (
    <div className="relative flex flex-col flex-shrink-0 w-64 h-full bg-bc-blue text-white transition-width duration-300">
      <div className="flex items-center justify-center h-20 border-b border-white/20">
        <img src="https://www.bc.com/wp-content/uploads/2021/04/Boise-Cascade-Primary-Logo-White-2048x443.png" alt="Boise Cascade" className="h-8 object-contain" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id as View)}
            isNew={item.isNew}
          />
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <p className="text-xs text-center text-white/70">&copy; 2024 Boise Cascade</p>
      </div>
    </div>
  );
};

export default Sidebar;
