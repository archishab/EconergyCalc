import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyGraph = () => {
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [loading, setLoading] = useState(false);

  const loadEnergyData = async (year) => {
    setLoading(true);
    setMonthlyData(Array(12).fill(0)); // Reset the monthly data

    try {
      const res = await axios.get('http://localhost:3030/api/appliances/energy-consumption', {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        params: {
          startDate: moment().year(year).startOf('year').toISOString(),
          endDate: moment().year(year).endOf('year').toISOString(),
        },
      });

      const fetchedData = res.data;
      const monthlyTotals = Array.from({ length: 12 }, () => 0);

      // Ensure data is for the correct year
      fetchedData.forEach((entry) => {
        if (moment(entry.timestamp).year() === year) {
          const month = moment(entry.timestamp).month(); // month is 0 indexed
          monthlyTotals[month] += entry.energyConsumed;
        }
      });

      setMonthlyData(monthlyTotals);
    } catch (err) {
      console.error('Error fetching energy data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnergyData(currentYear);
  }, [currentYear]);

  const goToPreviousYear = () => setCurrentYear(currentYear - 1);
  const goToNextYear = () => setCurrentYear(currentYear + 1);

  const chartData = {
    labels: moment.months(),
    datasets: [
      {
        label: `Total Energy Consumption for ${currentYear} (kWh)`,
        data: monthlyData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Energy (kWh)',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Monthly Energy Consumption for ${currentYear}`,
      },
    },
  };

  return (
    <div>
      <h2>Monthly Energy Consumption</h2>
      <button onClick={goToPreviousYear} disabled={loading}>Previous Year</button>
      <button onClick={goToNextYear} disabled={loading}>Next Year</button>
      {loading ? <p>Loading...</p> : <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default MonthlyGraph;
