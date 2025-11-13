import React, { useState, useEffect } from 'react';
import { MOCK_OEE_DATA, MOCK_PRODUCTION_TREND, MOCK_MAINTENANCE_TICKETS, MOCK_RAW_MATERIALS } from '../constants';
import Card from './ui/Card';
import OeeGaugeChart from './charts/OeeGaugeChart';
import ProductionTrendChart from './charts/ProductionTrendChart';
import { OeeData, TicketStatus, ProductionData, MaintenanceTicket, InventoryItem } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { PencilIcon } from './icons/IconComponents';

const DashboardView: React.FC = () => {
    const [oeeData, setOeeData] = useState<OeeData[]>(MOCK_OEE_DATA);
    const [productionTrend, setProductionTrend] = useState<ProductionData[]>(MOCK_PRODUCTION_TREND);
    const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>(MOCK_MAINTENANCE_TICKETS);
    const [rawMaterials, setRawMaterials] = useState<InventoryItem[]>(MOCK_RAW_MATERIALS);
    
    const [isOeeModalOpen, setIsOeeModalOpen] = useState(false);
    const [currentMachine, setCurrentMachine] = useState<OeeData | null>(null);
    const [newOeeMetrics, setNewOeeMetrics] = useState({ availability: 0, performance: 0, quality: 0 });

    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate OEE data fluctuations
            setOeeData(prevData => prevData.map(machine => {
                const newAvailability = clamp(machine.availability + (Math.random() - 0.5) * 2, 80, 98);
                const newPerformance = clamp(machine.performance + (Math.random() - 0.5) * 2, 85, 99);
                const newQuality = clamp(machine.quality + (Math.random() - 0.5) * 1, 95, 100);
                const newOee = Math.round((newAvailability / 100) * (newPerformance / 100) * (newQuality / 100) * 100);
                return { ...machine, availability: parseFloat(newAvailability.toFixed(1)), performance: parseFloat(newPerformance.toFixed(1)), quality: parseFloat(newQuality.toFixed(1)), oee: newOee };
            }));

            // Simulate production trend updates
            setProductionTrend(prevTrend => {
                const lastDataPoint = prevTrend[prevTrend.length - 1];
                const newProduction = clamp(lastDataPoint.production + (Math.random() - 0.45) * 500, 2000, 8000);
                const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                const lastDayIndex = dayNames.indexOf(lastDataPoint.day);
                const newDay = dayNames[(lastDayIndex + 1) % 7];
                const newTrend = [...prevTrend.slice(1), { day: newDay, production: Math.round(newProduction) }];
                return newTrend;
            });

            // Simulate maintenance ticket updates
            if (Math.random() > 0.85) { // 15% chance each tick
                setMaintenanceTickets(prevTickets => {
                    const mutableTickets = JSON.parse(JSON.stringify(prevTickets));
                    const action = Math.random();
                    if (action < 0.5 && mutableTickets.some((t: MaintenanceTicket) => t.status === TicketStatus.Open)) {
                        const openIndex = mutableTickets.findIndex((t: MaintenanceTicket) => t.status === TicketStatus.Open);
                        if(openIndex !== -1) mutableTickets[openIndex].status = TicketStatus.InProgress;
                    } else {
                        const machines = MOCK_OEE_DATA.map(m => m.name);
                        const randomMachine = machines[Math.floor(Math.random() * machines.length)];
                        const issues = ["Hydraulic leak", "Conveyor belt slipping", "Blade alignment off", "Overheating", "Sensor malfunction"];
                        const randomIssue = issues[Math.floor(Math.random() * issues.length)];
                        const newTicket: MaintenanceTicket = {
                            id: `TKT${Date.now().toString().slice(-4)}`, machine: randomMachine, issue: randomIssue,
                            reportedBy: "System", status: TicketStatus.Open, date: new Date().toISOString().split('T')[0],
                        };
                        return [newTicket, ...mutableTickets].slice(0, 5);
                    }
                    return mutableTickets;
                });
            }

            // Simulate inventory level changes
            setRawMaterials(prevMaterials => {
                const randomIndex = Math.floor(Math.random() * prevMaterials.length);
                return prevMaterials.map((item, index) => {
                    if (index === randomIndex) {
                        const change = (Math.random() - 0.4) * (item.targetStock * 0.05);
                        const newStock = clamp(item.currentStock + change, 0, item.targetStock);
                        return { ...item, currentStock: Math.round(newStock) };
                    }
                    return item;
                });
            });

        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

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


    return (
        <>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {oeeData.map(data => (
                        <Card key={data.name} title={data.name} className="relative group">
                            <OeeGaugeChart value={data.oee} name="OEE" />
                             <div className="absolute top-2 right-2">
                               <button onClick={() => openOeeModal(data)} className="p-2 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 focus:opacity-100 focus:ring-2 focus:ring-bc-blue">
                                   <PencilIcon className="w-4 h-4 text-gray-600" />
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
                                    <li key={ticket.id} className="text-sm p-2 bg-amber-100 rounded-md animate-fade-in">
                                        <span className="font-semibold">{ticket.machine}:</span> {ticket.issue}
                                    </li>
                                ))}
                                {activeAlerts.length === 0 && <p className="text-sm text-gray-500">No active alerts.</p>}
                            </ul>
                        </Card>
                        <Card title="Low Inventory">
                            <ul className="space-y-2">
                                {lowInventoryItems.map(item => (
                                    <li key={item.id} className="text-sm p-2 bg-red-100 rounded-md animate-fade-in">
                                        <span className="font-semibold">{item.name}</span> is low.
                                    </li>
                                ))}
                                {lowInventoryItems.length === 0 && <p className="text-sm text-gray-500">All inventory levels are stable.</p>}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOeeModalOpen} onClose={() => setIsOeeModalOpen(false)} title={`Update OEE for ${currentMachine?.name}`}>
                <form onSubmit={handleOeeUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability (%)</label>
                        <input type="number" name="availability" id="availability" value={newOeeMetrics.availability} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                    </div>
                     <div>
                        <label htmlFor="performance" className="block text-sm font-medium text-gray-700">Performance (%)</label>
                        <input type="number" name="performance" id="performance" value={newOeeMetrics.performance} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                    </div>
                     <div>
                        <label htmlFor="quality" className="block text-sm font-medium text-gray-700">Quality (%)</label>
                        <input type="number" name="quality" id="quality" value={newOeeMetrics.quality} onChange={handleOeeMetricChange} min="0" max="100" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
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