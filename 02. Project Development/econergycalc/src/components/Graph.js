import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const EnergyConsumptionGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Energy Consumption (kWh)',
        data: [],
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useEffect(() => {
    axios.get('http://localhost:3030/api/appliances/energy-consumption-daily')
      .then(response => {
        const labels = response.data.map(entry => entry._id);
        const data = response.data.map(entry => entry.totalEnergyConsumed);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Energy Consumption (kWh)',
              data: data,
              backgroundColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching daily energy consumption:', error);
      });
  }, []);

  return (
    <div>
      <h2>Daily Energy Consumption</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default EnergyConsumptionGraph;
