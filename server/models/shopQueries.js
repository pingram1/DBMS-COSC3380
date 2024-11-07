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
        INSERT INTO item (Item_Name, Unit_Price) 
        VALUES (?, ?)
    `,
    
    insertFoodItemQuery: `
        INSERT INTO food_item (Item_ID, Calories, Protein, Sugar, Total_Carbs, Total_Fat) 
        VALUES (?, ?, ?, ?, ?, ?)
    `,

    updateItemQuery: `
        UPDATE item 
        SET Item_name = ?, Unit_Price = ? 
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
    `
};