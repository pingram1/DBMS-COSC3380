const authQueries = {
    getEmployeeByCredentials: `
        SELECT * FROM employee 
        WHERE Employee_ID = ? 
        AND First_Name = ? 
        AND Last_Name = ?
    `,

    getAdminByCredentials: `
        SELECT * FROM admin
        WHERE Username = ?
        AND Password = ?
    `,
    
    getCustomerByPhone: `
        SELECT * FROM customer 
        WHERE Phone_Number = ?
    `
};

module.exports = {
    authQueries
};