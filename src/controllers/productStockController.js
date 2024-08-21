import ProductStock from "../models/productStockModel.js";

const productStockController = {
    createProductStock: async (req, res) => {
        try {
            const productStock = await ProductStock.create(req.body);
            res.status(201).json(productStock);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStockByStore: async (req, res) => {
        try {
            const stock = await ProductStock.getByStore(req.params.store_id);
            res.status(200).json(stock);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStockByProduct: async (req, res) => {
        try {
            const stock = await ProductStock.getByProduct(req.params.product_id);
            res.status(200).json(stock);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProductStock: async (req, res) => {
        const { productId, storeId, quantity } = req.body;
        if (!productId || !storeId || quantity === undefined) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        try {
            // Verificar que `quantity` no sea null o undefined
            if (quantity === null || quantity === undefined) {
                return res.status(400).json({ message: 'El valor de la cantidad no puede ser nulo' });
            }

            await ProductStock.updateStock(productId, storeId, quantity);
            res.status(200).json({ message: 'Stock actualizado' });
        } catch (error) {
            console.error('Error al actualizar stock', error);
            res.status(500).json({ message: error.message });
        }
    },

    deleteProductStock: async (req, res) => {
        try {
            const productStock = await ProductStock.delete(req.params.id);
            res.status(200).json(productStock);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default productStockController;