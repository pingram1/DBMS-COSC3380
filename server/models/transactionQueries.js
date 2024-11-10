const transactionQueries = {

    createTransaction: `
        INSERT INTO transaction (
            Customer_ID,
            Total_Price,
            Date,
            Payment_Type,
            Discount_Percentage,
            Discount_Amount
        ) VALUES (?, ?, NOW(), ?, ?, ?)
    `,

    createTransactionItem: `
        INSERT INTO transaction_item (
            Transaction_ID,
            Item_ID,
            Quantity_Sold
        ) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        Quantity_Sold = Quantity_Sold + VALUES(Quantity_Sold)
    `,

    getTransactionItems: `
        SELECT 
            ti.*,
            i.Item_Name,
            i.Unit_Price
        FROM transaction_item ti
        JOIN item i ON ti.Item_ID = i.Item_ID
        WHERE ti.Transaction_ID = ?
    `,

    updateTransactionItem: `
        UPDATE transaction_item 
        SET Quantity_Sold = ?
        WHERE Transaction_ID = ? AND Item_ID = ?
    `,

    deleteTransactionItem: `
        DELETE FROM transaction_item 
        WHERE Transaction_ID = ? AND Item_ID = ?
    `

};

module.exports = {
    transactionQueries
};