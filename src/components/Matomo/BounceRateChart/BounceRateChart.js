import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchBounceRate } from "../../../api/stat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BounceRateChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const getBounceRate = async () => {
        const response = await fetchBounceRate();
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(sortedData);
      };

      getBounceRate();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Taux de rebond (%)",
        data: data.map((item) => item.bounce_rate),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Évolution du taux de rebond",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Taux de rebond (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BounceRateChart;
