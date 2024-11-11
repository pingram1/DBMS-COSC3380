import React, { useState, useEffect, useCallback } from 'react';
import TimeFoodItemBarChart from '../../components/charts/TimeFoodItemBarChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { reportService } from '../../api/services/report.service';
import './FlavorReportPage.css';

const FlavorReportPage = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allFlavors, setAllFlavors] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [showVolume, setShowVolume] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  // Fetch available flavors on component mount
  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const flavors = await reportService.getAllFlavors();
        setAllFlavors(flavors);
      } catch (error) {
        setError('Error fetching flavors in report page');
      }
    };
    fetchFlavors();
  }, []);

  // Fetch sales data for each selected flavor
  const fetchData = useCallback(async () => {
    try {
      const flavorData = {};
      for (const flavor of selectedFlavors) {
        const result = await reportService.getMonthlySales(flavor, startDate, endDate);
        flavorData[flavor] = result; // Store data for each flavor
      }
      setData(flavorData); // Update state with data for all selected flavors
      console.log(flavorData);
    } catch (error) {
      setError('Error fetching flavor sales data');
    }
  }, [startDate, endDate, selectedFlavors]);

  // Trigger data fetch on initial load or when dates or selected flavors change
  useEffect(() => {
    fetchData();
  }, [fetchData, selectedFlavors.length]); // Adding selectedFlavors.length as a dependency


  if (error) return <div>{error}</div>;

  return (
    <div>
        <h1>Flavor Sales Report</h1>
        <div>
            <label>Start Date: </label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <label>End Date: </label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            <button onClick={fetchData}>Generate Report</button>
        </div>

        <div>
            <h2>Select Flavors</h2>
            {allFlavors.map(flavor => (
            <label key={flavor}>
                <input
                type="checkbox"
                checked={selectedFlavors.includes(flavor)}
                onChange={() => {
                    setSelectedFlavors(prev => 
                    prev.includes(flavor) 
                        ? prev.filter(f => f !== flavor) 
                        : [...prev, flavor]
                    );
                }}
                />
                {flavor}
            </label>
            ))}
        </div>

        <div>
            <label>
            <input
                type="checkbox"
                checked={showVolume}
                onChange={() => setShowVolume(prev => !prev)}
            />
            Show Volume
            </label>
            <label>
            <input
                type="checkbox"
                checked={showRevenue}
                onChange={() => setShowRevenue(prev => !prev)}
            />
            Show Revenue
            </label>
        </div>

        {/* Flavor Charts Container */}
        <div className="flavor-charts-container">
            {Object.keys(data).map(flavor => (
                <div key={flavor} className="chart-container">
                    <h3>{flavor}</h3>
                    <TimeFoodItemBarChart data={data[flavor]} showVolume={showVolume} showRevenue={showRevenue} />
                </div>
            ))}
        </div>
    </div>
  );
};

export default FlavorReportPage;
