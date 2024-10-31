-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: mysql-posdatabase-database-pos-3380.l.aivencloud.com    Database: test
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '6fc030c0-7f5b-11ef-8e0c-0ed7bb81195b:1-91';

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Customer_ID` int NOT NULL AUTO_INCREMENT,
  `Membership_Level` varchar(30) NOT NULL,
  `Phone_Number` varchar(15) DEFAULT NULL,
  `Address` varchar(30) DEFAULT NULL,
  `Account_Creation_Date` date DEFAULT NULL,
  `Member_Length` int DEFAULT NULL,
  `Account_End` date DEFAULT NULL,
  `Current_Discount_Points` int NOT NULL,
  `Discount_Points_Used` int NOT NULL,
  `Total_Accrued_Discount_Points` int NOT NULL,
  PRIMARY KEY (`Customer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (401,'Gold','1234567890','123 Main St','2024-01-01',12,NULL,100,20,120),(402,'Silver','2345678901','456 Oak St','2024-02-01',10,NULL,80,10,90),(403,'Bronze','3456789012','789 Pine St','2024-03-01',8,NULL,50,5,55),(404,'Gold','4567890123','101 Maple St','2024-04-01',14,NULL,110,30,140),(405,'Silver','5678901234','202 Birch St','2024-05-01',9,NULL,70,15,85),(406,'Bronze','6789012345','303 Cedar St','2024-06-01',7,NULL,60,10,70),(407,'Gold','7890123456','404 Elm St','2024-07-01',15,NULL,120,25,145),(408,'Silver','8901234567','505 Spruce St','2024-08-01',11,NULL,90,20,110),(409,'Bronze','9012345678','606 Willow St','2024-09-01',6,NULL,40,5,45),(410,'Gold','0123456789','707 Ash St','2024-10-01',13,NULL,130,35,165),(411,'Silver','1112223333','808 Birch St','2024-11-01',10,NULL,85,15,100),(412,'Gold','2223334444','909 Cedar St','2024-12-01',12,NULL,140,40,180),(413,'Bronze','3334445555','1010 Oak St','2025-01-01',5,NULL,30,10,40),(414,'Silver','4445556666','1111 Pine St','2025-02-01',8,NULL,60,20,80),(415,'Gold','5556667777','1212 Spruce St','2025-03-01',14,NULL,150,50,200),(416,'Bronze','6667778888','1313 Maple St','2025-04-01',7,NULL,55,10,65),(417,'Silver','7778889999','1414 Cedar St','2025-05-01',9,NULL,75,20,95),(418,'Gold','8889990000','1515 Oak St','2025-06-01',13,NULL,135,40,175),(419,'Silver','9990001111','1616 Pine St','2025-07-01',11,NULL,95,25,120),(420,'Bronze','0001112222','1717 Spruce St','2025-08-01',6,NULL,45,5,50),(421,'Gold','1112223334','1818 Elm St','2025-09-01',15,NULL,145,50,195),(422,'Silver','2223334445','1919 Birch St','2025-10-01',10,NULL,85,15,100),(423,'Gold','3334445556','2020 Maple St','2025-11-01',12,NULL,155,45,200),(424,'Bronze','4445556667','2121 Oak St','2025-12-01',5,NULL,35,10,45),(425,'Silver','5556667778','2222 Pine St','2026-01-01',8,NULL,65,20,85),(426,'Gold','6667778889','2323 Spruce St','2026-02-01',14,NULL,160,55,215),(427,'Bronze','7778889990','2424 Elm St','2026-03-01',6,NULL,50,5,55),(428,'Silver','8889990001','2525 Cedar St','2026-04-01',9,NULL,75,25,100),(429,'Gold','9990001112','2626 Willow St','2026-05-01',13,NULL,135,40,175),(430,'Bronze','0001112223','2727 Ash St','2026-06-01',7,NULL,60,10,70);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_ID` int NOT NULL AUTO_INCREMENT,
  `Shift` datetime DEFAULT NULL,
  `Length_of_Employment` int DEFAULT NULL,
  `First_Name` varchar(50) NOT NULL,
  `Last_Name` varchar(50) NOT NULL,
  `Phone_Number` varchar(15) DEFAULT NULL,
  `Date_of_Birth` date DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (301,'2024-10-01 09:00:00',2,'Alice','Smith','555-1234','2003-05-12'),(302,'2024-10-01 10:00:00',3,'Bob','Johnson','555-2345','2002-07-22'),(303,'2024-10-01 11:00:00',1,'Charlie','Williams','555-3456','2004-03-18'),(304,'2024-10-01 12:00:00',5,'Diana','Brown','555-4567','2001-09-30'),(305,'2024-10-01 13:00:00',4,'Eve','Davis','555-5678','2003-11-15'),(306,'2024-10-01 14:00:00',2,'Frank','Miller','555-6789','2003-12-05'),(307,'2024-10-01 15:00:00',3,'Grace','Wilson','555-7890','2004-02-25'),(308,'2024-10-01 16:00:00',1,'Hank','Moore','555-8901','2002-08-14'),(309,'2024-10-01 17:00:00',6,'Ivy','Taylor','555-9012','2001-06-08'),(310,'2024-10-01 18:00:00',7,'Jack','Anderson','555-0123','2002-04-11');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_item`
--

DROP TABLE IF EXISTS `food_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_item` (
  `Item_ID` int NOT NULL,
  `Calories` int DEFAULT NULL,
  `Protein` decimal(10,2) DEFAULT NULL,
  `Sugar` decimal(10,2) DEFAULT NULL,
  `Total_Carbs` decimal(10,2) DEFAULT NULL,
  `Total_Fat` decimal(10,2) DEFAULT NULL,
  `Intro_Date` date DEFAULT NULL,
  `Discontinue_Date` date DEFAULT NULL,
  `Last_Updated_Date` date DEFAULT NULL,
  `VendorInvoice_ID` int DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Item_ID`),
  KEY `food_item_vendorinvoice_id_foreign` (`VendorInvoice_ID`),
  CONSTRAINT `food_item_item_id_foreign` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`),
  CONSTRAINT `food_item_vendorinvoice_id_foreign` FOREIGN KEY (`VendorInvoice_ID`) REFERENCES `vendorinvoice` (`Invoice_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_item`
--

LOCK TABLES `food_item` WRITE;
/*!40000 ALTER TABLE `food_item` DISABLE KEYS */;
INSERT INTO `food_item` VALUES (101,200,3.50,20.00,28.00,10.00,'2024-01-01',NULL,'2024-01-15',1,'Vanilla'),(102,210,4.00,25.00,30.00,12.00,'2024-01-01',NULL,'2024-01-15',1,'Chocolate'),(103,190,3.00,18.00,25.00,9.00,'2024-01-01',NULL,'2024-01-15',2,'Strawberry'),(104,250,5.00,30.00,35.00,15.00,'2024-01-01',NULL,'2024-01-15',3,'Mint Chocolate Chip'),(105,180,2.50,15.00,22.00,8.00,'2024-01-01',NULL,'2024-01-15',3,'Cookies and Cream'),(106,230,4.50,28.00,32.00,13.00,'2024-01-01',NULL,'2024-01-15',1,'Pistachio'),(107,240,4.80,29.00,33.00,14.00,'2024-01-01',NULL,'2024-01-15',2,'Rocky Road'),(108,210,4.20,24.00,30.00,11.00,'2024-01-01',NULL,'2024-01-15',2,'Butter Pecan'),(109,190,3.60,21.00,26.00,10.00,'2024-01-01',NULL,'2024-01-15',3,'Coffee'),(110,200,3.90,23.00,28.00,10.00,'2024-01-01',NULL,'2024-01-15',1,'Salted Caramel'),(111,220,4.10,26.00,31.00,12.00,'2024-01-01',NULL,'2024-01-15',2,'Cookie Dough'),(112,50,0.50,10.00,12.00,3.00,'2024-01-15',NULL,'2024-01-20',3,'Chocolate Chips'),(113,60,0.00,14.00,15.00,4.00,'2024-01-15',NULL,'2024-01-20',2,'Sprinkles'),(114,80,0.20,18.00,20.00,5.00,'2024-01-15',NULL,'2024-01-20',1,'Caramel Sauce'),(115,100,1.00,12.00,16.00,6.00,'2024-01-15',NULL,'2024-01-20',3,'Crushed Oreos'),(116,70,0.00,19.00,22.00,5.00,'2024-01-15',NULL,'2024-01-20',2,'Gummy Bears'),(117,45,0.30,5.00,7.00,3.00,'2024-01-15',NULL,'2024-01-20',1,'Whipped Cream'),(118,90,4.00,2.00,5.00,7.00,'2024-01-15',NULL,'2024-01-20',3,'Chopped Peanuts'),(119,110,0.10,22.00,25.00,8.00,'2024-01-15',NULL,'2024-01-20',2,'Marshmallow Fluff'),(120,130,1.50,20.00,24.00,9.00,'2024-01-15',NULL,'2024-01-20',1,'Hot Fudge'),(121,55,1.00,8.00,10.00,3.00,'2024-01-15',NULL,'2024-01-20',3,'Graham Cracker Crumbs');
/*!40000 ALTER TABLE `food_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `Item_ID` int NOT NULL AUTO_INCREMENT,
  `Item_Name` varchar(30) NOT NULL,
  `Unit_Price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`Item_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (101,'Vanilla',2.50),(102,'Chocolate',2.75),(103,'Strawberry',2.50),(104,'Mint Chocolate Chip',3.00),(105,'Cookies and Cream',2.80),(106,'Pistachio',3.20),(107,'Rocky Road',3.00),(108,'Butter Pecan',2.90),(109,'Coffee',2.60),(110,'Salted Caramel',3.10),(111,'Cookie Dough',3.25),(112,'Chocolate Chips',0.50),(113,'Sprinkles',0.40),(114,'Caramel Sauce',0.60),(115,'Crushed Oreos',0.70),(116,'Gummy Bears',0.60),(117,'Whipped Cream',0.50),(118,'Chopped Peanuts',0.60),(119,'Marshmallow Fluff',0.70),(120,'Hot Fudge',0.80),(121,'Graham Cracker Crumbs',0.55),(201,'Small Cup',0.10),(202,'Medium Cup',0.15),(203,'Large Cup',0.20),(204,'Small Cone',0.12),(205,'Medium Cone',0.18),(206,'Large Cone',0.25),(207,'Plastic Spoon',0.05),(208,'Napkin',0.02),(209,'Straw',0.03),(210,'Plastic Bowl',0.30);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `Promotion_ID` int NOT NULL AUTO_INCREMENT,
  `Promotion_Type` varchar(30) NOT NULL,
  `Discount_Percentage` float DEFAULT NULL,
  `Discount_Amount` decimal(3,2) DEFAULT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `Points_Cost` int NOT NULL,
  `Item_ID` int NOT NULL,
  PRIMARY KEY (`Promotion_ID`),
  KEY `promotions_item_id_foreignpromotions` (`Item_ID`),
  CONSTRAINT `promotions_item_id_foreign` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'Holiday Discount',10,NULL,'2024-12-20','2024-12-27','Christmas Holiday Special',0,101),(2,'Sports Event',15,NULL,'2024-02-05','2024-02-12','Super Bowl Special',0,102),(3,'Buy 1 Get 1 Free',NULL,3.00,'2024-07-01','2024-07-04','Independence Day BOGO',0,103),(4,'Back to School',5,NULL,'2024-08-15','2024-08-31','Back to School Discount',0,104),(5,'Summer Special',20,NULL,'2024-06-01','2024-08-31','Cool Down with Ice Cream',0,105),(6,'Valentine\'s Day',NULL,1.50,'2024-02-10','2024-02-15','Valentine Sweet Deal',0,110),(7,'Loyalty Reward',10,NULL,'2024-01-01','2024-12-31','Loyalty Member Discount',50,120),(8,'Teacher Appreciation',NULL,2.00,'2024-05-01','2024-05-07','Teacher Week Special',0,105),(9,'Halloween Special',15,NULL,'2024-10-25','2024-11-01','Halloween Topping Deal',0,116),(10,'Weekend Deal',NULL,0.50,'2024-10-01','2024-10-31','October Weekend Deal',0,203);
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retail_price_history`
--

DROP TABLE IF EXISTS `retail_price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retail_price_history` (
  `Price_History_ID` int NOT NULL AUTO_INCREMENT,
  `Item_ID` int NOT NULL,
  `Retail_Price` decimal(10,2) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL,
  PRIMARY KEY (`Price_History_ID`),
  KEY `retail_price_history_item_id_foreign` (`Item_ID`),
  CONSTRAINT `retail_price_history_item_id_foreign` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retail_price_history`
--

LOCK TABLES `retail_price_history` WRITE;
/*!40000 ALTER TABLE `retail_price_history` DISABLE KEYS */;
INSERT INTO `retail_price_history` VALUES (1,101,2.30,'2019-10-01','2022-06-15'),(2,101,2.50,'2022-06-16','2024-10-18'),(3,102,2.50,'2019-10-01','2021-11-25'),(4,102,2.75,'2021-11-26','2024-10-18'),(5,103,2.40,'2019-10-01','2023-02-10'),(6,103,2.50,'2023-02-11','2024-10-18'),(7,104,2.80,'2019-10-01','2022-09-30'),(8,104,3.00,'2022-10-01','2024-10-18'),(9,105,2.60,'2019-10-01','2022-01-20'),(10,105,2.80,'2022-01-21','2024-10-18'),(11,106,3.00,'2019-10-01','2022-12-15'),(12,106,3.20,'2022-12-16','2024-10-18'),(13,107,2.90,'2019-10-01','2021-05-18'),(14,107,3.00,'2021-05-19','2024-10-18'),(15,108,2.70,'2019-10-01','2023-01-05'),(16,108,2.90,'2023-01-06','2024-10-18'),(17,109,2.40,'2019-10-01','2022-03-22'),(18,109,2.60,'2022-03-23','2024-10-18'),(19,110,2.80,'2019-10-01','2021-08-12'),(20,110,3.10,'2021-08-13','2024-10-18'),(21,111,3.00,'2019-10-01','2023-04-15'),(22,111,3.25,'2023-04-16','2024-10-18'),(23,112,0.45,'2019-10-01','2022-11-30'),(24,112,0.50,'2022-12-01','2024-10-18'),(25,113,0.35,'2019-10-01','2021-02-28'),(26,113,0.40,'2021-03-01','2024-10-18'),(27,114,0.55,'2019-10-01','2022-06-30'),(28,114,0.60,'2022-07-01','2024-10-18'),(29,115,0.60,'2019-10-01','2023-03-10'),(30,115,0.70,'2023-03-11','2024-10-18'),(31,116,0.55,'2019-10-01','2021-09-14'),(32,116,0.60,'2021-09-15','2024-10-18'),(33,117,0.45,'2019-10-01','2022-08-01'),(34,117,0.50,'2022-08-02','2024-10-18'),(35,118,0.50,'2019-10-01','2021-12-11'),(36,118,0.60,'2021-12-12','2024-10-18'),(37,119,0.65,'2019-10-01','2023-07-20'),(38,119,0.70,'2023-07-21','2024-10-18'),(39,120,0.75,'2019-10-01','2021-10-05'),(40,120,0.80,'2021-10-06','2024-10-18'),(41,121,0.50,'2019-10-01','2022-05-15'),(42,121,0.55,'2022-05-16','2024-10-18'),(43,201,0.08,'2019-10-01','2021-06-30'),(44,201,0.10,'2021-07-01','2024-10-18'),(45,202,0.10,'2019-10-01','2021-08-15'),(46,202,0.15,'2021-08-16','2024-10-18'),(47,203,0.15,'2019-10-01','2023-01-01'),(48,203,0.20,'2023-01-02','2024-10-18'),(49,204,0.10,'2019-10-01','2022-04-20'),(50,204,0.12,'2022-04-21','2024-10-18'),(51,205,0.15,'2019-10-01','2021-11-10'),(52,205,0.18,'2021-11-11','2024-10-18'),(53,206,0.20,'2019-10-01','2023-06-01'),(54,206,0.25,'2023-06-02','2024-10-18'),(55,207,0.04,'2019-10-01','2022-03-15'),(56,207,0.05,'2022-03-16','2024-10-18'),(57,208,0.01,'2019-10-01','2021-05-05'),(58,208,0.02,'2021-05-06','2024-10-18'),(59,209,0.02,'2019-10-01','2023-09-10'),(60,209,0.03,'2023-09-11','2024-10-18'),(61,210,0.25,'2019-10-01','2022-12-31'),(62,210,0.30,'2023-01-01','2024-10-18');
/*!40000 ALTER TABLE `retail_price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returns`
--

DROP TABLE IF EXISTS `returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returns` (
  `Return_ID` int NOT NULL AUTO_INCREMENT,
  `Transaction_ID` int DEFAULT NULL,
  `Return_Type` varchar(30) NOT NULL,
  PRIMARY KEY (`Return_ID`),
  KEY `returns_transaction_id_foreign` (`Transaction_ID`),
  CONSTRAINT `returns_transaction_id_foreign` FOREIGN KEY (`Transaction_ID`) REFERENCES `transaction` (`Transaction_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returns`
--

LOCK TABLES `returns` WRITE;
/*!40000 ALTER TABLE `returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplies_item`
--

DROP TABLE IF EXISTS `supplies_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplies_item` (
  `Item_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  `Type_ID` int NOT NULL,
  `Size` varchar(10) DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Reorder_Trigger` int NOT NULL,
  `Quantity` int NOT NULL,
  `VendorInvoice_ID` int DEFAULT NULL,
  PRIMARY KEY (`Item_ID`),
  KEY `supplies_item_vendorinvoice_id_foreign` (`VendorInvoice_ID`),
  CONSTRAINT `supplies_item_item_id_foreign` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`),
  CONSTRAINT `supplies_item_vendorinvoice_id_foreign` FOREIGN KEY (`VendorInvoice_ID`) REFERENCES `vendorinvoice` (`Invoice_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplies_item`
--

LOCK TABLES `supplies_item` WRITE;
/*!40000 ALTER TABLE `supplies_item` DISABLE KEYS */;
INSERT INTO `supplies_item` VALUES (201,'Small Cup',1,'S',0.10,50,100,1),(202,'Medium Cup',1,'M',0.15,50,100,1),(203,'Large Cup',1,'L',0.20,50,100,2),(204,'Small Cone',2,'S',0.12,50,100,3),(205,'Medium Cone',2,'M',0.18,50,100,3),(206,'Large Cone',2,'L',0.25,50,100,2),(207,'Plastic Spoon',3,NULL,0.05,100,500,1),(208,'Napkin',3,NULL,0.02,200,1000,1),(209,'Straw',3,NULL,0.03,150,500,2),(210,'Plastic Bowl',1,'M',0.30,50,100,3);
/*!40000 ALTER TABLE `supplies_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `Transaction_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` int DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `Total_Price` decimal(10,2) NOT NULL,
  `Date` datetime DEFAULT NULL,
  `Payment_Type` varchar(30) DEFAULT NULL,
  `Promotion_ID` int DEFAULT NULL,
  `Discount_Percentage` bigint NOT NULL,
  `Discount_Amount` bigint NOT NULL,
  PRIMARY KEY (`Transaction_ID`),
  KEY `transaction_employee_id_foreign` (`Employee_ID`),
  KEY `transaction_promotion_id_foreign` (`Promotion_ID`),
  KEY `transaction_customer_id_foreign` (`Customer_ID`),
  CONSTRAINT `transaction_customer_id_foreign` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`),
  CONSTRAINT `transaction_employee_id_foreign` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`),
  CONSTRAINT `transaction_promotion_id_foreign` FOREIGN KEY (`Promotion_ID`) REFERENCES `promotions` (`Promotion_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=511 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (501,401,301,6.55,'2024-10-01 10:00:00','Credit Card',NULL,10,0),(502,402,302,3.08,'2024-10-02 11:00:00','Cash',NULL,5,0),(503,403,303,3.82,'2024-10-03 12:00:00','Credit Card',NULL,10,0),(504,404,304,7.14,'2024-10-04 13:00:00','Debit Card',NULL,15,1),(505,405,305,4.97,'2024-10-05 14:00:00','Credit Card',NULL,5,0),(506,406,306,5.37,'2024-10-06 15:00:00','Cash',NULL,10,0),(507,407,307,7.18,'2024-10-07 16:00:00','Debit Card',NULL,15,1),(508,408,308,5.51,'2024-10-08 17:00:00','Credit Card',NULL,10,0),(509,409,309,4.40,'2024-10-09 18:00:00','Cash',NULL,5,0),(510,410,310,7.70,'2024-10-10 19:00:00','Credit Card',NULL,15,1);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_item`
--

DROP TABLE IF EXISTS `transaction_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_item` (
  `Transaction_ID` int NOT NULL,
  `Item_ID` int NOT NULL,
  `Quantity_Sold` int NOT NULL,
  PRIMARY KEY (`Transaction_ID`),
  KEY `transaction_item_item_id_foreign` (`Item_ID`),
  CONSTRAINT `transaction_item_item_id_foreign` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`),
  CONSTRAINT `transaction_item_transaction_id_foreign` FOREIGN KEY (`Transaction_ID`) REFERENCES `transaction` (`Transaction_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_item`
--

LOCK TABLES `transaction_item` WRITE;
/*!40000 ALTER TABLE `transaction_item` DISABLE KEYS */;
INSERT INTO `transaction_item` VALUES (501,101,2),(502,102,1),(503,103,1),(504,105,2),(505,106,1),(506,107,1),(507,108,2),(508,109,1),(509,110,1),(510,111,2);
/*!40000 ALTER TABLE `transaction_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `Vendor_ID` int NOT NULL AUTO_INCREMENT,
  `Vendor_Name` varchar(30) NOT NULL,
  `Contact_Info` varchar(30) DEFAULT NULL,
  `Address` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Vendor_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'Cream Supplies Inc.','creamsupplies@example.com','123 Supplier Rd'),(2,'Sweet Treats Distributors','sweettreats@example.com','456 Sugar Ln'),(3,'Cone & Cup Co.','coneandcup@example.com','789 Container Blvd'),(4,'Mike IC','Mike82@icecreamer.com',NULL),(5,'Becky Taylor','BTaytay@gmail.com',NULL),(6,'Kirkland Classic','customersupport@costco.com',NULL),(7,'Wang Honkers','wthsn3@gmail.com',NULL);
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_price_history`
--

DROP TABLE IF EXISTS `vendor_price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_price_history` (
  `Vendor_Price_History_ID` int NOT NULL AUTO_INCREMENT,
  `Item_ID` int NOT NULL,
  `VendorInvoice_ID` int NOT NULL,
  `Vendor_Price` decimal(10,2) NOT NULL,
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL,
  PRIMARY KEY (`Vendor_Price_History_ID`),
  KEY `vendor_price_history_item_id_foreign` (`Item_ID`),
  KEY `vendor_price_history_vendorinvoice_id_foreign` (`VendorInvoice_ID`),
  CONSTRAINT `vendor_price_history_item_id_foreign` FOREIGN KEY (`Item_ID`) REFERENCES `item` (`Item_ID`),
  CONSTRAINT `vendor_price_history_vendorinvoice_id_foreign` FOREIGN KEY (`VendorInvoice_ID`) REFERENCES `vendorinvoice` (`Invoice_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_price_history`
--

LOCK TABLES `vendor_price_history` WRITE;
/*!40000 ALTER TABLE `vendor_price_history` DISABLE KEYS */;
INSERT INTO `vendor_price_history` VALUES (1,101,1,5.50,'2024-01-01',NULL),(2,102,1,6.00,'2024-01-01',NULL),(3,103,2,5.80,'2024-01-02',NULL),(4,104,3,7.50,'2024-01-03',NULL),(5,105,3,8.20,'2024-01-03',NULL),(6,106,4,6.90,'2024-01-04',NULL),(7,107,5,7.20,'2024-01-05',NULL),(8,108,6,8.10,'2024-01-06',NULL),(9,109,7,5.60,'2024-01-07',NULL),(10,110,8,6.80,'2024-01-08',NULL),(11,111,1,5.90,'2024-01-01',NULL),(12,112,2,6.50,'2024-01-02',NULL),(13,113,3,7.10,'2024-01-03',NULL),(14,114,4,7.80,'2024-01-04',NULL),(15,115,5,8.00,'2024-01-05',NULL),(16,116,6,7.30,'2024-01-06',NULL),(17,117,7,6.40,'2024-01-07',NULL),(18,118,8,7.00,'2024-01-08',NULL),(19,119,1,6.60,'2024-01-01',NULL),(20,120,2,7.50,'2024-01-02',NULL),(21,121,3,8.30,'2024-01-03',NULL);
/*!40000 ALTER TABLE `vendor_price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendorinvoice`
--

DROP TABLE IF EXISTS `vendorinvoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendorinvoice` (
  `Invoice_ID` int NOT NULL AUTO_INCREMENT,
  `Vendor_ID` int DEFAULT NULL,
  `Date_Received` date NOT NULL,
  `Payment_Type` varchar(30) NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`Invoice_ID`),
  KEY `vendorinvoice_vendor_id_foreign` (`Vendor_ID`),
  CONSTRAINT `vendorinvoice_vendor_id_foreign` FOREIGN KEY (`Vendor_ID`) REFERENCES `vendor` (`Vendor_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendorinvoice`
--

LOCK TABLES `vendorinvoice` WRITE;
/*!40000 ALTER TABLE `vendorinvoice` DISABLE KEYS */;
INSERT INTO `vendorinvoice` VALUES (1,1,'2024-01-01','Credit',1500.00),(2,2,'2024-01-02','Credit',1800.00),(3,3,'2024-01-03','Credit',2200.00),(4,4,'2024-01-04','Credit',1400.00),(5,1,'2024-01-05','Credit',1600.00),(6,2,'2024-01-06','Credit',2100.00),(7,3,'2024-01-07','Credit',2300.00),(8,4,'2024-01-08','Credit',2000.00);
/*!40000 ALTER TABLE `vendorinvoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'test'
--

--
-- Dumping routines for database 'test'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 23:20:29
