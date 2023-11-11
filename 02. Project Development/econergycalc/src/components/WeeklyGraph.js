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

const WeeklyEnergyConsumptionChart = () => {
  const [yearlyData, setYearlyData] = useState([]); // Store the data for the whole year
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf('isoWeek'));
  const [loading, setLoading] = useState(false);

  const fetchYearlyData = async () => {
    setLoading(true);
    const startOfYear = moment().startOf('year').toISOString();
    const endOfYear = moment().endOf('year').toISOString();

    try {
      const res = await axios.get('http://localhost:3030/api/appliances/energy-consumption', {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        params: { startDate: startOfYear, endDate: endOfYear },
      });
      setYearlyData(res.data); // Store the data in state
    } catch (err) {
      console.error('Error fetching energy data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYearlyData();
  }, []);

  // Filter the yearly data for the selected week and sum the daily consumption
  const getWeeklyData = () => {
    const startOfWeek = selectedWeek.clone().startOf('isoWeek');
    const endOfWeek = selectedWeek.clone().endOf('isoWeek');

    return yearlyData.filter((data) => {
      const dataDate = moment(data.timestamp);
      return dataDate.isSameOrAfter(startOfWeek) && dataDate.isSameOrBefore(endOfWeek);
    }).reduce((acc, curr) => {
      const dayOfWeek = moment(curr.timestamp).day();
      acc[dayOfWeek] = (acc[dayOfWeek] || 0) + curr.energyConsumed;
      return acc;
    }, Array(7).fill(0));
  };

  const goToPreviousWeek = () => setSelectedWeek(selectedWeek.clone().subtract(1, 'weeks'));
  const goToNextWeek = () => setSelectedWeek(selectedWeek.clone().add(1, 'weeks'));

  const weeklyData = getWeeklyData();
  const weeklyTotal = weeklyData.reduce((sum, daily) => sum + daily, 0);
  const labels = Array.from({ length: 7 }, (_, i) =>
    selectedWeek.clone().startOf('isoWeek').add(i, 'days').format('YYYY-MM-DD')
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Energy Consumption (kWh)',
        data: weeklyData,
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
        text: `Weekly Energy Consumption (Starting ${selectedWeek.format('YYYY-MM-DD')})`,
      },
    },
  };

  return (
    <div>
      <h2>Weekly Energy Consumption</h2>
      <div className="weekly-total">
        <strong>Total Consumption for the Week:</strong> {weeklyTotal.toFixed(2)} kWh
      </div>
      <button onClick={goToPreviousWeek} disabled={loading}>Previous Week</button>
      <button onClick={goToNextWeek} disabled={loading}>Next Week</button>
      {loading ? <p>Loading...</p> : <Bar data={chartData} options={chartOptions} />}
    </div>
  );
};

export default WeeklyEnergyConsumptionChart;
