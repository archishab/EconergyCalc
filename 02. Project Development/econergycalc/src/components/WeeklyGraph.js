// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';

// // ... (other imports and code)

// const EnergyConsumptionGraph = () => {
//     // Initialized as empty arrays, which will be populated with the fetched data
//     const [dailyChartData, setDailyChartData] = useState({
//       labels: [],
//       datasets: [],
//     });
//     const [monthlyChartData, setMonthlyChartData] = useState({
//       labels: [],
//       datasets: [],
//     });
  
//     useEffect(() => {
//       const fetchDailyData = axios.get('http://localhost:3030/api/appliances/energy-consumption-daily');
//       const fetchMonthlyData = axios.get('http://localhost:3030/api/appliances/energy-consumption-monthly');
  
//       Promise.all([fetchDailyData, fetchMonthlyData]).then((responses) => {
//         const [dailyResponse, monthlyResponse] = responses;
//         if (dailyResponse.data && Array.isArray(dailyResponse.data)) {
//           setDailyChartData(transformData(dailyResponse.data));
//         }
//         if (monthlyResponse.data && Array.isArray(monthlyResponse.data)) {
//           setMonthlyChartData(transformData(monthlyResponse.data));
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching energy consumption data:', error);
//       });
//     }, []);
  
//     // Helper function to transform the API response to chart data
//     const transformData = (consumptionData) => ({
//       labels: consumptionData.map((entry) => entry._id),
//       datasets: [
//         {
//           label: 'Total Energy Consumption (kWh)',
//           data: consumptionData.map((entry) => entry.totalEnergyConsumed),
//           backgroundColor: 'rgba(75,192,192,1)',
//         },
//       ],
//     });
  
//     return (
//       <div>
//         <h2>Daily Energy Consumption</h2>
//         <Bar data={dailyChartData} />
//         <h2>Monthly Energy Consumption</h2>
//         <Bar data={monthlyChartData} />
//       </div>
//     );
//   };
  
//   export default EnergyConsumptionGraph;
  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment'; // make sure to install moment if you haven't

const EnergyConsumptionGraph = () => {
  const [dailyData, setDailyData] = useState([]);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3030/api/appliances/energy-consumption-daily')
      .then(response => {
        setDailyData(response.data); // Assume the data is sorted by date
      })
      .catch(error => {
        console.error('Error fetching daily energy consumption:', error);
      });
  }, []);

  const generateWeekLabels = () => {
    // Find the current Sunday as the start of the week
    const startOfWeek = moment().startOf('isoWeek').add(currentWeekOffset * 7, 'days');
    const labels = [];
    for (let i = 0; i < 7; i++) {
      labels.push(startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'));
    }
    return labels;
  };

  const getWeekData = (weekLabels) => {
    return weekLabels.map(dateLabel => {
      const dataPoint = dailyData.find(entry => entry._id === dateLabel);
      return dataPoint ? dataPoint.totalEnergyConsumed : 0; // return 0 if no data for the date
    });
  };

  const weekLabels = generateWeekLabels();
  const weekData = getWeekData(weekLabels);

  const chartData = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Total Energy Consumption (kWh)',
        data: weekData,
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const handlePrevWeek = () => {
    setCurrentWeekOffset(prev => prev - 1); // Move to previous week
  };

  const handleNextWeek = () => {
    setCurrentWeekOffset(prev => prev + 1); // Move to next week
  };

  return (
    <div>
      <h2>Weekly Energy Consumption</h2>
      <Bar data={chartData} />
      <button onClick={handlePrevWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
    </div>
  );
};

export default EnergyConsumptionGraph;
