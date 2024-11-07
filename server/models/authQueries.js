const authQueries = {
    getEmployeeByCredentials: `
        SELECT * FROM employee 
        WHERE Employee_ID = ? 
        AND First_Name = ? 
        AND Last_Name = ?
    `,

    getAdminByCredentials: `
        SELECT * FROM admin
        WHERE Admin_ID = ?
        AND name = ?
        AND password = ?
    `,
    
    getCustomerByPhone: `
        SELECT * FROM customer 
        WHERE Phone_Number = ?
    `
};

module.exports = {
    authQueries
};