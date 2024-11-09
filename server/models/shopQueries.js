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

module.exports = {
    shopQueries
};