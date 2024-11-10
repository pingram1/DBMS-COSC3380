import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { reportService } from '../../../api';

const InventoryReport = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('month');

  const fetchInventoryData = React.useCallback(async () => {
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

      const data = await reportService.getInventoryReport(startDate, endDate);
      setInventoryData(data);
      setError(null);
    } catch (err) {
      setError('Error fetching inventory data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]); 

  if (loading) return <div className="p-4">Loading inventory data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Report</h1>
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

      {/* Inventory Movement Chart */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Inventory Movement</h2>
        <BarChart width={800} height={300} data={inventoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Item_Name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_added" fill="#82ca9d" name="Added" />
          <Bar dataKey="total_removed" fill="#8884d8" name="Removed" />
        </BarChart>
      </div>

      {/* Detailed Inventory Table */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Detailed Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Item Name</th>
                <th className="text-left p-2">Current Stock</th>
                <th className="text-left p-2">Total Added</th>
                <th className="text-left p-2">Total Removed</th>
                <th className="text-left p-2">Min Quantity</th>
                <th className="text-left p-2">Max Quantity</th>
                <th className="text-left p-2">Changes Count</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr key={item.Item_ID} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-2">{item.Item_Name}</td>
                  <td className="p-2">{item.Quantity}</td>
                  <td className="p-2 text-green-600">+{item.total_added || 0}</td>
                  <td className="p-2 text-red-600">-{item.total_removed || 0}</td>
                  <td className="p-2">{item.min_quantity}</td>
                  <td className="p-2">{item.max_quantity}</td>
                  <td className="p-2">{item.changes_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;