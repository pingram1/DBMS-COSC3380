CREATE TABLE `Retail_Price_History`(
    `Price_History_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Item_ID` INT NOT NULL,
    `Retail_Price` DECIMAL(10, 2) NOT NULL,
    `Start_Date` DATE NOT NULL,
    `End_Date` DATE NULL
);
CREATE TABLE `Supplies_Item`(
    `Item_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL,
    `Type_ID` INT NOT NULL,
    `Size` VARCHAR(10) NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Reorder_Trigger` INT NOT NULL,
    `Quantity` INT NOT NULL,
    `VendorInvoice_ID` INT NULL
);
CREATE TABLE `Promotions`(
    `Promotion_ID` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Promotion_Type` VARCHAR(30) NOT NULL,
    `Discount_Percentage` DECIMAL(3, 2) NULL,
    `Discount_Amount` DECIMAL(3, 2) NULL,
    `Start_Date` DATE NOT NULL,
    `End_Date` DATE NOT NULL,
    `Description` VARCHAR(30) NULL,
    `Points_Cost` INT NOT NULL,
    `Item_ID` BIGINT NOT NULL
);
CREATE TABLE `Returns`(
    `Return_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Transaction_ID` INT NULL,
    `Return_Type` VARCHAR(30) NOT NULL
);
CREATE TABLE `Transaction_Item`(
    `Transaction_ID` INT NOT NULL,
    `Item_ID` INT NOT NULL,
    `Quantity_Sold` INT NOT NULL,
    PRIMARY KEY(`Transaction_ID`)
);
ALTER TABLE
    `Transaction_Item` ADD PRIMARY KEY(`Item_ID`);
CREATE TABLE `Food_Item`(
    `Item_ID` INT NOT NULL,
    `Calories` INT NULL,
    `Protein` DECIMAL(10, 2) NULL,
    `Sugar` DECIMAL(10, 2) NULL,
    `Total_Carbs` DECIMAL(10, 2) NULL,
    `Total_Fat` DECIMAL(10, 2) NULL,
    `Intro_Date` DATE NULL,
    `Discontinue_Date` DATE NULL,
    `Last_Updated_Date` DATE NULL,
    `VendorInvoice_ID` INT NULL,
    PRIMARY KEY(`Item_ID`)
);
CREATE TABLE `Customer`(
    `Customer_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Membership_Level` VARCHAR(30) NOT NULL,
    `Phone_Number` VARCHAR(15) NULL,
    `Address` VARCHAR(30) NULL,
    `Account_Creation_Date` DATE NULL,
    `Member_Length` INT NULL,
    `Account_End` DATE NULL,
    `Current_Discount_Points` INT NOT NULL,
    `Discount_Points_Used` INT NOT NULL,
    `Total_Accrued_Discount_Points` INT NOT NULL
);
CREATE TABLE `Employee`(
    `Employee_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(30) NOT NULL,
    `Shift` DATETIME NULL,
    `Length_of_Employment` INT NULL
);
CREATE TABLE `Transaction`(
    `Transaction_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Customer_ID` INT NULL,
    `Employee_ID` INT NULL,
    `Total_Price` DECIMAL(10, 2) NOT NULL,
    `Date` DATETIME NULL,
    `Payment_Type` VARCHAR(30) NULL,
    `Promotion_ID` INT NULL,
    `Discount_Percentage` BIGINT NOT NULL,
    `Discount_Amount` BIGINT NOT NULL
);
CREATE TABLE `VendorInvoice`(
    `Invoice_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Vendor_ID` INT NULL,
    `Date_Received` DATE NOT NULL,
    `Payment_Type` VARCHAR(30) NOT NULL,
    `Total` DECIMAL(10, 2) NOT NULL
);
CREATE TABLE `Vendor`(
    `Vendor_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Vendor_Name` VARCHAR(30) NOT NULL,
    `Contact_Info` VARCHAR(30) NULL,
    `Address` VARCHAR(30) NULL
);
CREATE TABLE `Item`(
    `Item_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Item_Name` VARCHAR(30) NOT NULL,
    `Unit_Price` DECIMAL(10, 2) NOT NULL
);
CREATE TABLE `Vendor_Price_History`(
    `Vendor_Price_History_ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Item_ID` INT NOT NULL,
    `VendorInvoice_ID` INT NOT NULL,
    `Vendor_Price` DECIMAL(10, 2) NOT NULL,
    `Start_Date` DATE NOT NULL,
    `End_Date` DATE NULL
);
ALTER TABLE
    `Supplies_Item` ADD CONSTRAINT `supplies_item_item_id_foreign` FOREIGN KEY(`Item_ID`) REFERENCES `Item`(`Item_ID`);
ALTER TABLE
    `Supplies_Item` ADD CONSTRAINT `supplies_item_vendorinvoice_id_foreign` FOREIGN KEY(`VendorInvoice_ID`) REFERENCES `VendorInvoice`(`Invoice_ID`);
ALTER TABLE
    `Transaction` ADD CONSTRAINT `transaction_employee_id_foreign` FOREIGN KEY(`Employee_ID`) REFERENCES `Employee`(`Employee_ID`);
ALTER TABLE
    `Transaction_Item` ADD CONSTRAINT `transaction_item_item_id_foreign` FOREIGN KEY(`Item_ID`) REFERENCES `Item`(`Item_ID`);
ALTER TABLE
    `Food_Item` ADD CONSTRAINT `food_item_vendorinvoice_id_foreign` FOREIGN KEY(`VendorInvoice_ID`) REFERENCES `VendorInvoice`(`Invoice_ID`);
ALTER TABLE
    `Transaction` ADD CONSTRAINT `transaction_promotion_id_foreign` FOREIGN KEY(`Promotion_ID`) REFERENCES `Promotions`(`Promotion_ID`);
ALTER TABLE
    `Vendor_Price_History` ADD CONSTRAINT `vendor_price_history_item_id_foreign` FOREIGN KEY(`Item_ID`) REFERENCES `Item`(`Item_ID`);
ALTER TABLE
    `VendorInvoice` ADD CONSTRAINT `vendorinvoice_vendor_id_foreign` FOREIGN KEY(`Vendor_ID`) REFERENCES `Vendor`(`Vendor_ID`);
ALTER TABLE
    `Transaction` ADD CONSTRAINT `transaction_customer_id_foreign` FOREIGN KEY(`Customer_ID`) REFERENCES `Customer`(`Customer_ID`);
ALTER TABLE
    `Promotions` ADD CONSTRAINT `promotions_item_id_foreign` FOREIGN KEY(`Item_ID`) REFERENCES `Transaction_Item`(`Item_ID`);
ALTER TABLE
    `Transaction_Item` ADD CONSTRAINT `transaction_item_transaction_id_foreign` FOREIGN KEY(`Transaction_ID`) REFERENCES `Transaction`(`Transaction_ID`);
ALTER TABLE
    `Vendor_Price_History` ADD CONSTRAINT `vendor_price_history_vendorinvoice_id_foreign` FOREIGN KEY(`VendorInvoice_ID`) REFERENCES `VendorInvoice`(`Invoice_ID`);
ALTER TABLE
    `Food_Item` ADD CONSTRAINT `food_item_item_id_foreign` FOREIGN KEY(`Item_ID`) REFERENCES `Item`(`Item_ID`);
ALTER TABLE
    `Retail_Price_History` ADD CONSTRAINT `retail_price_history_item_id_foreign` FOREIGN KEY(`Item_ID`) REFERENCES `Item`(`Item_ID`);
ALTER TABLE
    `Returns` ADD CONSTRAINT `returns_transaction_id_foreign` FOREIGN KEY(`Transaction_ID`) REFERENCES `Transaction`(`Transaction_ID`);