import React from 'react';
import { View } from '../App';

interface HeaderProps {
  activeView: View;
}

const Header: React.FC<HeaderProps> = ({ activeView }) => {
  const viewTitles: Record<View, string> = {
    dashboard: 'Operations Dashboard',
    sops: 'Standard Operating Procedures',
    maintenance: 'Maintenance Log',
    inventory: 'Inventory Management',
    orders: 'Supplier Orders',
    'image-editor': 'AI Image Editor',
    analytics: 'Advanced Analytics',
    predictive: 'Predictive Insights',
    capacity: 'Capacity Optimization',
    training: 'Training & Support',
  };
  
  const title = viewTitles[activeView] || 'Operations Dashboard';

  return (
    <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-green-700">Live Data</span>
            </div>
            <div className="relative">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </button>
            </div>
            <div className="flex items-center">
                <img className="w-10 h-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User" />
                <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-800">Operator</p>
                    <p className="text-xs text-gray-500">Shift Lead</p>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
