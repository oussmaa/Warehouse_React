// Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js'
import ApiUrls from '../../API/apiUrls';
import Globalestock from '../../Entity/Globalestock';
import ApiService from '../../Service/ApiService';
  
 
const Main: React.FC = () => {
    const [stockData, setStockData] = useState<Globalestock[]>([]);
  
    // Fetch function to get globalestocks
    const fetchGlobalestocks = async (): Promise<Globalestock[]> => {
      try {
        const response = await ApiService.GetListGlobalStock(ApiUrls.GLOBALSTOCK);
        return response;
      } catch (err) {
        console.log("Error fetching data: " + err);
        throw err;
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchGlobalestocks();
        setStockData(data);
      };
      fetchData();
    }, []);
  
    const locations = Array.from(new Set(stockData.map(item => `${item.locationArea} - ${item.locationBin} - ${item.locationPlace}`)));
    const articles = Array.from(new Set(stockData.map(item => item.articleID)));
  
    const datasets = articles.map(article => {
      return {
        label: article,
        data: locations.map(location => {
          const filteredData = stockData.filter(item => {
            const locationLabel = `${item.locationArea} - ${item.locationBin} - ${item.locationPlace}`;
            return item.articleID === article && location === locationLabel;
          });
          const totalQuantity = filteredData.reduce((sum, item) => sum + item.openingQuantity, 0);
          return totalQuantity;
        }),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 1,
      };
    });
  
    const chartData: ChartData<'bar'> = {
      labels: locations,
      datasets,
    };
  
    const options: ChartOptions<'bar'> = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    const chartDatapie: ChartData<'line'> = {
      labels: locations,
      datasets,
    };
  
    const optionspie: ChartOptions<'line'> = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    return (
      <div style={{ padding: '20px' }}>
        <h1>Stock Management Dashboard</h1>
        <Bar data={chartData} options={options} />
        <br/>
        <Line data={chartDatapie} options={optionspie} ></Line>
      </div>
    );
  };
  export default Main;
