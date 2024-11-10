const shopQueries = {
    getAllItemsQuery: `
        SELECT i.*, f.*, 
            CASE 
                WHEN i.Quantity < 5 THEN TRUE 
                ELSE FALSE 
            END as LowStock
        FROM item i
        LEFT JOIN food_item f ON i.Item_ID = f.Item_ID
        ORDER BY i.Item_Name
    `,
    
    getItemByIdQuery: `
        SELECT i.*, f.*
        FROM item i
        LEFT JOIN food_item f ON i.Item_ID = f.Item_ID
        WHERE i.Item_ID = ?
    `,
    
    insertItemQuery: `
        INSERT INTO item (Item_Name, Unit_Price, Quantity) 
        VALUES (?, ?, ?)
    `,
    
    insertFoodItemQuery: `
        INSERT INTO food_item (Item_ID, Calories, Protein, Sugar, Total_Carbs, Total_Fat) 
        VALUES (?, ?, ?, ?, ?, ?)
    `,

    updateItemQuery: `
        UPDATE item 
        SET Item_Name = ?, Unit_Price = ?
        WHERE Item_ID = ?
    `,

    updateFoodItemQuery: `
        UPDATE food_item 
        SET Calories = ?, Protein = ?, Sugar = ?, Total_Carbs = ?, Total_Fat = ?
        WHERE Item_ID = ?
    `,

    deleteItemQuery: `
        DELETE FROM item
        WHERE Item_ID = ?
    `,

    deleteFoodItemQuery: `
        DELETE FROM food_item
        WHERE Item_ID = ?
    `,

    getInventoryLogsQuery: `
        SELECT 
            l.Log_ID,
            l.Action_Date,
            l.Action_Type,
            l.Quantity_Changed,
            l.New_Quantity,
            l.Action_By,
            i.Item_Name
        FROM inventory_log l
        JOIN item i ON l.Item_ID = i.Item_ID
        WHERE l.Action_Date BETWEEN ? AND ?
        ORDER BY l.Action_Date DESC
    `
};

const salesReportQueries = {
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
    `
  };

module.exports = {
    shopQueries,
    salesReportQueries
};