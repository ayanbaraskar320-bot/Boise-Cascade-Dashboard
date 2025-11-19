import React, { useState } from 'react';
import Card from './ui/Card';
import OeeGaugeChart from './charts/OeeGaugeChart';
import ProductionTrendChart from './charts/ProductionTrendChart';
import { OeeData, TicketStatus, ProductionData, MaintenanceTicket, InventoryItem } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { PencilIcon, DownloadIcon } from './icons/IconComponents';
import { exportToCsv } from '../utils/exportUtils';

interface DashboardViewProps {
    oeeData: OeeData[];
    setOeeData: React.Dispatch<React.SetStateAction<OeeData[]>>;
    productionTrend: ProductionData[];
    maintenanceTickets: MaintenanceTicket[];
    rawMaterials: InventoryItem[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ oeeData, setOeeData, productionTrend, maintenanceTickets, rawMaterials }) => {
    const [isOeeModalOpen, setIsOeeModalOpen] = useState(false);
    const [currentMachine, setCurrentMachine] = useState<OeeData | null>(null);
    const [newOeeMetrics, setNewOeeMetrics] = useState({ availability: 0, performance: 0, quality: 0 });

    const activeAlerts = maintenanceTickets.filter(t => t.status !== TicketStatus.Resolved);
    const lowInventoryItems = rawMaterials.filter(i => (i.currentStock / i.targetStock) < 0.5);

    const openOeeModal = (machine: OeeData) => {
        setCurrentMachine(machine);
        setNewOeeMetrics({
            availability: machine.availability,
            performance: machine.performance,
            quality: machine.quality,
        });
        setIsOeeModalOpen(true);
    };

    const handleOeeMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = Math.max(0, Math.min(100, Number(value))); // Clamp between 0-100
        setNewOeeMetrics(prev => ({ ...prev, [name]: numValue }));
    };

    const handleOeeUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMachine) return;
        
        const { availability, performance, quality } = newOeeMetrics;
        const newOeeScore = Math.round((availability / 100) * (performance / 100) * (quality / 100) * 100);

        setOeeData(prevData => prevData.map(machine => 
            machine.name === currentMachine.name 
                ? { ...machine, availability, performance, quality, oee: newOeeScore } 
                : machine
        ));
        
        setIsOeeModalOpen(false);
        setCurrentMachine(null);
    };

    const handleExportOee = () => {
        exportToCsv(oeeData, `oee_data_${new Date().toISOString().split('T')[0]}.csv`);
    };


    return (
        <>
            <div className="space-y-8">
                <div className="flex justify-end mb-4">
                    <Button onClick={handleExportOee} variant="secondary">
                       <div className="flex items-center gap-2">
                         <DownloadIcon />
                         <span>Export OEE Data</span>
                       </div>
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {oeeData.map(data => (
                        <Card key={data.name} title={data.name} className="relative group">
                            <OeeGaugeChart value={data.oee} name="OEE" />
                             <div className="absolute top-2 right-2">
                               <button onClick={() => openOeeModal(data)} className="p-2 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 focus:opacity-100 focus:ring-2 focus:ring-bc-blue dark:bg-gray-700 dark:hover:bg-gray-600">
                                   <PencilIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                               </button>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card title="Weekly Production Trend">
                            <ProductionTrendChart data={productionTrend} />
                        </Card>
                    </div>
                    <div className="space-y-6">
                         <Card title="Active Maintenance Alerts">
                            <ul className="space-y-2">
                                {activeAlerts.map(ticket => (
                                    <li key={ticket.id} className="text-sm p-2 bg-amber-100 text-amber-800 rounded-md animate-fade-in dark:bg-amber-900/50 dark:text-amber-200">
                                        <span className="font-semibold">{ticket.machine}:</span> {ticket.issue}
                                    </li>
                                ))}
                                {activeAlerts.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No active alerts.</p>}
                            </ul>
                        </Card>
                        <Card title="Low Inventory">
                            <ul className="space-y-2">
                                {lowInventoryItems.map(item => (
                                    <li key={item.id} className="text-sm p-2 bg-red-100 text-red-800 rounded-md animate-fade-in dark:bg-red-900/50 dark:text-red-200">
                                        <span className="font-semibold">{item.name}</span> is low.
                                    </li>
                                ))}
                                {lowInventoryItems.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">All inventory levels are stable.</p>}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOeeModalOpen} onClose={() => setIsOeeModalOpen(false)} title={`Update OEE for ${currentMachine?.name}`}>
                <form onSubmit={handleOeeUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability (%)</label>
                        <input type="number" name="availability" id="availability" value={newOeeMetrics.availability} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                    </div>
                     <div>
                        <label htmlFor="performance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Performance (%)</label>
                        <input type="number" name="performance" id="performance" value={newOeeMetrics.performance} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                    </div>
                     <div>
                        <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quality (%)</label>
                        <input type="number" name="quality" id="quality" value={newOeeMetrics.quality} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="secondary" onClick={() => setIsOeeModalOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit">Update Metrics</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default DashboardView;