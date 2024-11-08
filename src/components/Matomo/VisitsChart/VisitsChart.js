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
import { fetchDailyVisits } from "../../../api/stat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VisitsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const getVisitors = async () => {
        const response = await fetchDailyVisits();
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(sortedData);
      };

      getVisitors();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const totalVisits = data.reduce((sum, item) => sum + item.visits, 0);
  const avgVisits = totalVisits / data.length;

  const chartData = {
    labels: data.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: "Visites",
        data: data.map((item) => item.visits),
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
        text: "Visites quotidiennes",
      },
    },
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <p>Total des visites : {totalVisits}</p>
        <p>Moyenne des visites par jour : {avgVisits}</p>
      </div>
      <Line
        data={chartData}
        options={options}
        style={{ marginBottom: "30px" }}
      />
    </>
  );
};

export default VisitsChart;
