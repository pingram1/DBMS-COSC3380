const SHOP_ERRORS = {
    ITEM_NOT_FOUND: 'Item not found',
    INVALID_INPUT: 'Invalid input data',
    DB_ERROR: 'Database error occurred',
    CREATE_ERROR: 'Error creating item',
    UPDATE_ERROR: 'Error updating item',
    DELETE_ERROR: 'Error deleting item'
};

const AUTH_ERRORS = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    ADMIN_ACCESS_REQUIRED: 'Admin access required',
};

const CUSTOMER_ERRORS = {
    NOT_FOUND: 'Customer not found',
    ACCESS_DENIED: 'Access denied',
    UPDATE_ERROR: 'Error updating customer information',
    INVALID_ROLE: 'Invalid user role'
};

module.exports = {
    SHOP_ERRORS,
    AUTH_ERRORS,
    CUSTOMER_ERRORS
};