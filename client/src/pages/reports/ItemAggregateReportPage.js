import React, { useState, useCallback } from 'react';
import FoodItemsBarChart from '../../components/charts/FoodItemsBarChart';
import FlavorToppingHeatMap from '../../components/charts/FlavorToppingHeatMap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { reportService } from '../../api/services/report.service';

const ItemAggregateReportPage = () => {
    const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 6)));
    const [endDate, setEndDate] = useState(new Date());
    const [flavorData, setFlavorData] = useState([]);
    const [toppingData, setToppingData] = useState([]);
    const [heatmapData, setHeatmapData] = useState([]);
    const [error, setError] = useState(null);
    const [showVolume, setShowVolume] = useState(true);
    const [showRevenue, setShowRevenue] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const flavorResult = await reportService.getAggregateFlavorSales(startDate, endDate);
            setFlavorData(flavorResult);
    
            const toppingResult = await reportService.getAggregateToppingSales(startDate, endDate);
            setToppingData(toppingResult);
    
            const heatmapResult = await reportService.getFlavorToppingHeatmap(startDate, endDate);
            console.log(heatmapResult);
            if (heatmapResult && Array.isArray(heatmapResult)) {
                const transformedData = transformHeatmapData(heatmapResult);
                console.log("Transformed Heatmap Data:", transformedData); // Add this line
                setHeatmapData(transformedData);
            }
        } catch (error) {
            console.error('Error fetching aggregate data:', error);
            setError('Failed to retrieve aggregate data');
        }
    }, [startDate, endDate]);
    

    const transformHeatmapData = (data) => {
        const flavors = [...new Set(data.map(d => d.FlavorName))];
        const toppings = [...new Set(data.map(d => d.ToppingName))];
    
        const heatmapData = flavors.map(flavor => {
            const flavorData = { FlavorName: flavor }; // Start with the flavor name as a key-value pair
            toppings.forEach(topping => {
                // Explicitly set topping names as string keys using template literals
                const combination = data.find(d => d.FlavorName === flavor && d.ToppingName === topping);
                flavorData[topping] = combination ? Number(combination.TotalCombinationVolume) : 0;
            });
            return flavorData;
        });
    
        console.log("Transformed heatmap data:", JSON.stringify(heatmapData, null, 2)); // Check structure with JSON.stringify
        return heatmapData;
    };
    
    
    
    
    
    
    
    

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Item Aggregate Sales Report</h1>
            {/* Date selection and generate button */}
            <div>
                <label>Start Date: </label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <label>End Date: </label>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                <button onClick={fetchData}>Generate Report</button>
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
    
            {flavorData.length > 0 && (
                <>
                    <h2>Aggregate Flavor Sales</h2>
                    <FoodItemsBarChart data={flavorData} dataKeyName="FlavorName" showVolume={showVolume} showRevenue={showRevenue} />
                </>
            )}
    
            {toppingData.length > 0 && (
                <>
                    <h2>Aggregate Topping Sales</h2>
                    <FoodItemsBarChart data={toppingData} dataKeyName="ToppingName" showVolume={showVolume} showRevenue={showRevenue} />
                </>
            )}
    
            {heatmapData.length > 0 && (
                <>
                    <h2>Flavor-Topping Combination Heatmap</h2>
                    <FlavorToppingHeatMap data={heatmapData} />
                </>
            )}
        </div>
    );
    
};

export default ItemAggregateReportPage;
