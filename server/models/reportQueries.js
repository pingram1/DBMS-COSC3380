const reportQueries = {
    getSalesData: `
        SELECT 
            DATE(t.Date) as date,
            SUM(t.Total_Price) as revenue,
            COUNT(DISTINCT t.Transaction_ID) as orders,
            SUM(
                (ti.Quantity_Sold * i.Unit_Price) - 
                (ti.Quantity_Sold * (
                    SELECT Vendor_Price 
                    FROM vendor_price_history vph 
                    WHERE vph.Item_ID = i.Item_ID 
                    AND vph.Start_Date <= t.Date 
                    ORDER BY vph.Start_Date DESC 
                    LIMIT 1
                ))
            ) as profit
        FROM transaction t
        JOIN transaction_item ti ON t.Transaction_ID = ti.Transaction_ID
        JOIN item i ON ti.Item_ID = i.Item_ID
        WHERE t.Date BETWEEN ? AND ?
        GROUP BY DATE(t.Date)
        ORDER BY date
    `,

    getTopSellingItems: `
        SELECT 
            i.Item_ID as itemId,
            i.Item_Name as name,
            SUM(ti.Quantity_Sold) as quantitySold,
            SUM(ti.Quantity_Sold * i.Unit_Price) as revenue,
            SUM(
                (ti.Quantity_Sold * i.Unit_Price) - 
                (ti.Quantity_Sold * (
                    SELECT Vendor_Price 
                    FROM vendor_price_history vph 
                    WHERE vph.Item_ID = i.Item_ID 
                    AND vph.Start_Date <= t.Date 
                    ORDER BY vph.Start_Date DESC 
                    LIMIT 1
                ))
            ) as profit
        FROM transaction t
        JOIN transaction_item ti ON t.Transaction_ID = ti.Transaction_ID
        JOIN item i ON ti.Item_ID = i.Item_ID
        WHERE t.Date BETWEEN ? AND ?
        GROUP BY i.Item_ID, i.Item_Name
        ORDER BY quantitySold DESC
        LIMIT 10
    `,

    getInventoryReport: `
        SELECT 
            i.Item_ID,
            i.Item_Name,
            i.Quantity,
            COUNT(il.Log_ID) as changes_count,
            SUM(CASE WHEN il.Quantity_Changed > 0 THEN il.Quantity_Changed ELSE 0 END) as total_added,
            SUM(CASE WHEN il.Quantity_Changed < 0 THEN ABS(il.Quantity_Changed) ELSE 0 END) as total_removed,
            MIN(i.Quantity) as min_quantity,
            MAX(i.Quantity) as max_quantity
        FROM item i
        LEFT JOIN inventory_log il ON i.Item_ID = il.Item_ID
        AND il.Action_Date BETWEEN ? AND ?
        GROUP BY i.Item_ID, i.Item_Name, i.Quantity
        ORDER BY i.Item_Name
    `
};

module.exports = {
    reportQueries
};