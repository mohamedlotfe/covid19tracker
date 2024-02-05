import React from 'react';
import GlobalCasesChart, { CovidDataEntry } from './GlobalCasesChart';

interface GlobalCasesStatisticsCardProps {
  data: CovidDataEntry[];
}

const GlobalCasesStatisticsCard: React.FC<GlobalCasesStatisticsCardProps> = ({ data }) => {
  return (
    <div>
      <h2>Global Cases Statistics</h2>
      <GlobalCasesChart data={data} />
    </div>
  );
};

export default GlobalCasesStatisticsCard;