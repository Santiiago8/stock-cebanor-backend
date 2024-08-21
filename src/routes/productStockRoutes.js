import express from 'express';
import productStockController from "../controllers/productStockController.js";

const router = express.Router();

router.post('/', productStockController.createProductStock);
router.get('/store/:store_id', productStockController.getStockByStore);
router.get('/product/:product_id', productStockController.getStockByProduct);
router.put('/update', productStockController.updateProductStock);
router.delete('/:id', productStockController.deleteProductStock);

export default router;