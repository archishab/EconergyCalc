import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// ... (other imports and code)

const EnergyConsumptionGraph = () => {
    // Initialized as empty arrays, which will be populated with the fetched data
    const [dailyChartData, setDailyChartData] = useState({
      labels: [],
      datasets: [],
    });
    const [monthlyChartData, setMonthlyChartData] = useState({
      labels: [],
      datasets: [],
    });
  
    useEffect(() => {
      const fetchDailyData = axios.get('http://localhost:3030/api/appliances/energy-consumption-daily');
      const fetchMonthlyData = axios.get('http://localhost:3030/api/appliances/energy-consumption-monthly');
  
      Promise.all([fetchDailyData, fetchMonthlyData]).then((responses) => {
        const [dailyResponse, monthlyResponse] = responses;
        if (dailyResponse.data && Array.isArray(dailyResponse.data)) {
          setDailyChartData(transformData(dailyResponse.data));
        }
        if (monthlyResponse.data && Array.isArray(monthlyResponse.data)) {
          setMonthlyChartData(transformData(monthlyResponse.data));
        }
      })
      .catch((error) => {
        console.error('Error fetching energy consumption data:', error);
      });
    }, []);
  
    // Helper function to transform the API response to chart data
    const transformData = (consumptionData) => ({
      labels: consumptionData.map((entry) => entry._id),
      datasets: [
        {
          label: 'Total Energy Consumption (kWh)',
          data: consumptionData.map((entry) => entry.totalEnergyConsumed),
          backgroundColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  
    return (
      <div>
        <h2>Daily Energy Consumption</h2>
        <Bar data={dailyChartData} />
        <h2>Monthly Energy Consumption</h2>
        <Bar data={monthlyChartData} />
      </div>
    );
  };
  
  export default EnergyConsumptionGraph;
  