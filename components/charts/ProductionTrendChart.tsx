import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProductionData } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface ProductionTrendChartProps {
  data: ProductionData[];
}

const ProductionTrendChart: React.FC<ProductionTrendChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis dataKey="day" tick={{ fill: tickColor }} />
        <YAxis tick={{ fill: tickColor }} />
        <Tooltip
            contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            }}
        />
        <Legend wrapperStyle={{ color: tickColor }} />
        <Line type="monotone" dataKey="production" stroke="#006A4E" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductionTrendChart;