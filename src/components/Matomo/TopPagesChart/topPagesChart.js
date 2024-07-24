import React, { useEffect, useState } from "react";
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
import { fetchTopPages } from "../../../api/stat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopPagesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const getTopPages = async () => {
        const response = await fetchTopPages();
        setData(response.data);
      };

      getTopPages();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getRelativePath = (url) => {
    const path = url.replace("xn--clatdebeaut-99al.fr", "").replace(/^\//, "");
    return path || "/";
  };

  const chartData = {
    labels: data.map((item) => getRelativePath(item.page_name)),
    datasets: [
      {
        label: "Nombre de vues",
        data: data.map((item) => item.page_views),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Cette option rend le graphique horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 10 des pages les plus vues",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.x; // Changement de y à x
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Nombre de vues",
        },
      },
      y: {
        title: {
          display: true,
          text: "Page",
        },
      },
    },
  };

  return (
    <Bar data={chartData} options={options} style={{ marginBottom: "30px" }} />
  );
};

export default TopPagesChart;
