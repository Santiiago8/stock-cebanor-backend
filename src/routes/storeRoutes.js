import express from 'express';
import storeController from "../controllers/storeController.js";

const router = express.Router();

router.post('/', storeController.createStore);
router.get('/all', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);
router.put('/:id', storeController.updateStore);
router.delete('/:id', storeController.deleteStore);

export default router;