const employeeQueries = {
    
   
    createEmployee: `
      INSERT INTO Employee ( 
        Length_of_Employment, 
        First_Name, 
        Last_Name
        Phone_Number,
        Date_of_Birth,
        Date_Created
      ) VALUES (?, ?, ?, ?, ?, CURDATE())
    `,

    updateEmployeeNumber: `
      UPDATE Employee 
      SET Phone_Number = ?
      WHERE Employee_ID = ?
    `,
    

    getEmployeeOrders: `
      SELECT 
        t.Transaction_ID,
        t.Date as Transaction_Date,
        t.Total_Price as Total_Amount,
        t.Discount_Percentage,
        t.Discount_Amount,
        ti.Item_ID,
        i.Item_Name,
        ti.Quantity_Sold as Quantity,
        i.Unit_Price
      FROM transaction t
      JOIN transaction_item ti ON t.Transaction_ID = ti.Transaction_ID
      JOIN item i ON ti.Item_ID = i.Item_ID
      WHERE t.Employee_ID = ?
      ORDER BY t.Date DESC
    `,

    getEmployeeById: `
      SELECT 
          e.Employee_ID, 
          e.Phone_Number, 
          e.Date_Created, 
          e.First_Name,
          e.Last_Name,
          e.Date_of_Birth,
          e.Clock_In,
          e.Clock_Out,
          e.Length_of_Employment
      FROM Employee e
      WHERE e.Employee_ID = ?
    `,


  };

  
  
  module.exports = {
    employeeQueries
  };
