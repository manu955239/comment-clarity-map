
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  audioToxicity: number;
  commentsToxicity: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ audioToxicity, commentsToxicity }) => {
  const data = [
    {
      name: 'Toxicity Comparison',
      'Audio Toxicity': audioToxicity * 100,
      'Comments Toxicity': commentsToxicity * 100,
    }
  ];
  
  return (
    <div className="w-full h-64 mt-6 animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={60}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            label={{ 
              value: 'Toxicity %', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
            domain={[0, 100]} 
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(1)}%`, null]}
            contentStyle={{ 
              borderRadius: '0.5rem', 
              background: 'white', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
            }} 
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey="Audio Toxicity" fill="hsl(var(--primary))" animationDuration={1500} />
          <Bar dataKey="Comments Toxicity" fill="hsl(var(--toxic))" animationDuration={1500} animationBegin={300} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
