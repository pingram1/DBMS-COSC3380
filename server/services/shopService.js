const { pool } = require('../config/db');
const { SHOP_ERRORS } = require('../utils/constants');
const {
    getAllItemsQuery,
    getItemByIdQuery,
    insertItemQuery,
    insertFoodItemQuery,
    updateItemQuery,
    updateFoodItemQuery,
    deleteItemQuery,
    deleteFoodItemQuery
} = require('../models/shopQueries');
const { connect } = require('../routes/shop');

class ShopService {
    static async getAllItems() {
        try {
            const [rows] = await pool.query(getAllItemsQuery);
            return rows;
        } catch (error) {
            console.error('Error in getAllItems:', error);
            throw new Error(SHOP_ERRORS.DB_ERROR);
        }
    }

    static async getItemById(id) {
        try {
            const [rows] = await pool.query(getItemByIdQuery, [id]);
            
            if (rows.length === 0) {
                throw new Error(SHOP_ERRORS.ITEM_NOT_FOUND);
            }
            
            return rows[0];
        } catch (error) {
            console.error(`Error in getItemById for ID ${id}:`, error);
            throw error;
        }
    }

    static async createFoodItem(itemData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [itemResult] = await connection.query(insertItemQuery, [
                itemData.Item_Name,
                itemData.Unit_Price,
                itemData.Available_Quantity || 0
            ]);

            const itemId = itemResult.insertId;

            await connection.query(insertFoodItemQuery, [
                itemId,
                itemData.Calories,
                itemData.Protein,
                itemData.Sugar,
                itemData.Total_Carbs,
                itemData.Total_Fat
            ]);

            await connection.commit();
            return itemId;

        } catch (error) {
            await connection.rollback();
            console.error('Error in createFoodItem:', error);
            throw new Error(SHOP_ERRORS.CREATE_ERROR);
        } finally {
            connection.release();
        }
    }

    static async updateFoodItem(id, itemData) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            await connection.query(updateItemQuery, [
                itemData.Item_Name,
                itemData.Unit_Price,
                id
            ]);

            await connection.query(updateFoodItemQuery, [
                itemData.Calories,
                itemData.Protein,
                itemData.Sugar,
                itemData.Total_Carbs,
                itemData.Total_Fat,
                id
            ]);

            await connection.commit();
            return true;

        } catch (error) {
            await connection.rollback();

            if(error.message === SHOP_ERRORS.ITEM_NOT_FOUND) {
                throw error;
            }

            throw new Error(SHOP_ERRORS.UPDATE_ERROR);
        } finally {
            connection.release();
        }
    }

    static async deleteFoodItem(id) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Delete food_item first due to FK contrains
            await connection.query(deleteFoodItemQuery, [id]);

            await connection.query(deleteItemQuery, [id]);

            await connection.commit();
            return true;

        } catch (error) {
            await connection.rollback();

            if(error.message === SHOP_ERRORS.ITEM_NOT_FOUND) {
                throw error;
            }

            throw new Error(SHOP_ERRORS.DELETE_ERROR);
        } finally {
            connection.release();
        }
    }
}

module.exports = ShopService;