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


const validateCustomerData = (customer) => {
    const requiredFields = ['Phone_Number'];
    
    const missingFields = requiredFields.filter(field => !customer[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    //TODO number validation 
};

const validateEmployeeData = (employee) => {
    const requiredFields = ['firstName', 'lastName', 'employeeId'];
    
    const missingFields = requiredFields.filter(field => !employee[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
};


module.exports = {
    validateFoodItem,
    validateCustomerData,
    validateEmployeeData
};