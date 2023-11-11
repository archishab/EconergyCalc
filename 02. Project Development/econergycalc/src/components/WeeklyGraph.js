import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment"; // Make sure to install moment for date manipulation

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyGraph = () => {
  const [weekData, setWeekData] = useState({});
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week"));

  const loadEnergyData = async (startOfWeek, endOfWeek) => {
    try {
      const res = await axios.get(
        "http://localhost:3030/api/appliances/energy-consumption-daily",
        {
          headers: {
            "auth-token": localStorage.getItem("token"), // Replace with actual token retrieval method
          },
          params: {
            startDate: startOfWeek.toISOString(),
            endDate: endOfWeek.toISOString(),
          },
        }
      );
      const fetchedData = res.data;

      // Process and aggregate data by day of the week
      const dataByDay = fetchedData.reduce((acc, curr) => {
        const day = moment(curr.timestamp).format("YYYY-MM-DD"); // Format the date
        acc[day] = (acc[day] || 0) + curr.energyConsumed;
        return acc;
      }, {});

      setWeekData(dataByDay);
    } catch (err) {
      console.error("Error fetching energy data", err);
    }
  };

  const goToNextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, "weeks"));
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek.clone().subtract(1, "weeks"));
  };

  useEffect(() => {
    const startOfWeek = currentWeek.clone().startOf("week");
    const endOfWeek = currentWeek.clone().endOf("week");
    loadEnergyData(startOfWeek, endOfWeek);
  }, [currentWeek]);

  const labels = [];
  for (let i = 0; i < 7; i++) {
    labels.push(currentWeek.clone().add(i, "days").format("YYYY-MM-DD")); // Format the date
  }

  const chartData = {
    labels, // Use the actual dates as labels
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: labels.map((label) => weekData[label] || 0), // Fill in data for each date or default to 0
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Energy (kWh)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Weekly Energy Consumption</h2>
      <button onClick={goToPreviousWeek}>Previous Week</button>
      <button onClick={goToNextWeek}>Next Week</button>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeeklyGraph;
