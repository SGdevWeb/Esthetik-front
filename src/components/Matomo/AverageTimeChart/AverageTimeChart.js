import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchAverageTime } from "../../../api/stat";

const AverageTimeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const getAverageTime = async () => {
        const response = await fetchAverageTime();
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(sortedData);
      };

      getAverageTime();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Temps moyen passé (secondes)",
        data: data.map((item) => item.avg_time),
        borderColor: "rgb(75, 192, 192)",
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
        text: "Évolution du temps moyen passé sur le site",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Temps (secondes)",
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

  return (
    <Line data={chartData} options={options} style={{ marginBottom: "30px" }} />
  );
};

export default AverageTimeChart;
