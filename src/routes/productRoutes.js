import express from 'express';
import productController from "../controllers/productController.js";

const router = express.Router();

router.post('/create', productController.createProductWithStock);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.put('/update-stock', productController.updateProductStock);
router.delete('/:id', productController.deleteProduct);

export default router;