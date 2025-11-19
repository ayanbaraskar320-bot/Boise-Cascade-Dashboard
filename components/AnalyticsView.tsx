import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_DOWNTIME_REASONS, MOCK_ENERGY_DATA, MOCK_SUPPLIER_SCORES, MOCK_SHIFT_PERFORMANCE } from '../constants';
import Card from './ui/Card';
import { useTheme } from '../contexts/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsView: React.FC = () => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Downtime Root Cause Analysis (Last 30 Days)">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={MOCK_DOWNTIME_REASONS} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridColor} />
                            <XAxis type="number" tick={{ fill: tickColor }} />
                            <YAxis type="category" dataKey="reason" width={100} tick={{ fill: tickColor }} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend wrapperStyle={{ color: tickColor }} />
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
                            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                            <XAxis dataKey="name" tick={{ fill: tickColor }} />
                            <YAxis tick={{ fill: tickColor }} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend wrapperStyle={{ color: tickColor }} />
                            <Line type="monotone" dataKey="Plywood Press 1" stroke="#8884d8" />
                            <Line type="monotone" dataKey="Veneer Lathe A" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Sawmill Line 3" stroke="#ffc658" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <Card title="Supplier Scorecard">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Supplier</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">On-Time Delivery (%)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Quality Score (%)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Avg. Lead Time (Days)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {MOCK_SUPPLIER_SCORES.map((score, index) => (
                                <tr key={index} className="dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{score.supplier}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{score.onTimeDelivery}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{score.qualityScore}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{score.avgLeadTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card title="Shift Performance Comparison">
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={MOCK_SHIFT_PERFORMANCE} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="shift" tick={{ fill: tickColor }} />
                        <YAxis tick={{ fill: tickColor }} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Legend wrapperStyle={{ color: tickColor }} />
                        <Bar dataKey="oee" name="OEE (%)" fill="#006A4E" />
                        <Bar dataKey="unitsProduced" name="Units Produced" fill="#004E8A" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default AnalyticsView;