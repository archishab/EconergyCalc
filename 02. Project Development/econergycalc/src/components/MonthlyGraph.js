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

const MonthlyEnergyConsumptionChart = () => {
  const [data, setData] = useState([]);
  const [monthlyConsumption, setMonthlyConsumption] = useState(Array(12).fill(0));
  const [currentYear, setCurrentYear] = useState(moment().year());
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3030/api/appliances/energy-consumption', {
        headers: {
          'auth-token': localStorage.getItem('token'), // Replace with actual token retrieval method
        },
      });
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const yearlyData = data.filter((entry) =>
        moment(entry.timestamp).year() === currentYear
      );
      
      const monthlyData = Array(12).fill(0);
      yearlyData.forEach((entry) => {
        const month = moment(entry.timestamp).month(); // 0 = January, 11 = December
        monthlyData[month] += entry.energyConsumed;
      });
      setMonthlyConsumption(monthlyData);
    }
  }, [currentYear, data]);

  const goToPreviousYear = () => setCurrentYear(currentYear - 1);
  const goToNextYear = () => setCurrentYear(currentYear + 1);

  const chartData = {
    labels: moment.months(),
    datasets: [
      {
        label: `${currentYear} Monthly Energy Consumption (kWh)`,
        data: monthlyConsumption,
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
        text: `Energy Consumption for ${currentYear}`,
      },
    },
  };

  return (
    <div>
      <h2>Monthly Energy Consumption</h2>
      <div className="yearly-total">
        <strong>Total Consumption for {currentYear}:</strong> 
        {monthlyConsumption.reduce((acc, val) => acc + val, 0).toFixed(2)} kWh
      </div>
      <button onClick={goToPreviousYear} >
        Previous Year
      </button>
      <button onClick={goToNextYear} disabled={loading || currentYear >= moment().year()}>
        Next Year
      </button>
      {!loading && data.length > 0 ? <Bar data={chartData} options={chartOptions} /> : <p>No data available</p>}
    </div>
  );
};

export default MonthlyEnergyConsumptionChart;
