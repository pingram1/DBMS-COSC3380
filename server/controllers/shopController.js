const ShopService = require('../services/shopService');
const { SHOP_ERRORS } = require('../utils/constants');

class ShopController {
    static async getAllFlavors(req, res) {
        try {
            const items = await ShopService.getAllItems();
            res.json(items);
        } catch (error) {
            console.error('Controller - getAllFlavors error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getFlavorById(req, res) {
        try {
            const item = await ShopService.getItemById(req.params.id);
            res.json(item);
        } catch (error) {
            if (error.message === SHOP_ERRORS.ITEM_NOT_FOUND) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    static async createFlavor(req, res) {
        try {
            const itemId = await ShopService.createFoodItem(req.body);
            
            res.status(201).json({
                message: 'Food item added successfully',
                itemId: itemId
            });
        } catch (error) {
            if (error.message.includes('Missing required fields')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = ShopController;
