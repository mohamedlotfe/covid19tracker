import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export interface CovidDataEntry {
  id: string;
  country: string;
  deceased: number;
  historyData: string;
  infected: number;
  lastUpdatedApify: string;
  lastUpdatedSource?: string | null;
  moreData: string;
  recovered: string | null;
  sourceUrl: string;
  tested: string | null;
}

interface GlobalCasesChartProps {
  data: CovidDataEntry[];
}

const GlobalCasesChart: React.FC<GlobalCasesChartProps> = ({ data }) => {
  const [chart, setChart] = useState<Chart<"bar"> | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const ctx = document.getElementById(
        "globalCasesChart"
      ) as HTMLCanvasElement;
      if (ctx) {
        chart?.destroy();
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map((entry) => entry.country),
            datasets: [
              {
                label: "Infected",
                data: data.map((entry) => entry.infected),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "recovered",
                data: data.map((entry) => Number(entry.recovered || 0)),
                backgroundColor: "rgba(0, 128, 0, 0.34)",
                borderColor: "rgba(0, 128, 0, 1)",
                borderWidth: 1,
              },
              {
                label: "deceased",
                data: data.map((entry) => Number(entry.deceased || 0)),
                backgroundColor: "rgba(0,0,255, 0.2)",
                borderColor: "rgba(0,0,255, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setChart(newChart);
      }
    }
  }, [data]);

  return <canvas id="globalCasesChart" width={400} height={100}></canvas>;
};

export default GlobalCasesChart;
