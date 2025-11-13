import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_DOWNTIME_REASONS, MOCK_ENERGY_DATA, MOCK_SUPPLIER_SCORES, MOCK_SHIFT_PERFORMANCE } from '../constants';
import Card from './ui/Card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsView: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Downtime Root Cause Analysis (Last 30 Days)">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={MOCK_DOWNTIME_REASONS} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="reason" width={100} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hours" name="Downtime Hours" fill="#8884d8">
                                {MOCK_DOWNTIME_REASONS.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Energy Consumption by Production Line (kWh)">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MOCK_ENERGY_DATA}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Plywood Press 1" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Veneer Lathe A" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Sawmill Line 3" stroke="#ffc658" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <Card title="Supplier Scorecard">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">On-Time Delivery (%)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Score (%)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Lead Time (Days)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {MOCK_SUPPLIER_SCORES.map((score, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{score.supplier}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score.onTimeDelivery}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score.qualityScore}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score.avgLeadTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card title="Shift Performance Comparison">
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={MOCK_SHIFT_PERFORMANCE} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="shift" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="oee" name="OEE (%)" fill="#006A4E" />
                        <Bar dataKey="unitsProduced" name="Units Produced" fill="#004E8A" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default AnalyticsView;
