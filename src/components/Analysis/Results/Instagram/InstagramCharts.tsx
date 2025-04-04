
import React from 'react';
import Card from '@/components/common/Card';
import { BarChart4 } from 'lucide-react';
import ToxicityPieChart from '../../Charts/ToxicityPieChart';
import ComparisonChart from '../../Charts/ComparisonChart';

interface InstagramChartsProps {
  toxicityData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  comparisonData: Array<{
    name: string;
    toxicity: number;
  }>;
}

const InstagramCharts: React.FC<InstagramChartsProps> = ({ toxicityData, comparisonData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <BarChart4 className="text-primary" size={20} />
          Comment Toxicity Distribution
        </h2>
        <div className="h-64">
          <ToxicityPieChart data={toxicityData} />
        </div>
      </Card>
      
      <Card variant="glass" className="p-6">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <BarChart4 className="text-primary" size={20} />
          Audio vs Comments Toxicity
        </h2>
        <div className="h-64">
          <ComparisonChart data={comparisonData} />
        </div>
      </Card>
    </div>
  );
};

export default InstagramCharts;
