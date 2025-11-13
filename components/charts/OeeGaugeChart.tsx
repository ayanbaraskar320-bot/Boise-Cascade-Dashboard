import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface OeeGaugeChartProps {
  value: number;
  name: string;
}

const OeeGaugeChart: React.FC<OeeGaugeChartProps> = ({ value, name }) => {
  const data = [{ name, value, fill: '#006A4E' }];

  return (
    <div className="relative w-full h-48 text-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
          barSize={20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            angleAxisId={0}
            // FIX: Removed redundant `data` prop which was causing a type error.
            // The data is inherited from the parent RadialBarChart component.
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-10px]">
        <p className="text-3xl font-bold text-bc-green">{`${value}%`}</p>
        <p className="text-sm text-gray-500">{name}</p>
      </div>
    </div>
  );
};

export default OeeGaugeChart;