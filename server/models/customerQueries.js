const customerQueries = {
    getCustomerById: `
        SELECT 
            Customer_ID, 
            Membership_Level, 
            Phone_Number, 
            Account_Creation_Date, 
            Total_Accrued_Discount_Points, 
            Discount_Points_Used
        FROM customer 
        WHERE Customer_ID = ?
    `,
    
    getCustomerOrders: `
        SELECT 
            t.Transaction_ID,
            t.Transaction_Date,
            t.Total_Amount,
            ti.Item_ID,
            i.Item_Name,
            ti.Quantity,
            ti.Unit_Price
        FROM transaction t
        JOIN transaction_item ti ON t.Transaction_ID = ti.Transaction_ID
        JOIN item i ON ti.Item_ID = i.Item_ID
        WHERE t.Customer_ID = ?
        ORDER BY t.Transaction_Date DESC
    `
};

module.exports = {
    customerQueries
};