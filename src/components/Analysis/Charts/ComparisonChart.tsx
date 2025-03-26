
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface ComparisonChartProps {
  data: Array<{
    name: string;
    toxicity: number;
  }>;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Toxicity Score', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Toxicity']} />
        <Legend />
        <Bar dataKey="toxicity" fill="#8884d8" name="Toxicity Score" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
