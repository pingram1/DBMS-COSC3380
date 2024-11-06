const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/shopController');
const { authMiddleware, isAdmin } = require('../middlewares/auth');

router.get('/all-flavors', ShopController.getAllFlavors);
router.get('/all-flavors/:id', ShopController.getFlavorById);
router.post('/all-flavors', authMiddleware, isAdmin, ShopController.createFlavor);
router.put('/all-flavors/:id', authMiddleware, isAdmin, ShopController.updateFlavor);
router.delete('/all-flavors/:id', authMiddleware, isAdmin, ShopController.deleteFlavor);

module.exports = router;