"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  data: number[];
}

export default function BarChart({ labels, data }: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Quantidade",
        data,
        background: ["#D94f5A", "#FCDCE"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Presentes Disponíveis x Escolhidos",
      },
    },
  };
  return <Bar data={chartData} options={options} />;
}
