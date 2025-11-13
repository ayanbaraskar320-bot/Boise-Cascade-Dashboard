import React from 'react';
import Card from './ui/Card';
import { MOCK_MAINTENANCE_PREDICTIONS, MOCK_DEMAND_FORECAST } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PredictiveView: React.FC = () => {

    const getRiskColor = (risk: number) => {
        if (risk > 75) return 'text-red-600';
        if (risk > 50) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className="space-y-8">
            <Card title="Predictive Maintenance Alerts">
                <ul className="space-y-3">
                    {MOCK_MAINTENANCE_PREDICTIONS.map((pred, index) => (
                        <li key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="font-bold text-gray-800">{pred.machine}</p>
                                <p className="text-sm text-gray-600">Predicted Issue: <span className="font-semibold">{pred.predictedFailure}</span></p>
                            </div>
                            <div className="text-right">
                                <p className={`text-2xl font-bold ${getRiskColor(pred.riskScore)}`}>{pred.riskScore}%</p>
                                <p className="text-xs text-gray-500">Failure Risk (Next 7 Days)</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Customer Demand Forecast">
                    <ResponsiveContainer width="100%" height={300}>
                         <AreaChart data={MOCK_DEMAND_FORECAST} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="historical" stackId="1" stroke="#8884d8" fill="#8884d8" name="Historical Demand" />
                            <Area type="monotone" dataKey="forecast" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Forecasted Demand" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
                 <div className="space-y-8">
                    <Card title="Supplier Delay Warnings">
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
                           <p className="font-bold text-yellow-800">Potential Delay Alert</p>
                           <p className="text-sm text-yellow-700">High port congestion may impact shipments from <span className="font-semibold">Hardwood Co.</span> Expected delay: 2-3 days.</p>
                        </div>
                    </Card>
                     <Card title="Energy Optimization Suggestions">
                         <div className="p-4 bg-blue-100 border-l-4 border-blue-500">
                           <p className="font-bold text-blue-800">AI Suggestion</p>
                           <p className="text-sm text-blue-700">Reduce idle time on <span className="font-semibold">Sawmill Line 3</span> between 2 AM - 4 AM to save an estimated 50 kWh daily.</p>
                        </div>
                    </Card>
                 </div>
            </div>
        </div>
    );
};

export default PredictiveView;
