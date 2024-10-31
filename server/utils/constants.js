const SHOP_ERRORS = {
    ITEM_NOT_FOUND: 'Item not found',
    INVALID_INPUT: 'Invalid input data',
    DB_ERROR: 'Database error occurred',
    CREATE_ERROR: 'Error creating item',
    UPDATE_ERROR: 'Error updating item',
    DELETE_ERROR: 'Error deleting item'
};

// Shop item constants
const validateFoodItem = (item) => {
    const requiredFields = [
        'Item_Name',
        'Unit_Price',
        'Calories',
        'Protein',
        'Sugar',
        'Total_Carbs',
        'Total_Fat'
    ];

    // Check fields
    const missingFields = requiredFields.filter(field => !item[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Price can't be below 0 bussiness rule
    if (item.Unit_Price < 0) {
        throw new Error('Price cannot be negative');
    }
};

module.exports = {
    SHOP_ERRORS,
    validateFoodItem
};