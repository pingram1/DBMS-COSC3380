module.exports = {
    getAllItemsQuery: `
        SELECT i.*, f.*
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
        INSERT INTO item (Item_Name, Unit_Price, Available_Quantity) 
        VALUES (?, ?, ?)
    `,
    
    insertFoodItemQuery: `
        INSERT INTO food_item (Item_ID, Calories, Protein, Sugar, Total_Carbs, Total_Fat) 
        VALUES (?, ?, ?, ?, ?, ?)
    `
};