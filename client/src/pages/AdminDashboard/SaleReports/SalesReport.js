import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { reportService } from '../../../api';

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('month'); // month, week, year
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
    averageOrderValue: 0,
    totalOrders: 0,
    topSellingItems: []
  });

  const fetchSalesData = React.useCallback(async () => {
    try {
      setLoading(true);
      let startDate = new Date();
      let endDate = new Date();

      switch (dateRange) {
        case 'week':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          startDate.setMonth(startDate.getMonth() - 1);
      }

      const data = await reportService.getSalesReport(startDate, endDate);
      setSalesData(data.salesData);
      setSummaryStats(data.summary);
      setError(null);
    } catch (err) {
      setError('Error fetching sales data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  if (loading) return <div className="p-4">Loading sales data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Report</h1>
        <div className="space-x-2">
          <button
            onClick={() => setDateRange('week')}
            className={`px-4 py-2 rounded ${
              dateRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setDateRange('month')}
            className={`px-4 py-2 rounded ${
              dateRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setDateRange('year')}
            className={`px-4 py-2 rounded ${
              dateRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Revenue</h3>
          <p className="text-2xl">${summaryStats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Profit</h3>
          <p className="text-2xl">${summaryStats.totalProfit.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-2xl">{summaryStats.totalOrders}</p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
        <LineChart width={800} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
          <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
        </LineChart>
      </div>

      {/* Top Selling Items */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Item Name</th>
                <th className="text-left p-2">Quantity Sold</th>
                <th className="text-left p-2">Revenue</th>
                <th className="text-left p-2">Profit</th>
              </tr>
            </thead>
            <tbody>
              {summaryStats.topSellingItems.map((item, index) => (
                <tr key={item.itemId} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.quantitySold}</td>
                  <td className="p-2">${item.revenue.toFixed(2)}</td>
                  <td className="p-2">${item.profit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;