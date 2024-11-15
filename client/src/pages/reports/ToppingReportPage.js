import React, { useState, useEffect, useCallback } from 'react';
import TimeFoodItemBarChart from '../../components/charts/TimeFoodItemBarChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { reportService } from '../../api/services/report.service';
import './FlavorReportPage.css';

const ToppingReportPage = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allToppings, setAllToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [showVolume, setShowVolume] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  // Fetch available toppings on component mount
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const toppings = await reportService.getAllToppings();
        setAllToppings(toppings);
      } catch (error) {
        setError('Error fetching toppings in report page');
      }
    };
    fetchToppings();
  }, []);

  // Fetch sales data for each selected toppings
  const fetchData = useCallback(async () => {
    try {
      const toppingData = {};
      for (const topping of selectedToppings) {
        const result = await reportService.getMonthlyToppingSales(topping, startDate, endDate);
        toppingData[topping] = result; // Store data for each topping
      }
      setData(toppingData); // Update state with data for all selected toppings
      console.log(toppingData);
    } catch (error) {
      setError('Error fetching topping sales data');
    }
  }, [startDate, endDate, selectedToppings]);

  // Trigger data fetch on initial load or when dates or selected toppings change
  useEffect(() => {
    fetchData();
  }, [fetchData, selectedToppings.length]); // Adding selectedToppings.length as a dependency


  if (error) return <div>{error}</div>;

  return (
    <div>
        <h1>Toppings Sales Report</h1>
        <div>
            <label>Start Date: </label>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <label>End Date: </label>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            <button onClick={fetchData}>Generate Report</button>
        </div>

        <div>
            <h2>Select Toppings</h2>
            {allToppings.map(topping => (
            <label key={topping}>
                <input
                type="checkbox"
                checked={selectedToppings.includes(topping)}
                onChange={() => {
                    setSelectedToppings(prev => 
                    prev.includes(topping) 
                        ? prev.filter(f => f !== topping) 
                        : [...prev, topping]
                    );
                }}
                />
                {topping}
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

        {/* Toppings Charts Container */}
        <div className="flavor-charts-container">
            {Object.keys(data).map(topping => (
                <div key={topping} className="chart-container">
                    <h3>{topping}</h3>
                    <TimeFoodItemBarChart data={data[topping]} showVolume={showVolume} showRevenue={showRevenue} />
                </div>
            ))}
        </div>
    </div>
  );
};

export default ToppingReportPage;
